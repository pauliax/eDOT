import { FarmCard } from "./FarmCard";

import "../styles/farming.scss";

export function Farming() {
  return (
    <div className="farm-container">
      <FarmCard
        avatarUrl="nes-bulbasaur"
        lpPair="reDOT/BTC"
        APY={40}
        rewards="100k"
      />
      <FarmCard
        avatarUrl="nes-charmander"
        lpPair="reDOT/EOS"
        APY={15}
        rewards="2k"
      />
      <FarmCard
        avatarUrl="nes-squirtle"
        lpPair="reDOT/DAI"
        APY={300}
        rewards="57k"
      />
      <FarmCard
        avatarUrl="nes-kirby"
        lpPair="reDOT/LTC"
        APY={100}
        rewards="15k"
      />
      <FarmCard
        avatarUrl="nes-pokeball"
        lpPair="reDOT/BNB"
        APY={50}
        rewards="10k"
      />
    </div>
  );
}
