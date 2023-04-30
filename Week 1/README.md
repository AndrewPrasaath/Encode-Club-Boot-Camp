# Week 1 Assignment

## Task
- Interact with “HelloWorld.sol” within your group to change message strings and change owners
- Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed

## Function Executions
**Contract Deployed Address (Goerli Testnet):** [0x3774AC6DC02db6E265bff8fb37328947065f757D](https://goerli.etherscan.io/address/0x3774ac6dc02db6e265bff8fb37328947065f757d)

### State variables values after contract creation
text = "Hello World"\
owner = 0xE8b8f17e8A0F2D152200c8dC7FB0114A340dDb69

### Interaction with ***setText()***
1. `helloWorld()` returned "Hello World"
2. `setText()` is called with argument "Group 2". Transaction is successful.\
   **Transaction Hash:** [0xc9c0ee7ffc1e19b137c3804928b4db42cab044b6fb7581d47006ae33d5d21be9](https://goerli.etherscan.io/tx/0xc9c0ee7ffc1e19b137c3804928b4db42cab044b6fb7581d47006ae33d5d21be9)
3. Now,  `helloWorld()` returned "Group 2".

### Interaction with ***transferOwnership()***
1. `transferOwnership()` is called by the account `0xE8b8f17e8A0F2D152200c8dC7FB0114A340dDb69` with argument `0xe9C757DF8c8100C11bCBd3066981aBF69F605d63`. Transaction is successful.\
   **Transaction Hash:** [0xc07928e5b3d5552e6f98a315148af8bfc30cbef3213f10cb02e3cd4d9d1e94f6](https://goerli.etherscan.io/tx/0xc07928e5b3d5552e6f98a315148af8bfc30cbef3213f10cb02e3cd4d9d1e94f6)
2. `owner` now returns `0xe9C757DF8c8100C11bCBd3066981aBF69F605d63`.
3. Again `transferOwnership()` is called by the account `0xE8b8f17e8A0F2D152200c8dC7FB0114A340dDb69` with argument `0xe9C757DF8c8100C11bCBd3066981aBF69F605d63`. Transaction is fail with error "Caller is not the owner" because of `onlyOwner` modifier access restriction.\
   **Transaction Hash:** [0x43e49d11b96714c850b7014bff7cadcd83fc701bf673059ae90b34710edfc1b9](https://goerli.etherscan.io/tx/0x43e49d11b96714c850b7014bff7cadcd83fc701bf673059ae90b34710edfc1b9)