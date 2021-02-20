import { useState } from "react";
import { Farm } from "./Farming";
import { FarmDialog } from "./FarmDialog";

export function FarmCard({
  avatarUrl,
  lpPair,
  APY,
  rewards,
  rate,
  totalSupply,
  tokensContract,
  lpFarmContract,
}: Farm) {
  const [showModal, setShowModal] = useState(false);

  const openFarmDetails = () => {
    setShowModal(true);
  };

  return (
    <div>
      <section
        className="nes-container is-dark d-flex align-items-center item-scale"
        onClick={openFarmDetails}
      >
        {/* <img
            data-src="https://via.placeholder.com/100"
            alt="Farm"
            className="rounded-circle"
            src="https://via.placeholder.com/100"
        /> */}
        {/* <img 
            className="nes-avatar is-rounded is-large" 
            alt="Farm" 
            src={avatarUrl} 
            style={{imageRendering: "pixelated"}}
        /> */}
        <i className={avatarUrl}></i>
        <div className="farm-text">
          <h4 className="name">
            {lpPair}{" "}
            <span className="nes-badge w-auto">
              <span className="is-warning w-auto">{rate}x</span>
            </span>
          </h4>
          <div className="nes-badge is-splited">
            <span className="is-primary">APY</span>
            <span className="is-success">{APY}%</span>
          </div>
          <p>
            <span>{rewards}</span> / week <i className="nes-icon trophy"></i>
          </p>
          <p>
            <small className="nes-text is-disabled">
              Total staked: {totalSupply}
            </small>
          </p>
        </div>
      </section>
      <FarmDialog
        lpPair={lpPair}
        showModal={showModal}
        setShowModal={setShowModal}
        tokensContract={tokensContract}
        lpFarmContract={lpFarmContract}
      />
    </div>
  );
}
