import React from "react";
import { useHistory } from "react-router-dom";
import "./Language.css";
import Header from "../Header/Header";
import odia from "../../Asset/odis_card.png";
import eng from "../../Asset/Eng_card.png";
const Language = () => {
  const history = useHistory();
  const goToEng = () => {
    history.push("/dashboard");
  };

  const goToOd = () => {
    history.push("/odia");
  };
  return (
    <>
      {/*Language cards */}
      <div className="bg">
        <Header />
        <div className="cards">
          <div className="card-con" onClick={goToOd}>
            <img src={odia} alt="no images" />
          </div>
          <div className="card-con" onClick={goToEng}>
            <img src={eng} alt="no images" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Language;
