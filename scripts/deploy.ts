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

  // ethers is avaialble in the global scope
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

  const farm1 = await (
    await upgrades.deployProxy(
      (await ethers.getContractFactory("LPFarm")).connect(deployer),
      [token1.address, farmController.address],
      {
        initializer: "initialize(address, address)",
      },
    )
  ).deployed();
  console.log("LP farm 1 deployed to:", farm1.address);

  const farm2 = await (
    await upgrades.deployProxy(
      (await ethers.getContractFactory("LPFarm")).connect(deployer),
      [token2.address, farmController.address],
      {
        initializer: "initialize(address, address)",
      },
    )
  ).deployed();
  console.log("LP farm 2 deployed to:", farm2.address);

  const farm3 = await (
    await upgrades.deployProxy(
      (await ethers.getContractFactory("LPFarm")).connect(deployer),
      [token3.address, farmController.address],
      {
        initializer: "initialize(address, address)",
      },
    )
  ).deployed();
  console.log("LP farm 3 deployed to:", farm3.address);

  const farm4 = await (
    await upgrades.deployProxy(
      (await ethers.getContractFactory("LPFarm")).connect(deployer),
      [token4.address, farmController.address],
      {
        initializer: "initialize(address, address)",
      },
    )
  ).deployed();
  console.log("LP farm 4 deployed to:", farm4.address);

  const farm5 = await (
    await upgrades.deployProxy(
      (await ethers.getContractFactory("LPFarm")).connect(deployer),
      [token5.address, farmController.address],
      {
        initializer: "initialize(address, address)",
      },
    )
  ).deployed();
  console.log("LP farm 5 deployed to:", farm5.address);

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
    farm1,
    farm2,
    farm3,
    farm4,
    farm5,
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
  farm1: Contract,
  farm2: Contract,
  farm3: Contract,
  farm4: Contract,
  farm5: Contract,
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
        Farm1: farm1.address,
        Farm2: farm2.address,
        Farm3: farm3.address,
        Farm4: farm4.address,
        Farm5: farm5.address,
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
