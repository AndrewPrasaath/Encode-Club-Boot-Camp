import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";

describe("HelloWorld", () => {
    let helloWorldContract: HelloWorld

    beforeEach(async () => {
        const helloWorldContractFactory = await ethers.getContractFactory("HelloWorld");
        helloWorldContract = await helloWorldContractFactory.deploy() as HelloWorld
        await helloWorldContract.deployed()
    })

    describe("constructor", () => {
        it("should return 'Hello World' for text", async () => {
            const text = await helloWorldContract.helloWorld();
            assert.equal(text, "Hello World");
        })
        it("should set owner correctly", async () => {
            const deployer = (await ethers.getSigners())[0]
            const owner = await helloWorldContract.owner()
            expect(owner).to.equal(deployer.address);
        })
    })

    describe("setText", () => {

        it("should change text for specified argument", async () => {
            const tx = await helloWorldContract.setText("Hello World is modified")
            await tx.wait(1);
            const changedText = await helloWorldContract.helloWorld();
            expect(changedText).to.equal("Hello World is modified");
        }) 
    })

    describe("transferOwnership", () => {
        let accounts: any;

        beforeEach(async () => {
            accounts = await ethers.getSigners();
        })

        it("only owner should able to call the function", async () => {
            await expect(helloWorldContract.connect(accounts[1])
                    .transferOwnership(accounts[1].address))
                    .to.be.revertedWith("Caller is not the owner")
        })
        it("Should execute transferOwnership correctly", async () => {
            await helloWorldContract.transferOwnership(accounts[1].address);
            const newOwner = await helloWorldContract.owner();
            assert.equal(newOwner, accounts[1].address);
        })
    })
})