import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseUnits("20");

async function main() {
  const [deployer, acc1, acc2] = await ethers.getSigners();
  // Contract deployment
  const contractFactory = new MyERC20Votes__factory(deployer);
  const contract = await contractFactory.deploy();
  const deployTxReceipt = await contract.deployTransaction.wait();
  console.log(
    `The contract was deployed at address ${contract.address} at the block ${deployTxReceipt.blockNumber}`
  );
  // Minting Tokens
  const mintTx = await contract.mint(acc1.address, MINT_VALUE);
  const mintTxReceipt = await mintTx.wait();
  console.log(
    `Minting ${ethers.utils.formatUnits(MINT_VALUE)} tokens to the address ${
      contract.address
    } at block ${mintTxReceipt.blockNumber}`
  );
  // Account token balance
  const balance = await contract.balanceOf(acc1.address);
  console.log(
    `Account ${acc1.address} has ${ethers.utils.formatUnits(
      balance
    )} MyERC20Tokens`
  );
  // Voting power
  const votesBefore = await contract.getVotes(acc1.address);
  console.log(
    `Account ${acc1.address} has ${ethers.utils.formatUnits(
      votesBefore
    )} units of voting power before self delegating`
  );
  const delegateTx = await contract.connect(acc1).delegate(acc1.address); // self delegating to activating the voting checkpoint
  await delegateTx.wait();
  const votesAfter = await contract.getVotes(acc1.address);
  console.log(
    `Account ${acc1.address} has ${ethers.utils.formatUnits(
      votesAfter
    )} units of voting power after self delegating`
  );
  const transferTx = await contract
    .connect(acc1)
    .transfer(acc2.address, MINT_VALUE.div(2));
  await transferTx.wait();
  const votes1AfterTransfer = await contract.getVotes(acc1.address);
  console.log(
    `Account ${acc1.address} has ${ethers.utils.formatUnits(
      votes1AfterTransfer
    )} units of voting power after transferring`
  );
  const votes2AfterTransfer = await contract.getVotes(acc2.address);
  console.log(
    `Account ${acc2.address} has ${ethers.utils.formatUnits(
      votes2AfterTransfer
    )} units of voting power after receiving a transfer` // this account will have zero voting power because of not self delegating
  );
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
