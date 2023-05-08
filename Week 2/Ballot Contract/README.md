# Week 2 Assignment - Ballot.sol

## Setup
Run `yarn` to install all dependancies.\
Testnet used: Sepolia.\
Default network: Sepolia.\
Run `yarn hardhat test` to see test results (change default network to hardhat before running tests).
## Scripts & Contract Interaction
### Deployment
```
yarn run ts-node --files scripts/1_deploy.ts <proposal1> <proposal2> <...>
```
(example)
```
yarn run ts-node --files scripts/1_deploy.ts Judo Jujutsu Boxing
```
Deployed at: [0xf27A8620A82d37881dB2ef3eD868F8B98B497047](https://sepolia.etherscan.io/address/0xf27A8620A82d37881dB2ef3eD868F8B98B497047)\
Transaction hash: [0xbb61aea90e44a38547cbe50e1c1bef3ee4b375bcb586f2517f0808461d5cea09](https://sepolia.etherscan.io/tx/0xbb61aea90e44a38547cbe50e1c1bef3ee4b375bcb586f2517f0808461d5cea09)\
Console output:
```
Balance of deployer: 6796447348957183689 WEI
Deploying Ballot contract
Proposals: 
Proposal N. 1: Judo
Proposal N. 2: Jujutsu
Proposal N. 3: Boxing
Ballot contract deployed at the address "0xf27A8620A82d37881dB2ef3eD868F8B98B497047" at the blockNumber "3439181"
Chairperson of the Ballot: 0xE8b8f17e8A0F2D152200c8dC7FB0114A340dDb69
```

### Giving right to vote
```
yarn run ts-node --files scripts/2_GiveRightToVote.ts <contract address>
```
(example)
```
yarn run ts-node --files scripts/2_GiveRightToVote.ts 0xf27A8620A82d37881dB2ef3eD868F8B98B497047
```
Transaction hash: [0xb416cbb2344a2d22cae0ca779b3340994a2ac748e28d4ee4d44d7ba54711fbc8](https://sepolia.etherscan.io/tx/0xb416cbb2344a2d22cae0ca779b3340994a2ac748e28d4ee4d44d7ba54711fbc8)\
Console output:
```
Giving right to vote to "0xe9C757DF8c8100C11bCBd3066981aBF69F605d63"
Voter "0xe9C757DF8c8100C11bCBd3066981aBF69F605d63" have right to vote with weight "1"
```

### Vote Right Delegation
```
yarn run ts-node --files scripts/3_Delegate.ts <contract address>
```
(example)
```
yarn run ts-node --files scripts/3_Delegate.ts 0xf27A8620A82d37881dB2ef3eD868F8B98B497047
```
Transaction Hash: [0xedd7dd1f9d9236f49fa4c15bd09a1860cc63c3e3f07be8cf4f565477c4f4fc0c](https://sepolia.etherscan.io/tx/0xedd7dd1f9d9236f49fa4c15bd09a1860cc63c3e3f07be8cf4f565477c4f4fc0c)\
Console output:
```
Delegating voting rights from "0xE8b8f17e8A0F2D152200c8dC7FB0114A340dDb69" to "0xe9C757DF8c8100C11bCBd3066981aBF69F605d63"
Before delegation..........
Is "0xE8b8f17e8A0F2D152200c8dC7FB0114A340dDb69" voted? false
Is "0xe9C757DF8c8100C11bCBd3066981aBF69F605d63" voted? false
"0xe9C757DF8c8100C11bCBd3066981aBF69F605d63" weight: 1
After delegation..........
Is "0xE8b8f17e8A0F2D152200c8dC7FB0114A340dDb69" voted? true
Is "0xe9C757DF8c8100C11bCBd3066981aBF69F605d63" voted? false
"0xe9C757DF8c8100C11bCBd3066981aBF69F605d63" weight: 2
```

### Voting
```
yarn run ts-node --files scripts/4_vote.ts <contract address> <proposal>
```
(example)
```
yarn run ts-node --files scripts/4_vote.ts "0xf27A8620A82d37881dB2ef3eD868F8B98B497047" "1"
```
Transaction hash: [0x25594f1929a2c7ee94cb4dae8128f016b058dd44b7e74dd70ab9bb0146d64040](https://sepolia.etherscan.io/tx/0x25594f1929a2c7ee94cb4dae8128f016b058dd44b7e74dd70ab9bb0146d64040)\
Console output:
```
Voting for a proposal
Before voting ..........
Jujutsu vote count: 0
0xe9C757DF8c8100C11bCBd3066981aBF69F605d63 voted for Jujutsu
After voting ..........
Jujutsu vote count: 2
```

### Winning Proposal
```
yarn run ts-node --files scripts/5_Winner.ts <contract address>
```
(example)
```
yarn run ts-node --files scripts/5_Winner.ts 0xf27A8620A82d37881dB2ef3eD868F8B98B497047
```
Console output:
```
Winner Details:
Winning Proposal: 1
Proposal Name: Jujutsu
```