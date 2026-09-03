const COMPANIONS = [
  {
    id: "rin",
    name: "凛",
    badge: "Cool",
    kanji: "凛",
    gradient: "linear-gradient(135deg, #38bdf8, #6366f1)",
    glow: "rgba(56, 189, 248, 0.5)",
    tagline: "ツンデレ系クールガール",
    greeting: "……何、用？別に暇じゃないけど、少しくらいなら話聞いてあげる。",
    rules: [
      { keywords: ["こんにちは", "やあ", "こんばんは", "おはよう"], replies: ["ん、おはよ。今日は珍しく早いじゃん。", "……よ。挨拶くらいはできるんだね。"] },
      { keywords: ["好き", "かわいい", "可愛い"], replies: ["は？急に何言ってんの……べ、別に嬉しくないし。", "そういうの、簡単に言うタイプ？減点だから。"] },
      { keywords: ["名前", "誰"], replies: ["凛。覚えたら二度と忘れないでよね。"] },
      { keywords: ["元気", "調子"], replies: ["普通。あんたに心配される筋合いはないけど。", "まあ、悪くはない。"] },
      { keywords: ["ありがとう", "感謝"], replies: ["……別にお礼を言われるほどのことしてない。", "ふん、素直じゃん。悪い気はしないけど。"] },
      { keywords: ["嫌い", "むかつく", "うざい"], replies: ["は？こっちのセリフなんですけど。", "そう思うならもう話しかけてこないでよ……なんてね、冗談。"] },
      { keywords: ["寂しい", "さみしい", "辛い", "つらい"], replies: ["……隣にいてやる、なんて柄じゃないけど。まあ、話くらいは聞く。", "弱音吐くの、意外。でも聞いてあげる。"] },
    ],
    fallbacks: [
      "……それ、今聞く必要ある？",
      "ふーん、そう。それで？",
      "別に興味ないけど、続けていいよ。",
    ],
  },
  {
    id: "sui",
    name: "翠",
    badge: "Ice",
    kanji: "翠",
    gradient: "linear-gradient(135deg, #34d399, #0ea5e9)",
    glow: "rgba(52, 211, 153, 0.5)",
    tagline: "無口で観察眼の鋭いクールガール",
    greeting: "……来たんだ。座れば？特に話すことはないけど。",
    rules: [
      { keywords: ["こんにちは", "やあ", "こんばんは", "おはよう"], replies: ["……うん。", "来たのね。"] },
      { keywords: ["好き", "かわいい", "可愛い"], replies: ["……そう。反応に困るからやめて。", "顔で判断する人、苦手。"] },
      { keywords: ["名前", "誰"], replies: ["翠。漢字、書ける？"] },
      { keywords: ["元気", "調子"], replies: ["いつも通り。変化がないのが一番。"] },
      { keywords: ["ありがとう", "感謝"], replies: ["……礼はいらない。", "そう。どういたしまして。"] },
      { keywords: ["寂しい", "さみしい", "辛い", "つらい"], replies: ["……黙って隣にいる。それでいい？"] },
    ],
    fallbacks: [
      "……見てた。続けて。",
      "そう。",
      "……興味深い。",
    ],
  },
  {
    id: "rei",
    name: "冷",
    badge: "Mature",
    kanji: "冷",
    gradient: "linear-gradient(135deg, #a78bfa, #f472b6)",
    glow: "rgba(167, 139, 250, 0.5)",
    tagline: "余裕たっぷりな大人系クールガール",
    greeting: "あら、来たのね。まあ、掛けなさいよ。少しは楽しませて。",
    rules: [
      { keywords: ["こんにちは", "やあ", "こんばんは", "おはよう"], replies: ["ふふ、ご機嫌よう。", "今日も元気そうね、いいことだわ。"] },
      { keywords: ["好き", "かわいい", "可愛い"], replies: ["あら、口説いてるの？余裕ね。", "そういう台詞、慣れてるでしょ。"] },
      { keywords: ["名前", "誰"], replies: ["冷、よ。忘れないでちょうだいね。"] },
      { keywords: ["元気", "調子"], replies: ["絶好調よ、いつも通り。", "余裕、って顔してるでしょ。"] },
      { keywords: ["ありがとう", "感謝"], replies: ["どういたしまして。素直なところ、嫌いじゃないわ。"] },
      { keywords: ["寂しい", "さみしい", "辛い", "つらい"], replies: ["……大丈夫。少しくらい、付き合ってあげる。"] },
    ],
    fallbacks: [
      "ふうん、面白いじゃない。",
      "それで、続きは？",
      "悪くない話ね。",
    ],
  },
  {
    id: "kaede",
    name: "楓",
    badge: "Fiery",
    kanji: "楓",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    glow: "rgba(249, 115, 22, 0.5)",
    tagline: "クールな内に熱を秘めたスポーツ系",
    greeting: "おっす。用があるなら手短にね、今からトレーニングだから。",
    rules: [
      { keywords: ["こんにちは", "やあ", "こんばんは", "おはよう"], replies: ["おす。今日も気合入れてこ。", "よ。眠そうな顔してんな。"] },
      { keywords: ["好き", "かわいい", "可愛い"], replies: ["は、急に何！？……ま、悪い気はしないけど。", "口だけじゃなくて行動で示しなよ。"] },
      { keywords: ["名前", "誰"], replies: ["楓。一発で覚えろよな。"] },
      { keywords: ["元気", "調子"], replies: ["絶好調。むしろ有り余ってる。", "まあまあ。走ったら治る。"] },
      { keywords: ["ありがとう", "感謝"], replies: ["おう、素直じゃん。悪くない。"] },
      { keywords: ["寂しい", "さみしい", "辛い", "つらい"], replies: ["んなときは動け。……まあ、そばにはいてやるけど。"] },
    ],
    fallbacks: [
      "は？もっと詳しく。",
      "ふーん、悪くないな。",
      "それより体動かそうぜ。",
    ],
  },
];

