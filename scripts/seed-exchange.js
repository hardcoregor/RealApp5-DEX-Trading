const { ethers } = require("hardhat");

const config = require('../src/context/config.json')

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}

const wait = (seconds) => {
    const milliseconds = seconds * 1000;
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

async function main() {
    //FETCH WALLETS
    const accounts = await ethers.getSigners();

    //FETCH NETWORK
    // const { chainId } = await ethers.provider.getNetwork();
    const chainId = 31337;

    //CONNECT TO CONTRACT
    const exchange = await ethers.getContractAt('Exchange', config[chainId].exchange.address);
    const Hrdcr = await ethers.getContractAt('Token', config[chainId].Hrdcr.address);
    const mEth = await ethers.getContractAt('Token', config[chainId].mEth.address);
    const mDai = await ethers.getContractAt('Token', config[chainId].mDai.address);

    const user1 = accounts[0];
    const user2 = accounts[1];
    let amount = tokens(10000);

    //--------------------------------------------------DEPOSIT TOKENS TO EXCHANGE-------------------------------------------

    //1ST ACCOUNT APPROVE Hrdcr TOKENS to exchange.
    let tx1 = await Hrdcr.approve(exchange.address, amount);
    await tx1.wait();

    //1ST ACCOUNT DEPOSIT Hrdcr TOKENS to exchange.
    let tx2 = await exchange.depositToken(Hrdcr.address, amount);
    await tx2.wait();
    ;

    //GIVE TO 2nd account mEth tokens.
    let tx3 = await mEth.transfer(user2.address, amount);
    await tx3.wait();

    //2ND ACCOUNT APPROVE mEth TOKENS to exchange.
    let tx4 = await mEth.connect(user2).approve(exchange.address, amount);
    await tx4.wait();

    //2ND ACCOUNT DEPOSIT mEth TOKENS to exchange.
    let tx5 = await exchange.connect(user2).depositToken(mEth.address, amount);
    await tx5.wait();

    //--------------------------------------------------WORK WITH ORDERS FOR PRINT-------------------------------------------

    let orderId;
    let result;

    //1ST ACCOUNT MAKE ORDER TO BUY mETH.
    let tx6 = await exchange.makeOrder(mEth.address, tokens(100), Hrdcr.address, tokens(5));
    result = await tx6.wait();

    //1ST ACCOUNT CANCEL ORDER
    orderId = result.events[0].args.id;
    let tx7 = await exchange.cancelOrder(orderId);
    await tx7.wait();
    await wait(1);

    //1ST ACCOUNT MAKE ORDER #2
    let tx8 = await exchange.makeOrder(mEth.address, tokens(100), Hrdcr.address, tokens(10));
    result = await tx8.wait();

    //2ND ACCOUNT FILL ORDER #2
    orderId = result.events[0].args.id;
    let tx9 = await exchange.connect(user2).fillOrder(orderId);
    await tx9.wait();
    await wait(1);

    //1ST ACCOUNT MAKE ORDER #3
    let tx10 = await exchange.makeOrder(mEth.address, tokens(50), Hrdcr.address, tokens(15));
    result = await tx10.wait();

    //2ND ACCOUNT FILL ORDER #3
    orderId = result.events[0].args.id;
    let tx11 = await exchange.connect(user2).fillOrder(orderId);
    await tx11.wait();
    await wait(1);

    //1ST ACCOUNT MAKE ORDER #4
    let tx12 = await exchange.makeOrder(mEth.address, tokens(200), Hrdcr.address, tokens(20));
    result = await tx12.wait();

    //2ND ACCOUNT FILL ORDER #4
    orderId = result.events[0].args.id;
    let tx13 = await exchange.connect(user2).fillOrder(orderId);
    await tx13.wait();
    await wait(1);

    //--------------------------------------------------WORK WITH ORDERS FOR OPEN ORDER BOOK-------------------------------------------

    //1ST ACCOUNT MAKE 10 ORDERS
    for (let i = 1; i <= 10; i++) {
        exchange.makeOrder(mEth.address, tokens(10 * i), Hrdcr.address, tokens(10));

        await wait(1);
    }

    //2ND ACCOUNT MAKE 10 ORDERS
    for (let i = 1; i <= 10; i++) {
        exchange.connect(user2).makeOrder(Hrdcr.address, tokens(10), mEth.address, tokens(10 * i));

        await wait(1);
    }
    console.log('Finished');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
