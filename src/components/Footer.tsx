import React from 'react';
import { Sparkles, Shield, AlertCircle, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                StudySpark AI
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fast, free, and privacy-conscious AI study productivity tools for students, educators, and lifelong learners worldwide.
            </p>
            <div className="text-[11px] text-slate-400">
              No account required &middot; 100% Free Tools &middot; Gemini Powered
            </div>
          </div>

          {/* Tools Col */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Study Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/tools/ai-text-summarizer')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  AI Text Summarizer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/tools/flashcard-maker')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Flashcard Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/tools/quiz-generator')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Practice Quiz Maker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/tools/explain-a-topic')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Topic Explainer
                </button>
              </li>
            </ul>
          </div>

          {/* Educational & Trust */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Learning & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/ai-accuracy')}
                  className="hover:text-indigo-600 transition-colors text-left flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-indigo-500" />
                  <span>AI Accuracy & Verification</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/about')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  About StudySpark AI
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/contact')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Contact & Student Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Legal & Privacy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/privacy')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/terms')}
                  className="hover:text-indigo-600 transition-colors text-left"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition-colors"
                >
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Responsible AI Disclaimer & Notice */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-8 text-xs text-slate-500 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-700">Educational Guidance Disclaimer:</strong> StudySpark AI provides AI-assisted study synthesis, flashcards, and quizzes designed to augment your learning. AI models may occasionally produce inaccuracies. Always cross-reference generated answers with your course syllabus, textbooks, and primary instructor materials. StudySpark AI is an independent project and is not affiliated with, endorsed by, or sponsored by Google or any university.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} StudySpark AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for learners worldwide with focus and care.
          </p>
        </div>
      </div>
    </footer>
  );
};
