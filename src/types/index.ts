/**
 * StudySpark AI - Shared Data Contracts & Types
 */

export type ToolType = 'summarizer' | 'flashcards' | 'quiz' | 'explainer';

export type SummaryLength = 'short' | 'medium' | 'detailed';
export type SummaryFormat = 'bullets' | 'structured' | 'paragraph';
export type ReadingLevel = 'beginner' | 'standard';

export interface SummaryRequest {
  text: string;
  length?: SummaryLength;
  format?: SummaryFormat;
  readingLevel?: ReadingLevel;
}

export interface SummaryResponse {
  summary: string;
  keyPoints: string[];
  keyDefinitions: { term: string; definition: string }[];
  sourceCharCount: number;
  summaryCharCount: number;
  readingTimeSavedMin: number;
  confidenceNote: string;
}

export type FlashcardDifficulty = 'easy' | 'medium' | 'hard';
export type FlashcardStyle = 'definition' | 'qa' | 'mixed';

export interface FlashcardRequest {
  text: string;
  count?: number;
  difficulty?: FlashcardDifficulty;
  style?: FlashcardStyle;
}

export interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
  concept: string;
  isInferenced?: boolean;
}

export interface FlashcardResponse {
  topic: string;
  cards: FlashcardItem[];
}

export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type QuizQuestionType = 'multiple_choice' | 'true_false';

export interface QuizRequest {
  text: string;
  count?: number;
  difficulty?: QuizDifficulty;
  questionType?: QuizQuestionType;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResponse {
  topic: string;
  questions: QuizQuestion[];
}

export type ExplainLevel = 'beginner' | 'intermediate' | 'advanced';
export type ExplainStyle = 'simple' | 'worked_example' | 'step_by_step';

export interface TopicExplainRequest {
  topic: string;
  level?: ExplainLevel;
  style?: ExplainStyle;
}

export interface KeyConceptBlock {
  title: string;
  explanation: string;
}

export interface TopicExplainResponse {
  title: string;
  overview: string;
  keyConcepts: KeyConceptBlock[];
  practicalExample: string;
  stepByStep?: string[];
  commonPitfalls: string[];
  keyTakeaway: string;
}

export interface ApiErrorResponse {
  error: string;
  code: 'INVALID_INPUT' | 'RATE_LIMITED' | 'KILL_SWITCH_ACTIVE' | 'TIMEOUT' | 'MODEL_ERROR' | 'INVALID_RESPONSE';
  details?: string;
}

export interface RateLimitStatus {
  remaining: number;
  limit: number;
  resetInSeconds: number;
}
