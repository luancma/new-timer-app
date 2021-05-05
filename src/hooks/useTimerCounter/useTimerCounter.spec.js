import { renderHook, act } from "@testing-library/react-hooks";
import { useTimerCounter } from "./useTimerCounter";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("Shold test the seconds increment", () => {
  it("should start with 0 seconds", () => {
    const { result } = renderHook(() => useTimerCounter());
    expect(result.current.seconds).toBe(0);
  });

  it("Should increment the seconds in 20", () => {
    const { result } = renderHook(() => useTimerCounter());
    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.runTimersToTime(20000);
    });

    expect(result.current.seconds).toEqual(20);
  });

  it("Should reset the seconds after 60 seconds", () => {
    const { result } = renderHook(() => useTimerCounter());
    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.runTimersToTime(1000 * 60);
    });
    expect(result.current.seconds).toEqual(0);
  });

  it("Should reset the seconds after 60 seconds and increment the minutes", () => {
    const { result } = renderHook(() => useTimerCounter());
    act(() => {
      result.current.startTimer();
    });

    const currentMinutes = result.current.minutes;

    act(() => {
      jest.runTimersToTime(1000 * 60);
    });

    expect(result.current.seconds).toEqual(0);
    expect(result.current.minutes).toEqual(currentMinutes + 1);
  });

  it("Should increment the hours after 60 minutes", () => {
    const { result } = renderHook(() => useTimerCounter());
    act(() => {
      result.current.startTimer();
    });

    const currentHours = result.current.hours;

    act(() => {
      jest.runTimersToTime(1000 * 60 * 60);
    });

    expect(result.current.seconds).toEqual(0);
    expect(result.current.minutes).toEqual(0);
    expect(result.current.hours).toEqual(currentHours + 1);
  });

  it("Should reset the timer and stop the clock", () => {
    const { result } = renderHook(() => useTimerCounter());
    act(() => {
      result.current.startTimer();
      result.current.stopTimer();
    });

    expect(result.current.isCounting).toEqual(false);
    expect(result.current.seconds).toEqual(0);
    expect(result.current.minutes).toEqual(0);
    expect(result.current.hours).toEqual(0);
  });
});
