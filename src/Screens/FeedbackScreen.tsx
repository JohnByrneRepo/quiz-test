import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../App";

function QuizScreen() {
  const { incorrectQuestions } = useContext(QuizContext);
  const navigate = useNavigate();

  const homePage = () => {
    navigate("/");
  }

  useEffect(() => {
    console.log('incorrect answers');
    console.log(incorrectQuestions);

  }, [])

  return (
    <div className="container">
      <div>
        <h1>Results</h1>
        <div>Your incorrect answer total was: {incorrectQuestions.length}</div>
        <button className="button" onClick={homePage}>Try again</button>
      </div>
    </div>
  );
}

export default QuizScreen;
