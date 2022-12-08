import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import config from '../context/config.json';
import { loadAccount, loadExchange, loadNetwork, loadProvider, loadToken } from '../context/Interactions';
import Navbar from './Navbar';

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch)

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    }) //Reload page when Chain changes

    window.ethereum.on('accountsChanged', async() => {
      await loadAccount(provider, dispatch);
    }) //Reload when wallet changes

    const addressHrdcr = config[chainId].Hrdcr.address;
    const addressMeth = config[chainId].mEth.address;
    await loadToken(provider, [addressHrdcr, addressMeth], dispatch)

    const addressExchange = config[chainId].exchange.address;
    await loadExchange(provider, addressExchange, dispatch);
  }


  useEffect(() => {
    loadBlockchainData();
  },);


  return (
    <div className='h-full'>
      <Navbar />
      <main className='flex h-full'>
        <section className='bg w-1/4 h-full border-r border-pink-1 border-opacity-30'></section>
        <section className='bg w-3/4'></section>
      </main>
    </div>
  );
}

export default App;
