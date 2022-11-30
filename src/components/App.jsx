import { useEffect } from 'react';
import { ethers } from 'ethers';

import tokenAbi from '../context/abis/Token.sol/Token.json';
import config from '../context/config.json';

import '../App.css';
import Navbar from './Navbar';

function App() {

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();

    const { abi } = tokenAbi;
    const token = new ethers.Contract(config[chainId].Hrdcr.address, abi, provider)

  }


  useEffect(() => {
    loadBlockchainData();
  }, []);


  return (
    <div className='h-full'>
      <Navbar />
      <main className='flex h-full'>
        <section className='bg w-1/4 h-full border-r border-pink-1'>1</section>
        <section className='bg w-3/4'>2</section>
      </main>
    </div>
  );
}

export default App;
