# StudySpark AI ⚡

> **"Turn your study material into summaries, flashcards, and quizzes in seconds."**

StudySpark AI is a free, fast, and privacy-conscious AI-powered study productivity suite designed for students, educators, and self-directed learners worldwide.

---

## 🚀 Live Public Study Tools

1. **AI Text Summarizer** (`/tools/ai-text-summarizer`): Condenses textbooks, lectures, and research papers into customizable summaries (short/medium/detailed) with high-yield takeaways and key terminology definitions.
2. **Flashcard Maker** (`/tools/flashcard-maker`): Converts study text into active recall flashcards with interactive 3D card flips, keyboard navigation (`Space`, `←`, `→`), shuffle, and one-click export for Anki and Quizlet.
3. **Practice Quiz Maker** (`/tools/quiz-generator`): Generates exam-style multiple-choice and true/false questions with hidden answers, instant grading, pedagogical explanations, and a diagnostic score report.
4. **Topic Explainer** (`/tools/explain-a-topic`): Demystifies complex academic concepts with intuitive mental models, concrete practical examples, step-by-step mechanisms, common pitfalls to avoid, and memory anchor takeaways.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Plus Jakarta Sans typography.
- **Backend**: Node.js, Express, TypeScript (`tsx`), `@google/genai` modern TypeScript SDK.
- **AI Engine**: Google Gemini API (`gemini-3.8-flash`) executed strictly server-side with structured JSON schemas and zero-temperature factual fidelity.
- **Data Persistence**: **Zero-Database Architecture**. Submitted notes are processed in-flight via secure HTTPS/TLS and never persisted or shared.
- **Cost Controls**: In-memory IP rate limiter (35 req / 15 min), 15,000 max character input constraints, 45-second request timeouts, and a global kill switch (`AI_KILL_SWITCH`).
- **SEO & Compliance**: XML sitemap (`/sitemap.xml`), robots.txt (`/robots.txt`), OpenGraph social cards, Schema.org `WebApplication` structured data, and dedicated canonical URLs.

---

## 🔒 Security & Privacy Guarantees

- **No Client-Side Secrets**: `GEMINI_API_KEY` is exclusively consumed in `server.ts` and is never exposed to frontend bundles or browser network payloads.
- **Anti-Prompt-Injection**: Submitted user text is strictly demarcated as untrusted study source material in system prompts.
- **No Third-Party Tracking**: No invasive analytics tracking cookies by default.
- **Transparent Disclaimers**: Academic accuracy guidance and verification notices embedded on all outputs.

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```bash
GEMINI_API_KEY="your-google-gemini-api-key"
GEMINI_MODEL="gemini-3.8-flash"
PORT=3000
MAX_INPUT_CHARS=15000
RATE_LIMIT_MAX=35
AI_KILL_SWITCH=false
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📋 Google AdSense & Monetization Launch Checklist

To monetize StudySpark AI compliantly with display advertising while starting with a ₹0 budget:
- [x] **Original Value**: 4 functional, distinct educational tools with practical study utility.
- [x] **Policy Pages**: Functional Privacy Policy (`/privacy`), Terms of Use (`/terms`), About (`/about`), and Contact (`/contact`).
- [x] **Accuracy Transparency**: Dedicated Responsible AI page (`/ai-accuracy`).
- [x] **CLS Protection**: Reusable `AdSlot` components reserve layout dimensions to prevent Cumulative Layout Shift.
- [x] **Zero Deceptive Placements**: Ads clearly labeled "ADVERTISEMENT" and separated from functional action buttons.
- [x] **Fast Mobile Performance**: Responsive layouts tested for smartphones and tablets.

---

## 🧪 Testing

1. **Summarizer Test**: Click "Try Sample: Biology" and verify structured summary, key takeaways, and definitions are generated.
2. **Flashcards Test**: Generate 6 cards, press `Space` to flip, use `→` to advance, test "Shuffle" and "Copy All".
3. **Quiz Test**: Select an option, submit to verify correctness feedback and explanation, complete the quiz to verify final percentage score.
4. **Rate Limit Test**: Verify that exceeding configured thresholds returns a friendly 429 status message.
5. **Mobile Test**: Verify mobile responsive drawer and single-line control labels on screens ≤ 390px.
