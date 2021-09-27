import "./App.scss";
import { useState, useEffect, useRef } from "react";

const SESSION = "SESSION";
const BREAK = "BREAK";
const START = "START";
const PAUSE = "PAUSE";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerType, setTimerType] = useState(SESSION);
  const [timerStatus, setTimerStatus] = useState(false);

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerType(SESSION);
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

  const changeTimerType = (type) => setTimerType(type);

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
        changeTimerType={changeTimerType}
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
  const [startStop, setStartStop] = useState(START);
  const [sessionMin, setSessionMin] = useState(props.sessionLength);
  const [sessionSec, setSessionSec] = useState(0);
  const [breakMin, setBreakMin] = useState(props.breakLength);
  const [breakSec, setBreakSec] = useState(0);
  const beepAudio = useRef(null);

  const handleStartStop = () => {
    if (startStop === START) {
      setStartStop(PAUSE);
      props.changeTimerStatus();
    } else {
      setStartStop(START);
      props.changeTimerStatus();
    }
  };

  const handleReset = () => {
    if (startStop === PAUSE) handleStartStop();
    props.reset();
    if (sessionMin !== props.sessionLength) resetSession();
    beepAudio.current.pause();
    beepAudio.current.currentTime = 0;
  };

  const resetSession = () => {
    setSessionMin(props.sessionLength);
    setSessionSec(0);
    setBreakMin(props.breakLength);
    setBreakSec(0);
  };

  useEffect(() => {
    if (startStop === START) {
      setSessionMin(props.sessionLength);
      setSessionSec(0);
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [props.sessionLength]);

  useEffect(() => {
    if (startStop === START) {
      setBreakMin(props.breakLength);
      setBreakSec(0);
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [props.breakLength]);

  useEffect(() => {
    if (props.timerType === SESSION) {
      let myInterval = setInterval(() => {
        if (sessionSec > 0) {
          let newSessionSec = sessionSec - 1;
          if (newSessionSec === 0 && sessionMin === 0) {
            beepAudio.current.play();
          }
          setSessionSec(newSessionSec);
        }
        if (sessionSec === 0) {
          if (sessionMin === 0) {
            clearInterval(myInterval);
            resetSession();
            props.changeTimerType(BREAK);
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
    } else {
      //break starts here
      let myInterval = setInterval(() => {
        if (breakSec > 0) {
          let newBreakSec = breakSec - 1;
          if (newBreakSec === 0 && breakMin === 0) {
            beepAudio.current.play();
          }
          setBreakSec(newBreakSec);
        }
        if (breakSec === 0) {
          if (breakMin === 0) {
            clearInterval(myInterval);
            resetSession();
            props.changeTimerType(SESSION);
          } else {
            setBreakMin(breakMin - 1);
            setBreakSec(59);
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
    }
  });

  return (
    <div>
      <div id="timer">
        <div id="timer-label">{props.timerType}</div>
        {props.timerType === SESSION ? (
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
      <audio
        id="beep"
        preload="auto"
        ref={beepAudio}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default App;
