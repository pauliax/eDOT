import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/Context";

type Props = {
  lpPair?: string;
  showModal?: boolean;
  setShowModal?: (value: boolean) => void;
};

type FarmData = {
  enteredAmount?: number | string;
};

export function FarmDialog({ lpPair, showModal, setShowModal }: Props) {
  const { isDarkTheme } = useContext(ThemeContext);
  const [farmData, setFarmData] = useState<FarmData>({ enteredAmount: "" });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };

  const closeDialog = () => {
    if (setShowModal) setShowModal(false);
  };

  const onMaxClick = () => {
    const enteredAmount = 100; //balance?.toString();
    setFarmData({ ...farmData, enteredAmount });
    console.log("max");
  };

  const onDepositClick = (e: any) => {
    e.preventDefault();
    console.log("stake");
  };

  const onClaimClick = (e: any) => {
    e.preventDefault();
    console.log("claim");
  };

  const onWithdrawClick = (e: any) => {
    e.preventDefault();
    console.log("withdraw");
  };

  const onExitClick = (e: any) => {
    e.preventDefault();
    console.log("exit");
  };

  const onFaucetClick = (e: any) => {
    e.preventDefault();
    console.log("faucet");
  };

  return (
    <dialog
      className={
        "farm-dialog nes-dialog is-rounded " + (isDarkTheme ? "is-dark" : "")
      }
      id="dialog-rounded"
      open={showModal}
    >
      <form method="dialog">
        <i
          className={
            "nes-icon close text-right" + (isDarkTheme ? "is-primary" : "")
          }
          onClick={closeDialog}
        ></i>
        <p className="title text-center">
          <strong>{lpPair}</strong>
        </p>
        <p className="text-center nes-text is-disabled">⯬ Your Stats ⯮</p>
        <div className="container">
          <div className="row justify-content-between">
            <strong>LP Balance </strong>=
            <p>
              <u>200</u>
            </p>
          </div>
          <div className="row justify-content-between">
            <strong>Staked Amount </strong>=
            <p>
              <u>50</u>
            </p>
          </div>
          <div className="row justify-content-between">
            <strong>Earned Reward </strong>=
            <p>
              <u>0</u>
            </p>
          </div>
        </div>
        <div className="nes-field">
          <input
            type="number"
            className="nes-input"
            placeholder="Enter amount..."
            name="enteredAmount"
            required
            step="any"
            min="0"
            onChange={handleInputChange}
            value={farmData.enteredAmount}
          />
        </div>
        <div className="text-right">
          <button
            type="button"
            className="nes-btn btn-small is-warning"
            onClick={() => onMaxClick()}
            title="Fill maximum amount you have"
          >
            MAX
          </button>
        </div>
        <menu className="container mb-0">
          <div className="row justify-content-around">
            <button
              className="nes-btn is-primary farm-dlg-btn"
              title="Deposit tokens"
              onClick={(e) => onDepositClick(e)}
            >
              Deposit
            </button>
            <button
              className="nes-btn is-success farm-dlg-btn"
              title="Claim reward"
              onClick={(e) => onClaimClick(e)}
            >
              Claim
            </button>
          </div>
          <br />
          <div className="row justify-content-around">
            <button
              className="nes-btn is-warning farm-dlg-btn"
              title="Withdraw tokens"
              onClick={(e) => onWithdrawClick(e)}
            >
              Withdraw
            </button>
            <button
              className="nes-btn is-error farm-dlg-btn"
              title="Claim reward and withdraw tokens"
              onClick={(e) => onExitClick(e)}
            >
              Exit
            </button>
          </div>
          <button
            className="nes-btn mx-auto mt-4 d-block farm-dlg-btn"
            title="Get test tokens"
            onClick={(e) => onFaucetClick(e)}
          >
            Faucet
          </button>
        </menu>
      </form>
    </dialog>
  );
}
