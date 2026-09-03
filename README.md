# Cool Girl Companion

87人のCool Girlから相手を選んでチャットするFlaskアプリ。Claude APIでキャラクターになりきった返信を生成し、VOICEVOXで読み上げ、ブラウザのWeb Speech APIで音声入力ができます。

## セットアップ

```bash
pip install -r requirements.txt
```

## 環境変数

| 変数名 | 必須 | 説明 |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | 実際の返信生成に必須 | Claude APIキー。未設定の場合はダミー応答になります。 |
| `ANTHROPIC_MODEL` | 任意 | 既定値 `claude-sonnet-5` |
| `VOICEVOX_URL` | 任意 | VOICEVOX ENGINEのURL。既定値 `http://127.0.0.1:50021`。起動していない場合、音声読み上げは無効化され、テキストチャットのみ動作します。 |
| `PORT` | 任意 | Flask起動ポート。既定値 `5000` |

## 起動

```bash
export ANTHROPIC_API_KEY=sk-ant-...
python app.py
```

`http://localhost:5000` にアクセスしてください。

## 構成

- `app.py` — Flaskサーバー。`/`、`/api/characters`、`/api/chat`、`/api/tts`
- `characters.py` — 87人分のキャラクターデータ(名前・趣味・性格タイプ・システムプロンプト)を決定的に生成
- `templates/index.html` — 一覧/チャットのSPA
- `static/style.css`、`static/chat.js` — スタイルとフロントエンドロジック
