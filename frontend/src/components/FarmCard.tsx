import { Farm } from "./Farming";

export function FarmCard({ avatarUrl, lpPair, APY, rewards, rate }: Farm) {
  return (
    <section className="nes-container is-dark d-flex align-items-center">
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
      </div>
    </section>
  );
}
