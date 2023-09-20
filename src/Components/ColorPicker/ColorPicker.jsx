import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import './ColorPicker.css';

const ColorPicker = ({ onSelectColor, onPencilWidthChange }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [pencilWidth, setPencilWidth] = useState(1);
  
 
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    onSelectColor(color.hex);
  };

  const handlePencilWidthChange = (event) => {
    const width = parseInt(event.target.value, 10);
    onPencilWidthChange(width);
    setPencilWidth(width);
  };

//  // Custom styles for the CirclePicker
//  const circlePickerStyles = {
//   card: {
//     boxShadow: 'none', // Remove the default box shadow
//   },
//   circle: {
//     border: 'none', // Remove the default border
//     width: '24px',
//     height: '24px',
//     borderRadius: '50%',
//     margin: '0 4px',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   circleSpacing: {
//     padding: '0', // Remove the default padding between circles
//   },
// };


  return (
    <>
    <div className="color-picker-container">
    <div className='color-picker'>
      <CirclePicker
       colors={['#000', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff']}
       circleSize={28}
       circleSpacing={8}
      //  circleStyle={{
      //         border: `10px solid ${"#F4D03F"}`,
      //         zIndex: 10
      //       }}
       color={selectedColor}
       onChange={handleColorChange}  
      //  styles={circlePickerStyles} 

       />
      </div>
      <input
      className='input-part'
        type="range"
        min="10"
        max="100"
        value={pencilWidth}
        onChange={handlePencilWidthChange}
      />
    </div>
     </>
  );
};

export default ColorPicker;