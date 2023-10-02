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
     console.log(isFlipped);


const handleClick = (id) => { 
  const obj=data.find((number)=>number.id===id);
  setIsFlipped(isFlipped===obj.number_image_front?obj.number_image_back:obj.number_image_front);

};

useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      await axios.get(apiEndPoint.number, config()).then((res) => {
      if (res.data && res.data.data) {
      setData(res.data.data);}
      setLoading(false);
      });};
      fetchData(); }, []);

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
      <img src= {isFlipped===number.number_image_front?number.number_image_back:number.number_image_front} alt="" 
      onClick={()=>handleClick(number.id)}/></div>
     
    )})} 
    </div>
    </div>
    )}
    </div>
    </div>
  );
}

export default Number