const { wait } = require('@testing-library/user-event/dist/utils');
const { expect } = require('chai');
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
};

describe("Exchange", () => {
  let deployer;
  let feeAccount;
  let user1;
  let user2;

  let exchange;
  let token1;
  let token2;

  const feePercent = 10;

  const zeroAddress = '0x0000000000000000000000000000000000000000';

  beforeEach(async () => {
    let accounts = await ethers.getSigners();
    deployer = accounts[0];
    feeAccount = accounts[1];
    user1 = accounts[2];
    user2 = accounts[3];


    const Exchange = await ethers.getContractFactory('Exchange');
    exchange = await Exchange.deploy(feeAccount.address, feePercent);

    const Token = await ethers.getContractFactory('Token');
    token1 = await Token.deploy("HardCore", "HRDCR", 1000000);
    token2 = await Token.deploy("Mock Dai", "mDAI", 1000000);

    await token1.transfer(user1.address, 10000);
    await token2.transfer(user2.address, 10000);
  })

  describe("Deployment", () => {
    it("track fee account", async () => {
      expect(await exchange.feeAccount()).to.equal(feeAccount.address);
    })

    it("track fee percent", async () => {
      expect(await exchange.feePercent()).to.equal(feePercent);
    })
  })

  describe("DepositToken", () => {
    const amount = 100;
    let tx;

    describe("Success", () => {

      beforeEach(async () => {
        await token1.transfer(user1.address, amount);
        await token1.connect(user1).approve(exchange.address, amount);
        tx = await exchange.connect(user1).depositToken(token1.address, amount);
      })

      it("Deposit token", async () => {
        await expect(() => tx)
          .to.changeTokenBalances(token1, [user1.address, exchange.address], [-amount, amount]);

        expect(await exchange.tokens(token1.address, user1.address)).to.eq(amount);
      })

      it("Check balanceOf function", async () => {
        expect(await exchange.balanceOf(token1.address, user1.address)).to.eq(amount);
      })

      it("Emit deposit event", async () => {
        await expect(tx)
          .to.emit(exchange, 'Deposit')
          .withArgs(token1.address, user1.address, amount, amount);
      })

    })

    describe("Failure", () => {

      it("Fails when no tokens are approved", async () => {
        await expect(exchange.connect(user1).depositToken(token1.address, amount)).to.be.reverted;
      })
    })

  })

  describe("Withdraw tokens", () => {
    const amount = 100;
    let txDep;
    let txWithdraw;

    describe("Success", () => {
      beforeEach(async () => {
        await token1.transfer(user1.address, amount);
        await token1.connect(user1).approve(exchange.address, amount);
        txDep = await exchange.connect(user1).depositToken(token1.address, amount);

        txWithdraw = await exchange.connect(user1).withdrawToken(token1.address, amount);
        await txWithdraw.wait();
      })

      it("withdraws token funds", async () => {
        await expect(() => txWithdraw)
          .to.changeTokenBalances(token1, [user1.address, exchange.address], [amount, -amount]);

        expect(await exchange.tokens(token1.address, user1.address)).to.eq(0)
      })

      it("emit withdraw event", async () => {
        await expect(txWithdraw)
          .to.emit(exchange, 'Withdraw')
          .withArgs(token1.address, user1.address, amount, 0);
      })

    })

    describe("Failure", () => {
      it("fails for insufficient balance", async () => {
        await expect(exchange.connect(user1).withdrawToken(token1.address, amount)).to.be.reverted;
      })
    })

  })

  describe("Make orders", () => {
    const amount = 100;
    let result;

    beforeEach(async () => {
      await token1.approve(exchange.address, amount);
      await token2.approve(exchange.address, amount);
      await exchange.depositToken(token1.address, amount);
      await exchange.depositToken(token2.address, amount);

      let tx = await exchange.makeOrder(token2.address, 1, token1.address, 1)
      result = await tx.wait()
    })


    describe('Success', () => {
      it("Make new order", async () => {
        await exchange.makeOrder(token1.address, 1, token2.address, 1);

        expect(await exchange.ordersCount()).to.eq(2)
      })

      it("Emit Order event", async () => {
        const event = result.events[0];
        expect(event.event).to.equal('Order')

        const args = event.args;

        expect(args.id).to.eq(1)
        expect(args.user).to.eq(deployer.address)
        expect(args.tokenGet).to.eq(token2.address)
        expect(args.amountGet).to.eq(1)
        expect(args.tokenGive).to.eq(token1.address)
        expect(args.amountGive).to.eq(1)
        expect(args.timestamp).to.at.least(1)
      })
    })

    describe('Failure', () => {
      it("Not enough tokens for makeOrder", async () => {
        await expect(exchange.makeOrder(token1.address, 2, token2.address, 150)).to.be.reverted;
      })
    })

  })

  describe("Cancelling orders", () => {
    const amount = 100;
    let result;

    beforeEach(async () => {
      await token1.connect(user1).approve(exchange.address, amount);
      await exchange.connect(user1).depositToken(token1.address, amount);
      let tx = await exchange.connect(user1).makeOrder(token2.address, 1, token1.address, 1)
      await tx.wait()

      let txCancel = await exchange.connect(user1).cancelOrder(1);
      result = await txCancel.wait();
    })

    describe("Success", () => {
      it("Cancel order", async () => {
        let data = await exchange.connect(user1).orderCancelled(1);
        expect(data).to.eq(true);
      })

      it("Emit Cancel Event", () => {
        const event = result.events[0];
        expect(event.event).to.equal('Cancel')

        const args = event.args;

        expect(args.id).to.eq(1)
        expect(args.user).to.eq(user1.address)
        expect(args.tokenGet).to.eq(token2.address)
        expect(args.amountGet).to.eq(1)
        expect(args.tokenGive).to.eq(token1.address)
        expect(args.amountGive).to.eq(1)
        expect(args.timestamp).to.at.least(1)
      })

    })

    describe("Failure", () => {
        it("Uncorrect order id", async() => {
            await expect(exchange.connect(user1).cancelOrder(9)).to.be.reverted;
        })

        it("Only owner order can cancel this order", async() => {
            await expect(exchange.cancelOrder(1)).to.be.reverted;
        })
    })

  })

  describe("Filling order", () => {
    const amount = 100;
    const halfamount = 50;
    const withFee = 45;
    const fee = 5;
    let result;
    let tx;
    let invalidId = 999999;

    beforeEach(async() => {
        await token1.connect(user1).approve(exchange.address, amount);
        await token2.connect(user2).approve(exchange.address, amount);

        await exchange.connect(user1).depositToken(token1.address, amount);
        await exchange.connect(user2).depositToken(token2.address, amount);

        await exchange.connect(user1).makeOrder(token2.address, halfamount, token1.address, halfamount);
        tx = await exchange.connect(user2).fillOrder(1);
        result = await tx.wait();
    })

    describe("Success", () => {
        it("Success fill order", async ()=> {
            expect(await exchange.balanceOf(token1.address, user1.address)).to.eq(halfamount);
            expect(await exchange.balanceOf(token2.address, user1.address)).to.eq(halfamount);
            expect(await exchange.balanceOf(token1.address, user2.address)).to.eq(halfamount);
            expect(await exchange.balanceOf(token2.address, user2.address)).to.eq(withFee);
            expect(await exchange.balanceOf(token1.address, feeAccount.address)).to.eq(0);
            expect(await exchange.balanceOf(token2.address, feeAccount.address)).to.eq(fee);
        })

        it("Order filled marked true", async() => {
            expect(await exchange.orderFilled(1)).to.eq(true);
        })

        it("Emit Cancel Event", () => {
            const event = result.events[0];
            expect(event.event).to.equal('Trade')
    
            const args = event.args;
    
            expect(args.id).to.eq(1)
            expect(args.user).to.eq(user2.address)
            expect(args.tokenGet).to.eq(token2.address)
            expect(args.amountGet).to.eq(halfamount)
            expect(args.tokenGive).to.eq(token1.address)
            expect(args.amountGive).to.eq(halfamount)
            expect(args.creator).to.eq(user1.address)
            expect(args.timestamp).to.at.least(1)
          })
    })

    describe("Failure", () => {

        it("Invalid order id", async() => {
            await expect(exchange.connect(user2).fillOrder(invalidId)).to.be.reverted;
        })
                          
        it("Order filled", async() => {
            await expect(exchange.connect(user2).fillOrder(1)).to.be.reverted;
        })

        it("Order canceled", async() => {
            let partTokenSwap = 10;
            await exchange.connect(user1).makeOrder(token2.address, partTokenSwap, token1.address, partTokenSwap);
            await exchange.connect(user1).cancelOrder(2);

            await expect(exchange.connect(user2).fillOrder(2)).to.be.reverted;
        })
    })

  })

})