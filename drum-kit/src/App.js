import './App.scss';
import { useState, useEffect } from "react";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App() {

  const [inst, setInst] = useState("")

  const showInstrument = inst => {
    setInst(inst)
  }

  return (
    <div id="drum-machine">
      <>
        <DrumKit inst={showInstrument} />
      </>
      <div id="display">{inst}</div>
    </div>
  )
}

export default App;

const DrumKit = (props) => {

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => {
      document.removeEventListener('keydown', keyPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const keyPress = ({ keyCode }) => {
    playSound(bankOne.some(element => element.keyCode === keyCode) ? bankOne.find(element => element.keyCode === keyCode) : null)
  }

  const playSound = (obj) => {
    if (obj != null) {
      props.inst(obj.id)
      const audio = document.getElementById(obj.keyTrigger)
      audio.play()
    }
  }
  return (
    bankOne.map(item => {
      return (
        <div onClick={() => playSound(item)} data-key={item.keyCode} id={item.id} className="drum-pad" key={item.keyCode}>
          <kbd>{item.keyTrigger}</kbd>
          <audio data-key={item.keyCode} src={item.url} className="clip" id={item.keyTrigger}></audio>
        </div>
      );
    })
  )
}
