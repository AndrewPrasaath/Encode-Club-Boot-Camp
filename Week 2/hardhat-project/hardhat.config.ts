import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/accounts"

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: { tests: "tests" },
  mocha: {
    timeout: 200000,
},
};

export default config;
