import { Box } from "grommet";
import { useWorkingTimer } from "./hooks/useWorkingTimer";

const ourJSON = [
  {
    id: 1,
    userName: 'Usuário 1',
    expectedHours: "08:00:00",
  }
]

function App() {
  const { seconds, minutes, hours, startTimer, stopTimer } = useWorkingTimer();
  const formatText = (time) => `${time < 10 ? `0${time}` : time}`;

  return (
    <Box direction="column" justify="center" align="center">
      <Box
        direction="row"
        justify="center"
        animation={{
          type: "fadeIn",
          delay: 0,
          duration: 1000,
        }}
      >
        <h1>{formatText(seconds)}:{formatText(minutes)}:{formatText(hours)}</h1>
      </Box>

      <h1>Bem vindo, Usuário</h1>
    </Box>
  );
}

export default App;
