import React from 'react';
import './Activity.css';
import Header from '../Header/Header';
import Loader from "../Loader";
import axios, { config } from "../../utils/api";
import { useState, useEffect } from "react";
import { apiEndPoint } from "../../utils/constants";
import { useHistory} from "react-router-dom";

const Activity = () => {
 
  const history = useHistory();
  const [data ,setData] = useState([]);
 // console.log(data)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData",fetchData)
    setLoading(true);
    await axios.get(`${apiEndPoint.activity}`, config())
    .then((res) => {
      console.log(res);
    if (res.data && res.data.data) {
    setData(res.data.data);}
    setLoading(false);
    });};
    fetchData(); 
  }, []);

  const redirectThumbnailsPage = (id) => {
      history.push(`/thumbnails?&activity_id=${id}`)
  };

return (
  <div className="activity-section">
  <Header/>
  \
  <div className="activity-block">
    {loading ?(
    <div className="loading"><Loader/>
    </div>):( 
    <div className='activity-main-card'>   
    {data.map((act,index) => {
    return (  
      <div className='activity-cards' key={act.id}> 
      <img className="activity_img" alt="" onClick={(e) => {
      e.stopPropagation(e);
      if(act.navigationroute){
        return(history.push(act.navigationroute))
      } else {
        redirectThumbnailsPage(act.id)
      }
      }
      }src={act.card_image} />
      </div>
    )})} 
    </div>
    )}
    </div>
  </div>
);
}
export default Activity;