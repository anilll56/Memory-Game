import React, { useState } from "react";
import "./Card.css";
import { useEffect } from "react";
import { GrCheckmark } from "react-icons/gr";
const Card = ({
  card,
  onClick,
  isSelectCard,
  isMatched,
  corretCards,
  flip,
}) => {
  // "isSelectCard" ve "isMatched" prop'larını kullanarak kartın başlangıç durumunu belirleyin.

  const handleCardClick = () => {
    if (!isSelectCard) {
      onClick(card);
    }
  };
  return (
    <div>
      {card.isMatched ? (
        <div className="card-matched">
          <div className="card-item-container">
            <div className="card-item-matched">
              <img className="card-item-img" src={card.img} alt={card.name} />
            </div>
            <GrCheckmark className="card-item-check" />
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-item">
            {flip ? (
              <div className="card-item-front">
                <img className="card-item-img" src={card.img} alt="resim" />
              </div>
            ) : (
              <div className="card-item-back" onClick={handleCardClick}>
                {card.name}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
