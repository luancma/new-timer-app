import { Box, Button, Text } from "grommet";
import { Cafeteria } from "grommet-icons";

export const LunchButton = ({
  isCountingLunchTime,
  stopLunchTimer,
  startLunchTimer,
  isDisable,
}) => {
  return (
    <>
      {isCountingLunchTime ? (
        <Button
          disabled={isDisable}
          size="large"
          primary
          color="status-error"
          onClick={stopLunchTimer}
          className="button"
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
        />
      ) : (
        <Button
          disabled={isDisable}
          size="large"
          primary
          color="accent-4"
          onClick={startLunchTimer}
          className="button"
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
        />
      )}
    </>
  );
};
