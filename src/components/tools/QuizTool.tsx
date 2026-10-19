import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  RotateCcw,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { apiService } from '../../services/api.ts';
import { SAMPLE_TEXTS, PREBUILT_QUIZZES } from '../../utils/sampleData.ts';
import type {
  QuizRequest,
  QuizResponse,
  QuizQuestion,
  QuizDifficulty,
  QuizQuestionType,
} from '../../types/index.ts';

const MAX_CHARS = 15000;

export const QuizTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [count, setCount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('medium');
  const [questionType, setQuestionType] = useState<QuizQuestionType>('multiple_choice');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuizResponse | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Interactive Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ selectedIndex: number; isCorrect: boolean }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('Please paste study notes to generate practice quiz questions.');
      return;
    }

    if (inputText.length > MAX_CHARS) {
      setError(`Notes exceed maximum character limit of ${MAX_CHARS.toLocaleString()}. Please shorten.`);
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setQuizFinished(false);

    try {
      const payload: QuizRequest = {
        text: inputText,
        count,
        difficulty,
        questionType,
      };
      const response = await apiService.generateQuiz(payload);
      setResult(response);
      setQuestions(response.questions);
    } catch (err: any) {
      setError(err?.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || !currentQ) return;
    const isCorrect = selectedOptionIndex === currentQ.correctIndex;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => [...prev, { selectedIndex: selectedOptionIndex, isCorrect }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setQuizFinished(false);
  };

  const loadSample = (key: keyof typeof SAMPLE_TEXTS) => {
    setInputText(SAMPLE_TEXTS[key]);
    setError(null);
  };

  const loadPrebuiltQuiz = (subject: 'biology' | 'history' | 'physics') => {
    const prebuilt = PREBUILT_QUIZZES[subject];
    if (prebuilt) {
      setInputText(SAMPLE_TEXTS[subject]);
      setResult(prebuilt);
      setQuestions(prebuilt.questions);
      setCurrentQuestionIndex(0);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setUserAnswers([]);
      setQuizFinished(false);
      setError(null);
    }
  };

  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="w-full space-y-8">
      {/* Quiz Input Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Practice Quiz Maker</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate exam-style multiple-choice or true/false questions with instant verification and explanations.
              </p>
            </div>
          </div>

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
              Questions Count
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
              {[3, 5, 8].map((num) => (
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
                  {num} Qs
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
              {(['easy', 'medium', 'hard'] as QuizDifficulty[]).map((d) => (
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
              Question Style
            </label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
              {(
                [
                  { id: 'multiple_choice', label: 'Multiple Choice' },
                  { id: 'true_false', label: 'True / False' },
                ] as { id: QuizQuestionType; label: string }[]
              ).map((qt) => (
                <button
                  key={qt.id}
                  type="button"
                  onClick={() => setQuestionType(qt.id)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-all ${
                    questionType === qt.id
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {qt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="mt-5">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your lecture notes, textbook reading, or study summary..."
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
                    <span>Creating Quiz...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Practice Quiz</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

            {/* Instant Sample Fallback while upstream recovers */}
            <div className="pt-2 border-t border-red-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-red-800">
              <span className="font-medium">
                Want to test the quiz format immediately while the AI model clears?
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => loadPrebuiltQuiz('biology')}
                  className="rounded-md bg-white border border-red-200 px-2.5 py-1 text-slate-800 hover:bg-slate-50 font-medium"
                >
                  Load Biology Quiz
                </button>
                <button
                  type="button"
                  onClick={() => loadPrebuiltQuiz('history')}
                  className="rounded-md bg-white border border-red-200 px-2.5 py-1 text-slate-800 hover:bg-slate-50 font-medium"
                >
                  Load History Quiz
                </button>
                <button
                  type="button"
                  onClick={() => loadPrebuiltQuiz('physics')}
                  className="rounded-md bg-white border border-red-200 px-2.5 py-1 text-slate-800 hover:bg-slate-50 font-medium"
                >
                  Load Physics Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Quiz Experience */}
      {questions.length > 0 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {!quizFinished ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
                <div>
                  <span className="font-semibold text-indigo-600 uppercase text-[11px] tracking-wide">
                    {result?.topic || 'Practice Quiz'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h3>
                </div>

                <div className="font-mono text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  Score: {correctCount} / {userAnswers.length}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Prompt */}
              <div>
                <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  {currentQ.question}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  const isCorrectAnswer = idx === currentQ.correctIndex;
                  let optionStyles = 'border-slate-200 bg-white hover:border-indigo-300 text-slate-800';

                  if (isAnswerSubmitted) {
                    if (isCorrectAnswer) {
                      optionStyles = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium';
                    } else if (isSelected && !isCorrectAnswer) {
                      optionStyles = 'border-red-400 bg-red-50 text-red-950';
                    } else {
                      optionStyles = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyles = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium shadow-xs';
                  }

                  const optionLetter = String.fromCharCode(65 + idx);

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => setSelectedOptionIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${optionStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold font-mono transition-colors ${
                            isAnswerSubmitted
                              ? isCorrectAnswer
                                ? 'bg-emerald-600 text-white'
                                : isSelected
                                ? 'bg-red-500 text-white'
                                : 'bg-slate-200 text-slate-600'
                              : isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {optionLetter}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>

                      {isAnswerSubmitted && (
                        <div>
                          {isCorrectAnswer && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Correct</span>
                            </span>
                          )}
                          {isSelected && !isCorrectAnswer && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700">
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span>Incorrect</span>
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isAnswerSubmitted && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-indigo-900">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Explanation & Core Concept</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Question Action Controls */}
              <div className="flex items-center justify-end pt-3">
                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    onClick={handleSubmitAnswer}
                    disabled={selectedOptionIndex === null}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <span>Check Answer</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
                  >
                    <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Scoreboard */
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Award className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">Quiz Completed!</h3>
                <p className="text-xs text-slate-500">
                  Topic: {result?.topic || 'Practice Test'}
                </p>
              </div>

              <div className="mx-auto max-w-xs rounded-xl bg-slate-50 p-6 border border-slate-100">
                <div className="text-4xl font-extrabold text-indigo-600 font-mono">
                  {scorePercent}%
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  {correctCount} out of {questions.length} questions answered correctly
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  {scorePercent >= 80
                    ? 'Excellent mastery! You have strong conceptual retention.'
                    : scorePercent >= 60
                    ? 'Good progress. Review missed concepts with the summary tool.'
                    : 'Keep revising! Active retrieval reinforces long-term memory.'}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Retake This Quiz</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate New Questions</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
