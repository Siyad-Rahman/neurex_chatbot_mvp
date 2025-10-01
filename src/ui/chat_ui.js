// src/ui/chat_ui.js
export class ChatUI {
  constructor(core) {
    this.core = core;
    this.container = null;
    this.messagesEl = null;
    this.inputEl = null;
  }

  init() {
    if (document.getElementById("neurex-widget")) return;

    // container
    this.container = document.createElement("div");
    this.container.id = "neurex-widget";

    Object.assign(this.container.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "280px",
      background: "#1e1e1e",
      color: "#fff",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
      maxHeight: "420px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
      overflow: "hidden", // keeps rounded corners clean
    });

    // header
    const header = document.createElement("div");
    header.innerText = "Chat with Neurex";
    Object.assign(header.style, {
      padding: "10px 12px",
      background: "linear-gradient(135deg, #333, #222)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "600",
      borderBottom: "1px solid #333",
      textAlign: "center",
      letterSpacing: "0.5px",
    });
    this.container.appendChild(header);

    // messages
    this.messagesEl = document.createElement("div");
    Object.assign(this.messagesEl.style, {
      flex: "1",
      overflowY: "auto",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      scrollbarWidth: "thin",
      scrollbarColor: "#666 #1e1e1e",
    });
    this.container.appendChild(this.messagesEl);

    // input wrapper
    const inputWrapper = document.createElement("div");
    Object.assign(inputWrapper.style, {
      display: "flex",
      alignItems: "center",
      padding: "8px",
      background: "#2a2a2a",
      borderTop: "1px solid #333",
    });

    // input field
    this.inputEl = document.createElement("input");
    this.inputEl.placeholder = "Type a message...";
    Object.assign(this.inputEl.style, {
      flex: "1",
      padding: "8px 12px",
      borderRadius: "20px",
      border: "1px solid #444",
      background: "#1e1e1e",
      color: "#fff",
      fontSize: "13px",
      outline: "none",
    });

    // send button
    const sendBtn = document.createElement("button");
    sendBtn.innerText = "➤";
    Object.assign(sendBtn.style, {
      marginLeft: "8px",
      background: "#4a90e2",
      border: "none",
      color: "#fff",
      borderRadius: "50%",
      width: "34px",
      height: "34px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.2s",
    });
    sendBtn.onmouseover = () => (sendBtn.style.background = "#3a78c2");
    sendBtn.onmouseleave = () => (sendBtn.style.background = "#4a90e2");

    inputWrapper.appendChild(this.inputEl);
    inputWrapper.appendChild(sendBtn);
    this.container.appendChild(inputWrapper);

    // events
    const sendMessage = () => {
      if (this.inputEl.value.trim()) {
        this.core.sendMessage(this.inputEl.value);
        this.inputEl.value = "";
      }
    };
    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
    sendBtn.addEventListener("click", sendMessage);

    document.body.appendChild(this.container);

    // subscribe to core
    this.core.onSend = (msg) => this.addMessage(msg);
    this.core.onMessage = (msg) => this.addMessage(msg);
    this.core.removeMessage = (msg) => this.removeMessage(msg);
  }

  removeMessage({ type }) {
    if (type === "loading") {
      const loadingBubbles =
        this.messagesEl.querySelectorAll(".loading-bubble");
      loadingBubbles.forEach((bubble) => bubble.remove());
    }
  }

  addMessage({ text, sender, type }) {
    const bubble = document.createElement("div");
    bubble.innerText = text;

    console.log("loadingloadingloading", type);

    if (sender === "bot" && text === "...") {
      bubble.classList.add("loading-bubble");
      bubble.innerText = "…"; // Typing indicator
    } else {
      bubble.innerText = text;
    }

    Object.assign(bubble.style, {
      maxWidth: "80%",
      alignSelf: sender === "user" ? "flex-end" : "flex-start",
      background:
        sender === "user"
          ? "linear-gradient(135deg, #4a90e2, #357ab7)"
          : "#2f2f2f",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: sender === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
      fontSize: "13px",
      lineHeight: "1.4",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      wordBreak: "break-word",
      fontStyle: type ? "italic" : "normal",
      opacity: type ? "0.7" : "1",
    });

    this.messagesEl.appendChild(bubble);
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;

    return bubble;
  }
}
