import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Propoasal 1", "Proposal 2", "Proposal 3", "Proposal 4", "Proposal 5"];

function convertStrArrToBytes32(propoasals: string[]) {
    const bytes32Arr = [];
    for (let i = 0; i < propoasals.length; i++) {
        bytes32Arr.push(ethers.utils.formatBytes32String(propoasals[i]));
    }
    return bytes32Arr;
}

describe("Ballot", () => {
    let ballotContract: Ballot, deployer: any, player: any, playerAddress: any, signers: any;

    beforeEach(async () => {
        signers = await ethers.getSigners();
        deployer = signers[0];
        player = signers[1];
        playerAddress = player.address;

        const ballotContractFactory = await ethers.getContractFactory("Ballot");
        ballotContract = (await ballotContractFactory.deploy(
            convertStrArrToBytes32(PROPOSALS)
        )) as Ballot;
        await ballotContract.deployed();
    });

    describe("when the contract is deployed", () => {
        it("has the provided proposals", async () => {
            for (let i = 0; i < PROPOSALS.length; i++) {
                const proposal = await ballotContract.proposals(i);
                expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(PROPOSALS[i]);
            }
        });
        it("has zero votes for all proposals", async () => {
            for (let i = 0; i < PROPOSALS.length; i++) {
                const proposal = await ballotContract.proposals(i);
                expect(proposal.voteCount).to.eq(0);
            }
        });
        it("sets deployer as chairperson", async () => {
            const chairperson = await ballotContract.chairperson();
            expect(chairperson).to.eq(deployer.address);
        });
        it("sets voting weight for chairperson as 1", async () => {
            const chairperson = await ballotContract.chairperson();
            const chairpersonWeight = (await ballotContract.voters(chairperson)).weight;
            expect(chairpersonWeight).to.eq(1);
        });
    });

    describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
        it("gives right to vote for another address", async function () {
            const voterBefore = await ballotContract.voters(playerAddress);
            assert.equal(voterBefore.weight.toString(), "0");
            await ballotContract.giveRightToVote(playerAddress);
            const voterAfter = await ballotContract.voters(playerAddress);
            expect(voterAfter.weight).to.eq(1);
        });
        it("can not give right to vote for someone that has voted", async function () {
            await ballotContract.giveRightToVote(playerAddress);
            const playerBallotContract = await ballotContract.connect(player);
            await playerBallotContract.vote(1);
            await expect(ballotContract.giveRightToVote(playerAddress)).to.be.revertedWith(
                "The voter already voted."
            );
        });
        it("can not give right to vote for someone that has already voting rights", async function () {
            await expect(ballotContract.giveRightToVote(deployer.address)).to.be.reverted;
        });
    });

    describe("when the voter interact with the vote function in the contract", function () {
        it("should register the vote", async () => {
            await ballotContract.vote(1);
            const proposalVoted = await ballotContract.proposals(1);
            const voter = await ballotContract.voters(deployer.address);
            expect(proposalVoted.voteCount).to.eq(1);
            expect(voter.voted).to.eq(true);
            expect(voter.vote).to.eq(1);
        });
    });

    describe("when the voter interact with the delegate function in the contract", function () {
        it("should transfer voting power", async () => {
            await expect(ballotContract.delegate(playerAddress)).to.be.reverted;

            await ballotContract.giveRightToVote(playerAddress);
            await ballotContract.delegate(playerAddress);

            const sender = await ballotContract.voters(deployer.address);
            const delegate = await ballotContract.voters(playerAddress);

            expect(sender.voted).to.eq(true);
            expect(sender.delegate).to.eq(playerAddress);
            expect(delegate.weight).to.eq(2);
        });
    });

    describe("when an attacker interact with the giveRightToVote function in the contract", function () {
        it("should revert", async () => {
            const attackerBallotContract = ballotContract.connect(player);
            await expect(attackerBallotContract.giveRightToVote(playerAddress)).to.be.revertedWith(
                "Only chairperson can give right to vote."
            );
        });
    });

    describe("when the an attacker interact with the vote function in the contract", function () {
        it("should revert", async () => {
            const attackerBallotContract = ballotContract.connect(player);
            await expect(attackerBallotContract.vote("1")).to.be.revertedWith(
                "Has no right to vote"
            );
        });
    });

    describe("when the an attacker interact with the delegate function in the contract", function () {
        it("should revert", async () => {
            const attackerBallotContract = ballotContract.connect(player);
            await expect(attackerBallotContract.delegate(playerAddress)).to.be.revertedWith(
                "You have no right to vote"
            );
        });
    });

    describe("when someone interact with the winningProposal function before any votes are cast", function () {
        it("should return 0", async () => {
            const winningProposal = await ballotContract.winningProposal();
            expect(winningProposal).to.eq(0);
        });
    });

    describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
        it("should return 0", async () => {
            await ballotContract.vote("0");
            const winningProposal = await ballotContract.winningProposal();
            expect(winningProposal).to.eq(0);
        });
    });

    describe("when someone interact with the winnerName function before any votes are cast", function () {
        it("should return name of proposal 0", async () => {
            const winnerName = await ballotContract.winnerName();
            const firstProposal = await ballotContract.proposals(0);
            expect(winnerName).to.eq(firstProposal.name);
        });
    });

    describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
        it("should return name of proposal 0", async () => {
            await ballotContract.vote("0");
            const winnerName = await ballotContract.winnerName();
            const firstProposal = await ballotContract.proposals(0);
            expect(winnerName).to.eq(firstProposal.name);
        });
    });

    describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
        let count: number, voters: any;
        beforeEach(async () => {
            count = 5;
            voters = [];
            const startSigner = 2;
            for (let i = startSigner; i < startSigner + count; i++) {
                const voter = signers[i];
                voters.push(voter);
            }
        });
        it("should return the name of the winner proposal", async () => {
            for (let i = 0; i < count; i++) {
                await ballotContract.giveRightToVote(voters[i].address);
                const voterBallotContract = ballotContract.connect(voters[i]);
                await voterBallotContract.vote(i); // one vote for each proposal
            }
            await ballotContract.vote("1"); // this makes proposal 2 to be the winner

            const winningProposal = await ballotContract.winningProposal();
            const winnerName = await ballotContract.winnerName();
            const proposal = await ballotContract.proposals(1);

            expect(winningProposal).to.eq(1);
            expect(winnerName).to.eq(proposal.name);
        });
    });
});
