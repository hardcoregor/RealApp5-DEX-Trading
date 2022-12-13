import React from 'react'
import { useSelector } from 'react-redux'
import sort from '../assets/sort.svg';

const OrderBook = () => {
  const symbols = useSelector(state => state.tokens.symbols);

  return (
    <div className='btn-background m-4 rounded-lg p-2'>
      <div>
        <h2 className='font-poppins text-white font-semibold text-lg text-center'>Order Book</h2>
      </div>

      <div className='flex w-full'>

        <table className='w-full border-r'>
          <caption className='font-poppins text-white font-medium text-lg'>Selling</caption>
          <thead>
            <tr className='flex justify-between text-white p-4'>
              <th className='flex text-sm font-poppins font-light'>{symbols && symbols[0]} <img className='mt-px' src={sort} alt="Sort" /></th>
              <th className='flex text-sm font-poppins font-light'>{symbols && symbols[0]}/{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
              <th className='flex text-sm font-poppins font-light'>{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <table className='w-full'>
          <caption className='font-poppins text-white font-medium text-lg'>Buying</caption>
          <thead>
            <tr className='flex justify-between text-white p-4'>
              <th className='flex text-sm font-poppins font-light'>{symbols && symbols[0]} <img className='mt-px' src={sort} alt="Sort" /></th>
              <th className='flex text-sm font-poppins font-light'>{symbols && symbols[0]}/{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
              <th className='flex text-sm font-poppins font-light'>{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderBook