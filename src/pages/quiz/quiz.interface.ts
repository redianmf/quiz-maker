export interface IQuiz {
  id?: number;
  title: string;
  description: string;
  timeLimitSeconds: number;
  isPublished: boolean;
  createdAt?: string;
}
