import React from 'react';
import { Sparkles, Brain, ShieldCheck, Zap, BookOpen, Target } from 'lucide-react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-12 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Academic Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About StudySpark AI
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          StudySpark AI was built on a simple premise: learning materials should empower students to retain more knowledge in less time, without expensive paywalls or subscription traps.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Zero-Barrier Learning</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No mandatory signups, credit cards, or subscription locks. Paste notes and immediately generate summaries, flashcards, and quizzes.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Active Recall First</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Passive reading delivers poor retention. StudySpark AI transforms passive lecture text into active retrieval prompts that test memory.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Strict Privacy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We do not store your private notes in user databases. Text is processed in-flight via secured server-side Gemini API calls.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Why We Built StudySpark AI</h2>
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            University students, high schoolers, and self-directed learners are overwhelmed with thousands of pages of PDF textbooks, lecture slides, and disparate syllabus materials. Most commercial AI study platforms charge $15 to $30 per month simply to extract flashcards from text.
          </p>
          <p>
            StudySpark AI proves that world-class study tooling can be accessible to everyone worldwide at zero cost. By combining the state-of-the-art Google Gemini models with focused prompt engineering and clean user experience design, we make exam preparation fast, intuitive, and stress-free.
          </p>
          <p>
            Our project is self-sustaining through transparent, compliant display advertising rather than locking students behind paywalls.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-slate-500">
            Have ideas or want to report an issue?
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Contact the Team &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
