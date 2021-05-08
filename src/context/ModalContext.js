import { createContext, useCallback, useContext, useState } from "react";

export const ModalContext = createContext([]);

export function ModalProvider({ children }) {
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    closeFunction: false,
    confirmFunction: false,
  });

  const handleCloseModal = useCallback(
    () => setAlertModal({ ...alertModal, isOpen: false }),
    [alertModal]
  );

  const handleOpenModal = useCallback(
    () => setAlertModal({ ...alertModal, isOpen: true }),
    [alertModal]
  );

  const setCloseFunctionModal = useCallback((closeFunction) => {
    return setAlertModal({ ...alertModal, closeFunction: closeFunction });
  }, [alertModal]);

  const setConfirmFunctionModal = useCallback((confirmFunction) => {
    setAlertModal({ ...alertModal, confirmFunction });
  }, [alertModal]);

  return (
    <ModalContext.Provider
      value={{
        alertModal,
        handleCloseModal,
        handleOpenModal,
        setCloseFunctionModal,
        setConfirmFunctionModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
