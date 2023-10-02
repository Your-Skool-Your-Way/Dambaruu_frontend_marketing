import React, { useState, useEffect, useRef } from "react";
import "./MissingNumbers.css";
import Header from '../Header/Header';
import backgroundVideo from '../../Asset/images/gif_09-26-23.gif';
import backgroundImg from '../../Asset/';

function MissingNumbers() {
  const numSets = 10;
  const completeSeries = Array.from({ length: 100 }, (_, i) => i + 1);
  const [incompleteSeries, setIncompleteSeries] = useState(
    generateIncompleteSeries(completeSeries, numSets, 1)
  );
  const [message, setMessage] = useState("");
  const [currentSet, setCurrentSet] = useState(1);
  const [playGIF, setPlayGIF] = useState(true);
  const [gifPlaybackCompleted, setGIFPlaybackCompleted] = useState(false);
  const incompleteSeriesRef = useRef(incompleteSeries); // Create a ref to store the original incomplete series
  const [volume, setVolume] = useState(0.5);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
// Create an Audio object

  // Volume comntrol function
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume); // Update the state
    isMuted.volume = newVolume; // Update the audio's volume
  };

  useEffect(() => {
    // Play GIF for 3 seconds
    const gifTimeoutId = setTimeout(() => {
      setPlayGIF(false);
      setGIFPlaybackCompleted(true); // Mark GIF playback as completed
    }, 4000);

    const audio = new Audio("/village-15345.mp3");

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

    return () => clearTimeout(gifTimeoutId);

  }, [volume],[]);

  const resetSeries = () => {
    // Increment the current set
    setCurrentSet(currentSet + 10);

    if (currentSet + numSets <= completeSeries.length) {
      // Generate a new incomplete series for the next set
      setIncompleteSeries(generateIncompleteSeries(completeSeries, numSets, currentSet + 10));
      incompleteSeriesRef.current = generateIncompleteSeries(completeSeries, numSets, currentSet + 10); // Update the ref
    } else {
      // If all sets are completed, reset to the first set
      setCurrentSet(1);
      setIncompleteSeries(generateIncompleteSeries(completeSeries, numSets, 1));
      incompleteSeriesRef.current = generateIncompleteSeries(completeSeries, numSets, 1); // Update the ref
    }

    setMessage("");
  };
  //  generate random color function
  // function getRandomColor() {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }
  // Generate a random color when the component first loads

  useEffect(() => {
    if (!incompleteSeries.includes(null)) {
      // Check if all blank spaces are filled
      const isComplete = incompleteSeries.every(
        (value, index) => value === completeSeries[index + currentSet - 1]
      );

      if (isComplete) {
        setMessage(  `Correct! You completed Set`);
        setTimeout(resetSeries, 1500); // Reset after a delay
      } else {
        setMessage("Wrong series. Please correct it.");
        setTimeout(() => {
          setMessage(''); // Remove success message after 2 seconds
        }, 1500);
        // Set the incomplete series back to the original using the ref
        setIncompleteSeries(incompleteSeriesRef.current);
      }
    }
    
  }, [incompleteSeries, completeSeries, currentSet, numSets]);

  const handleDragStart = (e, value) => {
    e.dataTransfer.setData("text/plain", value.toString());
   
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const value = parseInt(e.dataTransfer.getData("text/plain"));
    const newSeries = [...incompleteSeries];
    newSeries[index] = value;
    setIncompleteSeries(newSeries);
  };

  return (
    <div className="main-container">
     <Header />  
     <div className="num-con">
      {isAudioLoaded && (
        <>
          <h3>Complete The Missing Number</h3>
          <div className={`gif-container ${playGIF ? 'play' : ''}`}
            style={{
              backgroundImage: `url(${playGIF ? backgroundVideo : backgroundImg})`,
              // height: '22.5rem',
              // width: '75rem',
              // marginLeft: '10rem',
              // marginTop: '3rem'
            }} />
          {gifPlaybackCompleted && !playGIF && (
            <div>
              <div className="series-container">
                {/* Render the incomplete series with drop zones */}
                {incompleteSeries.map((value, index) => (
                  <div
                    key={index}
                    className="drop-zone"
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={(e) => allowDrop(e)}
                    // style={{ color: getRandomColor() }} // Apply a random color
                  >
                    {value !== null ? value : <span className="blank"></span>}
                  </div>
                ))}
              </div>

              <div className="complete-series">
                {/* Render the complete series with draggable numbers */}
                {completeSeries.slice(currentSet - 1, currentSet + numSets - 1).map((value) => (
                  <div
                    key={value}
                    className="draggable-number"
                    draggable
                    // style={{ color: getRandomColor() }} // Apply a random color
                    onDragStart={(e) => handleDragStart(e, value)}

                  >
                    {value} 
                  </div>
                ))}
              </div>
              <p>{message}</p>
              <input className="input-part2"
                orient="270deg"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />

            </div>
          )}
        </>
      )}
      </div>
    </div>
   
  );
}

function generateIncompleteSeries(completeSeries, numSets, startSet) {
  const pattern = [];
  for (let i = startSet - 1; i < startSet - 1 + numSets; i++) {
    if (Math.random() < 0.5) {
      pattern.push(null); // Blank space
    } else {
      pattern.push(completeSeries[i]);
    }
  }
  return pattern;
}

export default MissingNumbers;
