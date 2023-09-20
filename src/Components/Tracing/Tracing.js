
import React from 'react';
import './Tracing.css';
import Header from '../Header/Header';
import Loader from '../Loader';
import axios, { config } from '../../utils/api';
import { useState, useEffect } from 'react';
import { apiEndPoint } from '../../utils/constants';

const Tracing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  const handleClick = async (id, soundUrl) => {
    const obj = data.find((alphabet) => alphabet.id === id);
    setIsFlipped(isFlipped === obj.image_front ? obj.image_back : obj.image_front);
    if (currentSound) {
      currentSound.pause();
    }
    const audio = new Audio(soundUrl); 
    await audio.play();
    setCurrentSound(audio);
  }; 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios.get(apiEndPoint.alphabet, config()).then((res) => {
        if (res.data && res.data.data) {
          setData(res.data.data);
        }
        setLoading(false);
      });
    };
    fetchData();
    return () => {
      if (currentSound) {
        currentSound.pause();
      }
    }; 
  },
[]);


  return (
    <div className="tracing-container">
      <Header />
      <div>
        <h1>Let's Play With Alphabets</h1>
      </div>
      <div className="tracing-block">
        {loading ? (
          <div className="loading">
            <Loader />
          </div>
        ) : (
          <div className="All-tracing-block-card">
            <div className="tracing-block-card">
              {data.map((alphabet) => {
                return (
                  <div className="tracing-card-front" key={alphabet.id}>
                    <img
                      src={isFlipped === alphabet.image_front ? alphabet.image_back : alphabet.image_front}
                      alt="Alphabet"
                      onClick={() => {
                        handleClick(alphabet.id, alphabet.sound);
                      }}
                    />
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

export default Tracing;