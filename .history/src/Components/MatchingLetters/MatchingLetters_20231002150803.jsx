import React, { useState, useEffect, useRef } from 'react'
import correctimg from "../../Asset/images/download-removebg-preview.png";
import wrongimg from "../../Asset/images/download_1-removebg-preview.png";
import welldoneimg from "../../Asset/images/welldone1-removebg-preview.png"
import Header from '../Header/Header';
// import correctsound from "./Correct Answer.wav";
// import wrongsound from "./Sorry.wrong.wav";
import "./MatchingLetters.css"

const MatchingLetters = ({}) => {
    const canvasRef = useRef(null);
    const dotData   = [
     [ { x: 70, y: 90, column: 'left',value:"a" },   // Dot 1
      { x: 145, y: 90, column: 'right',value:"c"},    // Dot 2
      { x: 70, y: 215, column: 'left',value:"b"},   // Dot 3
      { x: 145, y: 215, column: 'right',value:"d"},   // Dot 4
      { x: 70, y: 340, column: 'left',value:"c"},   // Dot 5
      { x: 145, y: 340, column: 'right',value:"b"},   // Dot 6
      { x: 70, y: 470, column: 'left',value:"d"},   // Dot 7
      { x: 145, y: 470, column: 'right',value:"a"},   // Dot 8
     ],
      [ { x: 70, y: 90, column: 'left',value:"e" },   // Dot 1
      { x: 145, y: 90, column: 'right',value:"g"},    // Dot 2
      { x: 70, y: 215, column: 'left',value:"f"},   // Dot 3
      { x: 145, y: 215, column: 'right',value:"h"},   // Dot 4
      { x: 70, y: 340, column: 'left',value:"g"},   // Dot 5
      { x: 145, y: 340, column: 'right',value:"e"},   // Dot 6
      { x: 70, y: 470, column: 'left',value:"h"},   // Dot 7
      { x: 145, y: 470, column: 'right',value:"f"},
      ],
      [ { x: 70, y: 90, column: 'left',value:"i"},   // Dot 1
      { x: 145, y: 90, column: 'right',value:"j"},    // Dot 2
      { x: 70, y: 215, column: 'left',value:"j"},   // Dot 3
      { x: 145, y: 215, column: 'right',value:"i"},   // Dot 4
      { x: 70, y: 340, column: 'left',value:"k"},   // Dot 5
      { x: 145, y: 340, column: 'right',value:"l"},   // Dot 6
      { x: 70, y: 470, column: 'left',value:"l"},   // Dot 7
      { x: 145, y: 470, column: 'right',value:"k"},
      ],
      [ { x: 70, y: 90, column: 'left',value:"m" },   // Dot 1
      { x: 145, y: 90, column: 'right',value:"o"},    // Dot 2
      { x: 70, y: 215, column: 'left',value:"n"},   // Dot 3
      { x: 145, y: 215, column: 'right',value:"p"},   // Dot 4
      { x: 70, y: 340, column: 'left',value:"o"},   // Dot 5
      { x: 145, y: 340, column: 'right',value:"m"},   // Dot 6
      { x: 70, y: 470, column: 'left',value:"p"},   // Dot 7
      { x: 145, y: 470, column: 'right',value:"n"},
      ],
      [ { x: 70, y: 90, column: 'left',value:"q" },   // Dot 1
      { x: 145, y: 90, column: 'right',value:"s"},    // Dot 2
      { x: 70, y: 215, column: 'left',value:"r"},   // Dot 3
      { x: 145, y: 215, column: 'right',value:"t"},   // Dot 4
      { x: 70, y: 340, column: 'left',value:"s"},   // Dot 5
      { x: 145, y: 340, column: 'right',value:"q"},   // Dot 6
      { x: 70, y: 470, column: 'left',value:"t"},   // Dot 7
      { x: 145, y: 470, column: 'right',value:"r"},
      ],
      [ { x: 70, y: 90, column: 'left',value:"u" },   // Dot 1
      { x: 145, y: 90, column: 'right',value:"w"},    // Dot 2
      { x: 70, y: 215, column: 'left',value:"v"},   // Dot 3
      { x: 145, y: 215, column: 'right',value:"u"},   // Dot 4
      { x: 70, y: 340, column: 'left',value:"w"},   // Dot 5
      { x: 145, y: 340, column: 'right',value:"x"},   // Dot 6
      { x: 70, y: 470, column: 'left',value:"x"},   // Dot 7
      { x: 145, y: 470, column: 'right',value:"v"},
      ],
      [ { x: 70, y: 90, column: 'left',value:"y" },   // Dot 1
      { x: 145, y: 90, column: 'right',value:"z"},    // Dot 2
      { x: 70, y: 215, column: 'left',value:"z"},   // Dot 3
      { x: 145, y: 215, column: 'right',value:"b"},   // Dot 4
      { x: 70, y: 340, column: 'left',value:"a"},   // Dot 5
      { x: 145, y: 340, column: 'right',value:"y"},   // Dot 6
      { x: 70, y: 470, column: 'left',value:"b"},   // Dot 7
      { x: 145, y: 470, column: 'right',value:"a"},
      ],
    ];
    const capitalLetters = [
      ['A', 'B', 'C', 'D'],
      ['E', 'F', 'G', 'H'],
      ['I', 'J', 'K', 'L'],
      ['M', 'N', 'O', 'P'],
      ['Q', 'R', 'S', 'T'],
      ['U', 'V', 'W', 'X'],
      ['Y', 'Z', 'A', 'B'],
    ];
    const smallLetters = [
      ['c', 'd', 'b', 'a'],
      ['g', 'h', 'e', 'f'],
      ['j', 'i', 'l', 'k'],
      ['o', 'p', 'm', 'n'],
      ['s', 't', 'q', 'r'],
      ['w', 'u', 'x', 'v'],
      ['z', 'b', 'y', 'a'],
    ];

    const [currentLine, setCurrentLine] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lines, setLines] = useState([]);
    const [message, setMessage] = useState('');
    const [matches, setMatches] = useState(Array(13).fill(false));
    const [selectedPair, setSelectedPair] = useState(null);
    const [correctMatches, setCorrectMatches] = useState(0); 
    const [correctMatchesInSet, setCorrectMatchesInSet] = useState(0);
    const [currentSet, setCurrentSet] = useState(0);
    const [currentDot,setCurrentDot] = useState(0);
    const [count, setCount] = useState(0); 
    const [tempLine, setTempLine] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.1);
   // console.log(volume)
    const [isAudioLoaded, setIsAudioLoaded] = useState(true);
    //console.log(isAudioLoaded)
    const correctAudio = new Audio("/Correct Answer.wav");
    const incorrectAudio = new Audio("/Sorry.Wrong.wav");
    const isCapitalA = (letter) => letter === 'A';

     // Volume comntrol function
    const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume); // Update the state
    isMuted.volume = newVolume; // Update the audio's volume
  };
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');// Draw dots at the specified points
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#194792';
        dotData[currentSet].forEach((dot) => {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 10, 0, 20 * Math.PI);
          ctx.fill();
          // ctx.stroke();
        });
        if (isDrawing && tempLine) {
          ctx.beginPath();
          ctx.moveTo(tempLine.start.x, tempLine.start.y);
          ctx.lineTo(tempLine.end.x, tempLine.end.y);
          ctx.strokeStyle = '#CB5B9F';
          ctx.lineWidth = 5;
          ctx.stroke();
        }
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.strokeStyle = '#CB5B9F';
        ctx.lineWidth = 5;
        ctx.globalCompositeOperation = line.zIndex > 0 ? 'source-over' : 'destination-over';
        ctx.stroke();
      });
      ctx.globalCompositeOperation = 'source-over';

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
    }, [lines,isDrawing,tempLine],[volume]);
  
    const handleMouseDown = (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const clickedDot = dotData[currentSet].find((dot) => {
        const distance = Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2);
        return distance <= 10; // Check if the click is within the dot's radius
      });

      if (clickedDot) {
        handleDotClick(clickedDot);// Handle dot click here
        
      if (!currentLine) {
          setCurrentLine({ start: clickedDot, end: { x, y } });
          setIsDrawing(true);
        }
      }
    };
    const handleDotClick = (clickedDot) => {
      setSelectedPair(clickedDot); // Set the entire clickedDot object
    };
    const handleDotDrop = (end, selectedDot) => {
      const droppedDotRight = dotData[currentSet].find((dot) => {
        const distance = Math.sqrt(
          (end.x - dot.x) ** 2 + (end.y - dot.y) ** 2
        );
        return distance <= 10; // Check if the drop is within the dot's radius
      });
    
      if (selectedDot && selectedDot.column === 'left' && droppedDotRight &&
       droppedDotRight.column === 'right' && selectedDot.value === droppedDotRight.value || selectedDot && selectedDot.column === 'right' && droppedDotRight &&
       droppedDotRight.column === 'left' && selectedDot.value === droppedDotRight.value ) {
        setMessage('Correct match');
        correctAudio.play();
        setTimeout(() => {
          setMessage(''); // Remove success message after 2 seconds
        }, 1000);
        setCount((prevCount) => prevCount + 100);
        setCorrectMatchesInSet((prevCount) => prevCount + 1); // Increment correctMatchesInSet
        
        setSelectedPair(null); // Reset the selected pair
    
        if (correctMatchesInSet === 3) {
          // All 4 pairs matched correctly in the current set
          handleCompleteSet();
        }
      } else {
        setMessage('Incorrect match');
        incorrectAudio.play();
        // setCount((prevCount) => prevCount - 50);
        setTimeout(() => {
          setMessage(''); // Remove success message after 2 seconds
        }, 1000); // Perform any other actions for an incorrect match
        clearLines();
        setSelectedPair(null); // Reset the selected pair
      }
    };
    
    const clearLines = () => {
      setLines([]); // Clear the lines by setting an empty array
    };
  
    const handleCompleteSet = () => {
  if (correctMatchesInSet === 3) {
    // Clear the canvas
    setCurrentSet((prevSet) => prevSet + 1);
    setLines([]);
    setCurrentDot(0);
    setCorrectMatches(0); // Reset correctMatches
    setCorrectMatchesInSet(0); // Reset correctMatchesInSet
    setMessage('WELL DONE!');
   // console.log("WELL DONE!") // Display success message
    setTimeout(() => {
      setMessage(''); // Remove success message after 2 seconds
    }, 2000);
    clearCanvas();
  }
};
const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

    const handleMouseMove = (e) => {
      if (isDrawing && currentLine) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCurrentLine({ ...currentLine, end: { x, y } });
        setTempLine({ start: selectedPair, end: { x, y } });
      }
    };
  
    const handleMouseUp = () => {
      if (isDrawing && currentLine && currentLine.end) {
        const zIndex = currentLine.start.position === 'front' ? 1 : -1;
        const updatedLine = {
          ...currentLine,
          zIndex,
        };
        setLines([...lines, updatedLine]);
        setCurrentLine(null);
        setIsDrawing(false);
        // Pass the selectedDot to handleDotDrop
        handleDotDrop(currentLine.end, selectedPair);
      }
    };
    
  return (
   <div className="App">
   <Header />
   
    <>
     
     <div className="count">
     <h1>Capital & SmallLetters Matching <br/>SCORE: {count}</h1>
    </div>
        {currentSet < 13 ? (
          <div className="set">
          <div className="column">
              {capitalLetters[currentSet].map((letter, index) => (
                <div
                  key={index}
                  className="letter"
                > {letter}</div>
                ))}
            </div>
            <canvas
          ref={canvasRef}
          width={190}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{marginTop:'-3.5rem',marginLeft:'-2rem'}}
        >
        </canvas>
            <div className="column1">
              {smallLetters[currentSet].map((letter, index) => (
                <div
                  key={index}
                  className={`letter1 ${isCapitalA(letter) ? 'capital' : ''}`}
                >
                  {letter.toLowerCase()}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="completed-message">All sets completed!</div>
        )}
        <div className='msg'> {message === 'Correct match' && <img src={correctimg} alt="Correct" />}
        {message === 'Incorrect match' && <img src={wrongimg} alt="Wrong" />}
        {message === 'WELL DONE!' && <img src={welldoneimg} alt="WELL DONE!" />}
        </div>
        </>
     ) }
    </div>
    )
  };
  export default MatchingLetters;