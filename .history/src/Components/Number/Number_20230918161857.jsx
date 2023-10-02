import React from 'react'
import "./Number.css"
import Header from '../Header/Header';
import Loader from "../Loader";
import axios, { config } from "../../utils/api";
import { useState, useEffect } from "react";
import { apiEndPoint } from "../../utils/constants";


const Number = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFlipped, setIsFlipped] = useState();
    const [currentSound, setCurrentSound] = useState(null);

     //console.log(isFlipped);

// const handleClick =(itemm)=> {  
//   setShowFront(itemm.alphabet_image_back);
//   // setShowFront(true)
//  console.log(itemm.alphabet_image_back);
//  console.log(itemm.alphabet_sound);`
// }
const handleClick = async(id,soundUrl) => { 
  const obj=data.find((number)=>number.id===id);
  setIsFlipped(isFlipped===obj.image_front?obj.image_back:obj.image_front);
  // setIsFlipped("Abjhjkhgjkgjh")
  if (currentSound) {
    currentSound.pause();
  }
  const audio = new Audio(soundUrl); 
  await audio.play();
  setCurrentSound(audio);
};

useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      await axios.get(apiEndPoint.number, config()).then((res) => {
      if (res.data && res.data.data) {
      setData(res.data.data);}
      setLoading(false);
      });};
      fetchData();
      fetchData();
      return () => {
        if (currentSound) {
          currentSound.pause();
        }
      }; 
    }, []);

return (
    <div className="tracing-container">
    <Header/>
    <div><h1>Let's Play With Numbers</h1></div>
    <div className="tracing-block">
    {loading ?(
    <div className="loading"><Loader/>
    </div>):( 
    <div className='All-tracing-block-card'> 
    <div className='tracing-block-card'>   
    {data.map((number,index) => {
    return (  
      <div className='tracing-card-front' key={number.id}> 
      <img src= {isFlipped===number.image_front?number.image_back:number.image_front} alt="" 
      onClick={()=>handleClick(number.id,number.sound)}/></div>
     
    )})} 
    </div>
    </div>
    )}
    </div>
    </div>
  );
}

export default Number