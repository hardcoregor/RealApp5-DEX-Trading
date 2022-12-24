import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Button from '../components/Button';

import config from '../context/config.json';

const Faucet = () => {
  const [token, setToken] = useState('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
  const [faucetToken, setFaucetToken] = useState('Hrdcr')

  const chainId = useSelector(state => state.provider.chainId);

  const changeToken = (e) => {
    setToken(config[chainId][e.target.value]['address']);
    setFaucetToken(e.target.value);
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='mb-4 flex items-center flex-col p-4'>
        <h1 className='font-poppins text-white font-bold text-2xl uppercase '>Faucet</h1>
        <p className='font-poppins text-white font-bold '>Get 25 {faucetToken}/day</p>
      </div>

      <div className='w-full flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center btn-background min-h-[200px] min-w-1/2 rounded-2xl p-4'>
          <div className='flex flex-col justify-between w-3/4'>
            <select className='mt-2 border w-full btn-background outline-none cursor-pointer text-center font-poppins rounded-2xl text-white py-1 px-4' name="tokens" id="tokens" value={config[chainId] ? (chainId.token) : ''} onChange={changeToken}>
              <option value='Hrdcr'>Hrdcr</option>
              <option value="mEth">mEth</option>
              <option value="mDai">mDai</option>
            </select>
            <div className='flex my-4'>
              <input type="text" placeholder='Enter Your Wallet Address (0x...)' className='flex-1 mr-4 rounded-2xl px-4' />
              <Button btnName={`Send me ${faucetToken}`} classStyle="border hover:bg-white hover:text-black" />
            </div>
          </div>
          <div className='border w-3/4 rounded-t-xl'>
            <h3 className='text-white font-poppins text-center p-2'>
              Transaction data
            </h3>
            <p className='bg-white text-center'>--</p>
          </div>
        </div>
      </div>

      <div className="pink_gradient z-10" />
      <div className="blue_gradient z-10" />
    </div>
  )
}

export default Faucet