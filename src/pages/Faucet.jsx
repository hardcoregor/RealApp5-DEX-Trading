import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../components/Button';

import config from '../context/config.json';
import { usingFaucet } from '../context/Interactions';

const Faucet = () => {
  const faucetContract = useSelector(state => state.faucet.contracts);
  const provider = useSelector(state => state.provider.connection);
  const account = useSelector(state => state.provider.account);
  const network = useSelector(state => state.provider.network);
  const chainId = useSelector(state => state.provider.chainId);

  const [token, setToken] = useState('');
  const [faucetToken, setFaucetToken] = useState('');
  const [choosenFaucet, setChoosenFaucet] = useState('');
  const [transactionData, setTransactionData] = useState('');

  useEffect(() => {
    if (chainId && token === config[chainId]['Hrdcr']['address']) {
      setChoosenFaucet(faucetContract[0]);
    }
    else if (chainId && token === config[chainId]['mEth']['address']) {
      setChoosenFaucet(faucetContract[1])
    }
    else if (chainId && token === config[chainId]['mDai']['address']) {
      setChoosenFaucet(faucetContract[2])
    }
  }, [token, choosenFaucet])

  const changeToken = (e) => {
    setToken(config[chainId][e.target.value]['address']);
    setFaucetToken(e.target.value);
  }

  const getToken = async () => {
    const data = await usingFaucet(provider, choosenFaucet);
    setTransactionData(data);
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='mb-4 flex items-center flex-col p-4'>
        <h1 className='font-poppins text-white font-bold text-2xl uppercase '>Faucet</h1>
        <p className='font-poppins text-white font-bold '>Get 25 {faucetToken}/day</p>
        <select className='mt-2 border w-full btn-background outline-none cursor-pointer text-center font-poppins text-white py-1' name="tokens" id="tokens" value={config[chainId] ? (chainId.token) : ''} onChange={changeToken}>
          <option selected>Choose token</option>
          <option value='Hrdcr'>Hrdcr</option>
          <option value="mEth">mEth</option>
          <option value="mDai">mDai</option>
        </select>
      </div>

      <div className='w-full flex justify-center items-center'>
        <div className='flex flex-col justify-between items-center btn-background min-h-[200px] min-w-2/3 rounded-2xl p-4'>
          <div className='flex flex-col justify-between w-full'>
            <div className='flex my-4'>
              <input type="text" placeholder='Enter Your Wallet Address (0x...)' defaultValue={account} className='flex-1 mr-4 rounded-2xl px-4 outline-none text-bold font-poppins' />
              <Button
                btnName={`Tap to get ${faucetToken}`}
                classStyle="border nft-gradient"
                handleClick={getToken}
              />

            </div>
          </div>
          <div className='border w-full rounded-t-xl'>
            <h3 className='text-white font-poppins text-center p-2'>
              Transaction data
            </h3>

            {transactionData ?
              (<p className='bg-white text-center flex justify-between px-4 py-2'><span>Successful</span>
                <a href={config[network] ? `${config[network].explorerURL}/tx/${transactionData}` : '#'}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-link'
                >
                  {transactionData}
                </a>
              </p>) : (
                <p className='bg-white text-center px-4 py-2'><span>No transactions yet.</span>
                </p>
              )}

          </div>
        </div>
      </div>

      <div className="pink_gradient z-10" />
      <div className="blue_gradient z-10" />
    </div>
  )
}

export default Faucet