(() => {
  "use strict";

  const viewList = document.getElementById("view-list");
  const viewChat = document.getElementById("view-chat");
  const roster = document.getElementById("roster");
  const searchInput = document.getElementById("roster-search");

  const backBtn = document.getElementById("back-btn");
  const voiceToggle = document.getElementById("voice-toggle");
  const chatAvatar = document.getElementById("chat-avatar");
  const moodBadge = document.getElementById("mood-badge");
  const chatName = document.getElementById("chat-name");
  const chatHobby = document.getElementById("chat-hobby");
  const thread = document.getElementById("thread");
  const micBtn = document.getElementById("mic-btn");
  const msgInput = document.getElementById("msg-input");
  const sendBtn = document.getElementById("send-btn");

  const VOICE_PREF_KEY = "cgc-voice-enabled";

  const state = {
    characters: [],
    current: null,
    history: [],
    voiceEnabled: localStorage.getItem(VOICE_PREF_KEY) !== "off",
    sending: false,
  };

  applyVoiceToggleUI();

  fetch("/api/characters")
    .then((res) => res.json())
    .then((data) => {
      state.characters = data;
      renderRoster(data);
    })
    .catch(() => {
      roster.innerHTML = "";
      const p = document.createElement("p");
      p.className = "roster-empty";
      p.textContent = "一覧の読み込みに失敗しました。ページを再読み込みしてください。";
      roster.appendChild(p);
    });

  function renderRoster(characters) {
    roster.innerHTML = "";
    if (characters.length === 0) {
      const p = document.createElement("p");
      p.className = "roster-empty";
      p.textContent = "見つかりませんでした。";
      roster.appendChild(p);
      return;
    }
    const frag = document.createDocumentFragment();
    for (const c of characters) {
      frag.appendChild(buildRosterCard(c));
    }
    roster.appendChild(frag);
  }

  function buildRosterCard(c) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "roster-card";
    card.addEventListener("click", () => openChat(c));

    const img = document.createElement("img");
    img.className = "roster-card-avatar";
    img.src = c.avatar;
    img.alt = c.name;
    img.loading = "lazy";
    card.appendChild(img);

    const body = document.createElement("div");
    body.className = "roster-card-body";

    const number = document.createElement("div");
    number.className = "roster-card-number";
    number.textContent = "No. " + String(c.number).padStart(3, "0");
    body.appendChild(number);

    const name = document.createElement("div");
    name.className = "roster-card-name";
    name.textContent = c.name;
    body.appendChild(name);

    const hobby = document.createElement("div");
    hobby.className = "roster-card-hobby";
    hobby.textContent = c.hobby;
    body.appendChild(hobby);

    card.appendChild(body);
    return card;
  }

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      renderRoster(state.characters);
      return;
    }
    const filtered = state.characters.filter((c) => {
      const num = String(c.number).padStart(3, "0");
      return (
        num.includes(q) ||
        String(c.number).includes(q) ||
        c.hobby.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
      );
    });
    renderRoster(filtered);
  });

  function openChat(character) {
    state.current = character;
    state.history = [];

    chatAvatar.src = character.avatar;
    chatAvatar.alt = character.name;
    moodBadge.textContent = character.mood;
    chatName.textContent = "No." + String(character.number).padStart(3, "0") + " " + character.name;
    chatHobby.textContent = character.hobby;

    thread.innerHTML = "";
    appendMessage(character.greeting, "her");

    viewList.classList.add("hidden");
    viewChat.classList.remove("hidden");
    msgInput.value = "";
    msgInput.focus();
  }

  backBtn.addEventListener("click", () => {
    viewChat.classList.add("hidden");
    viewList.classList.remove("hidden");
    state.current = null;
  });

  function applyVoiceToggleUI() {
    voiceToggle.classList.toggle("is-muted", !state.voiceEnabled);
    voiceToggle.setAttribute(
      "aria-label",
      state.voiceEnabled ? "音声読み上げ ON" : "音声読み上げ OFF"
    );
  }

  voiceToggle.addEventListener("click", () => {
    state.voiceEnabled = !state.voiceEnabled;
    localStorage.setItem(VOICE_PREF_KEY, state.voiceEnabled ? "on" : "off");
    applyVoiceToggleUI();
  });

  function appendMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = "msg " + sender;
    bubble.textContent = text;
    thread.appendChild(bubble);
    thread.scrollTop = thread.scrollHeight;
    return bubble;
  }

  function appendTyping() {
    const bubble = document.createElement("div");
    bubble.className = "msg her typing";
    bubble.innerHTML = "<span></span><span></span><span></span>";
    thread.appendChild(bubble);
    thread.scrollTop = thread.scrollHeight;
    return bubble;
  }

  async function sendMessage() {
    const text = msgInput.value.trim();
    if (!text || state.sending || !state.current) return;

    state.sending = true;
    appendMessage(text, "user");
    msgInput.value = "";
    msgInput.focus();

    const typingBubble = appendTyping();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character_id: state.current.id,
          message: text,
          history: state.history,
        }),
      });
      const data = await res.json();
      typingBubble.remove();

      const reply = data.reply || "……ごめん、うまく言葉が出てこない。";
      appendMessage(reply, "her");

      state.history.push({ role: "user", content: text });
      state.history.push({ role: "assistant", content: reply });

      if (state.voiceEnabled) {
        speak(reply);
      }
    } catch (err) {
      typingBubble.remove();
      appendMessage("……通信エラーみたい。もう一回送ってみて。", "her");
    } finally {
      state.sending = false;
    }
  }

  function speak(text) {
    if (!state.current) return;
    fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character_id: state.current.id, text }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("tts unavailable");
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.addEventListener("ended", () => URL.revokeObjectURL(url));
        audio.play().catch(() => {});
      })
      .catch(() => {
        /* VOICEVOX unavailable: fail silently, chat still works without audio */
      });
  }

  sendBtn.addEventListener("click", sendMessage);
  msgInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // --- Voice input (Web Speech API) ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    let listening = false;

    recognition.addEventListener("result", (e) => {
      const transcript = e.results[0][0].transcript;
      msgInput.value = transcript;
      msgInput.focus();
    });

    recognition.addEventListener("end", () => {
      listening = false;
      micBtn.classList.remove("is-listening");
    });

    recognition.addEventListener("error", () => {
      listening = false;
      micBtn.classList.remove("is-listening");
    });

    micBtn.addEventListener("click", () => {
      if (listening) {
        recognition.stop();
        return;
      }
      listening = true;
      micBtn.classList.add("is-listening");
      try {
        recognition.start();
      } catch (err) {
        listening = false;
        micBtn.classList.remove("is-listening");
      }
    });
  } else {
    micBtn.disabled = true;
    micBtn.title = "このブラウザは音声入力に対応していません";
  }
})();
