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
  decimals?: number;
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
  decimals,
}: Props) {
  const { isDarkTheme } = useContext(ThemeContext);
  const { selectedAddress, setIsProcessing } = useContext(Web3Context);
  const [farmData, setFarmData] = useState<FarmData>({ enteredAmount: "" });
  const [balance, setBalance] = useState(0);
  const [staked, setStaked] = useState(0);
  const [earned, setEarned] = useState(0);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const freeTokens = "5000";
  const UINT_MAX =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  const loadBalance = useCallback(async () => {
    if (!selectedAddress || !tokensContract || !decimals) return;
    const lpBalance = await tokensContract.balanceOf(selectedAddress);
    if (!lpBalance) {
      setBalance(0);
      return;
    }
    var stringVal = ethers.utils.formatUnits(lpBalance, decimals);
    const num = Number(stringVal);
    setBalance(num);
  }, [selectedAddress, tokensContract, decimals]);

  const loadStaked = useCallback(async () => {
    if (!selectedAddress || !lpFarmContract || !decimals) return;
    const stakedBalance = await lpFarmContract.balanceOf(selectedAddress);
    if (!stakedBalance) {
      setStaked(0);
      return;
    }
    var stringVal = ethers.utils.formatUnits(stakedBalance, decimals);
    const num = Number(stringVal);
    setStaked(num);
  }, [selectedAddress, lpFarmContract, decimals]);

  const loadEarned = useCallback(async () => {
    if (!selectedAddress || !lpFarmContract || !decimals) return;
    const earnedBalance = await lpFarmContract.earned(selectedAddress);
    if (!earnedBalance) {
      setEarned(0);
      return;
    }
    var stringVal = ethers.utils.formatUnits(earnedBalance, decimals);
    const num = Number(stringVal);
    setEarned(num);
  }, [selectedAddress, lpFarmContract, decimals]);

  useEffect(() => {
    loadBalance();
    loadStaked();
    loadEarned();
  }, [loadBalance, loadStaked, loadEarned, toggleUpdate]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFarmData({ ...farmData, [name]: value });
  };

  const closeDialog = () => {
    if (setShowModal) setShowModal(false);
  };

  const onMaxDepositClick = () => {
    const enteredAmount = balance;
    setFarmData({ ...farmData, enteredAmount });
    console.log("max");
  };

  const onMaxWithdrawClick = () => {
    const enteredAmount = staked;
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
      try {
        if (setIsProcessing) setIsProcessing(true);
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
        const tx = await lpFarmContract.stake(depositAmount);
        await tx.wait();
        setToggleUpdate(!toggleUpdate);
      } catch (e: any) {
        console.log("Error", e.message, e);
      } finally {
        if (setIsProcessing) setIsProcessing(false);
      }
    }
    if (!farmData?.enteredAmount) alert("Invalid amount entered!");
    console.log("stake");
  };

  const onClaimClick = async (e: any) => {
    e.preventDefault();
    if (lpFarmContract) {
      try {
        if (setIsProcessing) setIsProcessing(true);
        const tx = await lpFarmContract.getReward();
        await tx.wait();
        setToggleUpdate(!toggleUpdate);
      } catch (e: any) {
        console.log("Error", e.message, e);
      } finally {
        if (setIsProcessing) setIsProcessing(false);
      }
    }
    console.log("claim");
  };

  const onWithdrawClick = async (e: any) => {
    e.preventDefault();
    if (
      lpFarmContract &&
      farmData?.enteredAmount &&
      tokensContract &&
      selectedAddress
    ) {
      try {
        if (setIsProcessing) setIsProcessing(true);
        const decimals = await tokensContract.decimals();
        const withdrawAmount = ethers.utils.parseUnits(
          farmData.enteredAmount.toString(),
          decimals,
        );
        const tx = await lpFarmContract.withdraw(withdrawAmount);
        await tx.wait();
        setToggleUpdate(!toggleUpdate);
      } catch (e: any) {
        console.log("Error", e.message, e);
      } finally {
        if (setIsProcessing) setIsProcessing(false);
      }
    }
    if (!farmData?.enteredAmount) alert("Invalid amount entered!");
    console.log("withdraw");
  };

  const onExitClick = async (e: any) => {
    e.preventDefault();
    if (lpFarmContract) {
      try {
        if (setIsProcessing) setIsProcessing(true);
        const tx = await lpFarmContract.exit();
        await tx.wait();
        setToggleUpdate(!toggleUpdate);
      } catch (e: any) {
        console.log("Error", e.message, e);
      } finally {
        if (setIsProcessing) setIsProcessing(false);
      }
    }
    console.log("exit");
  };

  const onFaucetClick = async (e: any) => {
    e.preventDefault();
    if (!tokensContract || !selectedAddress || !decimals) return;
    const freeTokensWithDecimals = ethers.utils.parseUnits(
      freeTokens,
      decimals,
    );
    try {
      if (setIsProcessing) setIsProcessing(true);
      const tx = await tokensContract.getFreeTokens(
        selectedAddress,
        freeTokensWithDecimals,
      );
      await tx.wait();
      setToggleUpdate(!toggleUpdate);
    } catch (e: any) {
      console.log("Error", e.message, e);
    } finally {
      if (setIsProcessing) setIsProcessing(false);
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
              <u>{getThousands(balance)}</u>
            </p>
          </div>
          <div className="row justify-content-between">
            <strong>Staked Amount </strong>=
            <p>
              <u>{getThousands(staked)}</u>
            </p>
          </div>
          <div className="row justify-content-between">
            <strong>Earned Reward </strong>=
            <p>
              <u>{getThousands(earned)}</u>
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
            className="nes-btn btn-small is-primary"
            onClick={() => onMaxDepositClick()}
            title="Fill maximum deposit amount you have"
          >
            MAX
          </button>
          <button
            type="button"
            className="nes-btn btn-small is-warning"
            onClick={() => onMaxWithdrawClick()}
            title="Fill maximum withdraw amount you have"
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
