import React from 'react';
import { initializeApp } from "firebase/app";
import { useContext, useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import { QuizContext } from '../App';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyB48rLcSLm1JyqMvO8QrXcJY4K8PD-UXCQ",
  authDomain: "quiz-test-7f733.firebaseapp.com",
  projectId: "quiz-test-7f733",
  storageBucket: "quiz-test-7f733.appspot.com",
  messagingSenderId: "424598213858",
  appId: "1:424598213858:web:296a4f9c3d93e6ffac7abb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getQuestions(db: Firestore) {
  const questionsCol = collection(db, 'questions');
  const questionSnapshot = await getDocs(questionsCol);
  const questionList = questionSnapshot.docs.map(doc => doc.data() as Object);
  return questionList[0];
}

async function getAnswers(db: Firestore) {
  const answersCol = collection(db, 'answers');
  const answerSnapshot = await getDocs(answersCol);
  const answerList = answerSnapshot.docs.map(doc => doc.data() as Object);
  return answerList[0];
}

function QuizScreen() {
  const { setIncorrectQuestions } = useContext(QuizContext);
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const [selections, setSelections] = useState([-1, -1, -1]);
  const [correctAnswerTotal, setCorrectAnswerTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const questions = await getQuestions(db);
      const answers = await getAnswers(db);
      setQuestions(questions);
      setAnswers(answers);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(selections);
  }, [selections]);

  const handlePress = async (questionIndex: number, selectionIndex: number) => {
    const selectedAnswers = { ...selections };
    selectedAnswers[questionIndex] = selectionIndex;
    await setSelections(selectedAnswers);
  }

  const submitAnswers = async () => {
    let correctAnswerTotal = 0;
    let wrongQuestions: string[] = [];
    Object.keys(answers).forEach((a, i) => {
      // @ts-ignore
      const correctAnswerIndex: any = answers[i];
      if (selections[i] === correctAnswerIndex) {
        correctAnswerTotal++;
      } else {
        wrongQuestions.push(Object.keys(answers)[i]);
      }
    });
    await setIncorrectQuestions(wrongQuestions);
    await setCorrectAnswerTotal(correctAnswerTotal);
    navigate("/feedback");
  }

  const getQuestion = (questions: any, question: any, index: number) => {
    return questions[question][index];
  }

  return (
    <div className="container">
      <div>
        {Object.keys(questions).map((k, idx) =>
          <div key={idx}>
            <div>
              <h2>{k}</h2>
            </div>
            <div>
              <form>
                <div>
                  <input className="input" checked={selections[idx] === 0} type="checkbox" value="0" id="0"
                    onChange={() => handlePress(idx, 0)} name="0" />
                    <label >{getQuestion(questions, k, 0)}</label>
                  </div>
                  <div>
                  <input className="input" checked={selections[idx] === 1} type="checkbox" value="1" id="1"
                    onChange={() => handlePress(idx, 1)} name="1" />
                  <label >{getQuestion(questions, k, 1)}</label>
                </div>
                <div>
                  <input className="input" checked={selections[idx] === 2} type="checkbox" value="2" id="2"
                    onChange={() => handlePress(idx, 2)} name="2" />
                  <label >{getQuestion(questions, k, 2)}</label>
                </div>
              </form>
            </div>
          </div>
        )}
        <button className="button" onClick={submitAnswers}>Submit answers</button>
      </div>
    </div>
  );
}

export default QuizScreen;
