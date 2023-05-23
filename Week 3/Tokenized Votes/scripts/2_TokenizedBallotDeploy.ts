import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types/factories/contracts/TokenizedBallot.sol/TokenizedBallot__factory";

const tokenContractAddress = "0xf27A8620A82d37881dB2ef3eD868F8B98B497047";
const targetBlockNumber = ;

async function main() {
  const [deployer, acc1, acc2] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  console.log(`Balance of deployer: ${ethers.utils.formatUnits(balance)} WEI`);

  const propoasals = process.argv.slice(2);
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  propoasals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const ballotContractFactory = new TokenizedBallot__factory(deployer);
  const ballotContract = await ballotContractFactory.deploy(
    propoasals.map(ethers.utils.formatBytes32String),
    tokenContractAddress,
    targetBlockNumber
  );
  const deployTxReceipt = await ballotContract.deployTransaction.wait();
  console.log(
    `Ballot contract deployed at the address "${ballotContract.address}" at the blockNumber "${deployTxReceipt.blockNumber}"`
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
