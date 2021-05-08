import {
  Box,
  Button,
  Clock,
  Layer,
  List,
  Paragraph,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import { AlertModal } from "./components/Modal";
import { ModalProvider } from "./context/ModalContext";
import { Home } from "./pages/Home";

function App() {
  return (
    <ModalProvider>
      <Home />
      <AlertModal />
    </ModalProvider>
  );
}

export default App;
