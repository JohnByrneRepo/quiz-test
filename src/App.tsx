import React, { createContext, useState } from 'react';
import MainMenuScreen from './Screens/MainMenuScreen';
import QuizScreen from './Screens/QuizScreen';
import FeedbackScreen from './Screens/FeedbackScreen';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

export const QuizContext = createContext({
  incorrectQuestions: [''],
  setIncorrectQuestions: (questions: string[]) => { }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainMenuScreen />
  },
  {
    path: "/quiz",
    element: <QuizScreen />
  },
  {
    path: "/feedback",
    element: <FeedbackScreen />
  },
]);

export default function App() {
  const [incorrectQuestions, setIncorrectQuestions] = useState<string[]>(['']);
  return (
    <React.StrictMode>
      <QuizContext.Provider value={{ incorrectQuestions, setIncorrectQuestions }}>
        <RouterProvider router={router} />
      </QuizContext.Provider>
    </React.StrictMode>
  );
}