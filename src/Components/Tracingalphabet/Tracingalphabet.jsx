import React from 'react'
import "./Tracingalphabet.css";
import ColorPicker from '../ColorPicker/ColorPicker';
import Tesseract from 'tesseract.js';
import Header from '../Header/Header';
import Loader from "../Loader";
import { useHistory } from "react-router";
import axios, { config } from "../../utils/api";
import { useState, useEffect, } from "react";
import { useRef, } from "react";
import { apiEndPoint } from "../../utils/constants";
import { fabric } from 'fabric';
import sucessimg from '../../Asset/cards/tracingsound/congratulation_gif.gif'
import sryimg from '../../Asset/cards/tracingsound/sorry.gif'
import Modal from 'react-bootstrap/Modal';

const Tracingalphabet = () => {
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [clearText, setClearText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [imageData, setImageData] = useState([]);
 // console.log(imageData)
  const [currentAlphabetIndex, setCurrentAlphabetIndex] = useState(0);
  //console.log("currentAlphabetIndex", currentAlphabetIndex)
  const audioRef = useRef(null);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const soundPlayedRef = useRef(false);

  const history = useHistory();
  // modal part states
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

  // congrats gif timeout function
  const closeModalsAfterDelay = (id) => {
    setTimeout(() => {
      setShow(false);
      // setShows(false);
      history.push(`/thumbnails?activity_id=${id}`);
    }, 4000); // 4000 milliseconds = 4 seconds
  };

  useEffect(() => {
    if (show) {
      const queryParams = new URLSearchParams(window.location.search);
      const activityId = queryParams.get("activity_id");
       console.log(activityId)
      closeModalsAfterDelay(activityId);
    }
    if (!soundPlayedRef.current) { // Only play the sound if it hasn't been played yet
      playSound();
      soundPlayedRef.current = true;
    }
  }, [show]);
  // sorry gif timeout function 
  const closeModalAfterDelay = () => {
    setTimeout(() => {
      setShows(false);
    }, 2000); // 2000 milliseconds = 2 seconds
  }

  useEffect(() => {
    if (shows) {
      closeModalAfterDelay();
    }
  }, [shows]);

  const canvasRef = useRef(null);
  // color picker part
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [pencilWidth, setPencilWidth] = useState(15);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.getObjects().forEach((obj) => {
        canvas.remove(obj);
      });
      canvas.renderAll();
      setErrorMessage('');
      setConfirmMessage('');
      setClearText(true);
    }
  };

  // Function to handle successful completion of an alphabet tracing
  const handleClearSuccess = () => {
    // Clear the canvas and any necessary state variables
    handleClearCanvas();
   // setExtractedText('');
    setClearText(true);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const thumbnailsId = queryParams.get("thumbnails_id");
    const filters = JSON.stringify({
      thumbnails_id: thumbnailsId,
    });
    const fetchTraceAlphabetData = async () => {
      setLoading(true);
      await axios
        .get(`${apiEndPoint.tracingalphabet}?filters=${filters}`, config())
        .then((res) => {
          setImageData(res.data.data);
          setLoading(false);
        });
    };
    fetchTraceAlphabetData();
  }, [setImageData]);

  // set color 
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handlePencilWidthChange = (width) => {
    setPencilWidth(width);
  };

  // Initialize the canvas on component mount
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true
    });
    canvas.freeDrawingBrush.width = pencilWidth;
    canvas.freeDrawingBrush.color = selectedColor;
    // Store the canvas object in the ref
    canvasRef.current = canvas;
  }, []);

  // Update canvas brush color when selectedColor changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.freeDrawingBrush.width = pencilWidth;
      canvas.freeDrawingBrush.color = selectedColor;
      canvas.renderAll();
    }
  }, [selectedColor, pencilWidth]);

  const handleOCR = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageDataURL = canvas.toDataURL();
      Tesseract.recognize(imageDataURL, 'eng', { logger: (m) => console.log(m) })
        .then(({ data: { text } }) => {
          console.log("OCR Result:", text);
          var str = text.trim();
          setExtractedText(text);
          console.log("Api Result:", imageData[currentAlphabetIndex].gif_name);
          if (str === imageData[currentAlphabetIndex].gif_name) {
            setShow(true);
            const audio = new Audio("/Congrats.wav");
            audioRef.current = audio;
            playSoundsucess();
            handleClearSuccess();
           
          } else {
            setShows(true);
            const audio = new Audio("/Sorry.wrong.wav");
            audioRef.current = audio;
            playSoundsucess();
            handleClearSuccess();
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Error occurred during recognition.');
        });
    }
  };

  useEffect(() => {
    if (extractedText && imageData[currentAlphabetIndex] && extractedText.trim() === imageData[currentAlphabetIndex].gif_name) {
      handleClearSuccess();
    }
  }, [extractedText, imageData, currentAlphabetIndex]);

// sucess sound play logic
const playSoundsucess = () => {
  if (audioRef.current) {
    audioRef.current.play();
  }
};

  // Audio Logic for background
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    // Load the audio and play it when the component mounts
    if (imageData.length > 0 && !soundPlayed) {
      const audio = new Audio(imageData[currentAlphabetIndex].gif_sound
      );
     // console.log(audio);
      audioRef.current = audio;
      playSound(); // Play sound on component mount
      setSoundPlayed(true);
    }
  }, [imageData, currentAlphabetIndex, soundPlayed]); // Add imageData, currentAlphabetIndex, and soundPlayed to the dependency array

  // Pause the sound when it ends
  useEffect(() => {
    const handleSoundEnded = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleSoundEnded);
      return () => audioRef.current.removeEventListener('ended', handleSoundEnded);
    }
  }, []);

  return (
    <div className='StandardDashboard'>
      <div className="container-trace-alphabet">
        <div className="right-section">
          <Header />
          <div className='canva'>
            <canvas
              style={{ marginLeft: '-5px', marginTop: '-10px' }}
              width={800}
              height={400}
              ref={canvasRef} />
          </div>
          <div className="trace-main-container">
            <h5>Trace Alphabets</h5>
            <div className="trace-all">
              <div className='gif'>
                {imageData.length > 0 ? (
                  <img
                    className="trace-gif"
                    src={imageData[currentAlphabetIndex].gif_image_card}
                    alt="Image card"
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div className='gif-img'>
                {imageData.length > 0 ? (
                  <img
                    className="trace-img"
                    src={imageData[currentAlphabetIndex].gif_image}
                    alt="Image"
                  />
                ) : (
                  <div></div>
                )}
              </div>
              {/* modal part for congratulation */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Body className='mod-body'>
                  <img src={sucessimg} className='cong-gif'/>
                </Modal.Body>
              </Modal>
              {/* modal part for sorry */}
              <Modal show={shows} onHide={handleCloses}>
                <Modal.Body className='mod-body'>
                  <img src={sryimg} className='sry-gif'/>
                </Modal.Body>
              </Modal>
            </div>
            <div className="footer-part">
              <ColorPicker onSelectColor={handleColorSelect} onPencilWidthChange={handlePencilWidthChange} />
              <div className="but-part">
                <button className='rec-text' onClick={handleOCR}>Check</button>
                <button className='clear-but' onClick={handleClearCanvas}>Eraser</button>
              </div>
            </div>
            <div className='alert-msg'>
              {confirmMessage && <p>{confirmMessage}</p>}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Tracingalphabet;