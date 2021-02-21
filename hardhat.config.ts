import dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "@openzeppelin/hardhat-upgrades";

// // The next line is part of the sample project, you don't need it in your
// // project. It imports a Hardhat task definition, that can be used for
// // testing the frontend.
import "./tasks/faucet";

const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;

const needsInfura =
  process.env.npm_config_argv &&
  (process.env.npm_config_argv.includes("rinkeby") ||
    process.env.npm_config_argv.includes("ropsten") ||
    process.env.npm_config_argv.includes("live") ||
    process.env.npm_config_argv.includes("bsctest"));

if ((!MNEMONIC || !INFURA_KEY) && needsInfura) {
  console.error("Please set a mnemonic and infura key.");
  process.exit(0);
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // defaultNetwork: "hardhat",
  // networks: {
  //   localhost: {
  //     chainId: 1337,
  //   },
  // },
  networks: {
    bsctest: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      chainId: 97,
      accounts: {
        mnemonic: MNEMONIC,
      },
      blockGasLimit: 30000000,
      gas: 30000000,
    },
  },
};

export default config;
