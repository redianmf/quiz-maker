import type { JSX } from "react";
import Home from "@/pages/home/home.component";
import Quiz from "@/pages/quiz/quiz.component";
import Test from "@/pages/test/test.component";

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
    path: "/take-test",
    text: "Take Test",
    element: Test,
    showMenu: true,
  },
];
