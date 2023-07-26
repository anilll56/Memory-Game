import React from "react";
import "./Card.css";
import { TfiCheck } from "react-icons/tfi";
const Card = ({ card, onClick, isSelectCard, flip }) => {
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
            <TfiCheck className="card-item-check" />
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
                ?
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
