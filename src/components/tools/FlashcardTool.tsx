import React, { useState, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  LayoutGrid,
  Square,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react';
import { apiService } from '../../services/api.ts';
import { SAMPLE_TEXTS } from '../../utils/sampleData.ts';
import type {
  FlashcardRequest,
  FlashcardResponse,
  FlashcardItem,
  FlashcardDifficulty,
  FlashcardStyle,
} from '../../types/index.ts';

const MAX_CHARS = 15000;

export const FlashcardTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [count, setCount] = useState<number>(6);
  const [difficulty, setDifficulty] = useState<FlashcardDifficulty>('medium');
  const [style, setStyle] = useState<FlashcardStyle>('mixed');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FlashcardResponse | null>(null);
  const [cards, setCards] = useState<FlashcardItem[]>([]);

  // Flashcard study mode state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [copied, setCopied] = useState(false);

  // Keyboard navigation for active recall
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cards.length === 0 || viewMode !== 'single') return;
      // If user is focused on an input/textarea, don't hijack keys
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length, currentIndex, viewMode]);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('Please paste or write study notes to generate flashcards.');
      return;
    }

    if (inputText.length > MAX_CHARS) {
      setError(`Notes exceed maximum character limit of ${MAX_CHARS.toLocaleString()}. Please shorten.`);
      return;
    }

    setLoading(true);
    setError(null);
    setIsFlipped(false);
    setCurrentIndex(0);

    try {
      const payload: FlashcardRequest = {
        text: inputText,
        count,
        difficulty,
        style,
      };
      const response = await apiService.generateFlashcards(payload);
      setResult(response);
      setCards(response.cards);
    } catch (err: any) {
      setError(err?.message || 'Failed to create flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleCopyAll = () => {
    if (!cards || cards.length === 0) return;
    const formatted = cards
      .map((c, i) => `${i + 1}. [${c.concept}] Q: ${c.question}\nA: ${c.answer}`)
      .join('\n\n');
    navigator.clipboard.writeText(`StudySpark AI Flashcards (${result?.topic || 'Deck'}):\n\n${formatted}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = (key: keyof typeof SAMPLE_TEXTS) => {
    setInputText(SAMPLE_TEXTS[key]);
    setError(null);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="w-full space-y-8">
      {/* Tool Input Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Flashcard Maker</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate high-yield active recall flashcard decks with smart flip controls and Anki-ready export.
              </p>
            </div>
          </div>

          {/* Quick Samples */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-medium text-slate-400 mr-1">Try Sample:</span>
            <button
              type="button"
              onClick={() => loadSample('biology')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Biology
            </button>
            <button
              type="button"
              onClick={() => loadSample('history')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              History
            </button>
            <button
              type="button"
              onClick={() => loadSample('physics')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Physics
            </button>
          </div>
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Deck Size
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg">
              {[4, 6, 8, 12].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCount(num)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-all ${
                    count === num
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {num} cards
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
              {(['easy', 'medium', 'hard'] as FlashcardDifficulty[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                    difficulty === d
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Card Style
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
              {(
                [
                  { id: 'mixed', label: 'Mixed' },
                  { id: 'qa', label: 'Q & A' },
                  { id: 'definition', label: 'Defs' },
                ] as { id: FlashcardStyle; label: string }[]
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

        {/* Text input */}
        <div className="mt-5">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste textbook passages, vocabulary terms, formulas, or lecture points..."
            rows={7}
            className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
          />

          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
            <span className="font-mono">
              {inputText.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {inputText && (
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Clear
                </button>
              )}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading || !inputText.trim()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating Cards...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Flashcard Deck</span>
                  </>
                )}
              </button>
            </div>
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
              onClick={handleGenerate}
              disabled={loading || !inputText.trim()}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 font-semibold transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Retry Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Flashcard Active Study View */}
      {cards.length > 0 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Deck Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-2xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{result?.topic || 'Study Deck'}</h3>
              <p className="text-xs text-slate-500">
                {cards.length} cards &middot; Active recall enabled
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg mr-2">
                <button
                  type="button"
                  onClick={() => setViewMode('single')}
                  className={`p-1.5 rounded-md text-xs transition-colors ${
                    viewMode === 'single' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Single card flip mode"
                >
                  <Square className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md text-xs transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Grid deck overview"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleShuffle}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                title="Shuffle deck order"
              >
                <Shuffle className="w-3.5 h-3.5 text-slate-400" />
                <span>Shuffle</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                title="Restart session from card 1"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Copied!' : 'Copy All'}</span>
              </button>
            </div>
          </div>

          {/* Single Card 3D Flip Mode */}
          {viewMode === 'single' && currentCard && (
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                />
              </div>

              {/* The 3D Flip Card Container */}
              <div
                className="w-full min-h-[300px] sm:min-h-[340px] cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
                role="button"
                tabIndex={0}
                aria-label={`Flashcard ${currentIndex + 1}. Press Space or Click to reveal answer.`}
              >
                <div
                  className={`relative w-full h-full min-h-[300px] sm:min-h-[340px] rounded-2xl border transition-all duration-500 transform-style-3d shadow-md hover:shadow-lg ${
                    isFlipped
                      ? 'rotate-y-180 border-indigo-200 bg-white'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  {/* FRONT FACE (Prompt / Question) */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between backface-hidden rounded-2xl">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-indigo-600 tracking-wide uppercase text-[11px]">
                        {currentCard.concept}
                      </span>
                      <span className="font-mono text-slate-400">
                        {currentIndex + 1} of {cards.length}
                      </span>
                    </div>

                    <div className="my-auto text-center px-4">
                      <h4 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                        {currentCard.question}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-[11px]">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Click card or press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono">Space</kbd> to flip
                      </span>
                      <span className="text-indigo-600 font-medium">Click to Reveal Answer &rarr;</span>
                    </div>
                  </div>

                  {/* BACK FACE (Answer) */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between backface-hidden rotate-y-180 rounded-2xl bg-indigo-50/40">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-emerald-700 tracking-wide uppercase text-[11px]">
                        Answer &middot; {currentCard.concept}
                      </span>
                      {currentCard.isInferenced && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
                          <Info className="w-3 h-3" /> Conceptual Inference
                        </span>
                      )}
                    </div>

                    <div className="my-auto px-4 text-center">
                      <p className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed">
                        {currentCard.answer}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-indigo-100 text-xs text-slate-400">
                      <span className="text-slate-500">Click to flip back</span>
                      <span className="font-mono">{currentIndex + 1} / {cards.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs font-medium text-slate-500">
                  Use <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono">&larr;</kbd> and <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-mono">&rarr;</kbd> to navigate
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === cards.length - 1}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next Card</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Grid View Mode */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-indigo-300 transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-600 uppercase text-[11px]">
                      {card.concept}
                    </span>
                    <span className="font-mono text-slate-400">Card {idx + 1}</span>
                  </div>

                  <div>
                    <h5 className="text-sm font-bold text-slate-900 mb-1">{card.question}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {card.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
