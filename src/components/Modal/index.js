import { Box, Button, Layer, Text } from "grommet";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export function AlertModal() {
  const modalContext = useContext(ModalContext);

  if (!modalContext.alertModal.isOpen) {
    return null;
  }

  return (
    <Layer>
      <Box
        align="center"
        justify="center"
        gap="small"
        direction="row"
        alignSelf="center"
        pad="large"
      >
        <Text>{modalContext.alertModal.message}</Text>
      </Box>
      <Box
        align="center"
        justify="center"
        gap="small"
        direction="row"
        alignSelf="center"
        pad="large"
      >
        <Button
          onClick={() => {
            return modalContext.handleCloseModal();
          }}
          primary
          style={{ width: 124 }}
          label="Não"
        />
        <Button
          onClick={() => {
            return modalContext.alertModal.closeFunction();
          }}
          color="status-critical"
          style={{ width: 124 }}
          label={<Text color="status-critical">Sim</Text>}
        />
      </Box>
    </Layer>
  );
}
