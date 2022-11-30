import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='flex items-center p-4 bg text-white border-b border-pink-1 justify-between'>
      <div className='flex'>
        <img src={logo} alt="logo" width={35} />
        <h1 className='font-bold text-xl pl-3'>Swapper</h1>
      </div>
      <div>
        <ul className='flex font-bold text-lg'>
          <li className='mr-3'>Faucet</li>
          <li className='mr-3'>Staking</li>
          <li className='mr-3'>Trading</li>
        </ul>
      </div>
      <div className='font-bold text-xl cursor-pointer'>
        Connect
      </div>
    </nav>
  )
}

export default Navbar