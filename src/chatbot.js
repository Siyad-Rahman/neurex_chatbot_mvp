// src/chatbot.js
import { ChatCore } from "./core/chat_logic.js";
import { ChatUI } from "./ui/chat_ui.js";

function initWidget({ key } = {}) {
  const core = new ChatCore({ orgKey: key });
  const ui = new ChatUI(core);
  ui.init();

  // Example: default bot reply
  core.onSend = (msg) => {
    ui.addMessage(msg); // render user msg
    // setTimeout(() => core.receiveMessage("Echo: " + msg.text), 600);
  };

  return { core, ui };
}

if (typeof window !== "undefined") {
  window.NeurexChatBot = { initWidget };
}

export { initWidget };
