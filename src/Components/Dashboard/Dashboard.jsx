import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./Dashboard.css";
import Loader from "../Loader";
import axios, { config } from "../../utils/api";
import { apiEndPoint } from "../../utils/constants";
import Header from "../Header/Header";


const Dash = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(data);
  const history = useHistory();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios.get(apiEndPoint.standard, config()).then((res) => {
        if (res.data && res.data.data) {
          setData(res.data.data);
        }
        setLoading(false);
      });};
    fetchData();
  },[]);

  const redirectSubjectPage = (className) => {
    history.push(`/subjects?class=${className}`);
  };

  // Add Button click sound Effect
  let audio = new Audio("/cartoon-pop-up-sound.mp3");
  const start = () => {
    audio.play();
    audio.volume = 0.2;
  };
  return (
    <div className="StandardDashboard">
      <div className="container-dash">
        {/* <Sidebar /> */}
        {loading ? (
          <div className="right-side">
            <Loader />
          </div>
        ) :(
          <div className="right-section">
            <Header />
            <div className="standardAll">
              {data.map((standard) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      redirectSubjectPage(standard.standard_name);
                    }}
                    key={standard.id}
                    className="class-card"
                  >
                    {}
                    <img
                      className="standardList"
                      src={standard.image}
                      alt=""
                      onClick={start}
                    />
                    <h4>{standard.standard_name}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dash;