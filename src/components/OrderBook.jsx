import React from 'react'
import { useSelector } from 'react-redux'
import sort from '../assets/sort.svg';
import { orderBookSelector } from '../store/selectors';

const OrderBook = () => {
  const symbols = useSelector(state => state.tokens.symbols);
  const orderBook = useSelector(orderBookSelector);

  const fillOrderHandler = (order) => {
    console.log('fiilllll', order)
  }

  return (
    <div className='btn-background m-3 rounded-lg overflow-auto h-1/3 scrollbar-hide'>
      <div className='flex flex-col w-full btn-background py-2 border-b rounded-t-lg'>
        <h2 className='font-poppins text-white font-semibold text-lg text-center'>Order Book</h2>
        <ul className='flex text-white font-poppins'>
          <li className='w-1/2 text-center'>Selling</li>
          <li className='w-1/2 text-center'>Buying</li>
        </ul>
      </div>

      <div className='flex h-full'>

        {!orderBook || orderBook.sellOrders.length === 0 ? (
          <p className='font-poppins text-white text-center font-light text-2xl w-1/2'>No sell orders</p>
        ) : (
          <table className='w-full border-r text-center'>
            <thead className=''>
              <tr className='flex justify-between text-white p-3'>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center ml-3'>{symbols && symbols[0]} <img className='mt-px' src={sort} alt="Sort" /></th>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center'>{symbols && symbols[0]}/{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center -mr-3'>{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
              </tr>
            </thead>
            <tbody className='cursor-pointer'>
              {orderBook && orderBook.sellOrders.map((order, index) => {
                return (
                  <tr
                    className='flex flex-row justify-between px-4 text-white font-poppins text-sm hover:bg-light-gray'
                    key={index}
                    onClick={() => fillOrderHandler(order)}
                  >
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
          <p className='font-poppins text-white text-center font-light text-2xl w-1/2 h-full'>No buy orders</p>
        ) : (
          <table className='w-full text-center'>
            <thead className=''>
              <tr className='flex justify-between text-white p-3'>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center ml-3'>{symbols && symbols[0]} <img className='mt-px' src={sort} alt="Sort" /></th>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center'>{symbols && symbols[0]}/{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
                <th className='flex text-sm font-poppins font-light w-1/3 justify-center -mr-3'>{symbols && symbols[1]} <img className='mt-px' src={sort} alt="Sort" /></th>
              </tr>
            </thead>
            <tbody className='cursor-pointer'>
              {orderBook && orderBook.buyOrders.map((order, index) => {
                return (
                  <tr
                    className='flex flex-row justify-between px-4 text-white font-poppins text-sm hover:bg-light-gray'
                    key={index}
                    onClick={() => fillOrderHandler(order)}
                  >
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