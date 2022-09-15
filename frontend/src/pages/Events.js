import React, { useState } from "react";
import BackDrop from "../components/BackDrop/BackDrop";
import Modal from "../components/Modal/Modal";
import "./Events.css";

const Events = () => {
  const [creating, setCreating] = useState(false);

  const eventCreatingHandler = () => {
    setCreating(true);
  };
  const modalCancelHandler = () => {
    setCreating(false);
  };
  const modalConfirmHandler = () => {
    setCreating(false);
  };

  return (
    <>
      {creating && <BackDrop />}
      {creating && (
        <Modal
          title="Create Event"
          canCancel={modalCancelHandler}
          canConfirm={modalConfirmHandler}
        >
          <p>Modal Content</p>
        </Modal>
      )}
      <section className="events-control">
        <p>Share your own Events!</p>
        <button className="btn" onClick={eventCreatingHandler}>
          Create Event
        </button>
      </section>
    </>
  );
};

export default Events;
