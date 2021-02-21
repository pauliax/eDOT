import { ethers } from "ethers";
import { useContext, useState, useEffect, useCallback } from "react";
import { ContractsContext, Web3Context } from "../contexts/Context";
import {
  unixTimestampToDays,
  unixTimestampToDaysTime,
  mockLastRebaseTimestamp,
} from "../utils/TimeUtils";
import { getMillions } from "../utils/NumberUtils";

export function Rebase() {
  const API =
    "https://api.coingecko.com/api/v3/simple/price?ids=polkadot&vs_currencies=usd";

  const [epoch, setEpoch] = useState<string | undefined>(undefined);
  const [lastRebase, setLastRebase] = useState<string | undefined>(undefined);
  const [minRebaseInterval, setMinRebaseInterval] = useState<
    string | undefined
  >(undefined);
  const [rebaseWindowOffset, setRebaseWindowOffset] = useState<
    string | undefined
  >(undefined);
  const [rebaseWindowOffsetMax, setRebaseWindowOffsetMax] = useState<
    string | undefined
  >(undefined);
  const [polkadotUsd, setPolkadotUsd] = useState<number | undefined>(undefined);
  const [deviationThresholdPercent, setDeviationThresholdPercent] = useState<
    string | undefined
  >(undefined);
  const [totalSupply, setTotalSupply] = useState<string | undefined>(undefined);

  const { contractOrchestrator, uFragmentsPolicy, uFragments } = useContext(
    ContractsContext,
  );
  const { setIsProcessing } = useContext(Web3Context);

  const load = useCallback(async () => {
    if (!uFragmentsPolicy) return;

    const currentEpoch = await uFragmentsPolicy.epoch();
    setEpoch(currentEpoch.toString());

    const lastRebaseTimestampSec = await uFragmentsPolicy.lastRebaseTimestampSec();
    setLastRebase(lastRebaseTimestampSec.toString());

    const minRebaseTimeIntervalSec = await uFragmentsPolicy.minRebaseTimeIntervalSec();
    setMinRebaseInterval(minRebaseTimeIntervalSec.toString());

    const rebaseWindowOffsetSec = await uFragmentsPolicy.rebaseWindowOffsetSec();
    setRebaseWindowOffset(rebaseWindowOffsetSec.toString());

    const rebaseWindowLengthSec = await uFragmentsPolicy.rebaseWindowLengthSec();
    const max = rebaseWindowOffsetSec.add(rebaseWindowLengthSec);
    setRebaseWindowOffsetMax(max.toString());

    const deviationThreshold = await uFragmentsPolicy.deviationThreshold();
    const formattedDeviationThreshold = ethers.utils.formatUnits(
      deviationThreshold.toString(),
      16,
    ); // load decimals
    setDeviationThresholdPercent(formattedDeviationThreshold);

    if (!uFragments) return;

    const supply = await uFragments.totalSupply();
    const formattedSupply = ethers.utils.formatUnits(supply.toString(), 9); // load decimals
    const supplyFinal = getMillions(Math.round(Number(formattedSupply)));
    setTotalSupply(supplyFinal);
  }, [uFragmentsPolicy, uFragments]);

  const fetchPrice = useCallback(async () => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        const usd = data?.polkadot?.usd;
        setPolkadotUsd(usd);
      });
  }, [uFragmentsPolicy]);

  useEffect(() => {
    load();
    fetchPrice();
  }, [load, fetchPrice]);

  const onRebaseClick = async () => {
    if (!contractOrchestrator) return;
    try {
      if (setIsProcessing) setIsProcessing(true);
      const result = await contractOrchestrator.rebase();
      //.send({
      // from: selectedAddress
      //}, (err : any, txHash : any) => console.log(err, txHash));

      console.log("result: ", result);
      if (!result) return;

      if (result.status === true) {
        console.log("rebase false");
      } else {
        console.log("rebase true");
      }
    } catch (e) {
      console.log("Error", e.message, e);
    } finally {
      if (setIsProcessing) setIsProcessing(false);
    }
  };

  return (
    <div>
      <h4 className="text-center">
        <span className="nes-text is-warning">#</span> Rebase
      </h4>
      <p className="text-center my-4">
        Rebase parameters and analytics. Track the state of eDOT and make the
        best decisions. <a href="#top">Read more here</a>.
      </p>
      <div className="lists">
        <ul className="nes-list is-circle">
          <li>
            Current price of DOT —{" "}
            <strong className="nes-text is-error ml-4">${polkadotUsd}</strong>
          </li>
          <li>
            Current Total Supply —{" "}
            <strong className="nes-text is-error ml-4">{totalSupply}</strong>
          </li>
          <li>
            Current Epoch —{" "}
            <strong className="nes-text is-error ml-4">{epoch}</strong>
          </li>
          <li>
            Last Rebase —{" "}
            <strong className="nes-text is-error ml-4">
              {mockLastRebaseTimestamp()} UTC
            </strong>
          </li>
          <li>
            Rebase happens every{" "}
            <strong className="nes-text is-error ml-4">
              {unixTimestampToDays(minRebaseInterval)}
            </strong>{" "}
            at{" "}
            <strong className="nes-text is-error ml-4">
              {unixTimestampToDaysTime(rebaseWindowOffset)} -{" "}
              {unixTimestampToDaysTime(rebaseWindowOffsetMax)} UTC
            </strong>{" "}
            if the price deviation is not between{" "}
            <strong className="nes-text is-error ml-4">
              {deviationThresholdPercent} %
            </strong>{" "}
            threshold
          </li>
        </ul>
      </div>
      {/* <div className="text-center">
        <button
          type="button"
          className="nes-btn is-success"
          onClick={() => onRebaseClick()}
        >
          Rebase
        </button>
      </div> */}
    </div>
  );
}
