import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, BookOpen, Layers, Lightbulb, ExternalLink } from 'lucide-react';

export const AiAccuracyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-10 animate-in fade-in duration-200">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Pedagogy & Responsible AI</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Responsible AI & Academic Accuracy
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          How StudySpark AI uses Google Gemini to accelerate revision, and why human verification remains the cornerstone of academic mastery.
        </p>
      </div>

      {/* Accuracy Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Direct Source Grounding</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our models are instructed to synthesize solely from your submitted notes and textbook excerpts. By configuring a low temperature (0.2–0.3), the model prioritizes factual fidelity over speculative creativity.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Known Model Nuances</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Large Language Models are probabilistic text generators. In complex mathematical proofs, specialized clinical formulas, or disputed historical chronologies, models may occasionally invert numbers or miss caveats.
          </p>
        </div>
      </div>

      {/* The 4-Step Verification Guide */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          How to Check Generated Answers Against Your Original Notes
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-mono font-bold text-indigo-600 text-xs mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Verify Numerical Constants & Specific Dates</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                Always double-check dates, statistical coefficients, and physical constants (e.g. Planck&apos;s constant or GDP growth figures) directly against your primary textbook table.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-mono font-bold text-indigo-600 text-xs mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Watch for Over-Generalization in Summaries</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                Short summaries necessarily omit secondary examples. If an exam tests detailed exceptions to scientific rules (e.g., exceptions to the octet rule in chemistry), refer to your full notes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-mono font-bold text-indigo-600 text-xs mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Leverage Active Recall, Not Passive Reading</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                When using flashcards, always force your brain to formulate the answer before clicking flip. Cognitive struggle during retrieval is what triggers synaptic reinforcement in long-term memory.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-mono font-bold text-indigo-600 text-xs mt-0.5">
              4
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Use Quizzes as Diagnostic Heatmaps</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                Practice quizzes are meant to expose knowledge gaps. When you answer incorrectly, don&apos;t just memorize the correct choice—read the explanation and return to that section in your study notes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cognitive Science Section */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-8 space-y-4">
        <h3 className="text-base font-bold text-indigo-950">
          The Cognitive Science of Active Retrieval
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Extensive cognitive psychology research demonstrates that testing oneself (the &ldquo;Testing Effect&rdquo;) produces substantially higher memory consolidation and conceptual transfer than re-reading or passive highlighting. By automating the creation of retrieval probes (flashcards, questions, and explanations), StudySpark AI shifts your study sessions from passive consumption to high-efficiency retrieval practice.
        </p>
      </div>
    </div>
  );
};
