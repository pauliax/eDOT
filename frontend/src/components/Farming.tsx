import { FarmCard } from "./FarmCard";

import "../styles/farming.scss";

export function Farming() {
  return (
    <div>
      <h4 className="text-center">
        <span className="nes-text is-error">#</span> Farming
      </h4>
      <p className="text-center my-4">
        Farm yields for APY. Choose LP token pairs you have and wish to farm and
        start earning weekly rewards. <a href="#top">Read more here</a>.
      </p>
      <div className="farm-container">
        <FarmCard
          avatarUrl="nes-bulbasaur"
          lpPair="eDOT/BTC"
          APY={40}
          rewards="100k"
        />
        <FarmCard
          avatarUrl="nes-charmander"
          lpPair="eDOT/EOS"
          APY={15}
          rewards="2k"
        />
        <FarmCard
          avatarUrl="nes-squirtle"
          lpPair="eDOT/DAI"
          APY={300}
          rewards="57k"
        />
        <FarmCard
          avatarUrl="nes-kirby"
          lpPair="eDOT/LTC"
          APY={100}
          rewards="15k"
        />
        <FarmCard
          avatarUrl="nes-pokeball"
          lpPair="eDOT/BNB"
          APY={50}
          rewards="10k"
        />
      </div>
    </div>
  );
}
