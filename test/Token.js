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
    let exchange;
    const zeroAddress = '0x0000000000000000000000000000000000000000';

    beforeEach(async () => {
        const Token = await ethers.getContractFactory('Token');
        token = await Token.deploy("HardCore", "HRDCR", 1000000);
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1];
        exchange = accounts[2];
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
        let amount;
        let tx;
        let result;

        describe("Success", () => {

            beforeEach(async () => {
                amount = tokens(100);
                tx = await token.connect(deployer).transfer(receiver.address, amount);
                result = await tx.wait();
            })

            it("Transfers token balances", async () => {
                expect(await token.balanceOf(receiver.address)).to.eq(amount);
                expect(await token.balanceOf(deployer.address)).to.eq(tokens(999900));
            })

            it("Emits a Transfer event", async () => {
                await expect(tx)
                    .to.emit(token, 'Transfer')
                    .withArgs(deployer.address, receiver.address, amount);
            })
        })

        describe("Failure", () => {
            it("Rejects insufficient balances", async () => {
                const invalidAmount = tokens(10000000);

                await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted;
            })

            it("Rejects invalid recipient", async () => {
                await expect(token.connect(deployer).transfer(zeroAddress, amount)).to.be.reverted;
            })
        })
    })

    describe("Approving tokens", () => {

        let amount;
        let tx;
        let result;

        beforeEach(async () => {
            amount = tokens(100);
            tx = await token.connect(deployer).approve(exchange.address, amount);
            result = await tx.wait();
        })

        describe("Success", () => {
            it("allocates and allowance for delegated token spending", async () => {
                expect(await token.allowance(deployer.address, exchange.address)).to.eq(amount);
            })

            it("Emits a Approval event", async () => {
                await expect(tx)
                    .to.emit(token, 'Approval')
                    .withArgs(deployer.address, exchange.address, amount);
            })
        })

        describe("Failure", async () => {
            it("Allowance to 0 address", async () => {
                await expect(token.approve(zeroAddress, amount)).to.be.reverted;
            })
        })
    })

    describe("Delegated tokens", () => {

        let amount;
        let tx;
        let result;

        beforeEach(async () => {
            amount = 100;
            tx = await token.connect(deployer).approve(exchange.address, amount);
            result = await tx.wait();
        })

        describe("Success", () => {
            let transaction;

            beforeEach(async () => {
                transaction = await token.connect(exchange).transferFrom(deployer.address, receiver.address, amount)
            })

            it("Transfer from", async () => {
                await expect(() => transaction)
                    .to.changeTokenBalances(token, [deployer.address, receiver.address], [-amount, amount]);
            })

            it("Reset the allowance", async () => {
                let resetAllow =await token.allowance(deployer.address, exchange.address);
                await expect(resetAllow).to.eq('0');
            })

            it("Emits a Transfer event", async () => {
                await expect(transaction)
                    .to.emit(token, 'Transfer')
                    .withArgs(deployer.address, receiver.address, amount);
            })
        })

        describe("Failure", () => {
            const invalidAmount = 1000;
        
            it("Invalid amount of tokens to transferFrom", async() => {
                await expect(token.connect(exchange).transferFrom(deployer.address, receiver.address, invalidAmount)).to.be.reverted;
            })
        })
    })

})