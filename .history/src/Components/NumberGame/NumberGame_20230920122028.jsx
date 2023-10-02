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