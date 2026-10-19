import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { SummarizerTool } from '../components/tools/SummarizerTool.tsx';
import { FlashcardTool } from '../components/tools/FlashcardTool.tsx';
import { QuizTool } from '../components/tools/QuizTool.tsx';
import { TopicExplainerTool } from '../components/tools/TopicExplainerTool.tsx';
import { AdSlot } from '../components/AdSlot.tsx';
import type { ToolType } from '../types/index.ts';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ToolType>('summarizer');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toolsList = [
    {
      id: 'summarizer' as ToolType,
      name: 'AI Text Summarizer',
      desc: 'Condense chapters and articles into high-yield summaries & definitions.',
      icon: BookOpen,
      path: '/tools/ai-text-summarizer',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 'flashcards' as ToolType,
      name: 'Flashcard Maker',
      desc: 'Generate active recall cards with interactive 3D flip controls.',
      icon: Layers,
      path: '/tools/flashcard-maker',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'quiz' as ToolType,
      name: 'Practice Quiz Maker',
      desc: 'Test your understanding with instant pedagogical feedback & scores.',
      icon: HelpCircle,
      path: '/tools/quiz-generator',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'explainer' as ToolType,
      name: 'Topic Explainer',
      desc: 'Demystify tricky concepts using intuitive analogies and worked examples.',
      icon: Lightbulb,
      path: '/tools/explain-a-topic',
      color: 'text-violet-600 bg-violet-50',
    },
  ];

  const faqs = [
    {
      q: 'Are these study tools really 100% free?',
      a: 'Yes. StudySpark AI is completely free to use. There are no hidden subscription tiers, trial periods, or credit card requirements. The platform is supported by compliant display advertising and strict cost-efficient server architectures.',
    },
    {
      q: 'Do I need to create an account or sign in?',
      a: 'No. You can start studying immediately without registering or providing an email address. We believe that students should have zero friction between their notes and effective revision.',
    },
    {
      q: 'What kind of content can I submit?',
      a: 'You can paste lecture transcripts, textbook passages, research notes, study guides, vocabulary lists, and essay drafts across disciplines like biology, history, physics, computer science, and economics.',
    },
    {
      q: 'Are the AI-generated results always 100% accurate?',
      a: 'Our models are instructed to ground their synthesis strictly in your provided text at low temperature. However, large language models can occasionally misinterpret nuanced points. You should always verify key formulas, dates, and definitions against your official textbook or course syllabus.',
    },
    {
      q: 'How is my submitted study material handled?',
      a: 'We respect student privacy. Your notes are transmitted securely via TLS to our backend server to call the Google Gemini API in-flight. We do not store your notes in a persistent database or share them with third parties.',
    },
    {
      q: 'What usage limits apply to the free tier?',
      a: 'To guarantee reliable free access for all students, single submissions are capped at 15,000 characters (approximately 3,000 words), and requests are subject to an in-memory rate limit of 35 requests per 15 minutes per IP.',
    },
  ];

  const renderActiveTool = () => {
    switch (activeTab) {
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
    <div className="space-y-16 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Free AI Study Productivity Suite</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Study Smarter with <br className="hidden sm:inline" />
            <span className="text-indigo-600">Free AI Study Tools</span>
          </h1>

          {/* Supporting Text */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Turn your notes into summaries, flashcards, and practice quizzes. Learn faster, revise important concepts, and make the most of your study time.
          </p>

          {/* Hero Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('summarizer');
                document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 transition-all active:scale-[0.98]"
            >
              Summarize My Notes
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('quiz');
                document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98]"
            >
              Create a Quiz
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              No Account Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Private & Encrypted
            </span>
          </div>
        </div>
      </section>

      {/* Main Tool Workspace Section */}
      <section id="workspace" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Tool Selector Segmented Tabs */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl overflow-x-auto max-w-full">
              {toolsList.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTab === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setActiveTab(tool.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{tool.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tool Rendering */}
          <div className="pt-2">
            {renderActiveTool()}
          </div>
        </div>
      </section>

      {/* Responsive Ad Placement */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AdSlot slotId="slot-home-midpage" format="banner" />
      </div>

      {/* How It Works Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xs space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How StudySpark AI Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Transform passive reading into active, high-retention study routines in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 font-mono text-base font-bold text-indigo-600">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Paste Your Notes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Copy text from lecture transcripts, textbooks, or research articles directly into the tool input box.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 font-mono text-base font-bold text-indigo-600">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Choose a Study Tool</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select whether you need a synthesized summary, active recall flashcards, practice exam questions, or a concept explanation.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 font-mono text-base font-bold text-indigo-600">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Review & Learn</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flip through flashcards, take self-graded practice quizzes, or copy structured takeaways directly to your personal notebook.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Explore Every Capability
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Dedicated Study Tools
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {toolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all"
              >
                <div className="space-y-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tool.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{tool.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tool.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab(tool.id);
                      document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Use in Workspace &uarr;
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate(tool.path)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <span>Full Tool Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Educational Content Section (Active Recall & Verification) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Evidence-Based Learning
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              The Science of Active Recall & Effective Studying
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              StudySpark AI is designed around established cognitive psychology principles that maximize long-term retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed">
            <div className="space-y-2 rounded-xl bg-slate-50 p-5 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-600" />
                Why Active Recall Trumps Re-Reading
              </h4>
              <p>
                When you passively reread or highlight notes, your brain experiences the &ldquo;fluency illusion&rdquo;—confusing familiarity with true understanding. Active recall forces your brain to retrieve knowledge without hints, which triggers synaptic consolidation and durable memory encoding.
              </p>
            </div>

            <div className="space-y-2 rounded-xl bg-slate-50 p-5 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                How to Check Answers Against Original Notes
              </h4>
              <p>
                Always verify key constants, medical terms, and historical dates against your primary textbook. StudySpark AI provides a transparent confidence note with every output so you know when material required conceptual inference.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={() => onNavigate('/ai-accuracy')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <span>Read our complete guide to Responsible AI & Accuracy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Got Questions?
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Clear, honest answers about our free study tools, security, and usage.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-xs">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="p-5">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
