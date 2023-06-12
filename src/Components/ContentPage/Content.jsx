import React from "react";
import "./Content.css";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../Loader";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import axios, { config } from "../../utils/api";
import { apiEndPoint } from "../../utils/constants";
import Header from "../Header/Header";

const Content = () => {
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const subjectId = queryParams.get("subjectId");
    const filter = JSON.stringify({
      subject_id: subjectId,
    });
    const fetchDataTopic = async () => {
      setLoading(true);
      await axios
        .get(`${apiEndPoint.topic}?filters=${filter}`, config())
        .then((res) => {
          if (res.data && res.data.data) {
            setTopic(res.data.data);
          }
          setLoading(false);
        });
    };
    fetchDataTopic();
  }, []);

  // topic card clicable
  const redirectVideoPage = (topicId, id) => {
    history.push(`/video?topicId=${topicId}`);

    let audio = new Audio("/cartoon-pop-up-sound.mp3");
    audio.play();
    audio.volume = 0.2;
  };

  // add sound effect on   topic card click

  return (
    <div className="container-con">
      <Sidebar />
      {loading ? (
        <div className="right-side" style={{ width: "100%" }}>
          <Loader />
        </div>
      ) : (
        <div className="right-side right-side-content">
          <div className="header">
            <Header />
          </div>
          <div className="topic_list">
            {topic.map((topic) => {
              return (
                <div
                  key={topic.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    redirectVideoPage(topic.id);
                  }}
                  className="topicsCard"
                >
                  <h3 className="topicName">{topic.topic_name}</h3>
                  <img className="topiclist" src={topic.topic_image} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
