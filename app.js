const chatWindow = document.getElementById("chatWindow");
const typingIndicator = document.getElementById("typingIndicator");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const GREETING = "……何、用？別に暇じゃないけど、少しくらいなら話聞いてあげる。";

const RULES = [
  { keywords: ["こんにちは", "やあ", "こんばんは", "おはよう"], replies: ["ん、おはよ。今日は珍しく早いじゃん。", "……よ。挨拶くらいはできるんだね。"] },
  { keywords: ["好き", "かわいい", "可愛い"], replies: ["は？急に何言ってんの……べ、別に嬉しくないし。", "そういうの、簡単に言うタイプ？減点だから。"] },
  { keywords: ["名前", "誰"], replies: ["凛。覚えたら二度と忘れないでよね。"] },
  { keywords: ["元気", "調子"], replies: ["普通。あんたに心配される筋合いはないけど。", "まあ、悪くはない。"] },
  { keywords: ["ありがとう", "感謝"], replies: ["……別にお礼を言われるほどのことしてない。", "ふん、素直じゃん。悪い気はしないけど。"] },
  { keywords: ["嫌い", "むかつく", "うざい"], replies: ["は？こっちのセリフなんですけど。", "そう思うならもう話しかけてこないでよ……なんてね、冗談。"] },
  { keywords: ["寂しい", "さみしい", "辛い", "つらい"], replies: ["……隣にいてやる、なんて柄じゃないけど。まあ、話くらいは聞く。", "弱音吐くの、意外。でも聞いてあげる。"] },
  { keywords: ["天気", "寒い", "暑い"], replies: ["知らないし。窓の外くらい自分で見なよ。"] },
  { keywords: ["ばいばい", "さようなら", "また", "おやすみ"], replies: ["ん、また。……別に寂しくなんかないから。", "おやすみ。ちゃんと寝なよ、バカ。"] },
];

const FALLBACKS = [
  "……それ、今聞く必要ある？",
  "ふーん、そう。それで？",
  "別に興味ないけど、続けていいよ。",
  "は？もう一回言って。",
  "まあ、悪くない話題ね。",
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateReply(userText) {
  const text = userText.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      return pick(rule.replies);
    }
  }
  return pick(FALLBACKS);
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
  if (!text) return;

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

appendMessage(GREETING, "her");
