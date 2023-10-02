import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./SubjectList.css";
import axios, { config } from "../../utils/api";
import { useHistory } from "react-router-dom";
import Loader from "../Loader";
import { apiEndPoint } from "../../utils/constants";
import Header from "../Header/Header";

const SubjectList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const className = queryParams.get("class");
    const filters = JSON.stringify({
      standard_id__standard_name: className,
    });
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`${apiEndPoint.subject}?filters=${filters}`, config())
        .then((res) => {
          if (res.data && res.data.data) {
            setData(res.data.data);
          }
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  const redirectSubjectPage = (standard_name, id) => {
    const queryParams = new URLSearchParams(window.location.search);
    const className = queryParams.get("class");
    history.push(`content/?class=${className}&subjectId=${id}`);
  };

  // Add sound Efefctt  On  Subject Card Click

  let audio = new Audio("/cartoon-pop-up-sound.mp3");
  const start = () => {
    audio.play();
    audio.volume = 0.2;
  };

  return (
    <div className="container-sub">
      <Sidebar />
      {loading ? (
        <div className="right-side" style={{ width: "100%" }}>
          <Loader />
        </div>
      ) : data.length ? (
        <div className="right-side">
          <div className="header">
            <Header />
          </div>
          <div className="all-subject">
            <div className="sub-card">
              {data.map((subject, index) => {
                // console.log(data);
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      redirectSubjectPage(subject.standard_name, subject.id);
                    }}
                    key={subject.id}
                    className="sub-card-section-map"
                  >
                    <img src={subject.subject_image} alt="" onClick={start} />
                    <div>
                      <h2 className="sub-card-section">
                        {subject.subject_name}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="right-side no-content">
          <h2>No Subjects Available</h2>
        </div>
      )}
    </div>
  );
};

export default SubjectList;