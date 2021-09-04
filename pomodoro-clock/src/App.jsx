import "./App.scss";
import { useState } from "react";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerType] = useState("Session");

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
  };

  const incrementBreak = () =>
    setBreakLength(breakLength < 60 ? breakLength + 1 : breakLength);

  const decrementBreak = () =>
    setBreakLength(breakLength > 1 ? breakLength - 1 : breakLength);

  const incrementSession = () =>
    setSessionLength(sessionLength < 60 ? sessionLength + 1 : sessionLength);

  const decrementSession = () =>
    setSessionLength(sessionLength > 1 ? sessionLength - 1 : sessionLength);

  return (
    <div id="container">
      <div id="title">25 + 5 clock</div>
      <Config
        breakLength={breakLength}
        sessionLength={sessionLength}
        incrementSession={incrementSession}
        decrementSession={decrementSession}
        decrementBreak={decrementBreak}
        incrementBreak={incrementBreak}
      />
      <Timer reset={reset} timerType={timerType} />
    </div>
  );
};

const Config = (props) => {
  return (
    <div>
      <div id="break-config" className="config">
        <label id="break-label">Break Length</label>
        <div>
          <button id="break-decrement" onClick={props.decrementBreak}>
            -
          </button>
          &nbsp;
          <p id="break-length">{props.breakLength}</p>&nbsp;
          <button id="break-increment" onClick={props.incrementBreak}>
            +
          </button>
        </div>
      </div>
      <div id="session-config" className="config">
        <label id="session-label">Session Length</label>
        <div>
          <button id="session-decrement" onClick={props.decrementSession}>
            -
          </button>
          &nbsp;
          <p id="session-length">{props.sessionLength}</p>&nbsp;
          <button id="session-increment" onClick={props.incrementSession}>
            +
          </button>
        </div>
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

  return (
    <div>
      <div id="timer">
        <div id="timer-label">{props.timerType}</div>
        <div id="time-left">25:00</div>
      </div>
      <div id="timer-control">
        <button id="start_stop" onClick={handleStartStop}>
          {startStopText}
        </button>
        <button id="reset" onClick={props.reset}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default App;
