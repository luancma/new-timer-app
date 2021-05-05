import { useEffect, useState } from "react";
import { useInterval } from "./useInterval";

export function useWorkingTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const startTimer = () => setIsCounting(true);

  const stopTimer = () => {
    setIsCounting(false)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  };

  useInterval(() => {
    if (isCounting) {
      setSeconds(seconds + 1);
    }
  }, isCounting ? 1000 : null);

  useEffect(() => {
    if (seconds > 59) {
      setSeconds(0);
      setMinutes(minutes + 1);
    }
    if (minutes > 59) {
      setMinutes(0);
      setHours(hours + 1);
    }
  }, [seconds, minutes, hours]);

  return {
    seconds,
    minutes,
    hours,
    isCounting,
    startTimer,
    stopTimer
  };
}
