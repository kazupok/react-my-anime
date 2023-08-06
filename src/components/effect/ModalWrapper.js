// ModalWrapper.js

import React from "react";
import { useModal } from "../../contexts/ModalContext";
import Modal from "react-modal";
import "./ModalWrapper.css";
import CustomButtonOnClick from "../button/CustomButtonOnClick";
import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");

const ModalWrapper = ({ children, className }) => {
  const { modalOpen, closeModal } = useModal();

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      className={className}
      overlayClassName="Overlay"
    >
      <div className="modal-inner-content">
        <div className="scrollable-content">{children}</div>
        <CustomButtonOnClick
          backgroundColor="rgba(0,0,0,0.5)"
          borderColor="#007fff"
          textColor="white"
          className="bt-pos-abs close-button"
          onClick={closeModal}
        >
          <IoClose size={25} className="close-button-icon"/>
        </CustomButtonOnClick>
      </div>
    </Modal>
  );
};

export default ModalWrapper;
