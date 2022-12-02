import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import eth from '../assets/eth.svg'
import Button from './Button';
import { loadAccount, loadProvider } from '../context/Interactions';
import config from '../context/config.json';

const Navbar = () => {
  const dispatch = useDispatch();

  const provider = loadProvider(dispatch);
  const account = useSelector(state => state.provider.account);
  const chainId = useSelector(state => state.provider.chainId);
  const balance = useSelector(state => state.provider.balance);

  const connectHandler = async () => {
    await loadAccount(provider, dispatch)
  }

  const networkHandler = async (e) => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: e.target.value }]
    })
  }

  useEffect(() => {
    loadAccount(provider, dispatch)
  })

  return (
    <nav className='flex items-center p-4 bg text-white border-b border-pink-1 border-opacity-80 justify-between'>

      <section className='flex w-1/4'>
        <img src={logo} alt="logo" width={35} />
        <h1 className='font-bold text-xl pl-3 cursor-pointer'>Swapper</h1>
      </section>

      <section className='flex justify-center'>
        <ul className='flex font-bold text-base uppercase cursor-pointer'>
          <li className='mr-3 hover:underline underline-offset-4'>Trading</li>
          <li className='mr-3 hover:underline underline-offset-4'>Staking</li>
          <li className='mr-3 hover:underline underline-offset-4'>Faucet</li>
        </ul>
      </section>

      <section>
        {account ?
          (<div className='btn-background flex items-center rounded-2xl'>
            {balance &&
              <div className='flex text-white cursor-default items-center'>
                <p className='text-base font-thin uppercase ml-3 mr-1'>Balance:</p>
                <p className='flex text-base font-medium uppercase mr-3'>{Number(balance).toFixed(4)} <span className='ml-1'>ETH</span></p>
              </div>
            }
            <Button btnName={account.slice(0, 5) + '...' + account.slice(37, 42)} />

            <div className='flex pl-2'>
              <select className='btn-background outline-none cursor-pointer text-center' name="networks" id="networks" value={config[chainId] ? `0x${chainId.toString(16)}` : `0`} onChange={networkHandler}>
                <option value="0">Select network</option>
                <option value="0x539">Localhost</option>
                <option value="0x5">Goerli</option>
                <option value="0x1">Mainnet</option>
              </select>
              <img src={eth} alt="ETH logo" width={40} />
            </div>

          </div>) :
          <Button btnName='connect' handleClick={connectHandler} />
        }
      </section>


    </nav>
  )
}

export default Navbar;