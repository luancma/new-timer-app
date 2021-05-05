import { useEffect, useState } from "react";
import { useInterval } from "./useInterval";

export function useTimerCounter() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useInterval(() => {
    setSeconds(seconds + 1);
  }, 10);

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
  };
}
