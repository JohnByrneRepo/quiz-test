import { useNavigate } from "react-router-dom";
import "../main.css";

function MainMenuScreen() {
  const navigate = useNavigate();

  const quizPage = () => {
    navigate("/quiz");
  }

  return (
    <div className="container">
      <h4>Welcome</h4>
      <button className="button" onClick={quizPage}>Start Quiz</button>
    </div>
  );
}

export default MainMenuScreen;
