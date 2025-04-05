**UltraRepo Agent Prototype Plan**

**Project Objective:**
Create a vanilla JavaScript-based prototype for the "UltraRepo Agent" AI assistant application, using Syncfusion's EJ2 Chat UI control. The prototype will be based on the official Syncfusion QuickStart Webpack seed app, and will be structured to allow deployment as a FastAPI frontend web app, integrated later into the UltraRepo AIR project.

---

## 1. Reference Links

- Syncfusion EJ2 Chat UI Docs: https://ej2.syncfusion.com/documentation/chat-ui/getting-started
- Syncfusion Webpack Seed Example: https://github.com/SyncfusionExamples/ej2-quickstart-webpack
- Webpack CLI Reference: https://webpack.js.org/api/cli/#commands
- UltraRepo AIR Project: https://github.com/UltraRepo/air

---

## 2. Goals

1. Scaffold a standalone vanilla JS app using Syncfusion's EJ2 QuickStart Webpack template.
2. Integrate the Syncfusion EJ2 Chat UI control based on the official 'Getting Started' instructions.
3. Add an "App Panel" with an iframe that loads `https://docs.openwebui.com/`.
4. Add a launch button to trigger the iframe content.
5. Prepare for FastAPI integration to serve this frontend.
6. Prepare UltraRepo Agent for later AI chat connectivity and plugin-triggered app panel launches.

---

## 3. Project Structure

```
ultrarepo-agent/
├── src/
│   ├── index.js         # Main entry point for EJ2 Chat UI control
│   └── style.css        # Custom styles for layout
├── public/
│   └── index.html       # App layout with Chat UI + App Panel
├── webpack.config.js    # Webpack build config
├── package.json         # Project dependencies
└── README.md
```

---

## 4. Development Steps

### Step 1: Clone QuickStart Seed and Install Dependencies
```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ultrarepo-agent
cd ultrarepo-agent
npm install
```

### Step 2: Install Chat UI Package
```bash
npm install @syncfusion/ej2-chat
```

### Step 3: Update `index.js` to Use Chat UI
```js
import { Chat } from '@syncfusion/ej2-chat';

let chat = new Chat({
  user: { id: 'user1', name: 'You' },
  bot: { id: 'bot1', name: 'UltraRepo Agent' },
  placeholder: 'Ask me anything...'
});

chat.appendTo('#chatContainer');
```

### Step 4: Modify `index.html` to Include Chat Container + App Panel
```html
<div class="container">
  <div id="chat-panel">
    <div id="chatContainer"></div>
  </div>
  <div id="app-panel">
    <button id="helpBtn">Launch Help App</button>
    <iframe id="appFrame" src="https://docs.openwebui.com/" title="App Panel"></iframe>
  </div>
</div>
```

### Step 5: Add Launch Script in `index.js`
```js
document.getElementById('helpBtn').addEventListener('click', function () {
  document.getElementById('appFrame').src = 'https://docs.openwebui.com/';
});
```

### Step 6: Build and Test Locally (Standalone)
```bash
npm run start
```

This will launch the local Webpack development server, typically at:
```
http://localhost:3000/
```
You can now test the UltraRepo Agent UI layout, iframe interaction, and Syncfusion chat component behavior **without integrating with FastAPI or UltraRepo AIR**.

---

## 5. FastAPI Integration

In the UltraRepo `apps/services/api/main.py`, mount the `dist/` directory from this app:
```python
from fastapi.staticfiles import StaticFiles
app.mount("/ultrarepo-agent", StaticFiles(directory="apps/frontend/ultrarepo-agent/dist", html=True), name="ultrarepo-agent")
```

And in `apps/frontend/web/public/index.html`, add:
```html
<button onclick="window.open('/ultrarepo-agent', '_blank')">UltraRepo Agent</button>
```

---

## 6. Deliverables

- A working `ultrarepo-agent/` folder with:
  - Webpack-based build system
  - Syncfusion Chat UI integration
  - App Panel with iframe
  - Basic navigation button for "Help App"
- FastAPI route support for `/ultrarepo-agent`
- Launch integration from AIR web homepage

---

## 7. Future Expansion (Post-Prototype)

- Connect Chat UI to Open WebUI or LibreChat API
- Parse chat messages to trigger iframe-based app launches
- Add authentication via WebUI
- Add plugin loader in the app panel

---

**Status:** Ready to implement. UltraRepo Agent can be developed, built, and previewed entirely as a **standalone vanilla JS frontend project** using Webpack, without requiring FastAPI or UltraRepo/AIR integration during the initial prototype phase.
