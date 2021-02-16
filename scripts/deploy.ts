import { ethers, network, artifacts, upgrades } from "hardhat";
import * as fs from "fs";
import { Contract } from "ethers";

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'",
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress(),
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // set init params
  const owner = await deployer.getAddress();
  const BASE_CPI = ethers.utils.parseUnits("1", 20);

  // deploy UFragments
  const uFragments = await (
    await upgrades.deployProxy(
      (await ethers.getContractFactory("UFragments")).connect(deployer),
      [owner],
      {
        initializer: "initialize(address)",
      },
    )
  ).deployed();
  console.log("UFragments deployed to:", uFragments.address);

  // deploy Policy
  const uFragmentsPolicy = await (
    await upgrades.deployProxy(
      (await ethers.getContractFactory("UFragmentsPolicy")).connect(deployer),
      [owner, uFragments.address, BASE_CPI.toString()],
      {
        initializer: "initialize(address,address,uint256)",
      },
    )
  ).deployed();
  console.log("UFragmentsPolicy deployed to:", uFragmentsPolicy.address);

  // deploy Orchestrator
  const orchestrator = await (await ethers.getContractFactory("Orchestrator"))
    .connect(deployer)
    .deploy(uFragmentsPolicy.address);
  console.log("Orchestrator deployed to:", orchestrator.address);

  // deploy oracle
  const reportExpirationTimeSec_ = 86400; // 1 day
  const reportDelaySec_ = 60; // 1 minute
  const minimumProviders_ = 1; // min 1 provider

  const MedianOracle = await ethers.getContractFactory("MedianOracle");
  const medianOracle = await MedianOracle.deploy(
    reportExpirationTimeSec_,
    reportDelaySec_,
    minimumProviders_,
  );
  await medianOracle.deployed();
  console.log("Median Oracle address:", medianOracle.address);

  // authorize owner as oracle data provider
  await medianOracle.addProvider(owner);

  // Deploy staking contracts
  const MockERC20 = await ethers.getContractFactory("MockERC20");

  const token1 = await MockERC20.deploy("eDOT/BNB LP Token", "eDOT/BNB");
  await token1.deployed();
  console.log("token1 address:", token1.address);

  const token2 = await MockERC20.deploy("eDOT/BUSD LP Token", "eDOT/BUSD");
  await token2.deployed();
  console.log("token2 address:", token2.address);

  const token3 = await MockERC20.deploy("eDOT/ETH LP Token", "eDOT/ETH");
  await token3.deployed();
  console.log("token3 address:", token3.address);

  const token4 = await MockERC20.deploy("eDOT/LINK LP Token", "eDOT/LINK");
  await token4.deployed();
  console.log("token4 address:", token4.address);

  const token5 = await MockERC20.deploy("eDOT/CAKE LP Token", "eDOT/CAKE");
  await token5.deployed();
  console.log("token5 address:", token5.address);

  // deploy FarmController
  const farmController = await (
    await upgrades.deployProxy(
      (await ethers.getContractFactory("FarmController")).connect(deployer),
      [uFragments.address],
      {
        initializer: "initialize(address)",
      },
    )
  ).deployed();
  console.log("FarmController deployed to:", farmController.address);

  await farmController.addFarm(token1.address);
  await farmController.addFarm(token2.address);
  await farmController.addFarm(token3.address);
  await farmController.addFarm(token4.address);
  await farmController.addFarm(token5.address);

  await farmController.setRates([3, 3, 2, 1, 1]);

  // Allocate 10% of total supply to the initial farms
  const ownerBalance = await uFragments.balanceOf(owner);
  const INITIAL_REWARDS = ownerBalance.div(10);
  console.log(
    "Balance, INITIAL_REWARDS:",
    ownerBalance.toString(),
    INITIAL_REWARDS.toString(),
  );
  await uFragments.approve(farmController.address, INITIAL_REWARDS);
  await farmController.notifyRewards(INITIAL_REWARDS);

  //stake some tokens
  await token1.getFreeTokens(owner, ethers.utils.parseUnits("1", 18));
  await token2.getFreeTokens(owner, ethers.utils.parseUnits("2", 18));
  await token3.getFreeTokens(owner, ethers.utils.parseUnits("3", 18));
  await token4.getFreeTokens(owner, ethers.utils.parseUnits("4", 18));
  await token5.getFreeTokens(owner, ethers.utils.parseUnits("5", 18));
  const farm1Address = await farmController.farms(0);
  // const farm2Address = await farmController.farms(1);
  // const farm3Address = await farmController.farms(2);
  // const farm4Address = await farmController.farms(3);
  // const farm5Address = await farmController.farms(4);

  const LPFarmArtifact = artifacts.readArtifactSync("LPFarm");

  const farm1 = new ethers.Contract(farm1Address, LPFarmArtifact.abi, deployer);
  await token1.approve(farm1Address, ethers.utils.parseUnits("1", 18));
  await farm1.stake(ethers.utils.parseUnits("1", 18));
  console.log("DONE");

  // We also save the contract artifacts and addresses in the frontend directory
  saveFrontendFiles(
    uFragments,
    uFragmentsPolicy,
    orchestrator,
    medianOracle,
    token1,
    token2,
    token3,
    token4,
    token5,
    farmController,
  );
}

function saveFrontendFiles(
  uFragments: Contract,
  uFragmentsPolicy: Contract,
  orchestrator: Contract,
  medianOracle: Contract,
  token1: Contract,
  token2: Contract,
  token3: Contract,
  token4: Contract,
  token5: Contract,
  farmController: Contract,
) {
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify(
      {
        UFragments: uFragments.address,
        UFragmentsPolicy: uFragmentsPolicy.address,
        Orchestrator: orchestrator.address,
        MedianOracle: medianOracle.address,
        Token1: token1.address,
        Token2: token2.address,
        Token3: token3.address,
        Token4: token4.address,
        Token5: token5.address,
        FarmController: farmController.address,
      },
      undefined,
      2,
    ),
  );

  const UFragmentsArtifact = artifacts.readArtifactSync("UFragments");
  const UFragmentsPolicyArtifact = artifacts.readArtifactSync(
    "UFragmentsPolicy",
  );
  const OrchestratorArtifact = artifacts.readArtifactSync("Orchestrator");
  const MedianOracleArtifact = artifacts.readArtifactSync("MedianOracle");
  const MockERC20Artifact = artifacts.readArtifactSync("MockERC20");
  const FarmControllerArtifact = artifacts.readArtifactSync("FarmController");
  const LPFarmArtifact = artifacts.readArtifactSync("LPFarm");

  fs.writeFileSync(
    contractsDir + "/UFragments.json",
    JSON.stringify(UFragmentsArtifact, null, 2),
  );
  fs.writeFileSync(
    contractsDir + "/UFragmentsPolicy.json",
    JSON.stringify(UFragmentsPolicyArtifact, null, 2),
  );
  fs.writeFileSync(
    contractsDir + "/Orchestrator.json",
    JSON.stringify(OrchestratorArtifact, null, 2),
  );
  fs.writeFileSync(
    contractsDir + "/MedianOracle.json",
    JSON.stringify(MedianOracleArtifact, null, 2),
  );
  fs.writeFileSync(
    contractsDir + "/MockERC20Artifact.json",
    JSON.stringify(MockERC20Artifact, null, 2),
  );
  fs.writeFileSync(
    contractsDir + "/FarmControllerArtifact.json",
    JSON.stringify(FarmControllerArtifact, null, 2),
  );
  fs.writeFileSync(
    contractsDir + "/LPFarm.json",
    JSON.stringify(LPFarmArtifact, null, 2),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
