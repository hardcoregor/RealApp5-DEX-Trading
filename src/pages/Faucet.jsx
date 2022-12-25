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
  }, [chainId, faucetContract, token, choosenFaucet])

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
      <div className='w-1/2'>

        <div className='w-full flex justify-center items-center'>
          <div className='w-full flex flex-col justify-between items-center btn-background min-h-[200px] rounded-2xl p-4'>

            <div className='flex items-center flex-col'>
              <h1 className='font-poppins text-white font-bold text-2xl uppercase '>Faucet</h1>
            </div>

            <div className='w-full flex'>
              <div className='w-full flex my-4 justify-between items-center'>
                <select className='border w-1/2 btn-background outline-none cursor-pointer text-center font-poppins text-white rounded-2xl mr-2 text-xl font-normal' name="tokens" id="tokens" value={config[chainId] ? (chainId.token) : ''} onChange={changeToken}>
                  <option selected>Choose token</option>
                  <option value='Hrdcr'>Hrdcr</option>
                  <option value="mEth">mEth</option>
                  <option value="mDai">mDai</option>
                </select>
                <Button
                  btnName={`Get ${faucetToken}`}
                  classStyle="border nft-gradient w-1/2 py-0 ml-2 text-xl"
                  handleClick={getToken}
                />
              </div>
            </div>

            <div className='border border-bordergray w-full rounded-2xl'>
              <h3 className='text-white font-poppins text-center p-2'>
                Transaction data
              </h3>
              {transactionData ?
                (<p className='text-white border-t border-bordergray text-center flex justify-between px-4 py-2'><span>Successful</span>
                  <a href={config[network] ? `${config[network].explorerURL}/tx/${transactionData}` : '#'}
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-link'
                  >
                    {transactionData}
                  </a>
                </p>) : (
                  <p className='text-white border-t border-bordergray text-center px-4 py-2'><span>No transactions yet.</span>
                  </p>
                )}
            </div>

          </div>
        </div>
      </div>

      <div className="pink_gradient z-10" />
      <div className="blue_gradient z-10" />
    </div>
  )
}

export default Faucet