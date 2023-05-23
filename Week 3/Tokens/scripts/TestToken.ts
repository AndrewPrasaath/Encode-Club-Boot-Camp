import { ethers } from "hardhat";
import { AndrewERC20Token__factory } from "../typechain-types";

async function main() {
  const [deployer, acc1, acc2] = await ethers.getSigners();
  const contractFactory = new AndrewERC20Token__factory(deployer);
  const contract = await contractFactory.deploy();
  const receipt = await contract.deployTransaction.wait();
  console.log(
    `Token deployed to the address ${contract.address} at the block ${receipt.blockNumber}`
  );
  const minterRole = await contract.MINTER_ROLE();
  console.log(`MINTER_ROLE tag: ${minterRole}`);
  const giveRoleTx = await contract.grantRole(minterRole, acc1.address);
  await giveRoleTx.wait();
  const tx = await contract.connect(acc1).mint(acc2.address, 2);
  const txReceipt = await tx.wait();
  console.log(`Tokens minted at Tx hash ${txReceipt.blockHash}`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
