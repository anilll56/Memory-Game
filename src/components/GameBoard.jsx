import React, { useEffect } from "react";
import "./GameBoard.css";
import Card from "./Card";
import { useState } from "react";
import AnimalData from "./Items";
import { useNavigate } from "react-router-dom";

// afıza oyunu: 8x8 kareden oluşan rasgele dizilmiş çift resimlerin bularak tüm resimlerin yerlerini bulma oyunu yap
// 1. resimlerin yerlerini rasgele diz
// 2. resimlerin yerlerini bulma
// 3. resimlerin yerlerini bulduğunda eşleştiğini göster
// 4. resimlerin yerlerini bulduğunda eşleşmediğini göster
// 5. tüm resimlerin yerlerini bulduğunda oyunu bitir
// 6. oyunu bitirdiğinde skor tablosuna kaydet
// 7. skor tablosunu göster
// 8. skor tablosundan oyunu başlat (1. adıma git)

function GameBoard({ isFinished, setIsFinished }) {
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isSelectCard, setIsSelectCard] = useState(false);
  const [moves, setMoves] = useState(0);
  const navigate = useNavigate();
  const resetTurn = () => {
    setIsSelectCard(false);
    setFirstCard(null);
    setSecondCard(null);
    setMoves(moves + 1);
  };

  useEffect(() => {
    if (isFinished) {
      navigate("/Result");
      setIsFinished(false);
    }
  }, [isFinished]);

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
        console.log("Eşleşme var");
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  const shuffleCards = (array) => {
    const shuffledArray = [...array, ...array]
      .sort(() => Math.random() - 0.5)
      .map((item) => {
        return { ...item, id: Math.random() };
      });
    return shuffledArray;
  };

  const [items, setItems] = useState(shuffleCards(AnimalData));
  useEffect(() => {
    if (items.every((item) => item.isMatched === true)) {
      setIsFinished(true);
    }
  }, [items]);

  const handleCardClick = (card) => {
    if (firstCard == null) {
      setFirstCard(card);
    } else if (secondCard == null) {
      setSecondCard(card);
    }
  };

  return (
    <div className="content">
      <div className="memory-game">
        <div className="memory-game-content">
          <div className="memory-game-board">
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
          <div className="memory-game-footer">time </div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
