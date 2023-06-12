import logo from "../../Asset/logoheader.png";
import "./header.css";
import React, { useState } from "react";
import Modal from "react-modal";
import profileIcon from "../../Asset/school1.png";
import backIcon from "../../Asset/backbtn.png";
import { useHistory } from "react-router";
import { useEffect } from "react";
import axios, { config } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../utils/reducer";
import { apiEndPoint } from "../../utils/constants";
import Tooltip from "@mui/material/Tooltip";

const customStyles = {
  content: {
    top: "45%",
    left: "75%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "280px",
    height: "350px",
    // backgroundColor:"#194792",
    boxShadow: "3px 3px 5px #194792",
  },
};
const logoutCustomStyles = {
  content: {
    top: "45%",
    left: "39%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: "280px",
    height: "350px",
    boxShadow: "3px 3px 5px #194792",
  },
};

const Header = () => {
  const user = useSelector( selectUser );
  const dispatch = useDispatch();

  useEffect( () => {
    const fetchData = async () => {
      await axios.get( apiEndPoint.user, config() ).then( ( res ) => {
        if ( res.data && res.data.data ) {
          dispatch( login( res.data.data ) );
        }
      } );
    };
    if ( !user ) {
      fetchData();
    }
  }, [ user, dispatch ] );
  const [ isOpen, setIsOpen ] = useState( false );
  const [ logoutisOpen, setLogoutIsOpen ] = useState( false );

  const openHandler = () => {
    setIsOpen( true );
  };
  const closeHandler = () => {
    setIsOpen( false );
  };
  const cancleHandler = () => {
    // Added  logout cnacel audio
    let audio = new Audio( "/Log out 2.wav" );
    audio.play();

    setLogoutIsOpen( false );
  };
  const history = useHistory();
  const confirmHandler = () => {
    localStorage.clear();
    dispatch( logout() );
    history.push( `/` );
    //  logout conform sound
  };

  // Home Button Route

  const AgeGroup = () => {
    history.push( "/dashboard" );
  };

  const logoutConfirmation = () => {
    setLogoutIsOpen( true );
  };
  const ConfirmLogoutPopUp = () => {
    return (
      <div className="container-log-confirm">
        <img src={logo} alt="" />
        <h1>Are you sure to LOGOUT?</h1>
        <div className="button-confirm-container">
          <button onClick={cancleHandler} className="button-Cancle">
            Cancel
          </button>
          <button onClick={confirmHandler} className="button-confirm">
            Confirm
          </button>
        </div>
      </div>
    );
  };
  const LogoutPopUp = () => {
    return (
      <div className="logoutpop">
        <div className="">
          <div className="school_info">
            <h3>Keep learning</h3>
            <img src={logo} alt="" />
          </div>

          <button onClick={logoutConfirmation} className="logout-btn">
            Logout
          </button>
          <div c>
            <Modal isOpen={logoutisOpen} style={logoutCustomStyles}>
              <ConfirmLogoutPopUp />
            </Modal>
          </div>
        </div>
      </div>
    );
  };


  //  Log out pop modal open sound

  let audio = new Audio( "/popup.mp3" );
  const start = () => {
    audio.play();
  };
  //  BackButton click sound
  let backbutton = new Audio( "/Button Click 2.wav" );
  const back = () => {
    backbutton.play();
  };

  return (
    <div className="navbar">
      <div className="navbar__title ">
        <span className="arrowback" onClick={back}>
          <img
            src={backIcon}
            onClick={() => history.goBack()}
            className="backbutton"
            alt=""
          />
        </span>
        <Tooltip title="Click to AGE GROUPS">
          <img src={logo} alt="" onClick={AgeGroup} />
        </Tooltip>
      </div>

      <div className="navbar__item">
        <div onClick={openHandler} className="logoutprofile">
          <Tooltip title="Click to Logout">
            <img src={profileIcon} alt="" onClick={start} />
          </Tooltip>
        </div>

        <Modal isOpen={isOpen} style={customStyles}>
          <button className="x-close" onClick={closeHandler}>
            X
          </button>
          <LogoutPopUp />
        </Modal>
      </div>
    </div>
  );
};

export default Header;
