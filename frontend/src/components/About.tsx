import { useState } from "react";

export function About() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  return (
    <span>
      <button className="btn btn-link mx-4 dark-text p-0" onClick={toggleModal}>
        About
      </button>
      <dialog
        className="nes-dialog is-rounded"
        id="dialog-rounded"
        open={showModal}
      >
        <form method="dialog">
          <p className="title text-center">About</p>
          <p className="text-center">
            This is about text. Here we explain some details about this project.
          </p>
          <menu className="dialog-menu">
            <button className="nes-btn">Close</button>
          </menu>
        </form>
      </dialog>
    </span>
  );
}
