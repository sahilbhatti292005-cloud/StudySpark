import React, { useState } from 'react';
import {
  Lightbulb,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { apiService } from '../../services/api.ts';
import { SAMPLE_TOPICS } from '../../utils/sampleData.ts';
import type {
  TopicExplainRequest,
  TopicExplainResponse,
  ExplainLevel,
  ExplainStyle,
} from '../../types/index.ts';

export const TopicExplainerTool: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<ExplainLevel>('intermediate');
  const [style, setStyle] = useState<ExplainStyle>('worked_example');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TopicExplainResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleExplain = async () => {
    if (!topic.trim()) {
      setError('Please enter a concept, question, or academic topic to explain.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload: TopicExplainRequest = {
        topic,
        level,
        style,
      };
      const response = await apiService.explainTopic(payload);
      setResult(response);
    } catch (err: any) {
      setError(err?.message || 'Failed to explain topic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const concepts = result.keyConcepts.map((c) => `### ${c.title}\n${c.explanation}`).join('\n\n');
    const pitfalls = result.commonPitfalls.map((p) => `• ${p}`).join('\n');
    const steps = result.stepByStep && result.stepByStep.length > 0 ? `\n\nSTEP-BY-STEP:\n${result.stepByStep.map((s, i) => `${i + 1}. ${s}`).join('\n')}` : '';

    const textToCopy = `# ${result.title}\n\n${result.overview}\n\n${concepts}\n\n## Practical Example:\n${result.practicalExample}${steps}\n\n## Common Misconceptions:\n${pitfalls}\n\n## Core Takeaway:\n${result.keyTakeaway}\n\n— Generated with StudySpark AI`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Input Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Topic Explainer</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Demystify complex academic concepts with intuitive analogies, worked examples, and mental models.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Topic Suggestions */}
        <div className="pt-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400">Popular ideas:</span>
          {SAMPLE_TOPICS.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTopic(t);
                setError(null);
              }}
              className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg px-2.5 py-1 transition-colors"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Learner Depth
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
              {(['beginner', 'intermediate', 'advanced'] as ExplainLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                    level === lvl
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Pedagogical Style
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
              {(
                [
                  { id: 'worked_example', label: 'Worked Example' },
                  { id: 'step_by_step', label: 'Step-by-Step' },
                  { id: 'simple', label: 'Intuitive' },
                ] as { id: ExplainStyle; label: string }[]
              ).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStyle(st.id)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-all ${
                    style === st.id
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Topic Input Field */}
        <div className="mt-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How does CRISPR-Cas9 gene editing work? or Nash Equilibrium in Game Theory..."
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleExplain();
              }}
            />

            <button
              type="button"
              onClick={handleExplain}
              disabled={loading || !topic.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50 transition-all whitespace-nowrap"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Explaining...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain Concept</span>
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={handleExplain}
              disabled={loading || !topic.trim()}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 font-semibold transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Retry Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Result Breakdown View */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-indigo-600 uppercase">
                  Concept Breakdown &middot; {level}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{result.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied Markdown' : 'Copy Explanation'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExplain}
                  disabled={loading}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  title="Regenerate explanation"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Overview / Intuition */}
            <div className="rounded-xl bg-indigo-50/40 border border-indigo-100/80 p-5">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide mb-1.5">
                The Intuitive Big Picture
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed font-normal">
                {result.overview}
              </p>
            </div>

            {/* Core Sub-Concepts */}
            {result.keyConcepts && result.keyConcepts.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Foundational Components</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.keyConcepts.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-xs space-y-1.5 shadow-2xs"
                    >
                      <strong className="block text-sm font-bold text-slate-900">{item.title}</strong>
                      <p className="text-slate-600 leading-relaxed">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Concrete Practical Example */}
            {result.practicalExample && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">Concrete Practical Example</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {result.practicalExample}
                </p>
              </div>
            )}

            {/* Optional Step-by-Step Breakdown */}
            {result.stepByStep && result.stepByStep.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Step-by-Step Mechanism</h4>
                <ol className="space-y-2 text-xs">
                  {result.stepByStep.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3 text-slate-700"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-mono font-bold text-indigo-600 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Common Pitfalls & Misconceptions */}
            {result.commonPitfalls && result.commonPitfalls.length > 0 && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Common Misconceptions to Avoid</span>
                </div>
                <ul className="space-y-1.5 text-amber-950">
                  {result.commonPitfalls.map((pitfall, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">&bull;</span>
                      <span className="leading-relaxed">{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Takeaway Card */}
            {result.keyTakeaway && (
              <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50/60 to-violet-50/40 p-4 text-xs">
                <div className="font-semibold text-indigo-900 text-[11px] uppercase tracking-wide mb-1">
                  Memory Anchor / Key Takeaway
                </div>
                <p className="text-sm font-medium text-slate-900 italic">
                  &ldquo;{result.keyTakeaway}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
