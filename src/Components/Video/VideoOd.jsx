import React, { useRef } from "react";
import ReactPlayer from "react-player";
import "./Video.css";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import axios, { config } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { apiEndPoint } from "../../utils/constants";
import Header from "../Header/Header";
import { CleaningServices } from "@mui/icons-material";
/* For Exit Full Screen when video is playing in full screen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

/* Right side video Card In video Player */
const Videoright = ({ video, setSelectedVideo, isSelected, ...props }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${video.thumbnail_image})`,
          border: `5px solid ${isSelected ? "#CB5B9F" : "transparent"}`,
        }}
        className="video-right-card"
        {...props}
      />
    </>
  );
};
/* Video Component start */
const Video = () => {
  const [video, setVideo] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [counted, setCounted] = useState(0);
  const [videoEnded, setVideoEned] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [currentVideo, setCurrentVideo] = useState(0);
  const [quiz, setQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const topicId = queryParams.get("topicId");
    const filter = JSON.stringify({
      topic_id: topicId,
    });
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`${apiEndPoint.contentod}?filters=${filter}`, config())
        .then((res) => {
          if (res.data && res.data.data) {
            setVideo(res.data.data);
            setSelectedVideo(res.data.data[0]);
            setCurrentVideo(0);
            setLoading(false);
          }
        });
    };
    fetchData();
  }, []);

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % video.length;
    setCurrentVideoIndex(nextIndex);
    setQuiz(false);
  };

  const playerRef = useRef();
  const onReady = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        selectedVideo.content_questions[counted].quiz_time_in_seconds,
        "seconds"
      );
      setIsPlaying(true);
    }
  };

  //  Add quiz popup sound effect
  let quizpopup = new Audio("/popup.mp3");
  const quizpop = () => {
    quizpopup.play();
  };
  // Add Correct ansswer Sound
  let CorrectAnswer = new Audio("/Congrats.wav");
  const correct = () => {
    CorrectAnswer.play();
  };
  // Add Wrong Answer Sound
  let WrongAnswer = new Audio("/Sorry.wrong.wav");
  const Wrong = () => {
    WrongAnswer.play();
  };
  //  Quiz show orderly
  const nextQuestion = () => {
    let lengthQuiz = video[currentVideoIndex].content_questions.length;
    if (counted === lengthQuiz - 1) {
      setVideoEned(false);
      onReady();
      setAnswerText("");
      nextVideo();
      setCounted(0);
    } else {
      setCounted(counted + 1);
    }
  };
  // console.log("vid", video);
  // console.log("SelVid", selectedVideo);
  // console.log("couQus", counted);
  // console.log("VidEnd", videoEnded);
  // console.log("isPlay", isPlaying);
  // console.log("CrntVid", currentVideoIndex);

  return (
    <div className=" video_player_Section">
      <Header />
      <div className="container-vid-video">
        {/* <div className="video-sidebar">
        <Sidebar />
      </div> */}
        {loading ? (
          <div className="right-side" style={{ width: "35%", marginTop: "8%" }}>
            <Loader />
          </div>
        ) : (
          <div className="video-right-side">
            <div>
              {selectedVideo && selectedVideo.content_file && (
                <div
                  style={
                    videoEnded
                      ? { visibility: "hidden", height: 0 }
                      : { visibility: "visible" }
                  }
                >
                  <ReactPlayer
                    className="react-player"
                    id="react-players"
                    ref={playerRef}
                    playing={isPlaying}
                    config={{
                      file: {
                        attributes: {
                          controlsList: "nodownload",
                        },
                      },
                    }}
                    controls={true}
                    height="auto"
                    url={video[currentVideoIndex].content_file}
                    onEnded={() => {
                      if (video[currentVideoIndex].content_questions[counted]) {
                        setVideoEned(true);
                        setIsPlaying(false);
                        closeFullscreen();
                        setQuiz(true);
                      }
                      console.log("sl", selectedVideo);
                    }}
                  />
                </div>
              )}

              {selectedVideo &&
                videoEnded &&
                video[currentVideoIndex].content_questions && (
                  <div className="quiz-div">
                    <div className="Question_Text">
                      <h1>
                        Question:{" "}
                        {
                          video[currentVideoIndex].content_questions[counted]
                            .question
                        }
                      </h1>
                    </div>
                    {video[currentVideoIndex].content_questions[
                      counted
                    ].options.map((option) => (
                      <div className="optionimg">
                        <img
                          src={option.image}
                          key={option.id}
                          alt="images"
                          onClick={() => {
                            if (
                              video[currentVideoIndex].content_questions[
                                counted
                              ].answer === option.text
                            ) {
                              correct();
                              toast.success("Congratulation");
                              nextQuestion();
                            } else {
                              Wrong();
                              toast.error("Ohh Sorry Try Again");
                            }

                            setAnswerText(option.text);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <ToastContainer className="toaster" />
            {quiz ? null : (
              <div className="video-right">
                {video.map((vi, index) => (
                  <Videoright
                    key={vi.id}
                    video={vi}
                    isSelected={
                      video[currentVideoIndex] &&
                      video[currentVideoIndex].id === vi.id
                    }
                    onClick={() => {
                      setCurrentVideoIndex(index);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;
