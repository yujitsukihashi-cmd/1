import os

import requests
from flask import Flask, jsonify, render_template, request, Response

from characters import ROSTER, ROSTER_BY_ID, public_fields

app = Flask(__name__)

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
ANTHROPIC_MODEL = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-5")
VOICEVOX_URL = os.environ.get("VOICEVOX_URL", "http://127.0.0.1:50021")

_anthropic_client = None
if ANTHROPIC_API_KEY:
    from anthropic import Anthropic

    _anthropic_client = Anthropic(api_key=ANTHROPIC_API_KEY)

MAX_HISTORY_TURNS = 12
MAX_MESSAGE_LENGTH = 2000

# VOICEVOX female-leaning speaker ids to cycle through per character.
VOICEVOX_SPEAKER_IDS = [2, 3, 8, 10, 20, 46]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/characters")
def api_characters():
    return jsonify([public_fields(c) for c in ROSTER])


def _fallback_reply(character):
    return (
        f"（ANTHROPIC_API_KEYが未設定のため、{character['name']}のセリフはダミー応答です。"
        "サーバー環境変数を設定すると本人になりきった返信になります）"
    )


@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.get_json(silent=True) or {}
    character_id = data.get("character_id")
    message = (data.get("message") or "").strip()
    history = data.get("history") or []

    character = ROSTER_BY_ID.get(character_id)
    if not character:
        return jsonify({"error": "unknown character_id"}), 400
    if not message:
        return jsonify({"error": "message is required"}), 400
    message = message[:MAX_MESSAGE_LENGTH]

    if not _anthropic_client:
        return jsonify({"reply": _fallback_reply(character)})

    messages = []
    for turn in history[-MAX_HISTORY_TURNS:]:
        role = turn.get("role")
        content = (turn.get("content") or "")[:MAX_MESSAGE_LENGTH]
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content})
    messages.append({"role": "user", "content": message})

    try:
        response = _anthropic_client.messages.create(
            model=ANTHROPIC_MODEL,
            max_tokens=300,
            system=character["system_prompt"],
            messages=messages,
        )
        reply = "".join(
            block.text for block in response.content if block.type == "text"
        ).strip()
        if not reply:
            reply = "……ちょっと、今なんて言えばいいか分かんない。"
    except Exception as exc:  # noqa: BLE001 - surface as a chat-safe fallback
        app.logger.exception("Anthropic API call failed")
        reply = f"……なんか調子悪いみたい。ごめん、もう一回話しかけて。({exc.__class__.__name__})"

    return jsonify({"reply": reply})


@app.route("/api/tts", methods=["POST"])
def api_tts():
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()[:MAX_MESSAGE_LENGTH]
    character_id = data.get("character_id")

    character = ROSTER_BY_ID.get(character_id)
    if not character:
        return jsonify({"error": "unknown character_id"}), 400
    if not text:
        return jsonify({"error": "text is required"}), 400

    speaker = VOICEVOX_SPEAKER_IDS[character["number"] % len(VOICEVOX_SPEAKER_IDS)]

    try:
        query_res = requests.post(
            f"{VOICEVOX_URL}/audio_query",
            params={"text": text, "speaker": speaker},
            timeout=10,
        )
        query_res.raise_for_status()

        synth_res = requests.post(
            f"{VOICEVOX_URL}/synthesis",
            params={"speaker": speaker},
            json=query_res.json(),
            timeout=20,
        )
        synth_res.raise_for_status()
    except requests.RequestException as exc:
        return jsonify({"error": f"voicevox_unavailable: {exc}"}), 503

    return Response(synth_res.content, mimetype="audio/wav")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
