import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { query } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('last-block')
  getLastBlock() {
    return this.appService.getLastBlock();
  }
  @Get('contract-address')
  getContractAddress() {
    return this.appService.getContractAddress();
  }
  @Get('total-supply')
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }
  @Get('balance/:address')
  getBalance(@Param('address') address: string) {
    return this.appService.getBalance(address);
  }
  @Get('receipt/:hash')
  async getReceipt(@Query('hash') hash: string) {
    return await this.appService.getReceipt(hash);
  }
}
