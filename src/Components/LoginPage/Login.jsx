import React, { useState } from "react";
import { useHistory } from "react-router";
import ReactPlayer from "react-player";
import video from "../../Asset/landing-video.mp4";
import "./Login.css";
import { Form, Formik } from "formik";
import axios from "../../utils/api";
import { toast } from "react-toastify";
import contactSchema from "../../utils/validations";
import { useDispatch } from "react-redux";
import { login } from "../../utils/reducer";
import { apiEndPoint } from "../../utils/constants";
import logo from "../../Asset/logo1 .png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const year = new Date();
const fullYear = year.getFullYear();
//console.log(fullYear);
const Login = () => {
  // added Login Click Sound
  let audio = new Audio("/Button Click 2.wav");
  const start = () => {
    audio.play();
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    const { password, email } = values;
    setLoading(true);
    {/*Validating the UserName, Password through post method*/}
    const response = await axios
      .post(apiEndPoint.user, {
        username: email,
        password,
      })
      .catch((err) => {
        toast.error("Unauthorized Access");
      });
    setLoading(false);
    if (response.data.status) {
      dispatch(login(response.data.data));
      localStorage.setItem("authToken", response.data.token);
      toast.success("Login Successful");
      history.push("/dashboard");
    }
    //Abhisek Added Else condion for wrong password
    else {
      history.push("/Login");
    }
  };

  return (
    <div className="Containerr">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div className="logo">
            <img src={logo} alt="" />{" "}
          </div>
        </Col>
      </Row>

      {/* Logo */}
      <Row className="row justify-content-center">
        <Col xs={6} md={7}>
          <div className="landing-video ">
            {/*Landing Video showing at right side of Login page*/}
            <ReactPlayer
              className="react-player_Home"
              playing="true"
              loop={true}
              muted={false}
              config={{
                file: {
                  attributes: {
                    autoPlay: true,
                    controlsList: "nodownload",
                  },
                },
              }}
              controls={true}
              volume={0.3}
              url={video}
              width="100%"
              height="56.2vh"
            />
          </div>
          <div className="footer-copyright">
            Copyright © {fullYear} Dambaruu All Rights Reserved.
          </div>
        </Col>
        <Col xs={6} md={5}>
          <div className="form-Container">
            <div className="form-message">
              <h1>Login to Dambaruu</h1>
            </div>
            {/*Used Fromik for login form */}
            <Formik
              initialValues={{
                password: "",
                email: "",
              }}
              validationSchema={contactSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, values, handleChange }) => (
                <Form id="contact-form" name="contact-form">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={values.email || ""}
                    onChange={handleChange}
                  />
                  <br />
                  <span style={{ fontSize: "14px", color: "#B22237" }}>
                    {errors && errors.email}
                  </span>
                  <br></br>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password || ""}
                    onChange={handleChange}
                  />
                  <br />
                  <span style={{ fontSize: "14px", color: "#B22237" }}>
                    {errors && errors.password}
                  </span>
                  <br></br>
                  <button
                    disabled={
                      values.email.length === 0 || values.password.length === 0
                    }
                    type="submit"
                    id="loginbutton"
                    className="PushableLoginBtn"
                    onClick={start}
                  >
                    <div className="fonts">
                      {loading ? "Please Wait..." : "Login"}
                    </div>
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
