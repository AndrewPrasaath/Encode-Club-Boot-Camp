import { ethers } from "hardhat";

async function main() {
    const [contractAddress] = process.argv.slice(2);
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];
    const player = accounts[1];

    console.log(`Delegating voting right from "${deployer.address}" to "${player.address}"`);
    const ballotContract = await ethers.getContractAt("Ballot", contractAddress, deployer);

    console.log("Before delegation..........");
    let voter1 = await ballotContract.voters(deployer.address);
    let voter2 = await ballotContract.voters(player.address);
    console.log(`Is "${deployer.address}" voted? ${voter1.voted}`);
    console.log(`Is "${player.address}" voted? ${voter2.voted}`);
    console.log(`"${player.address}" weight: ${voter2.weight}`);

    const tx = await ballotContract.delegate(player.address);
    await tx.wait(1);

    console.log("After delegation..........");
    voter1 = await ballotContract.voters(deployer.address);
    voter2 = await ballotContract.voters(player.address);
    console.log(`Is "${deployer.address}" voted? ${voter1.voted}`);
    console.log(`Is "${player.address}" voted? ${voter2.voted}`);
    console.log(`"${player.address}" weight: ${voter2.weight}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
