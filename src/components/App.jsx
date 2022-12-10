import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import config from '../context/config.json';
import { loadAccount, loadExchange, loadNetwork, loadProvider, loadToken, subscribeToEvents } from '../context/Interactions';
import Balance from './Balance';
import Markets from './Markets';
import Navbar from './Navbar';
import Order from './Order';

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch)

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    }) //Reload page when Chain changes

    window.ethereum.on('accountsChanged', async () => {
      await loadAccount(provider, dispatch);
    }) //Reload when wallet changes

    const addressHrdcr = config[chainId].Hrdcr.address;
    const addressMeth = config[chainId].mEth.address;
    await loadToken(provider, [addressHrdcr, addressMeth], dispatch)

    const addressExchange = config[chainId].exchange.address;
    const exchange = await loadExchange(provider, addressExchange, dispatch);

    subscribeToEvents(exchange, dispatch);
  }


  useEffect(() => {
    loadBlockchainData();
  },);


  return (
    <div className='h-full bg overflow-auto'>
      <Navbar />
      <main className='flex h-full'>
        <section className='w-1/4 h-full border-r border-pink-1 border-opacity-30 z-10'>
          <Markets />
          <Balance />
          <Order />
          <div className="pink_gradient -z-5" />
          <div className="blue_gradient -z-5" />
        </section>
        <section className='w-3/4'></section>
      </main>
    </div>
  );
}

export default App;
