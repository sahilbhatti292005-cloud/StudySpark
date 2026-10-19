import React, { useEffect } from 'react';
import { SummarizerTool } from '../components/tools/SummarizerTool.tsx';
import { FlashcardTool } from '../components/tools/FlashcardTool.tsx';
import { QuizTool } from '../components/tools/QuizTool.tsx';
import { TopicExplainerTool } from '../components/tools/TopicExplainerTool.tsx';
import { AdSlot } from '../components/AdSlot.tsx';
import type { ToolType } from '../types/index.ts';
import { BookOpen, Layers, HelpCircle, Lightbulb, ChevronRight, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface ToolPageProps {
  toolType: ToolType;
  onNavigate: (path: string) => void;
}

interface ToolMeta {
  title: string;
  metaTitle: string;
  metaDesc: string;
  badge: string;
  h1: string;
  tagline: string;
  howToSteps: { step: string; title: string; desc: string }[];
  benefits: string[];
  limitations: string[];
  faqs: { q: string; a: string }[];
  relatedTools: { title: string; path: string; desc: string; icon: any }[];
}

const TOOL_CONFIGS: Record<ToolType, ToolMeta> = {
  summarizer: {
    title: 'AI Text Summarizer',
    metaTitle: 'Free AI Text Summarizer for Notes & Textbooks | StudySpark AI',
    metaDesc: 'Summarize lengthy study materials, textbook chapters, and lecture notes into concise bullet points, structured revision sheets, or key definitions in seconds.',
    badge: 'Study Synthesis Tool',
    h1: 'AI Text Summarizer for Students & Researchers',
    tagline: 'Turn dense chapters, academic articles, and messy lecture notes into structured, high-yield revision summaries with key definitions.',
    howToSteps: [
      { step: '01', title: 'Paste Your Material', desc: 'Copy and paste lecture notes, research abstracts, or textbook excerpts up to 15,000 characters.' },
      { step: '02', title: 'Select Depth & Format', desc: 'Choose between Short, Medium, or Detailed summaries in bulleted, structured notes, or prose formats.' },
      { step: '03', title: 'Generate & Review', desc: 'Review core takeaways, key definitions, and estimate your reading time saved.' },
    ],
    benefits: [
      'Extracts core concepts while pruning redundant filler prose',
      'Preserves specific dates, historical names, definitions, and formulas',
      'Calculates estimated reading time saved for efficient scheduling',
      'Provides copy-ready Markdown and plain text for revision binders',
    ],
    limitations: [
      'May omit secondary historical context or hyper-specialized exceptions',
      'Input capped at 15,000 characters per submission on the free tier',
      'Requires human verification against syllabus for exam-critical constants',
    ],
    faqs: [
      { q: 'Is the AI Text Summarizer free to use?', a: 'Yes! All summarization features on StudySpark AI are 100% free with no account or credit card required.' },
      { q: 'Does it rewrite or invent facts not present in my notes?', a: 'No. Our model uses a strict low-temperature setting (0.2) instructed to ground its synthesis exclusively in your source text.' },
      { q: 'Can I export the summary to Notion or Google Docs?', a: 'Yes. Use the "Copy Full Study Sheet" button to copy clean, formatted Markdown directly into your favorite notes app.' },
    ],
    relatedTools: [
      { title: 'Flashcard Maker', path: '/tools/flashcard-maker', desc: 'Convert your summary into active recall flashcards.', icon: Layers },
      { title: 'Practice Quiz Maker', path: '/tools/quiz-generator', desc: 'Test your understanding with generated questions.', icon: HelpCircle },
      { title: 'Topic Explainer', path: '/tools/explain-a-topic', desc: 'Get intuitive analogies for difficult concepts.', icon: Lightbulb },
    ],
  },
  flashcards: {
    title: 'Flashcard Maker',
    metaTitle: 'Free AI Flashcard Maker & Generator | StudySpark AI',
    metaDesc: 'Generate active recall flashcard decks from study notes and textbook readings. Features interactive 3D flip study mode and Anki/Quizlet export.',
    badge: 'Active Recall Engine',
    h1: 'AI Flashcard Maker from Notes & Readings',
    tagline: 'Convert passive study notes into high-retention active recall flashcard decks with smart flip controls and keyboard navigation.',
    howToSteps: [
      { step: '01', title: 'Enter Study Text', desc: 'Paste notes, vocabulary lists, or conceptual textbook sections.' },
      { step: '02', title: 'Configure Deck', desc: 'Choose deck size (4 to 12 cards), difficulty level, and card style (Definitions, Q&A, or Mixed).' },
      { step: '03', title: 'Study & Flip', desc: 'Engage active recall using the interactive 3D card flipper with spacebar and arrow keys.' },
    ],
    benefits: [
      'Built upon cognitive science retrieval practice principles',
      'Interactive 3D flip card mode with keyboard shortcuts (Space / Arrows)',
      'Export decks in clean plain text suitable for Anki and Quizlet',
      'Categorizes cards by concept for structured mental chunking',
    ],
    limitations: [
      'Complex mathematical equations are rendered in standard unicode/text',
      'Card count capped at 12 cards per generation on free tier to ensure quality',
    ],
    faqs: [
      { q: 'Why is active recall better than re-reading notes?', a: 'Active recall forces your brain to retrieve knowledge from long-term memory, strengthening neural connections significantly more than passive scanning.' },
      { q: 'Can I use keyboard navigation while studying?', a: 'Yes! Press Space to flip the card, Right Arrow for Next, and Left Arrow for Previous.' },
      { q: 'Are cards saved to an account?', a: 'To protect your privacy, cards are kept in your browser session. Use "Copy All" to export them before closing.' },
    ],
    relatedTools: [
      { title: 'AI Text Summarizer', path: '/tools/ai-text-summarizer', desc: 'Condense your notes into key takeaways first.', icon: BookOpen },
      { title: 'Practice Quiz Maker', path: '/tools/quiz-generator', desc: 'Test yourself with multiple-choice questions.', icon: HelpCircle },
      { title: 'Topic Explainer', path: '/tools/explain-a-topic', desc: 'Break down tough concepts step-by-step.', icon: Lightbulb },
    ],
  },
  quiz: {
    title: 'Practice Quiz Maker',
    metaTitle: 'Free AI Quiz Generator from Notes & Text | StudySpark AI',
    metaDesc: 'Generate exam-style practice quizzes with multiple-choice and true/false questions. Instant scoring and detailed pedagogical explanations.',
    badge: 'Exam Preparation Tool',
    h1: 'AI Practice Quiz Generator from Study Material',
    tagline: 'Simulate exam conditions with unambiguous multiple-choice and true/false questions featuring instant grading and thorough explanations.',
    howToSteps: [
      { step: '01', title: 'Supply Course Material', desc: 'Paste textbook excerpts, lecture summaries, or study sheets.' },
      { step: '02', title: 'Pick Question Format', desc: 'Choose Multiple Choice (4 options) or True/False, question count, and difficulty.' },
      { step: '03', title: 'Take the Test', desc: 'Select options, submit answers to receive instant pedagogical feedback, and view your final score.' },
    ],
    benefits: [
      'Unambiguous questions with exactly one verified correct answer',
      'Instant feedback with detailed rationales for why the answer is correct',
      'Simulates genuine exam cognitive pressure to build test confidence',
      'Final diagnostic scoreboard highlighting retention percentage',
    ],
    limitations: [
      'Limited to text-based multiple-choice and true/false questions',
      'Does not grade subjective free-response essay paragraphs',
    ],
    faqs: [
      { q: 'Does the quiz reveal the answers in advance?', a: 'Never. The correct answer and explanation are revealed only after you click "Check Answer".' },
      { q: 'Can I retake the same quiz if I want to improve?', a: 'Yes. After completing the quiz, click "Retake This Quiz" to test yourself again from question 1.' },
      { q: 'How many questions can I generate at once?', a: 'You can generate up to 8 questions per run on the free tier.' },
    ],
    relatedTools: [
      { title: 'Flashcard Maker', path: '/tools/flashcard-maker', desc: 'Reinforce flashcards for questions you missed.', icon: Layers },
      { title: 'AI Text Summarizer', path: '/tools/ai-text-summarizer', desc: 'Synthesize the source text into concise points.', icon: BookOpen },
      { title: 'Topic Explainer', path: '/tools/explain-a-topic', desc: 'Clarify tricky topics with worked examples.', icon: Lightbulb },
    ],
  },
  explainer: {
    title: 'Topic Explainer',
    metaTitle: 'Free AI Academic Topic Explainer & Tutor | StudySpark AI',
    metaDesc: 'Demystify challenging academic concepts in physics, chemistry, biology, economics, and mathematics with intuitive analogies and worked examples.',
    badge: 'Conceptual Clarifier',
    h1: 'AI Academic Topic & Concept Explainer',
    tagline: 'Demystify challenging concepts with clear analogies, real-world worked examples, and common misconceptions to avoid.',
    howToSteps: [
      { step: '01', title: 'Enter Any Concept', desc: 'Type an academic concept, scientific phenomenon, or theoretical question.' },
      { step: '02', title: 'Configure Depth', desc: 'Select Beginner, Intermediate, or Advanced depth with your preferred pedagogical style.' },
      { step: '03', title: 'Explore the Model', desc: 'Read intuitive overviews, concrete practical examples, and memory anchor takeaways.' },
    ],
    benefits: [
      'Bridges the gap between abstract academic theory and tangible intuition',
      'Highlights common pitfalls and misunderstandings before they show up on exams',
      'Provides a memorable "Memory Anchor" for quick recall during revision',
      'Adapts explanations for introductory to advanced collegiate depth',
    ],
    limitations: [
      'Focused strictly on academic, scientific, and educational disciplines',
      'Not a substitute for clinical medical, legal, or financial professional counsel',
    ],
    faqs: [
      { q: 'What subjects work best with Topic Explainer?', a: 'STEM subjects (physics, biology, chemistry, calculus), economics, history, linguistics, and computer science produce exceptional results.' },
      { q: 'Does it use overly simplified or patronizing language?', a: 'No. You can toggle between Beginner, Intermediate, and Advanced depending on your course level.' },
    ],
    relatedTools: [
      { title: 'AI Text Summarizer', path: '/tools/ai-text-summarizer', desc: 'Summarize textbook chapters after understanding the core topic.', icon: BookOpen },
      { title: 'Flashcard Maker', path: '/tools/flashcard-maker', desc: 'Turn explained concepts into active recall flashcards.', icon: Layers },
      { title: 'Practice Quiz Maker', path: '/tools/quiz-generator', desc: 'Test yourself on the explained concepts.', icon: HelpCircle },
    ],
  },
};

export const ToolPage: React.FC<ToolPageProps> = ({ toolType, onNavigate }) => {
  const config = TOOL_CONFIGS[toolType];

  useEffect(() => {
    document.title = config.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', config.metaDesc);
    }
  }, [config]);

  const renderTool = () => {
    switch (toolType) {
      case 'summarizer':
        return <SummarizerTool />;
      case 'flashcards':
        return <FlashcardTool />;
      case 'quiz':
        return <QuizTool />;
      case 'explainer':
        return <TopicExplainerTool />;
      default:
        return <SummarizerTool />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-200">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="hover:text-indigo-600 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-400">Tools</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-slate-800">{config.title}</span>
      </nav>

      {/* Hero Headline Area */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          <span>{config.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {config.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {config.tagline}
        </p>
      </div>

      {/* The Functioning Tool Engine */}
      <div className="pt-2">
        {renderTool()}
      </div>

      {/* Compliant Ad Slot Placement below primary interaction area */}
      <AdSlot slotId={`slot-${toolType}-primary`} format="leaderboard" />

      {/* How it works 3-step breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          How to Use the {config.title} Effectively
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.howToSteps.map((st) => (
            <div key={st.step} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600 font-mono">
                  {st.step}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{st.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits vs Limitations Honest Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Educational Benefits</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600">
            {config.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">&bull;</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Important Limitations & Verification</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600">
            {config.limitations.map((l, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold mt-0.5">&bull;</span>
                <span className="leading-relaxed">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tool-specific FAQs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 divide-y divide-slate-100">
          {config.faqs.map((faq, i) => (
            <div key={i} className={i > 0 ? 'pt-4' : ''}>
              <h4 className="text-sm font-semibold text-slate-900">{faq.q}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Tool Discovery Cards */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Complementary Study Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {config.relatedTools.map((rel) => {
            const Icon = rel.icon;
            return (
              <button
                key={rel.path}
                type="button"
                onClick={() => {
                  onNavigate(rel.path);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {rel.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
