import { useTimerCounter } from "./hooks/useTimerCounter";

function App() {
  const { seconds, minutes, hours, startTimer, stopTimer } = useTimerCounter()
  const formatText = (time) => `${time < 10 ? `0${time}` : time}`;

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <h1>{formatText(hours)}</h1>
      <h1>{formatText(minutes)}</h1>
      <h1>{formatText(seconds)}</h1>
    </div>
  )
}

export default App;
