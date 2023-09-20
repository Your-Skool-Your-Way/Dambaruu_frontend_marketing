import React from 'react'
import "./Thumbnails.css"
import Header from '../Header/Header';
import Loader from "../Loader";
import { useHistory } from "react-router";
import axios, { config } from "../../utils/api";
import { useState, useEffect } from "react";
import { apiEndPoint } from "../../utils/constants";

const Thumbnails = () => {
    const [data, setData] = useState([]);
  // console.log(data);
    const [loading, setLoading] = useState(false);
    const [thumb_id, setThumb_id] = useState('');

    const history = useHistory();
    
     useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const activityId = queryParams.get("activity_id");
      //console.log(activityId);
      const filter = JSON.stringify({
        activity_id: activityId,
      });
      const fetchData = async () => {
        setLoading(true);
        await axios
        .get(`${apiEndPoint.thumbnails}?filters=${filter}`, config()).then((res) => {
          if (res.data && res.data.data) {
            setData(res.data.data);
          }
          setLoading(false);
        });};
      fetchData();
    },[]);

    const redirectTracingalphabetPage = (id) => {
      const queryParams = new URLSearchParams(window.location.search);
      const activityId = queryParams.get("activity_id");
      history.push(`/tracingalphabet?activity_id=${activityId}&thumbnails_id=${id}`);
    };

return (
    <div className="thumb-container">
    <Header/>
    {/* <div><h1>alphabet thumbnails</h1></div> */}
    <div className="thumb-con">
    {loading ?(
    <div className="loading"><Loader/>
    </div>):( 
    <div className='All-thumb-card'> 
    <div className='thumb-con-card'>   
    {data.map((thumb,index) => {
    return (  
      <div className='thumb-cards' key={thumb.id}> 
      <img className="thumb_img" alt="" 
      onClick={(e) => {
      e.stopPropagation(e);
      redirectTracingalphabetPage(thumb.id)}} src={thumb.image}/></div>
    )})} 
    </div>
    </div>
    )}
    </div>
    </div>
  );
}
export default Thumbnails;