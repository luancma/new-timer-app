import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Heading, Paragraph, Text } from "grommet";
import { useLunchTimer } from "../hooks/useLunchTimer";
import { useWorkingTimer } from "../hooks/useWorkingTimer";
import { ModalContext } from "../context/ModalContext";
import { LunchButton } from "../components/LunchButton";
import { JobButton } from "../components/JobButton";
import { WorkHistory } from "../components/WorkHistory";
import { formatTimer } from "../utils/formatTimer";
import { TimerCounter } from "../components/TimerCounter";

export function Home() {
  const modalContext = useContext(ModalContext);

  const { seconds, minutes, hours, startTimer, stopTimer, isCounting } =
    useWorkingTimer();

  const {
    seconds: lunchSeconds,
    minutes: lunchMinutes,
    hours: lunchHours,
    startTimer: startLunchTimer,
    stopTimer: stopLunchTimer,
    isCounting: isCountingLunchTime,
  } = useLunchTimer();

  const [jobDetails, setJobDetails] = useState({
    id: 1,
    userName: "Usuário 1",
    expectedHours: "08:00:00",
    lunch: {
      start: 0,
      exit: 0,
    },
    job: {
      start: 0,
      exit: 0,
    },
    haveFinished: false,
  });

  const handleSetStartJob = () => {
    return setJobDetails({
      ...jobDetails,
      job: {
        ...jobDetails.job,
        start: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    });
  };

  const handleSetStartLunch = () => {
    setJobDetails({
      ...jobDetails,
      lunch: {
        ...jobDetails.lunch,
        start: `${new Date().getHours()}:${
          new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : new Date().getMinutes()
        }`,
      },
    });
    startLunchTimer();
  };

  const handleSetExitLunch = () => {
    setJobDetails({
      ...jobDetails,
      lunch: {
        ...jobDetails.lunch,
        exit: `${new Date().getHours()}:${formatTimer(
          new Date().getMinutes()
        )}`,
      },
    });
  };

  const handleFinishJob = () => {
    return modalContext.handleOpenModal(
      "Você tem certeza que deseja finalizar seu expediente?",
      "work"
    );
  };

  const handleFinishLunch = () => {
    return modalContext.handleOpenModal(
      "Você tem certeza que deseja finalizar seu horário de almoço?",
      "lunch"
    );
  };

  const setFunctionToCloseModal = useCallback(() => {
    if (
      modalContext.alertModal.isOpen &&
      modalContext.alertModal.type === "work"
    ) {
      const closeModal = () => {
        if (jobDetails.lunch.start && isCountingLunchTime) {
          setJobDetails({
            ...jobDetails,
            lunch: {
              ...jobDetails.lunch,
              exit: `${new Date().getHours()}:${formatTimer(
                new Date().getMinutes()
              )}`,
            },
            job: {
              ...jobDetails.job,
              exit: `${new Date().getHours()}:${formatTimer(
                new Date().getMinutes()
              )}`,
            },
          });
          stopTimer();
          stopLunchTimer();
          return modalContext.handleCloseModal();
        }

        setJobDetails({
          ...jobDetails,
          job: {
            ...jobDetails.job,
            exit: `${new Date().getHours()}:${formatTimer(
              new Date().getMinutes()
            )}`,
          },
        });
        stopTimer();
        return modalContext.handleCloseModal();
      };
      return modalContext.setCloseFunctionModal(closeModal);
    }
    if (
      modalContext.alertModal.isOpen &&
      modalContext.alertModal.type === "lunch"
    ) {
      const closeModal = () => {
        handleSetExitLunch();
        stopLunchTimer();
        modalContext.handleCloseModal();
      };
      return modalContext.setCloseFunctionModal(closeModal);
    }
  }, [
    jobDetails.job,
    jobDetails.lunch.start,
    modalContext.alertModal.isOpen,
    modalContext.alertModal.type,
    isCountingLunchTime,
    jobDetails,
  ]);

  function startWorkTime() {
    handleSetStartJob();
    return startTimer();
  }

  const validateLunchTime = () =>
    !isCounting || (jobDetails.lunch.start && !isCountingLunchTime);

  useEffect(() => {
    return setFunctionToCloseModal();
  }, [setFunctionToCloseModal]);

  return (
    <Box
      direction="column"
      justify="center"
      align="center"
      animation={{
        type: "fadeIn",
        delay: 0,
        duration: 1000,
      }}
    >
      <Box className="container_wrapper">
        <TimerCounter
          expectedHours={jobDetails.expectedHours}
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          lunchSeconds={lunchSeconds}
          lunchMinutes={lunchMinutes}
          lunchHours={lunchHours}
          isCounting={isCounting}
          isCountingLunchTime={isCountingLunchTime}
        />
        <Text
          weight="bold"
          size="2xl"
          textAlign="center"
          margin={{
            vertical: "24px",
          }}
        >
          Bem vindo, {jobDetails.userName}
        </Text>
        <Box direction="row" gap="small" justify="center">
          <JobButton
            isCounting={isCounting}
            handleFinishJob={handleFinishJob}
            startWorkTime={startWorkTime}
          />

          <LunchButton
            isDisable={validateLunchTime()}
            isCountingLunchTime={isCountingLunchTime}
            stopLunchTimer={handleFinishLunch}
            startLunchTimer={handleSetStartLunch}
          />
        </Box>

        <WorkHistory
          jobStart={jobDetails.job.start}
          jobEnd={jobDetails.job.exit}
          lunchStart={jobDetails.lunch.start}
          lunchEnd={jobDetails.lunch.exit}
        />
      </Box>
    </Box>
  );
}
