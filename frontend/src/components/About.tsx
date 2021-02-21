import { useState, useContext } from "react";
import { ThemeContext } from "../contexts/Context";

export function About() {
  const { isDarkTheme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  return (
    <span>
      <button
        className="btn btn-link mx-4 theme-text p-0"
        onClick={toggleModal}
      >
        About
      </button>
      <dialog
        className={"nes-dialog is-rounded " + (isDarkTheme ? "is-dark" : "")}
        id="dialog-rounded"
        open={showModal}
      >
        <form method="dialog">
          <p className="title text-center">About</p>
          <p className="text-center">
            In short: eDOT is an elastic supply token pegged to the price of
            Polkadot (DOT) token using rebase (expansion and contraction)
            mechanism. That means user always owns the same fraction (%) of the
            eDOT supply despite the number of tokens (supply) periodically
            changing in his/her account.
          </p>
          <menu className="dialog-menu">
            <button className="nes-btn">Close</button>
          </menu>
        </form>
      </dialog>
    </span>
  );
}