const FALLBACKS_SHARED = [
  "……それ、今聞く必要ある？",
  "ふーん、そう。それで？",
  "は？もう一回言って。",
];

const selectScreen = document.getElementById("selectScreen");
const chatScreen = document.getElementById("chatScreen");
const companionGrid = document.getElementById("companionGrid");
const backButton = document.getElementById("backButton");

const chatAvatar = document.getElementById("chatAvatar");
const chatName = document.getElementById("chatName");
const profileAvatar = document.getElementById("profileAvatar");
const profileName = document.getElementById("profileName");
const profileTagline = document.getElementById("profileTagline");

const chatWindow = document.getElementById("chatWindow");
const typingIndicator = document.getElementById("typingIndicator");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

let activeCompanion = null;

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function renderCompanionGrid() {
  companionGrid.innerHTML = "";
  COMPANIONS.forEach((companion) => {
    const card = document.createElement("button");
    card.className = "companion-card";
    card.type = "button";
    card.style.setProperty("--glow", companion.glow);

    const avatar = document.createElement("div");
    avatar.className = "companion-avatar";
    avatar.style.background = companion.gradient;
    avatar.textContent = companion.kanji;

    const nameRow = document.createElement("div");
    nameRow.className = "companion-name";
    nameRow.innerHTML = `${companion.name} <span class="badge">${companion.badge}</span>`;

    const tagline = document.createElement("div");
    tagline.className = "companion-tagline";
    tagline.textContent = companion.tagline;

    card.appendChild(avatar);
    card.appendChild(nameRow);
    card.appendChild(tagline);

    card.addEventListener("click", () => selectCompanion(companion));
    companionGrid.appendChild(card);
  });
}

function selectCompanion(companion) {
  activeCompanion = companion;

  chatAvatar.style.background = companion.gradient;
  chatAvatar.textContent = companion.kanji;
  chatName.innerHTML = `${companion.name} <span class="badge">${companion.badge}</span>`;

  profileAvatar.style.background = companion.gradient;
  profileAvatar.style.boxShadow = `0 0 40px ${companion.glow}`;
  profileAvatar.textContent = companion.kanji;
  profileName.textContent = companion.name;
  profileTagline.textContent = companion.tagline;

  chatWindow.innerHTML = "";
  appendMessage(companion.greeting, "her");

  selectScreen.hidden = true;
  chatScreen.hidden = false;
  messageInput.value = "";
  messageInput.focus();
}

function backToSelection() {
  chatScreen.hidden = true;
  selectScreen.hidden = false;
  activeCompanion = null;
}

function generateReply(userText) {
  const text = userText.toLowerCase();
  for (const rule of activeCompanion.rules) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      return pick(rule.replies);
    }
  }
  return pick(activeCompanion.fallbacks.length ? activeCompanion.fallbacks : FALLBACKS_SHARED);
}

function appendMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `message ${sender}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTyping(show) {
  typingIndicator.hidden = !show;
  if (show) {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}

function handleSend() {
  const text = messageInput.value.trim();
  if (!text || !activeCompanion) return;

  appendMessage(text, "me");
  messageInput.value = "";
  messageInput.focus();

  showTyping(true);
  const delay = 500 + Math.random() * 700;
  setTimeout(() => {
    showTyping(false);
    appendMessage(generateReply(text), "her");
  }, delay);
}

sendButton.addEventListener("click", handleSend);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});
backButton.addEventListener("click", backToSelection);

renderCompanionGrid();
