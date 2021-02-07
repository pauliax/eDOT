import { useState, useContext } from "react";
import { Web3Context } from "../contexts/Context";

import "../styles/transfer.scss";

type Props = {
  transferTokens: (to: string, amount: string) => void;
  tokenSymbol?: string;
};

type TransferData = {
  amount?: number | string;
  to?: string;
};

export function Transfer({ transferTokens, tokenSymbol }: Props) {
  const [transferData, setTransferData] = useState<TransferData>({
    amount: "",
    to: "",
  });

  const { balance } = useContext(Web3Context);

  const onMaxClick = () => {
    const amount = balance?.toString();
    setTransferData({ ...transferData, amount });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  return (
    <div>
      <h4>Transfer</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const { to, amount } = transferData;

          if (!amount || amount === "0") {
            alert("Amount is invalid!");
          } else if (!to) {
            alert("Address is invalid!");
          } else {
            transferTokens(to, amount.toString());
          }
        }}
      >
        <div className="form-group nes-field">
          <label htmlFor="amount_field">Amount of {tokenSymbol}</label>
          <input
            id="amount_field"
            className="nes-input"
            type="number"
            step="1"
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
          <label htmlFor="recipient_field">Recipient address</label>
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
