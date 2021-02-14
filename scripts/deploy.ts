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

  // We also save the contract artifacts and addresses in the frontend directory
  saveFrontendFiles
  (
    uFragments,
    uFragmentsPolicy,
    orchestrator,
    medianOracle
  );
}

function saveFrontendFiles(
  uFragments: Contract,
  uFragmentsPolicy: Contract,
  orchestrator: Contract,
  medianOracle: Contract,
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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
