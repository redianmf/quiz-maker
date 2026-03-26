export interface IQuiz {
  id?: number;
  title: string;
  description: string;
  timeLimitSeconds?: number;
  isPublished?: boolean;
  createdAt?: string;
}

export interface IQuestion {
  id?: number;
  quizId?: number;
  prompt: string;
  type: "mcq" | "short";
  options?: string[];
  correctAnswer: string;
  position?: number;
}

export interface IQuizDetails extends IQuiz {
  questions: IQuestion[];
}
