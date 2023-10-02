import React, { useState, useEffect,  } from "react";
import Header from '../Header/Header';
import "./NumberGame.css"; 

const NumberGame = () => {
  const generateQuestions = () => {
    const numberOfQuestions = 5; // Specify the number of questions you want
    const minNumber = 1;
    const maxNumber = 20;
    const questions = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const num1 =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      
      const correctNumber = num1 ;

      const question = `Identify the Number ${num1} `;
      const numbers = [
        correctNumber,
        correctNumber + 2,
        correctNumber + 1,
        correctNumber + 3,
        correctNumber + 4,
        correctNumber -1 ,
      ].sort(() => Math.random() - 0.5);

      questions.push({
        question,
        numbers,
        correctNumber,
      });
    }

    return questions;
  };

  const [questions, setQuestions] = useState(generateQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(null);
  const [showGoodMessage, setShowGoodMessage] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0); 
  const [volume, setVolume] = useState(0.1); 
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const handleNumberClick = (numberIndex) => {

    const currentQuestion = questions[currentQuestionIndex];
     const isCorrect = numberIndex === currentQuestion.numbers.indexOf(currentQuestion.correctNumber);
    if (isCorrect) {
     setShowGoodMessage(true);
     setSelectedNumberIndex(numberIndex);
     setIsCorrectAnswer(isCorrect);
       setCorrectAnswerCount(correctAnswerCount + 1); // Set to true for correct answer
    } else {
      setShowGoodMessage(true);
      setSelectedNumberIndex(numberIndex);
      setIsCorrectAnswer(false); // Set to false for incorrect answer
    }
  };
// Volume comntrol function
const handleVolumeChange = (event) => {
  const newVolume = parseFloat(event.target.value);
  setVolume(newVolume); // Update the state
  isMuted.volume = newVolume; // Update the audio's volume
};
 useEffect(
   () => {
     if (showGoodMessage) {
       const audio = new Audio();
       audio.src = isCorrectAnswer ? ("/Congrats.wav") :("/Sorry.wrong.wav");
       audio.play();

       setTimeout(() => {
         setShowGoodMessage(false);
         setSelectedNumberIndex(null);

         if (isCorrectAnswer) {
           const nextQuestionIndex =
             (currentQuestionIndex + 1) % questions.length;
           setCurrentQuestionIndex(nextQuestionIndex);
         }
         setIsCorrectAnswer(false); // Reset the isCorrectAnswer state for the new question
       }, 1500); // Adjust the delay as needed
     }

    const audio = new Audio("/FastFeelBananaPeel-320bit.mp3");
    console.log(audio)

    audio.loop = true;
    audio.volume = volume;
       setIsMuted(audio);
    const handleCanPlayThrough = () => {
      setIsAudioLoaded(true);
      audio.play();
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
    };

   },
   [showGoodMessage, currentQuestionIndex, isCorrectAnswer, questions],
   [volume]
 );

  const currentQuestion = questions[currentQuestionIndex];
  const numbers = currentQuestion.numbers;

  return (
     <div className="background-image"> 
     <Header />  
    <div className="number-game">
      {isAudioLoaded && (
        <>
          <fieldset>
            <legend>Volume</legend>
            <label
              orient="270deg"
              type="range"
              for="band"
              before="-5"
              after="5"
            >   
            </label>
            <input className="input-part1"
              orient="270deg"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
            <label orient="90deg" type="range" for="band" before="5" after="-5">  </label>
          </fieldset>

          <div className="correct-answer-count">
            <p className="count-text">Correct Answers</p>
            <p className="count-value">{correctAnswerCount}</p>
          </div>
          <div className="game-content">
            <div className="question">
              <p className="question-text">{currentQuestion.question}</p>
            </div>
            <div className="number-container">
              {numbers.map((number, index) => (
                <div
                  key={index}
                  className={`number ${
                    selectedNumberIndex === index
                      ? isCorrectAnswer
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() =>
                    isCorrectAnswer ? null : handleNumberClick(index)
                  }
                >
                  {number}
                </div>
              ))}
            </div>
            {showGoodMessage && (
              <div
                className={`message ${
                  selectedNumberIndex ===
                  currentQuestion.numbers.indexOf(currentQuestion.correctNumber)
                    ? "correct"
                    : "wrong"
                }`}
              >
                {selectedNumberIndex ===
                currentQuestion.numbers.indexOf(currentQuestion.correctNumber)
                  ? "Good!"
                  : "Wrong! Try Again."}
              </div>
            )}
          </div>
        </>
       
      )}
    </div>
    </div>
  );
};

export default NumberGame;
