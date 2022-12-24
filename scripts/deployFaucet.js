const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const Faucet = await hre.ethers.getContractFactory("Faucet");

  const faucetHrdcr = await Faucet.deploy('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');
  await faucetHrdcr.deployed();

  const faucetmEth = await Faucet.deploy('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
  await faucetmEth.deployed();

  const faucetmDai = await Faucet.deploy('0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9');
  await faucetmDai.deployed();

  console.log(`Successful deployed HRDCR Faucet:  ${faucetHrdcr.address}`);
  console.log(`Successful deployed mEth Faucet:  ${faucetmEth.address}`);
  console.log(`Successful deployed mDai Faucet:  ${faucetmDai.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
