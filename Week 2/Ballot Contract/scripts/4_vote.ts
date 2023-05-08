import { ethers } from "hardhat";

async function main() {
    const [contractAddress, votingProposal] = process.argv.slice(2);
    const accounts = await ethers.getSigners();
    const deployer = accounts[0];
    const player = accounts[1];

    console.log(`Voting for a proposal`);
    const ballotContract = await ethers.getContractAt("Ballot", contractAddress, deployer);

    console.log(`Before voting ..........`);
    let proposal = await ballotContract.proposals(votingProposal);
    console.log(
        `${ethers.utils.parseBytes32String(proposal.name)} vote count: ${proposal.voteCount}`
    );

    const playerBallotContract = ballotContract.connect(player);
    const tx = await playerBallotContract.vote(votingProposal);
    await tx.wait(1);
    console.log(`${player.address} voted for ${ethers.utils.parseBytes32String(proposal.name)}`);

    console.log(`After voting ..........`);
    proposal = await ballotContract.proposals(votingProposal);
    console.log(
        `${ethers.utils.parseBytes32String(proposal.name)} vote count: ${proposal.voteCount}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
