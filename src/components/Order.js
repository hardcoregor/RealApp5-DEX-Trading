import React, { useState } from 'react'
import Button from './Button'

const Order = () => {
  const [amount, setAmount] = useState(0)

  return (
    <div>
      <div className='w-full mt-3 pb-3 border-b border-pink-1 border-opacity-30'>
        <h2 className='font-poppins font-bold text-white text-lg text-center'>New order</h2>
      </div>

      <div className='p-2 mt-2'>

        <div>
          <div className='flex justify-between mb-2 w-full text-white font-poppins px-2'>
            <div className='text-center'>
              <p>Buy amount</p>
            </div>
          </div>

          <form>
            <div>
              <input
                className='w-full rounded-3xl btn-background pl-4 py-2 text-white outline-none font-poppins'
                min="0"
                type="number"
                step="any"
                id='amount'
                placeholder='0.000'
              />
            </div>
          </form>
        </div>

        <div className='mt-4'>
          <div className='flex justify-between mb-2 w-full text-white font-poppins px-2'>
            <div className='text-center'>
              <p>Buy price</p>
            </div>
          </div>

          <form>
            <div>
              <input
                className='w-full rounded-3xl btn-background pl-4 py-2 text-white outline-none font-poppins'
                min="0"
                type="number"
                step="any"
                id='price'
                placeholder='0.000'
              />
            </div>
          </form>
        </div>

        <div className='flex justify-between'>
          <Button
            btnName="Buy"
            classStyle="py-0 bg-none border mt-4 w-49 hover:text-black"
          />
          <Button
            btnName="Sell"
            classStyle="py-0 bg-none border mt-4 w-49 hover:text-black"
          />
        </div>
      </div>
    </div>
  )
}

export default Order