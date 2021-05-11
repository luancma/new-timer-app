import { Box, Button, Text } from "grommet";
import { Play, Stop } from "grommet-icons";

export const JobButton = ({ isCounting, handleFinishJob, startWorkTime }) => {
  return (
    <>
      {isCounting ? (
        <Button
          size="large"
          primary
          color="status-error"
          onClick={handleFinishJob}
          className="button"
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
        />
      ) : (
        <Button
          size="large"
          primary
          color="brand"
          onClick={startWorkTime}
          className="button"
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
        />
      )}
    </>
  );
};
