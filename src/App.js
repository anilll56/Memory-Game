import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegiserPage from "./components/RegiserPage";
import Content from "./components/Content";
import ResultPage from "./pages/ResultPage";

function App() {
  const [userName, setUserName] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RegiserPage
              userName={userName}
              setUserName={setUserName}
              isFinished={isFinished}
            />
          }
        ></Route>
        <Route
          path="/Game"
          element={
            <Content
              userName={userName}
              isFinished={isFinished}
              setIsFinished={setIsFinished}
            />
          }
        ></Route>
        <Route
          path="/Result"
          element={<ResultPage userName={userName} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
