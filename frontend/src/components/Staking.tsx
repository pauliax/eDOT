import { useState, useContext } from "react";
import { Web3Context } from "../contexts/Context";

type StakingData = {
  amount?: number | string;
};

export function Staking() {
  const [isStaking, setIsStaking] = useState<boolean>(true);

  const [stakingData, setStakingData] = useState<StakingData>({
    amount: "",
  });

  const { balance, symbol } = useContext(Web3Context);

  const onMaxClick = () => {
    const amount = balance?.toString();
    setStakingData({ ...stakingData, amount });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setStakingData({ ...stakingData, [name]: value });
  };

  const handleRadioButtonChange = (e: any) => {
    setIsStaking(!isStaking);
  };

  return (
    <div>
      <h4 className="text-center">Staking</h4>
      <div className="nes-badge is-splited">
        <span className="is-dark">APY</span>
        <span className="is-success">40%</span>
      </div>
      <div className="my-4">
        <label>
          <input
            type="radio"
            className="nes-radio mr-3"
            name="stakeAction"
            checked={isStaking}
            onChange={handleRadioButtonChange}
          />
          <span>Stake</span>
        </label>
        <label>
          <input
            type="radio"
            className="nes-radio ml-3"
            name="stakeAction"
            checked={!isStaking}
            onChange={handleRadioButtonChange}
          />
          <span>Unstake</span>
        </label>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const { amount } = stakingData;

          if (!amount || amount === "0") {
            alert("Amount is invalid!");
          } else {
            alert("(Un)Staking is not yet implemented!");
          }
        }}
      >
        <div className="form-group nes-field">
          <label htmlFor="amount_field">Amount of {symbol}</label>
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
            value={stakingData.amount}
          />
          <div className="text-right">
            <button
              type="button"
              className="nes-btn btn-small is-warning"
              onClick={() => onMaxClick()}
            >
              MAX
            </button>
            <p className="text-left">
              Staked amount: <span>0</span>
            </p>
          </div>
        </div>
        <div className="form-group">
          <input
            className={"btn nes-btn " + (isStaking ? "is-primary" : "is-error")}
            type="submit"
            value={isStaking ? "Stake" : "Unstake"}
          />
        </div>
      </form>
    </div>
  );
}
