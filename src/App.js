import { AlertModal } from "./components/Modal";
import { ModalProvider } from "./context/ModalContext";
import { Home } from "./pages/Home";
import "./styles.scss";

function App() {
  return (
    <ModalProvider>
      <Home />
      <AlertModal />
    </ModalProvider>
  );
}

export default App;
