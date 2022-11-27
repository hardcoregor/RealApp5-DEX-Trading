const { expect } = require('chai');
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
};

describe("Token", () => {
    let token;
    let accounts;
    let deployer;
    let receiver;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory('Token');
        token = await Token.deploy("HardCore", "HRDCR", 1000000);
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1];
    })

    describe("Deployment", () => {
        const name = "HardCore";
        const symbol = "HRDCR";
        const decimals = 18;
        const supply = tokens(1000000);

        it("Token name are corrent", async () => {
            expect(await token.name()).to.eq(name);
        })

        it("Correct symbol", async () => {
            expect(await token.symbol()).to.eq(symbol);
        })

        it("It has correct decimals", async () => {
            expect(await token.decimals()).to.eq(decimals);
        })

        it("It has correct totalSupply", async () => {
            expect(await token.totalSupply()).to.eq(supply);
        })

        it("It assigns total supply to deployed", async () => {
            expect(await token.balanceOf(deployer.address)).to.eq(supply);
        })
    })

    describe("Sending tokens", () => {
        it("Transfers token balances", async() => {
            let amount = tokens(100);

            let tx = await token.connect(deployer).transfer(receiver.address, amount);
            let result = tx.wait();

            expect(await token.balanceOf(receiver.address)).to.eq(amount);
        })
    })


})