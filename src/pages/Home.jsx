import {
  Box,
  Button,
  Heading,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import { useLunchTimer } from "../hooks/useLunchTimer";
import { useWorkingTimer } from "../hooks/useWorkingTimer";
import { Cafeteria, Play, Stop } from "grommet-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";

export function Home() {
  const modalContext = useContext(ModalContext);

  const {
    seconds,
    minutes,
    hours,
    startTimer,
    stopTimer,
    isCounting,
  } = useWorkingTimer();

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
      end: 0,
      haveLunch: false,
    },
    job: {
      start: 0,
      exit: 0,
      workedOurs: 0,
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

  const handleSetExitJob = () => {
    return setJobDetails({
      ...jobDetails,
      job: {
        ...jobDetails.job,
        exit: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    });
  };

  const handleSetStartLunch = () => {
    return setJobDetails({
      ...jobDetails,
      lucnh: {
        ...jobDetails.lucnh,
        start: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    });
  };

  const handleSetExitLunch = () => {
    return setJobDetails({
      ...jobDetails,
      lucnh: {
        ...jobDetails.lucnh,
        exit: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    });
  };

  const formatText = (time) => `${time < 10 ? `0${time}` : time}`;

  const handleFinishJob = () => {
    return modalContext.handleOpenModal();
  };

  const setFunctionToCloseModal = useCallback(() => {
    if (modalContext.alertModal.isOpen) {
      const closeModal = () => {
        handleSetExitJob();
        stopTimer();
        modalContext.handleCloseModal();
      };
      return modalContext.setCloseFunctionModal(closeModal);
    }
  }, [modalContext.alertModal.isOpen]);

  function startWorkTime() {
    handleSetStartJob();
    return startTimer();
  }

  useEffect(() => {
    return setFunctionToCloseModal();
  }, [setFunctionToCloseModal]);

  console.log({ jobDetails });
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
      <Box width="1200px">
        <Box direction="row" justify="end" fill="horizontal">
          <Box>
            <Box direction="row" justify="center">
              <Paragraph
                margin="none"
                alignSelf="start"
                fill="horizontal"
                style={{ flex: 1 }}
              >
                Carga horária:
              </Paragraph>
              <Text margin="none" textAlign="center">
                {jobDetails.expectedHours}
              </Text>
            </Box>

            {isCounting && (
              <Box direction="row" justify="center">
                <Paragraph
                  margin="none"
                  alignSelf="start"
                  fill="horizontal"
                  style={{ flex: 1 }}
                >
                  Horas trabalhadas:
                </Paragraph>
                <Text margin="none" textAlign="center">
                  {formatText(hours)}:{formatText(minutes)}:
                  {formatText(seconds)}
                </Text>
              </Box>
            )}
            {isCountingLunchTime && (
              <Box direction="row" justify="center">
                <Paragraph
                  margin="none"
                  alignSelf="start"
                  fill="horizontal"
                  style={{ flex: 1 }}
                >
                  Horário de almoço:
                </Paragraph>
                <Text margin="none" textAlign="center">
                  {formatText(lunchHours)}:{formatText(lunchMinutes)}:
                  {formatText(lunchSeconds)}
                </Text>
              </Box>
            )}
          </Box>
        </Box>

        <Heading textAlign="center">Bem vindo, {jobDetails.userName}</Heading>

        <Box direction="row" gap="small" justify="center">
          {isCounting ? (
            <Button
              size="large"
              primary
              color="status-error"
              onClick={handleFinishJob}
              label={
                <Box
                  justify="center"
                  align="center"
                  animation={["fadeIn", "slideUp"]}
                >
                  <Stop color="#f8f8f8" size="xlarge" />
                  <Text size="xlarge">Finalizar</Text>
                </Box>
              }
              style={{ width: 240, height: 240 }}
            />
          ) : (
            <Button
              size="large"
              primary
              color="brand"
              onClick={startWorkTime}
              label={
                <Box
                  justify="center"
                  align="center"
                  animation={["fadeIn", "slideDown"]}
                >
                  <Play color="#f8f8f8" size="xlarge" />
                  <Text size="xlarge">Começar</Text>
                </Box>
              }
              style={{ width: 240, height: 240 }}
            />
          )}

          {isCountingLunchTime ? (
            <Button
              size="large"
              primary
              color="status-error"
              onClick={stopLunchTimer}
              label={
                <Box
                  justify="center"
                  align="center"
                  animation={["fadeIn", "slideUp"]}
                >
                  <Cafeteria color="light-1" size="xlarge" />
                  <Text color="light-1" size="xlarge">
                    Finalizar Almoço
                  </Text>
                </Box>
              }
              style={{ width: 240, height: 240 }}
            />
          ) : (
            <Button
              size="large"
              primary
              color="accent-4"
              onClick={startLunchTimer}
              label={
                <Box
                  justify="center"
                  align="center"
                  animation={["fadeIn", "slideDown"]}
                >
                  <Cafeteria color="dark-2" size="xlarge" />
                  <Text color="dark-2" size="xlarge">
                    Começar Almoço
                  </Text>
                </Box>
              }
              style={{ width: 240, height: 240 }}
            />
          )}
        </Box>

        <Box align="center" pad="large">
          <Table caption="Default Table">
            <TableHeader>
              <TableRow>
                <TableCell>
                  <Text>Nome</Text>
                </TableCell>
                <TableCell>
                  <Text>Horário</Text>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!!jobDetails.job.start && (
                <TableRow>
                  <TableCell>
                    <Text>Início do trabalho</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{jobDetails.job.start}</Text>
                  </TableCell>
                </TableRow>
              )}
              {!!jobDetails.job.exit && (
                <TableRow>
                  <TableCell>
                    <Text>Fim do trabalho</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{jobDetails.job.exit}</Text>
                  </TableCell>
                </TableRow>
              )}
              {/* <TableRow>
                <TableCell>
                  <Text>Fim do almoço</Text>
                </TableCell>
                <TableCell>
                  <Text>13:00</Text>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
