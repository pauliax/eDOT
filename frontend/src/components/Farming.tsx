import { Contract, ethers } from "ethers";
import { FarmCard } from "./FarmCard";
import { ContractsContext } from "../contexts/Context";
import { useContext, useState, useEffect, useCallback } from "react";

import LPFarmArtifact from "../contracts/LPFarm.json";
import MockERC20Artifact from "../contracts/MockERC20Artifact.json";

import { getThousands } from "../utils/NumberUtils";

import "../styles/farming.scss";

export type Farm = {
  avatarUrl?: string;
  lpPair?: string;
  APY?: number;
  rewards?: string;
  rate?: string;
  totalSupply?: string;
  tokensContract?: Contract;
  lpFarmContract?: Contract;
  decimals?: number;
};

export type FarmDetails = {
  lpPair?: string;
  lpBalance?: string;
  stakedAmount?: string;
  reward?: number;
};

export function Farming() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const { contractFarmController } = useContext(ContractsContext);

  const load = useCallback(async () => {
    if (!contractFarmController) return;

    const farmsCount = await contractFarmController.getFarmsCount();
    //console.log(farmsCount.toString());

    if (!farmsCount) return;

    let array = [];
    for (let i = 0; i < farmsCount; i++) {
      const farm = await contractFarmController.farms(i);
      const rate = await contractFarmController.rate(farm);
      //console.log(farm, rate.toString());

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const lpFarm = new ethers.Contract(
        farm,
        LPFarmArtifact.abi,
        provider.getSigner(0),
      );

      const stakeToken = await lpFarm.stakeToken();
      //const rewardPerToken = await lpFarm.rewardPerToken();
      //const periodFinish = await lpFarm.rewardPerTokenStored();
      const rewardRate = await lpFarm.rewardRate();
      const duration = await lpFarm.DURATION();
      const totalPerWeek = rewardRate.mul(duration);
      const totalPerWeekFormatted = ethers.utils.formatUnits(totalPerWeek, 9);
      const rewards = getThousands(Math.round(Number(totalPerWeekFormatted)));
      // console.log(
      //   "rewards",
      //   rewardPerToken.toString(),
      //   periodFinish.toString(),
      //   rewardRate.toString(),
      //   totalPerWeekFormatted.toString(),
      // );

      const avatars = [
        "nes-bulbasaur",
        "nes-charmander",
        "nes-squirtle",
        "nes-kirby",
        "nes-pokeball",
      ];

      const avatarsCount = avatars.length;
      const avatar = avatars[i % avatarsCount];

      const erc20Token = new ethers.Contract(
        stakeToken,
        MockERC20Artifact.abi,
        provider.getSigner(0),
      );

      //const name = await erc20Token.name();
      const symbol = await erc20Token.symbol();
      const decimals = await erc20Token.decimals();
      //console.log(name, symbol, decimals);

      const totalSupply = await lpFarm.totalSupply();
      const totalSupplyFormatted = ethers.utils.formatUnits(
        totalSupply,
        decimals,
      );
      const totalStaked = getThousands(
        Math.round(Number(totalSupplyFormatted)),
      );
      //console.log("ts: ", totalSupplyFormatted);

      const f: Farm = {
        avatarUrl: avatar,
        lpPair: symbol,
        APY: (i + 1) * 100,
        rewards: rewards,
        rate: rate.toString(),
        totalSupply: totalStaked,
        tokensContract: erc20Token,
        lpFarmContract: lpFarm,
        decimals: decimals,
      };

      array.push(f);
    }

    setFarms(array);
  }, [contractFarmController]);

  useEffect(() => {
    load();
  }, [load]);

  const farmsList = farms.map((farm) => (
    <FarmCard
      key={farm.lpPair}
      avatarUrl={farm.avatarUrl}
      lpPair={farm.lpPair}
      APY={farm.APY}
      rewards={farm.rewards}
      rate={farm.rate}
      totalSupply={farm.totalSupply}
      tokensContract={farm.tokensContract}
      lpFarmContract={farm.lpFarmContract}
      decimals={farm.decimals}
    />
  ));

  if (!farmsList) return <p>Unable to load farms.</p>;

  return (
    <div>
      <h4 className="text-center">
        <span className="nes-text is-error">#</span> Farming
      </h4>
      <p className="text-center my-4">
        Participate in the liquidity mining program. Deposit your LP tokens to
        farm eDOT token rewards. <a href="#top">Read more here</a>.
      </p>
      <div className="farm-container">{farmsList}</div>
    </div>
  );
}
