import React from "react";
import GameBar from "../components/GameBar";
import GameBoard from "../components/GameBoard";

function Content({ userName, isFinished, setIsFinished }) {
  return (
    <>
      <GameBar userName={userName} isFinished={isFinished} />
      <GameBoard isFinished={isFinished} setIsFinished={setIsFinished} />
    </>
  );
}

export default Content;
