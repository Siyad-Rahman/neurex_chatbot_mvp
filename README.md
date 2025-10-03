# Neurex Chatbot MVP

A lightweight, embeddable chatbot widget built with vanilla JavaScript.  
This project provides a UMD bundle that can be dropped into any website via a simple `<script>` tag and initialized with just one line of code.

---

## 🚀 Features

- Plug-and-play chatbot widget for any website
- Lightweight UMD build, no framework required
- Easy initialization with API key or org key
- Local test folder with `index.html` for quick dev testing
- Backend-agnostic — connect it to your chatbot API

---

## ⚡ Local Development

Run in development mode:

```bash
npm run dev

Open ./test/index.html directly in Chrome (drag and drop or open via browser) to test the widget locally.
```

-----------------------------------------------------------------------------------

🌍 Embedding in Any Website
```bash


After building and pushing to github, you can embed the widget on any site using:

CDN (recommended for production):
<script src="https://cdn.jsdelivr.net/gh/Siyad-Rahman/neurex_chatbot_mvp/dist/chatbot.umd.js"></script>
<script>
  NeurexChatBot.initWidget({ key: "your_api_key" });
</script>
```
