import React, { useState, useEffect } from "react";
import "./gameBar.css";
import { addScore, getAllScores } from "../indexDb/Registion";

function GameBar({ userName, isFinished }) {
  const [scores, setScores] = useState([]);
  const [time, setTime] = useState();
  var minutes = 0;
  var seconds = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFinished) {
        seconds = seconds + 1;
        if (seconds === 60) {
          seconds = 0;
          minutes = minutes + 1;
        }
        if (minutes > 0) {
          if (seconds < 10) {
            setTime(minutes + ":0" + seconds);
          } else {
            setTime(minutes + ":" + seconds);
          }
        } else {
          setTime("0:" + seconds);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  console.log(time);

  useEffect(() => {
    getAllScores().then((sortedScores) => {
      setScores(sortedScores);
    });
  }, []);
  useEffect(() => {
    if (isFinished) {
      addScore(userName, time);
      getAllScores().then((sortedScores) => {
        setScores(sortedScores);
      });
    }
  }, [isFinished]);
  return (
    <div className="gamebar-container">
      <div className="gamebar">
        <div className="player-content">
          <div className="player-item">{userName}</div>
          <div className="player-item">{time}</div>
        </div>
        <h3 className="gamebar-title">Skor Tablosu</h3>
        <div className="gamebar-content">
          <div className="gamebar-item">
            <div className="gamebar-item-left-side">
              <div className="gamebar-item-score">Sıra</div>
              <div className="gamebar-item-name">İsmi</div>
            </div>
            <div className="gamebar-item-time">Zaman</div>
          </div>
          {scores.map((score, index) => {
            return (
              <div className="gamebar-item" key={index}>
                <div className="gamebar-item-score">
                  {index + 1}
                  {""}{" "}
                </div>
                <div className="gamebar-item-name">{score.name}</div>
                <div className="gamebar-item-time">{score.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameBar;