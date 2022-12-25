const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const Token = await hre.ethers.getContractFactory("Token");
  const Exchange = await hre.ethers.getContractFactory("Exchange");

  const accounts = await ethers.getSigners();
  const feeAccount = accounts[0];
  const feePercent = 10;

  // const exchange = await Exchange.deploy(feeAccount.address, feePercent);
  // await exchange.deployed();

  const tokenHRDCR = await Token.deploy('HardCore', 'HRDCR', '1000000');
  await tokenHRDCR.deployed();

  const tokenMETH = await Token.deploy('mETH', 'mETH', '1000000');
  await tokenMETH.deployed();

  const tokenMDAI = await Token.deploy('Mock Dai', 'mDai', '1000000');
  await tokenMDAI.deployed();

  // console.log(`Successful deployed Exchange:  ${exchange.address}`);
  // console.log(`Fee acc:  ${feeAccount.address}`);
  console.log(`Successful deployed HRDCR:  ${tokenHRDCR.address}`);
  console.log(`Successful deployed mEth:  ${tokenMETH.address}`);
  console.log(`Successful deployed mDai:  ${tokenMDAI.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
