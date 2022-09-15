import React from "react";
import "./Modal.css";

const Modal = ({ children, canCancel, canConfirm, title }) => {
  return (
    <div className="modal">
      <header className="modal__header">
        <h1>{title}</h1>
      </header>
      <section className="modal__content">{children}</section>
      <section className="modal__actions">
        {canCancel && (
          <button className="btn" onClick={canCancel}>
            Cancel
          </button>
        )}
        {canConfirm && (
          <button className="btn" onClick={canConfirm}>
            Confirm
          </button>
        )}
      </section>
    </div>
  );
};

export default Modal;
