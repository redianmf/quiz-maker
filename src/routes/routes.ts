import type { JSX } from "react";
import Home from "@/pages/home/home.component";
import Quiz from "@/pages/quiz/quiz.component";
import Test from "@/pages/test/test.component";
import QuizDetails from "@/pages/quiz/quiz-details/details.component";

interface IRoute {
  path: string;
  text: string;
  element: () => JSX.Element;
  showMenu: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/",
    text: "Home",
    element: Home,
    showMenu: false,
  },
  {
    path: "/quiz",
    text: "Quiz",
    element: Quiz,
    showMenu: true,
  },
  {
    path: "/quiz/details/:id",
    text: "Quiz Details",
    element: QuizDetails,
    showMenu: false,
  },
  {
    path: "/take-test",
    text: "Take Test",
    element: Test,
    showMenu: true,
  },
];
