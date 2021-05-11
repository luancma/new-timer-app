import { Box, Paragraph, Text } from "grommet";
import { formatTimer } from "../../utils/formatTimer";

const style = {
  text: {
    marginLeft: 16,
  },
};

export function TimerCounter({
  expectedHours,
  isCounting,
  isCountingLunchTime,
  hours,
  seconds,
  minutes,
  lunchHours,
  lunchMinutes,
  lunchSeconds,
}) {
  return (
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
          <Text
            margin="none"
            textAlign="center"
            margin={{
              left: "16px",
            }}
          >
            {expectedHours}
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
            <Text
              margin="none"
              textAlign="center"
              margin={{
                left: "16px",
              }}
              size="medium"
            >
              {formatTimer(hours)}:{formatTimer(minutes)}:{formatTimer(seconds)}
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
            <Text
              margin="none"
              textAlign="center"
              margin={{
                left: "16px",
              }}
              size="medium"
            >
              {formatTimer(lunchHours)}:{formatTimer(lunchMinutes)}:
              {formatTimer(lunchSeconds)}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
