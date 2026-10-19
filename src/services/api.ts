import type {
  SummaryRequest,
  SummaryResponse,
  FlashcardRequest,
  FlashcardResponse,
  QuizRequest,
  QuizResponse,
  TopicExplainRequest,
  TopicExplainResponse,
  ApiErrorResponse,
} from '../types/index.ts';

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    if (contentType.includes('application/json')) {
      try {
        const errorData: ApiErrorResponse = await res.json();
        throw new Error(errorData.error || `Request failed with status ${res.status}`);
      } catch (err: any) {
        if (err.message && !err.message.includes('JSON')) {
          throw err;
        }
      }
    }

    // Handled non-JSON error pages (e.g. 503, 502, 504 from network or cloud proxies)
    if (res.status === 503) {
      throw new Error('The AI model is currently experiencing high demand. Please click "Try Again" in a moment.');
    } else if (res.status === 429) {
      throw new Error('Free usage quota is temporarily busy. Please wait 30 seconds and try again.');
    } else if (res.status === 504) {
      throw new Error('Request timed out. Please try with a slightly shorter excerpt of notes.');
    } else {
      throw new Error(`Server returned status ${res.status}. Please click "Try Again".`);
    }
  }

  // If res.ok is true but content is HTML (e.g. misconfigured SPA fallback)
  if (!contentType.includes('application/json')) {
    throw new Error('Unexpected response format. Please refresh the page and try again.');
  }

  try {
    return (await res.json()) as T;
  } catch {
    throw new Error('Failed to parse response data. Please try again.');
  }
}

export const apiService = {
  async summarize(payload: SummaryRequest): Promise<SummaryResponse> {
    const res = await fetch('/api/study/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<SummaryResponse>(res);
  },

  async generateFlashcards(payload: FlashcardRequest): Promise<FlashcardResponse> {
    const res = await fetch('/api/study/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<FlashcardResponse>(res);
  },

  async generateQuiz(payload: QuizRequest): Promise<QuizResponse> {
    const res = await fetch('/api/study/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<QuizResponse>(res);
  },

  async explainTopic(payload: TopicExplainRequest): Promise<TopicExplainResponse> {
    const res = await fetch('/api/study/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse<TopicExplainResponse>(res);
  },

  async getHealth(): Promise<{ status: string; model: string }> {
    const res = await fetch('/api/health');
    return handleResponse<{ status: string; model: string }>(res);
  },
};
