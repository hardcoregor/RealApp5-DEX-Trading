const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const Faucet = await hre.ethers.getContractFactory("Faucet");

  const faucetHrdcr = await Faucet.deploy('0x90D940D20fE50C5729c1a2bb8899555E1097bEe4');
  await faucetHrdcr.deployed();

  const faucetmEth = await Faucet.deploy('0x9B34D7D57eFB0930C60c4b37fD917949270Fa0CD');
  await faucetmEth.deployed();

  const faucetmDai = await Faucet.deploy('0x49DabB06295F708018e8E19B3465d31D9B543c75');
  await faucetmDai.deployed();

  console.log(`Successful deployed HRDCR Faucet:  ${faucetHrdcr.address}`);
  console.log(`Successful deployed mEth Faucet:  ${faucetmEth.address}`);
  console.log(`Successful deployed mDai Faucet:  ${faucetmDai.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
