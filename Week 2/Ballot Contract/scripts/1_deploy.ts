// import { ethers } from "ethers";
import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";

// const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
const network = "sepolia";

async function main() {
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    // console.log(`Connected to the address: ${wallet.address}`);

    // const provider = new ethers.providers.AlchemyProvider(network, process.env.ALCHEMY_API_KEY);
    // const latestBlock = await provider.getBlock("latest");
    // console.log(`Connected to the Block Number: ${latestBlock?.number}`);

    const deployer = (await ethers.getSigners())[0];
    const balance = await deployer.getBalance();
    console.log(`Balance of deployer: ${balance} WEI`);

    const propoasals = process.argv.slice(2);
    console.log("Deploying Ballot contract");
    console.log("Proposals: ");
    propoasals.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });

    const ballotContractFactory = new Ballot__factory(deployer);
    const ballotContract = await ballotContractFactory.deploy(
        propoasals.map(ethers.utils.formatBytes32String)
    );
    // await ballotContract.deployed();
    const deployTxReceipt = await ballotContract.deployTransaction.wait();
    // console.log(deployTxReceipt);
    console.log(
        `Ballot contract deployed at the address "${ballotContract.address}" at the blockNumber "${deployTxReceipt.blockNumber}"`
    );

    const chairperson = await ballotContract.chairperson();
    console.log(`Chairperson of the Ballot: ${chairperson}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
