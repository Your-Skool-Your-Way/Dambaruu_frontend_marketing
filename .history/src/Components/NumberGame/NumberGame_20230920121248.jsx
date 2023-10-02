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
    
    </div>
  );
};

export default NumberGame;
