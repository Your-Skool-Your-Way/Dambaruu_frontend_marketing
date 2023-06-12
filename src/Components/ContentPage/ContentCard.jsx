import React from "react";
import "./Content.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios, { config } from "../../utils/api";
import { apiEndPoint } from "../../utils/constants";

const ContentCard = ({ topic }) => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      let fetchString = apiEndPoint.content;
      if (topic && topic.id) {
        const filter = JSON.stringify({
          topic_id: topic.id,
        });
        fetchString = `${apiEndPoint.content}?filters=${filter}`;
      }
      await axios.get(fetchString, config()).then((res) => {
        if (res.data && res.data.data) {
          setData(res.data.data);
        }
      });
    };
    fetchData();
  }, [topic]);

  const redirectSubjectPage = (topicId, id) => {
    history.push(`/video?topicId=${topicId}`);
  };
  return (
    <div>
      <div className="content-card">
        {data.map((content) => {
          return (
            <div
              className="content-card-div"
              onClick={(e) => {
                e.stopPropagation();
                redirectSubjectPage(content.topic_id, content.id);
              }}
              key={content.id}
            >
              <img
                className="content-card-img"
                src={content.thumbnail_image}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentCard;
