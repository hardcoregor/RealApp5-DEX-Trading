import React from 'react'
import { useSelector } from 'react-redux';

import Button from './Button';

const Balance = () => {

  const symbols = useSelector(state => state.tokens.symbols)

  return (
    <div className='w-full mt-3'>

      <div className='flex flex-col items-center'>
        <h2 className='font-poppins font-bold text-white text-lg text-center'>Balance</h2>

        {/* <div className='flex rounded-xl mt-2 w-full'>
          <Button btnName="Deposit" classStyle="py-0 mr-2 bg-none border text-sm w-1/2" />
          <Button btnName="Withdraw" classStyle="py-0 bg-none border text-sm w-1/2" />
        </div> */}
      </div>

      <div className='p-2 mt-2'>

        <div className='mb-2 w-1/3 text-left text-white font-poppins ml-3'>
          <small>Token</small>
          <p>{symbols && symbols[0]}</p>
        </div>

        <label htmlFor='token0'></label>
        <input className='w-full rounded-3xl btn-background pl-4 py-2 text-white outline-none font-poppins' min="0" type="number" id='token0' placeholder='0.000' />

        <div className='flex justify-between'>
          <Button btnName="Deposit" classStyle="py-0 bg-none border mt-4 w-49" />
          <Button btnName="Withdraw" classStyle="py-0 bg-none border mt-4 w-49" />
        </div>
      </div>

      <div className='p-2 mt-10'>
        <label htmlFor='token1'></label>
        <input className='w-full rounded-3xl btn-background pl-4 py-2 text-white outline-none font-poppins' min="0" type="number" id='token1' placeholder='0.000' />

        <div className='flex justify-between'>
          <Button btnName="Deposit" classStyle="py-0 bg-none border mt-4 w-49" />
          <Button btnName="Withdraw" classStyle="py-0 bg-none border mt-4 w-49" />
        </div>
      </div>

    </div>
  )
}

export default Balance