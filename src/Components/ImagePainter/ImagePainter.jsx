import React, { useState, useRef, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import alphabetImage from '../images/A.png';
// import alphabetImage2 from '../images/d.jpg';
import '../Alphabet/ImagePainter.css';

const ImagePainter = () => {
  const [selectedColor, setSelectedColor] = useState();
  const [pencilWidth, setPencilWidth] = useState(1);
  const [isPainting, setIsPainting] = useState(false);
  // const [showMessage, setShowMessage] = useState(false);
  const [drawingHistory, setDrawingHistory] = useState([]);
   const [isDrawingCorrect, setIsDrawingCorrect] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setIsErasing(false);
  };
 
  const handlePencilWidthChange = (width) => {
    setPencilWidth(width);
  };
 
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = imageRef.current;
    context.drawImage(image, 0, 0);
    context.lineCap = 'round';
    context.strokeStyle = selectedColor;
    context.lineWidth = pencilWidth;
     }, [selectedColor, pencilWidth]);
  
  const handleMouseDown = (event) => {
    setIsPainting(true);
    setIsErasing(false);
    // setDrawingHistory([...drawingHistory, []]);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    // context.closePath();
  };

  const handleMouseUp = () => {
    setIsPainting(false); 
    setIsErasing(false);
  };

  const handleMouseMove = (event) => {
    if (isPainting || isErasing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const radius = isErasing ? 10 : 5;

      const { offsetX, offsetY } = event.nativeEvent;
      context.lineTo(offsetX, offsetY);
      context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      context.stroke();

      // const lastPathIndex = drawingHistory.length - 1;
      // setDrawingHistory((prevHistory) => {
      //   const updatedHistory = [...prevHistory];
      //   updatedHistory[lastPathIndex].push({ x: offsetX, y: offsetY });
      //   return updatedHistory;
      // }); 
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fillStyle = isErasing ? 'rgba(0, 0, 0, 0)' : selectedColor;
      context.fill();
      context.closePath();
    }
  };

  const handleMouseLeave = () => {
    if (isPainting) {
      setIsPainting(false);
      setIsErasing(false);
      // alert('Mouse left the shape!');
    }
  };

  // const handleMouseLeave = () => {
  //   if (isPainting) {
  //     setIsPainting(false);
  //   }
  // };

  const handleEraserClick = () => {
    setIsErasing(!isErasing);
   setSelectedColor('#ffffff');
 };
 
  return (
   <>
    <div className='main-card' >
     <div style={{display : 'flex'}}>
       <div style={{ marginBottom :'10px' , backgroundColor : 'skyblue', height :'25rem', width : '30rem'}}>
        <img 
          ref={imageRef}
          src={alphabetImage}
          alt="Your Image"
          style={{ marginBottom :'10px'}}
        />
      </div>
      <div>
        <canvas 
          ref={canvasRef}
          style={{ marginTop : '50px',marginLeft :'100px'}}
          width={180}
          height={220}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>
     <div>
      <ColorPicker onSelectColor={handleColorSelect} onPencilWidthChange={handlePencilWidthChange} />
      </div>
      <div>
      <button style={{marginLeft : '-150px',marginTop : '250px'}} onClick={handleEraserClick}>{isErasing ? 'Disable Eraser' : 'Enable Eraser'}</button>
      </div>
      </div>
      </div>
      </>
  );
};
export default ImagePainter;