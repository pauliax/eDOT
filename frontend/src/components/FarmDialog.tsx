import { Contract, ethers } from "ethers";
import { useContext, useState, useEffect, useCallback } from "react";
import { ThemeContext, Web3Context } from "../contexts/Context";
import { getThousands } from "../utils/NumberUtils";

type Props = {
  lpPair?: string;
  showModal?: boolean;
  setShowModal?: (value: boolean) => void;
  tokensContract?: Contract;
  lpFarmContract?: Contract;
};

type FarmData = {
  enteredAmount?: number | string;
};

export function FarmDialog({
  lpPair,
  showModal,
  setShowModal,
  tokensContract,
  lpFarmContract,
}: Props) {
  const { isDarkTheme } = useContext(ThemeContext);
  const { selectedAddress } = useContext(Web3Context);
  const [farmData, setFarmData] = useState<FarmData>({ enteredAmount: "" });
  const [balance, setBalance] = useState("?");
  const [staked, setStaked] = useState("?");
  const [earned, setEarned] = useState("?");
  const freeTokens = "5000";
  const UINT_MAX =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  const loadBalance = useCallback(async () => {
    if (!selectedAddress || !tokensContract) return;
    const lpBalance = await tokensContract.balanceOf(selectedAddress);
    if (!lpBalance) setBalance("?");
    const num = Number(lpBalance.toString());
    setBalance(getThousands(num));
  }, [selectedAddress, tokensContract]);

  const loadStaked = useCallback(async () => {
    if (!selectedAddress || !lpFarmContract) return;
    const stakedBalance = await lpFarmContract.balanceOf(selectedAddress);
    if (!stakedBalance) setStaked("?");
    const num = Number(stakedBalance.toString());
    setStaked(getThousands(num));
  }, [selectedAddress, lpFarmContract]);

  const loadEarned = useCallback(async () => {
    if (!selectedAddress || !lpFarmContract) return;
    const earnedBalance = await lpFarmContract.earned(selectedAddress);
    if (!earnedBalance) setEarned("?");
    const num = Number(earnedBalance.toString());
    setEarned(getThousands(num));
  }, [selectedAddress, lpFarmContract]);

  useEffect(() => {
    loadBalance();
    loadStaked();
    loadEarned();
  }, [loadBalance, loadStaked, loadEarned]);

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

  const onDepositClick = async (e: any) => {
    e.preventDefault();
    if (
      lpFarmContract &&
      farmData?.enteredAmount &&
      tokensContract &&
      selectedAddress
    ) {
      const decimals = await tokensContract.decimals();
      const depositAmount = ethers.utils.parseUnits(
        farmData.enteredAmount.toString(),
        decimals,
      );
      const allowance = await tokensContract.allowance(
        selectedAddress,
        lpFarmContract.address,
      );
      console.log("allowance", allowance.toString());
      if (depositAmount > allowance) {
        const allowed = await tokensContract.approve(
          lpFarmContract.address,
          UINT_MAX,
        );
        console.log(allowed);
      }
      await lpFarmContract.stake(depositAmount);
    }
    console.log("stake", lpFarmContract, farmData?.enteredAmount);
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

  const onFaucetClick = async (e: any) => {
    e.preventDefault();
    if (tokensContract && selectedAddress) {
      const freeTokensWithDecimals = ethers.utils.parseUnits(freeTokens, 18); //TODO: load decimals from parent
      await tokensContract.getFreeTokens(
        selectedAddress,
        freeTokensWithDecimals,
      );
    }
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
              <u>{balance}</u>
            </p>
          </div>
          <div className="row justify-content-between">
            <strong>Staked Amount </strong>=
            <p>
              <u>{staked}</u>
            </p>
          </div>
          <div className="row justify-content-between">
            <strong>Earned Reward </strong>=
            <p>
              <u>{earned}</u>
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
