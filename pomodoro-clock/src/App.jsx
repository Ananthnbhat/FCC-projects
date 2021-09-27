import "./App.scss";
import { useState, useEffect } from "react";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerType, setTimerType] = useState("SESSION");
  const [timerStatus, setTimerStatus] = useState(false);

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

  const changeTimerStatus = () =>
    setTimerStatus(timerStatus === false ? true : false);

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
        timerStatus={timerStatus}
      />
      <Timer
        reset={reset}
        timerType={timerType}
        breakLength={breakLength}
        sessionLength={sessionLength}
        changeTimerStatus={changeTimerStatus}
      />
    </div>
  );
};

const Config = (props) => {
  return (
    <div>
      <div id="break-config" className="config">
        <label id="break-label">Break Length</label>
        <div>
          <button
            id="break-decrement"
            onClick={props.decrementBreak}
            disabled={props.timerStatus}
          >
            -
          </button>
          &nbsp;
          <p id="break-length">{props.breakLength}</p>&nbsp;
          <button
            id="break-increment"
            onClick={props.incrementBreak}
            disabled={props.timerStatus}
          >
            +
          </button>
        </div>
      </div>
      <div id="session-config" className="config">
        <label id="session-label">Session Length</label>
        <div>
          <button
            id="session-decrement"
            onClick={props.decrementSession}
            disabled={props.timerStatus}
          >
            -
          </button>
          &nbsp;
          <p id="session-length">{props.sessionLength}</p>&nbsp;
          <button
            id="session-increment"
            onClick={props.incrementSession}
            disabled={props.timerStatus}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const Timer = (props) => {
  const [startStop, setStartStop] = useState("START");
  const [sessionMin, setSessionMin] = useState(props.sessionLength);
  const [sessionSec, setSessionSec] = useState(0);
  const [breakMin, setBreakMin] = useState(props.breakLength);
  const [breakSec, setBreakSec] = useState(0);

  const handleStartStop = () => {
    if (startStop === "START") {
      setStartStop("PAUSE");
      props.changeTimerStatus();
    } else {
      setStartStop("START");
      props.changeTimerStatus();
    }
  };

  const handleReset = () => {
    if (startStop === "PAUSE") handleStartStop();
    props.reset();
    if (sessionMin != props.sessionLength) resetSession();
  };

  const resetSession = () => {
    setSessionMin(props.sessionLength);
    setSessionSec(0);
  };

  useEffect(() => {
    if (startStop === "START") {
      resetSession();
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [props.sessionLength]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (sessionSec > 0) {
        setSessionSec(sessionSec - 1);
      }
      if (sessionSec === 0) {
        if (sessionMin === 0) {
          clearInterval(myInterval);
        } else {
          setSessionMin(sessionMin - 1);
          setSessionSec(59);
        }
      }
    }, 1000);
    if (startStop === "START") {
      clearInterval(myInterval);
      return;
    }
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      <div id="timer">
        <div id="timer-label">{props.timerType}</div>
        {props.timerType === "SESSION" ? (
          <div id="time-left">
            {sessionMin < 10 ? `0${sessionMin}` : sessionMin}:
            {sessionSec < 10 ? `0${sessionSec}` : sessionSec}
          </div>
        ) : (
          <div id="time-left">
            {breakMin < 10 ? `0${breakMin}` : breakMin}:
            {breakSec < 10 ? `0${breakSec}` : breakSec}
          </div>
        )}
      </div>
      <div id="timer-control">
        <button id="start_stop" onClick={handleStartStop}>
          {startStop}
        </button>
        <button id="reset" onClick={handleReset}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default App;
