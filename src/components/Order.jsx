import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeBuyOrder, makeSellOrder } from '../context/Interactions'
import Button from './Button'

const Order = () => {
  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(0)

  const dispatch = useDispatch();

  const provider = useSelector(state => state.provider.connection);
  const exchange = useSelector(state => state.exchange.contract);
  const tokens = useSelector(state => state.tokens.contracts);

  const preventDefault = (e) => {
    e.preventDefault();
  }

  const buyAction = async() => {
    await makeBuyOrder(provider, exchange, tokens, { amount, price }, dispatch);
    setAmount(0);
    setPrice(0);
  }

  const sellAction = async() => {
    await makeSellOrder(provider, exchange, tokens, { amount, price }, dispatch);
    setAmount(0);
    setPrice(0);
  }


  return (
    <div className='flex-1'>
      <div className='w-full mt-3 pb-3 border-b border-pink-1 border-opacity-30'>
        <h2 className='font-poppins font-bold text-white text-lg text-center'>New order</h2>
      </div>

      <div className='p-2 mt-2'>

        <div>
          <div className='flex justify-between mb-2 w-full text-white font-poppins px-2'>
            <div className='text-center'>
              <p>Amount</p>
            </div>
          </div>

          <form onSubmit={preventDefault}>
            <div>
              <input
                className='w-full rounded-3xl btn-background pl-4 py-2 text-white outline-none font-poppins'
                min="0"
                type="number"
                step="any"
                id='amount'
                placeholder='0.000'
                onChange={(e) => setAmount(e.target.value)}
                value={amount === 0 ? '' : amount}
              />
            </div>
          </form>
        </div>

        <div className='mt-4'>
          <div className='flex justify-between mb-2 w-full text-white font-poppins px-2'>
            <div className='text-center'>
              <p>Price</p>
            </div>
          </div>

          <form onSubmit={preventDefault}>
            <div>
              <input
                className='w-full rounded-3xl btn-background pl-4 py-2 text-white outline-none font-poppins'
                min="0"
                type="number"
                step="any"
                id='price'
                placeholder='0.000'
                onChange={(e) => setPrice(e.target.value)}
                value={price === 0 ? '' : price}
              />
            </div>
          </form>
        </div>

        <div className='flex justify-between'>
          <Button
            btnName="Buy"
            classStyle="py-0 bg-none border mt-4 w-49 hover:text-black"
            handleClick={buyAction}
          />
          <Button
            btnName="Sell"
            classStyle="py-0 bg-none border mt-4 w-49 hover:text-black"
            handleClick={sellAction}
          />
        </div>
      </div>
    </div>
  )
}

export default Order