import React, { useState } from "react";
import "./Sidebar.css";
import textLogo from "../../Asset/logowhite.png";
import { useHistory } from "react-router";
import { useEffect } from "react";
import axios, { config } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../utils/reducer";
import { apiEndPoint } from "../../utils/constants";
import Button from "@mui/material/Button";

const customStyles = {
  content: {
    top: "70%",
    left: "29%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "orange",
  },
};

const Sidebar = () => {
  // Abhise Api consumption  Subject st
  const [data, setData] = useState([]);
  //console.log(data);
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
  },[]);

  // ABHISEK API consumption  for topics List

  const [Topic, setTopic] = useState([]);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const subjectId = queryParams.get("subjectId");
    const filters = JSON.stringify({
      subject_id: subjectId,
    }); 
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`${apiEndPoint.topic}?filters=${filters}`, config())
        .then((res) => {
          if (res.data && res.data.data) {
            setTopic(res.data.data);
          }
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(apiEndPoint.user, config()).then((res) => {
        if (res.data && res.data.data) {
          dispatch(login(res.data.data));
        }
      });
    };
    if (!user) {
      fetchData();
    }
  }, [user, dispatch]);
  const redirectSubjectPage = (standard_name, id) => {
    const queryParams = new URLSearchParams(window.location.search);
    const className = queryParams.get("class");
    history.push(`content/?class=${className}&subjectId=${id}`);
  };
  const Activities = () => {
    history.push( "/activity" );
  };
  
  return (
    <div className="container-sidebar">
      <div className="logo-container">
        <img className="text-logo" src={textLogo} alt="" />
      </div>
      <h6 className="slogan">LEARNING MADE FUN</h6>
      <div className="Activity">
       <button className="Activity-Button" onClick={Activities}>ACTIVITY</button>
      </div>

      <div className="courses-activity"></div>
      <>
      <div className="scrl">
        {data.map((subject, index) => {
          return (
            <div className="sidebar_scroll">
              <div className="sidebar_SubList">
                <Button
                  className="Button"
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    redirectSubjectPage(subject.standard_name, subject.id);
                  }}
                >
                  {subject.subject_name}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      </>
    </div>
  );
};

export default Sidebar;