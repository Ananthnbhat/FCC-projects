import "./App.scss";
import { useState } from "react";

const App = () => {
  return (
    <div id="container">
      <div id="title">25 + 5 clock</div>
      <Config />
      <Timer />
    </div>
  );
};

const Config = (props) => {
  return (
    <div>
      <div id="break-config" className="config">
        Break Length
        <p>
          <button>-</button>&nbsp;05:00&nbsp;<button>+</button>
        </p>
      </div>
      <div id="session-config" className="config">
        Session Length
        <p>
          <button>-</button>&nbsp;25:00&nbsp;<button>+</button>
        </p>
      </div>
    </div>
  );
};

const Timer = (props) => {
  const [startStopText, setStartStopText] = useState("START");

  const handleStartStop = () => {
    startStopText === "START"
      ? setStartStopText("PAUSE")
      : setStartStopText("START");
  };

  const handleReset = () => {
    console.log("RESET button clicked");
  };

  return (
    <div>
      <div id="timer">
        <div id="timer-label">timer type</div>
        <div id="time-left">25:00</div>
      </div>
      <div id="timer-control">
        <button onClick={handleStartStop}>{startStopText}</button>
        <button onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
};

export default App;
