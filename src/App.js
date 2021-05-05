import React, { useState } from "react";
import { useTimerCounter } from "./hooks/useTimerCounter";

function App() {

  const { seconds, minutes, hours } = useTimerCounter()
  const [isCounting, setIsCounting] = useState(false)

  const startTimer = () => setIsCounting(true);
  const formatText = (time) => `${time < 10 ? `0${time}` : time}`

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <h1>{formatText(hours)}</h1>
      <h1>{formatText(minutes)}</h1>
      <h1>{formatText(seconds)}</h1>
    </div>
  )
}

export default App;
