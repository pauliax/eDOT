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
    console.log("max");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setStakingData({ ...stakingData, [name]: value });
  };

  const handleRadioButtonChange = (e: any) => {
    setIsStaking(!isStaking);
  };

  const stakeTokens = () => {
    const { amount } = stakingData;
    if (!amount || amount === "0") {
      alert("Amount is invalid!");
    } else {
      alert("(Un)Staking is not yet implemented!");
    }
    console.log("stake");
  };

  return (
    <div>
      <h4 className="text-center">
        <span className="nes-text is-success">#</span> Staking
      </h4>
      <p className="text-center my-4">
        Stake eDOT tokens to receive non-elastic govDOT tokens that can be used
        for governance purpose. Unstake eDOT tokens to get them back and stop
        receiving govDOT tokens. <a href="#top">Read more here</a>.
      </p>
      <div className="nes-badge w-100 my-5">
        <span className="is-error w-100">COMING SOON!</span>
      </div>
      <div className="coming-soon">
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
            stakeTokens();
          }}
        >
          <div className="form-group nes-field">
            <label htmlFor="amount_stake_field">Amount of {symbol}</label>
            <input
              id="amount_stake_field"
              className="nes-input"
              type="number"
              step="any"
              min="0"
              name="amount"
              placeholder="1"
              required
              onChange={handleInputChange}
              value={stakingData.amount}
              disabled={true}
            />
            <div className="text-right">
              <button
                type="button"
                className="nes-btn btn-small is-disabled"
                onClick={() => onMaxClick()}
                disabled={true}
              >
                MAX
              </button>
              <p className="text-left">
                Total staked amount: <span>0</span>
              </p>
            </div>
          </div>
          <div className="form-group">
            <input
              className={
                "btn nes-btn " + (isStaking ? "is-primary" : "is-error")
              }
              type="submit"
              value={isStaking ? "Stake" : "Unstake"}
              disabled={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
