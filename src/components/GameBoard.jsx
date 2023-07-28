import React, { useEffect, useCallback, useState } from "react";
import "./GameBoard.css";
import Card from "./Card";
import AnimalData from "./Items";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

function GameBoard({ isFinished, setIsFinished }) {
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isSelectCard, setIsSelectCard] = useState(false);
  const [items, setItems] = useState([...AnimalData]);
  const [LoadItem, setLoadItem] = useState(true);
  const [moves, setMoves] = useState(0);
  const navigate = useNavigate();

  const resetTurn = useCallback(() => {
    setIsSelectCard(false);
    setFirstCard(null);
    setSecondCard(null);
    setMoves(moves + 1);
  }, [moves]);

  useEffect(() => {
    setItems(shuffleCards(AnimalData));
  }, []);

  useEffect(() => {
    if (isFinished) {
      navigate("/Result");
      setIsFinished(false);
    }
  }, [isFinished, navigate, setIsFinished]);

  useEffect(() => {
    if (firstCard != null && secondCard != null) {
      setIsSelectCard(true);
      if (firstCard.name === secondCard.name) {
        setItems((prevItems) => {
          return prevItems.map((item) => {
            if (item.name === firstCard.name) {
              return { ...item, isMatched: true };
            }
            return item;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [firstCard, secondCard, setIsSelectCard, resetTurn]);

  const shuffleCards = (array) => {
    const shuffledArray = [...array, ...array]
      .sort(() => Math.random() - 0.5)
      .map((item) => {
        return { ...item, id: Math.random() };
      });
    return shuffledArray;
  };

  useEffect(() => {
    if (items.every((item) => item.isMatched === true)) {
      setIsFinished(true);
    }
  }, [items, setIsFinished]);

  const handleCardClick = (card) => {
    if (firstCard == null) {
      setFirstCard(card);
    } else if (secondCard == null) {
      setSecondCard(card);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadItem(false);
    }, 5000);
  }, []);

  return (
    <div className="content">
      <div className="memory-game">
        <div className="memory-game-content">
          <div className="memory-game-board">
            {LoadItem && (
              <div className="loading">
                <ReactLoading
                  type={"spinningBubbles"}
                  color="black"
                  height={80}
                  width={80}
                />
              </div>
            )}
            <div className="memory-game-board-row">
              {items.map((item) => (
                <Card
                  key={item.id}
                  card={item}
                  onClick={() => {
                    handleCardClick(item);
                  }}
                  isSelectCard={isSelectCard}
                  isMatched={item === firstCard || item === secondCard}
                  flip={firstCard === item || secondCard === item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
