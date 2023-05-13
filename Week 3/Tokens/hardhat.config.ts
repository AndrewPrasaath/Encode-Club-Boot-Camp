import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: { tests: "tests" },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  },
};

export default config;
