export type Quiz = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  reason: string | null;
};

export type QuizResponse =
  | {
      prev: boolean;
      next: boolean;
      page: string;
      quiz: Quiz;
      total: number;
    }
  | Quiz;

export type SavedAnswer = {
  [key: string]: string;
};
