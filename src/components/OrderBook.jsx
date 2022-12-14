import React from 'react'
import { useSelector } from 'react-redux'
import sort from '../assets/sort.svg';
import { orderBookSelector } from '../store/selectors';

const OrderBook = () => {
  const symbols = useSelector(state => state.tokens.symbols);
  const orderBook = useSelector(orderBookSelector);

  return (
    <div className='btn-background m-4 rounded-lg p-2'>
      <div>
        <h2 className='font-poppins text-white font-semibold text-lg text-center'>Order Book</h2>
      </div>

      <div className='flex w-full'>

        {!orderBook || orderBook.sellOrders.length === 0 ? (
          <p className='w-full flex items-center justify-center font-poppins text-white font-semibold'>No Sell Orders</p>
        ) : (
          <table className='w-full border-r text-center'>
            <caption className='font-poppins text-white font-medium text-lg'>Selling</caption>
            <thead className=''>
              <tr className='flex justify-between text-white p-4'>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center ml-3'>{symbols && symbols[0]} <img className='mt-px' src={sort} alt="Sort" /></th>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center'>{symbols && symbols[0]}/{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center -mr-3'>{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
              </tr>
            </thead>
            <tbody className='cursor-pointer'>
              {orderBook && orderBook.sellOrders.map((order, index) => {
                return (
                  <tr className='flex flex-row justify-between px-4 text-white font-poppins text-sm hover:bg-light-gray' key={index}>
                    <td className='w-1/3'>{order.token0Amount}</td>
                    <td className="text-redSell w-1/3">{order.tokenPrice}</td>
                    <td className='w-1/3'>{order.token1Amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}




        {!orderBook || orderBook.buyOrders.length === 0 ? (
          <p className='w-full flex items-center justify-center font-poppins text-white font-semibold'>No Buy Orders</p>
        ) : (
          <table className='w-full border-r text-center'>
            <caption className='font-poppins text-white font-medium text-lg'>Buying</caption>
            <thead className=''>
              <tr className='flex justify-between text-white p-4'>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center ml-3'>{symbols && symbols[0]} <img className='mt-px' src={sort} alt="Sort" /></th>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center'>{symbols && symbols[0]}/{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center -mr-3'>{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
              </tr>
            </thead>
            <tbody className='cursor-pointer'>
              {orderBook && orderBook.buyOrders.map((order, index) => {
                return (
                  <tr className='flex flex-row justify-between px-4 text-white font-poppins text-sm hover:bg-light-gray' key={index}>
                    <td className='w-1/3'>{order.token0Amount}</td>
                    <td className="text-greenBuy w-1/3">{order.tokenPrice}</td>
                    <td className='w-1/3'>{order.token1Amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default OrderBook