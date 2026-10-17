# TwinToon AI 🚀

> **"Imagine It. Create It. Make It Go Viral."**

TwinToon AI is a modern, mobile-friendly creator studio designed for animators, content creators, and comedy writers. It provides intelligent tooling for 3D cartoon blueprints, scene-by-scene video scripts, authentic Nigerian comedy dialogues, SSML voiceover directions, viral content growth kits, and entertainment concepts.

---

## 🌟 The Six Core Studios

1. **AI Cartoon Studio**: Character turnaround blueprints (Front, 3/4, Profile), color palettes, and Midjourney v6/Flux.1 prompts for 3D Cartoon, Anime, Realistic Cartoon, and Children's Animation.
2. **AI Video Studio**: Scene-by-scene timing breakdowns, camera movements, audio scripts, and formatted video generation prompts for Veo 3, Runway Gen-3, and Sora.
3. **Nigerian Comedy Writer**: Hilarious comedy scripts in Raw Nigerian Pidgin, 50/50 blend, or Nigerian English across iconic scenes (Danfo traffic, compound yard, church thanksgiving, buka, etc.) with character dossiers and punchline tips.
4. **AI Voice Studio**: SSML voiceover formatting, emotional tags, phonetic pronunciation guides for Nigerian slang, and an in-browser audio test player (Web Speech API).
5. **Content Creator Studio**: 5 retention-engineered 3-second hooks, click-tested YouTube titles, timestamped descriptions, and platform-specific captions with categorized hashtags.
6. **Viral Idea Studio**: Entertainment concepts tailored for African audiences with 3-second hooks, plot twists, share triggers, and audience retention advice.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Vite 8, Lucide React, Motion.
- **Backend**: Node.js & Express 4 (`server.ts`) acting as a secure proxy to Google Gemini API (`@google/genai`).
- **Resilience Engine**: Built-in intelligent studio fallback generative engine ensures the app remains 100% operational even without an API key or during network downtime.
- **Data Persistence**: HTML5 client-side `localStorage` with JSON export and import capabilities.
- **Security**: Zero API keys or secrets exposed to browser client code.

---

## 📱 How to Upload from an Android Phone to GitHub

If you are using an Android phone, follow these simple steps to put your code on GitHub:

### Option A: Using the GitHub Website on Android Chrome (Easiest)
1. **Get the Source Code**:
   - In TwinToon AI, go to **Settings** &rarr; **Free-Tier Deployment** &rarr; tap **"Download Source Code (ZIP)"**.
   - Your Android phone will download `twintoon-ai-source.zip` into your **Downloads** folder.
2. **Open GitHub on Mobile**:
   - Open Chrome on your phone and go to [github.com](https://github.com).
   - Sign in (or create a free account).
   - Tap the **`+`** icon at the top right &rarr; select **New repository**.
   - Name it `twintoon-ai` and tap **Create repository**.
3. **Upload Files**:
   - On the new repository page, tap **"uploading an existing file"**.
   - Extract the downloaded ZIP file on your phone (using your phone's Files app).
   - Select and upload all project files (except `node_modules`).
   - Scroll down and tap **Commit changes**.

### Option B: Using Git on Computer or Termux (Android)
```bash
git init
git add .
git commit -m "Initial commit of TwinToon AI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/twintoon-ai.git
git push -u origin main
```

---

## 🚀 How to Deploy on Render (Free Web Service)

Render offers a 100% free web service tier that hosts full-stack Node.js Express apps with free automatic SSL.

1. **Sign in to Render**: Go to [render.com](https://render.com) and sign in with your GitHub account.
2. **Create New Web Service**:
   - Tap **New +** &rarr; select **Web Service**.
   - Choose your `twintoon-ai` GitHub repository.
3. **Configure Service Settings**:
   - **Name**: `twintoon-ai`
   - **Region**: Choose the closest region (e.g., Frankfurt or Oregon).
   - **Branch**: `main`
   - **Environment**: `Node`
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Health Check Path**: `/api/health`
4. **Add Environment Variables**:
   Under the **Environment Variables** section on Render, add:
   - `NODE_ENV` = `production`
   - `GEMINI_API_KEY` = `your_gemini_api_key_from_google_ai_studio` (Optional: If omitted, the app will use its built-in studio generative engine).
5. **Deploy**:
   - Tap **Create Web Service**.
   - Render will automatically build the React assets, start the Express server, and provide you with a live URL (e.g., `https://twintoon-ai.onrender.com`).

---

## 💻 Running Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Setup Instructions
```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/twintoon-ai.git
cd twintoon-ai

# 2. Install dependencies
npm install

# 3. Create .env file for Gemini API (optional)
cp .env.example .env
# Edit .env and insert your GEMINI_API_KEY

# 4. Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔒 Security & Privacy Policy

- **No Secret Leaks**: The client bundle contains zero API keys or secrets.
- **Server-Side Proxy**: All Gemini AI generation requests route through `POST /api/generate` on the backend.
- **Local History**: User history and creative drafts are saved exclusively in the user's browser `localStorage` and are never transmitted to external databases without explicit consent.
- **Monetization Guardrail**: Paid tiers (₦2,000 and ₦5,000) are clearly marked as **Coming Soon**. No payments or credit cards are collected until secure payment processors (Paystack or Flutterwave) are integrated.

---

## 📄 License

Apache-2.0 License. See source files for details.
