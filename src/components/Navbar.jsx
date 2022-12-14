import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect } from 'react'
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

      <section className='flex w-1/4 z-50'>
        <img src={logo} alt="logo" width={35} />
        <h1 className='font-bold text-xl pl-3 cursor-pointer sm:hidden'>Swapper</h1>
      </section>

      <section className='flex justify-end flex-1 mr-44 md:ml-0 md:pl-3'>
        <ul className='flex font-bold text-base uppercase cursor-pointer sm:text-xs'>
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
                <p className='text-sm font-poppins font-base uppercase ml-3 mr-1'>Balance:</p>
                <p className='flex text-sm font-poppins uppercase mr-3'>{Number(balance).toFixed(0)} <span className='ml-1'>ETH</span></p>
              </div>
            }
            <a href={config[chainId] ? `${config[chainId].explorerUrl}address/${account}` : `#`}  target="_blank" rel='noreferrer'>
              <Button btnName={account.slice(0, 5) + '...' + account.slice(38, 42)} classStyle='sm:text-xs px-1.5 font-semibold md:hidden'/>
            </a>

            {chainId && (
              <div className='flex pl-2 sm:text-xs sm:pl-0 md:pl-0'>
                <select className='btn-background outline-none cursor-pointer text-center font-poppins md:rounded-2xl' name="networks" id="networks" value={config[chainId] ? `0x${chainId.toString(16)}` : `0`} onChange={networkHandler}>
                  <option value="0">Network</option>
                  <option value="0x7A69">Localhost</option>
                  <option value="0x5">Goerli</option>
                  <option value="0x1">Mainnet</option>
                </select>
                <img src={eth} alt="ETH logo" width={40} className='sm:hidden md:hidden'/>
              </div>
            )}

          </div>) :
          <Button btnName='connect' handleClick={connectHandler} />
        }
      </section>


    </nav>
  )
}

export default Navbar;