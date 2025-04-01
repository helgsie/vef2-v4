export type UiState = 'initial' | 'loading' | 'error' | 'data' | 'empty';

export type Category = {
  id: string;
  slug: string;
  name: string;
  questions: Question[];
};

export type Paginated<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};

export type Answer = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  questionText: string;
  answers: Answer[];
  category: Category;
};