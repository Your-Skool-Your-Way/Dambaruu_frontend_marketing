import React from 'react';
import './Activity.css';
import Header from '../Header/Header';
import { useHistory} from "react-router-dom";


const Activity = () => {
  

 
  const history = useHistory();

  const Tracing = () => {
    // history.push( "/tracing" );
    //if(data.name==="Alphabates_lern"){
      history.push( "/tracing" );
    }
    const Number = () => {
    history.push( "/number" );
  };

  let audio = new Audio("/cartoon-pop-up-sound.mp3");
  const start = () => {
    audio.play();
    audio.volume = 0.2;
  };
  

return (
  <div className="activity-section">
  <Header/>
  <div className="activity-block" onClick={start}>
  <div className="alphabet-card" onClick={Tracing}></div>
  <div className="number-card" onClick={Number}></div>

  </div>
  </div>






);
}
export default Activity