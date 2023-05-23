import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyERC20Votes.json';

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  contract: ethers.Contract;

  constructor() {
    this.provider = ethers.getDefaultProvider('sepolia');
    this.contract = new ethers.Contract(
      this.getContractAddress(),
      tokenJson.abi,
      this.provider,
    );
  }

  getHello(): string {
    return 'Hello World!';
  }
  getLastBlock(): Promise<ethers.providers.Block> {
    return this.provider.getBlock('latest');
  }
  getContractAddress() {
    return '0xAC153C69A089F4986942A4C09bce96A96a6bb424';
  }
  getTotalSupply() {
    return this.contract.getTotalSupply();
  }
  getBalance(address: string) {
    return this.contract.balanceOf(address);
  }
  async getReceipt(hash: string) {
    const tx = await this.provider.getTransaction(hash);
    const receipt = await tx.wait();
    return receipt;
  }
}
