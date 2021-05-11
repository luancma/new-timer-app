import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

export function WorkHistory({ jobStart, jobEnd, lunchStart, lunchEnd }) {
  return (
    <Box align="center" pad="large">
      <Table caption="Histórico de trabalho">
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
          {!!jobStart && (
            <TableRow>
              <TableCell>
                <Text>Início do trabalho</Text>
              </TableCell>
              <TableCell>
                <Text>{jobStart}</Text>
              </TableCell>
            </TableRow>
          )}
          {!!lunchStart && (
            <TableRow>
              <TableCell>
                <Text>Início do almoço</Text>
              </TableCell>
              <TableCell>
                <Text>{lunchStart}</Text>
              </TableCell>
            </TableRow>
          )}
          {!!lunchEnd && (
            <TableRow>
              <TableCell>
                <Text>Fim do almoço</Text>
              </TableCell>
              <TableCell>
                <Text>{lunchEnd}</Text>
              </TableCell>
            </TableRow>
          )}
          {!!jobEnd && (
            <TableRow>
              <TableCell>
                <Text>Fim do trabalho</Text>
              </TableCell>
              <TableCell>
                <Text>{jobEnd}</Text>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
