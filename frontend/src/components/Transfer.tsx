import { ethers } from "ethers";
import { useState, useContext } from "react";
import { Web3Context } from "../contexts/Context";

import "../styles/transfer.scss";

type Props = {
  transferTokens: (to: string, amount: string) => Promise<void>;
};

type TransferData = {
  amount?: string;
  to?: string;
};

export function Transfer({ transferTokens }: Props) {
  const [transferData, setTransferData] = useState<TransferData>({
    amount: "",
    to: "",
  });

  const { balance, symbol } = useContext(Web3Context);

  const onMaxClick = () => {
    if (!balance) return;
    const amount = ethers.utils.formatUnits(balance.toString(), 9); //load decimals
    setTransferData({ ...transferData, amount });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const transferEnteredTokens = async () => {
    const { to, amount } = transferData;
    if (!amount || amount === "0") {
      alert("Amount is invalid!");
    } else if (!to) {
      alert("Address is invalid!");
    } else {
      const amountParsed = ethers.utils.parseUnits(amount, 9).toString(); // load edot decimals
      await transferTokens(to, amountParsed);
    }
  };

  return (
    <div>
      <h4 className="text-center">
        <span className="nes-text is-primary">#</span> Transfer
      </h4>
      <p className="text-center my-4">
        Transfer tokens to other users. Enter the recipient's address and amount
        you wish to transfer, approve and submit a transaction.{" "}
        <a href="#top">Read more here</a>.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          transferEnteredTokens();
        }}
      >
        <div className="form-group nes-field">
          <label htmlFor="amount_transfer_field">Amount of {symbol}</label>
          <input
            id="amount_transfer_field"
            className="nes-input"
            type="number"
            step="any"
            min="0"
            name="amount"
            placeholder="1"
            required
            onChange={handleInputChange}
            value={transferData.amount}
          />
          <div className="text-right">
            <button
              type="button"
              className="nes-btn btn-small is-warning"
              onClick={() => onMaxClick()}
            >
              MAX
            </button>
          </div>
        </div>
        <div className="form-group nes-field">
          <label htmlFor="recipient_field">Recipient's address</label>
          <input
            id="recipient_field"
            className="nes-input"
            type="text"
            name="to"
            placeholder="0x12345..."
            required
            onChange={handleInputChange}
            value={transferData.to}
          />
        </div>
        <div className="form-group">
          <input
            className="btn nes-btn is-primary"
            type="submit"
            value="Transfer"
          />
        </div>
      </form>
    </div>
  );
}
