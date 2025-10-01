// src/core/chat_logic.js
export class ChatCore {
  constructor({ apiUrl, onSend, onMessage, orgKey, removeMessage } = {}) {
    this.apiUrl = apiUrl; // backend endpoint
    this.messages = [];
    this.onSend = onSend;
    this.onMessage = onMessage;
    this.orgKey = orgKey;
    this.removeMessage = removeMessage;
  }

  async sendMessage(text) {
    if (!text.trim()) return;

    const userMsg = { text, sender: "user", ts: Date.now() };
    this.messages.push(userMsg);
    this.onSend?.(userMsg);

    this.addLoading();
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    try {
      const res = await fetch("http://192.168.29.14:3000/api/v1/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          lang: "en",
          orgKey: this.orgKey,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      // Validate response structure
      const botReply = data?.message || "🤖 No reply from bot";

      const botMsg = { text: botReply, sender: "bot", ts: Date.now() };
      this.removeLoading();
      //   this.messages.push(botMsg);
      this.receiveMessage(botMsg.text);
    } catch (err) {
      const errMsg = {
        text: `⚠️ Oops something went wrong`,
        sender: "system",
        ts: Date.now(),
        error: `${err.message}`,
      };
      console.log(errMsg);
      this.removeLoading();
      //   this.messages.push(errMsg);
      this.receiveMessage(errMsg.text);
    }

    return userMsg;
  }

  addLoading() {
    const loadingMessage = {
      text: "...",
      sender: "bot",
      ts: Date.now(),
      type: "loading",
    };
    this.messages.push(loadingMessage);
    this.onMessage?.(loadingMessage);
  }

  removeLoading() {
    this.messages = this.messages.filter((msg) => msg.type !== "loading");
    this.removeMessage({ type: "loading" });
  }

  receiveMessage(text) {
    const botMsg = { text, sender: "bot", ts: Date.now() };
    this.messages.push(botMsg);
    this.onMessage?.(botMsg);
    return botMsg;
  }

  getHistory() {
    return [...this.messages];
  }
}
