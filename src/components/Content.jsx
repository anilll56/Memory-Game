import React from "react";
import GameBar from "./GameBar";
import GameBoard from "./GameBoard";

function Content({ userName, isFinished, setIsFinished }) {
  return (
    <>
      <GameBar userName={userName} isFinished={isFinished} />
      <GameBoard isFinished={isFinished} setIsFinished={setIsFinished} />
    </>
  );
}

export default Content;
