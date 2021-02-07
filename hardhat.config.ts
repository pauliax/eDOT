import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";

// // The next line is part of the sample project, you don't need it in your
// // project. It imports a Hardhat task definition, that can be used for
// // testing the frontend.
import "./tasks/faucet";

const config: HardhatUserConfig = {
  solidity: "0.7.6",
  // defaultNetwork: "hardhat",
};

export default config;
