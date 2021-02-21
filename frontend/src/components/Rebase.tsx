import { useContext } from "react";
import { ContractsContext, Web3Context } from "../contexts/Context";

export function Rebase() {
  const { contractOrchestrator } = useContext(ContractsContext);
  const { setIsProcessing } = useContext(Web3Context);

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
        Rebase. <a href="#top">Read more here</a>.
      </p>
      <div className="lists">
        <ul className="nes-list is-circle">
          <li>
            Minimum Rebase Interval —
            <strong className="nes-text is-error ml-4">100</strong> sec
          </li>
          <li>
            Last Rebase Timestamp —
            <strong className="nes-text is-error ml-4">
              2021-02-14T09:52:26+00:00
            </strong>{" "}
            UTC
          </li>
          <li>
            Rebase Window Offset In Seconds —
            <strong className="nes-text is-error ml-4">20</strong> sec
          </li>
          <li>
            Rebase Window Length In Seconds —
            <strong className="nes-text is-error ml-4">5</strong> sec
          </li>
          <li>
            Current Epoch —<strong className="nes-text is-error ml-4">2</strong>
          </li>
        </ul>
      </div>
      <div className="text-center">
        <button
          type="button"
          className="nes-btn is-success"
          onClick={() => onRebaseClick()}
        >
          Rebase
        </button>
      </div>
    </div>
  );
}
