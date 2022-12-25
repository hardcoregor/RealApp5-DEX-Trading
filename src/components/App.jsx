import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import config from '../context/config.json';
import { loadAccount, loadExchange, loadNetwork, loadProvider, loadToken, subscribeToEvents, loadAllOrders, loadFaucet } from '../context/Interactions';
import Dex from '../pages/Dex';
import Faucet from '../pages/Faucet';
import Ido from '../pages/Ido';
import Staking from '../pages/Staking';
import Navbar from './Navbar';

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
    const addressMdai = config[chainId].mDai.address;
    await loadToken(provider, [addressHrdcr, addressMeth], dispatch)

    const addressExchange = config[chainId].exchange.address;
    const exchange = await loadExchange(provider, addressExchange, dispatch);

    loadAllOrders(provider, exchange, dispatch);
    await loadFaucet(provider, ['0x56D8e38c78b2822aB15953ab96162B3F35eD73F1','0xf04E7Cf1A1b65c152BA55d9bd820DE9BDd8Dc47A','0x1911a662E4cD10F7C14B608ea816D83ae63a4c93'] , dispatch) // GOERLI

    // await loadFaucet(provider, ['0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB','0x9E545E3C0baAB3E08CdfD552C960A1050f373042','0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9'] , dispatch); //LOCAL

    subscribeToEvents(exchange, dispatch);
  }


  useEffect(() => {
    loadBlockchainData();
  },);


  return (
    <div className='flex flex-col h-full bg overflow-auto '>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dex />} />
        <Route path='/staking' element={<Staking />} />
        <Route path='/ido' element={<Ido />} />
        <Route path='/faucet' element={<Faucet />} />
      </Routes>
    </div>
  );
}

export default App;
