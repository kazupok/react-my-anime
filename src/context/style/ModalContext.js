import React, { createContext, useState, useContext } from "react";
import ModalWrapper from "../../components/effect/ModalWrapper";

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalClassName, setModalClassName] = useState("");

  const openModal = (content, className) => {
    setModalOpen(true);
    setModalContent(content);
    setModalClassName(className);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setModalClassName("");
  };

  return (
    <ModalContext.Provider
      value={{ modalOpen, openModal, closeModal, modalContent }}
    >
      {children}
      {modalOpen && (
        <ModalWrapper className={modalClassName}>
          {modalContent}
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);