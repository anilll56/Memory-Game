import React, { useState, useEffect } from "react";
import "./resultPage.css";
import { getAllScores, getScoreByName } from "../indexDb/Registion";
import { useNavigate } from "react-router-dom";
import ReactConfetti from "react-confetti";

function ResultPage({ userName }) {
  const [scores, setScores] = useState([]);
  const [resultTime, setResultTime] = useState();
  const [resultMoves, setResultMoves] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllScores().then((sortedScores) => {
      setScores(sortedScores);
    });
  }, []);

  useEffect(() => {
    getScoreByName(userName).then((score) => {
      if (score === undefined) {
        setResultTime("0:00");
      } else {
        setResultTime(score.time);
        setResultMoves(score.moves);
      }
    });
  }, [userName]);

  const RestartGame = () => {
    navigate("/");
  };

  return (
    <div className="result-page">
      <ReactConfetti />
      <div className="result-page-content">
        <div className="result-page-header">
          <h1 className="header-item">Tebrikler , {userName} </h1>
        </div>
        <div className="score">
          Geçen zaman : {""}
          {resultTime}
        </div>
        <div className="result-page-btn">
          <button
            className="btn"
            onClick={() => {
              RestartGame();
            }}
          >
            Yeniden Oyna
          </button>
        </div>
        <div className="Result-page-list">
          <div className="list-header">Skor Tablosu</div>
          <div className="list-content">
            {scores.map((score, index) => {
              return (
                <div className="result-page-list-item" key={index}>
                  <div className="item-score">
                    {index + 1}
                    {")"}
                    {""}
                  </div>
                  <div className="item-name">{score.name}</div>
                  <div className="item-time">{score.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
