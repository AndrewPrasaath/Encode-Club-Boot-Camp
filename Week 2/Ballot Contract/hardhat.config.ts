import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";
import * as dotenv from "dotenv";
dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const PLAYER_PRIVATE_KEY = process.env.PLAYER_PRIVATE_KEY ?? "";
const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL;

const config: HardhatUserConfig = {
    defaultNetwork: "sepolia", // Change this to hardhat for tests
    networks: {
        hardhat: {},
        // goerli: {
        //     url: ALCHEMY_RPC_URL,
        //     accounts: [PRIVATE_KEY],
        //     chainId: 5,
        // },
        sepolia: {
            url: ALCHEMY_RPC_URL,
            accounts: [PRIVATE_KEY, PLAYER_PRIVATE_KEY],
            chainId: 11155111,
        },
    },
    solidity: "0.8.18",
    paths: { tests: "tests" },
    mocha: {
        timeout: 200000,
    },
};

export default config;
