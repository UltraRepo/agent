# UltraRepo Agent Chat App

This is a vanilla JavaScript prototype for the **UltraRepo Agent AI Chat Assistant**, using the Syncfusion EJ2 Interactive Chat UI control and Webpack.

The app features:
- An advanced AI Chat interface using Syncfusion's EJ2 Interactive Chat UI
- Splitter layout for responsive design
- An iframe-based App Panel to launch external apps or documentation (like Open WebUI)
- Modular folder structure with Webpack build support

---

## 🛠 Requirements

- Node.js >= 16.x
- npm >= 8.x
- Python >= 3.9 (for serving via FastAPI)
- macOS (tested on Monterey and Ventura)

---

## 📦 Installation Steps

### 1. Clone and Setup the Project

```bash
git clone https://github.com/UltraRepo/agent.git
cd agent
```

### 2. Set up Python Virtual Environment

```bash
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install required Python packages
pip install -r requirements.txt
```

### 3. Install JavaScript Dependencies (requires Node.js & npm)

```bash
npm install
```

---

## 🚀 Running the Application

### Start the FastAPI Server

```bash
# Make sure your virtual environment is activated
source venv/bin/activate

# Start the FastAPI server on port 8008
uvicorn app:app --reload --port 8008
```

Open your browser and navigate to:
```
http://localhost:8008
```

### Alternative: Build for Production

```bash
npm run build
```

---

## 🧪 Project Structure

- `public/` - Static HTML, CSS, and JavaScript files
- `public/images/` - Avatar and other UI images
- `src/` - Source JavaScript and CSS files
- `app.py` - FastAPI server that serves the static files

---

## 📚 Resources

- Syncfusion Chat UI Docs: https://ej2.syncfusion.com/documentation/chat-ui/getting-started
- Syncfusion Chat UI Examples: https://ej2.syncfusion.com/demos/#/tailwind3/chat-ui/chat-integration.html
- Webpack CLI Docs: https://webpack.js.org/api/cli/#commands

---

## 🔍 UltraRepo Agent — Summary

**UltraRepo Agent** is a modular AI chat and app panel prototype designed for integration into the [UltraRepo](https://github.com/UltraRepo/air) architecture. It is built with **vanilla JavaScript** and **Syncfusion's EJ2 Interactive Chat UI control**, using a frontend-only build system (Webpack).

| Feature                         | Status  | Notes |
|--------------------------------|---------|-------|
| **Frontend-only build system** | ✅ Yes  | Webpack-based, self-contained build setup |
| **Vanilla JS / No framework**  | ✅ Yes  | No React, Angular, or Vue — fully framework-agnostic |
| **Interactive Chat UI**        | ✅ Yes  | Uses Syncfusion's EJ2 Interactive Chat UI control |
| **Dist folder for FastAPI**    | ✅ Yes  | Compiles to `dist/`, ready for FastAPI or static hosting |
| **FastAPI static mounting**    | ✅ Yes  | Can be served using `StaticFiles()` in FastAPI |
| **Modular app placement**      | ✅ Yes  | Designed to drop into `/apps/frontend/ultrarepo-agent/` in UltraRepo |
| **Minimal dependencies**       | ✅ Yes  | Uses only `npm` (JS) + `uvicorn/fastapi` (Python) |
