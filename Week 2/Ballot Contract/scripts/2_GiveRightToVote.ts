import { ethers } from "hardhat";

async function main() {
    const [contractAddress] = process.argv.slice(2);
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];
    const player = accounts[1];

    console.log(`Giving right to vote to "${player.address}"`);
    const ballotContract = await ethers.getContractAt("Ballot", contractAddress, deployer);
    const tx = await ballotContract.giveRightToVote(player.address);
    await tx.wait(1);
    const voter = await ballotContract.voters(player.address);

    console.log(`Voter "${player.address}" have right to vote with weight "${voter.weight}"`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
