import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { myFilledOrdersSelector, myOpenOrdersSelector } from '../store/selectors'
import Button from './Button'
import sort from '../assets/sort.svg'

const Transactions = () => {
  const [activeOrders, setActiveOrders] = useState('bg-white text-black');
  const [activeTrades, setActiveTrades] = useState();
  const openOrders = useSelector(myOpenOrdersSelector);
  const filledOrders = useSelector(myFilledOrdersSelector);
  const symbols = useSelector(state => state.tokens.symbols);

  const activeOrd = () => {
    setActiveOrders('bg-white text-black');
    setActiveTrades(false);
  }

  const activeTrds = () => {
    setActiveTrades('bg-white text-black');
    setActiveOrders(false);
  }

  const test = () => {
    if (activeOrders) {
      console.log('Orders')
    } else if (activeTrades) {
      console.log('Trades')
    } else {
      console.log('bug')
    }
  }
  test();

  return (
    <div className='w-1/2 flex flex-col btn-background m-3 rounded-lg p-2 pb-6 overflow-y-auto scrollbar-hide'>
      <div className='flex justify-between'>
        {activeOrders ? (
          <h2 className='text-white font-poppins font-bold text-lg'>My Orders</h2>
        ) : (
          <h2 className='text-white font-poppins font-bold text-lg'>My Trades</h2>
        )}


        <div>
          <Button btnName="Orders" classStyle="border hover:text-black font-medium text-xs py-1 px-2" active={activeOrders} handleClick={activeOrd} />
          <Button btnName="Trades" classStyle="border hover:text-black ml-2 font-medium text-xs py-1 px-2" active={activeTrades} handleClick={activeTrds} />
        </div>
      </div>

      {activeOrders ? (
        <table className='flex flex-col w-full text-white font-poppins font-light mt-2'>
          {!openOrders || openOrders.length === 0 ? (
            <div className='flex text-2xl font-poppins text-white text-center h-full items-center justify-center'>
              <p>No open orders</p>
            </div>
          ) : (
            <thead>
              <tr className='flex'>
                <th className='w-1/3 flex justify-start text-sm font-poppins font-light'>{symbols && symbols[0]} <img src={sort} alt="Sort" /></th>
                <th className='w-1/3 flex justify-center text-sm font-poppins font-light'>{symbols && symbols[0]}/{symbols && symbols[1]}<img src={sort} alt="Sort" /></th>
                <th className='w-1/3 flex justify-end text-sm font-poppins font-light'>empty<img src={sort} alt="Sort" /></th>
              </tr>
            </thead>
          )}


          <tbody className='text-white font-poppins px-4'>
            {openOrders && openOrders.map((order, index) => {
              return (
                <tr className='flex justify-between w-full' key={index}>
                  <td style={{ color: `${order.orderTypeClass}` }}>{order.token0Amount}</td>
                  <td className='ml-4'>{order.tokenPrice}</td>
                  <td>cancel</td>
                </tr>
              )
            })}

          </tbody>
        </table>
      ) : (
        <table className='flex flex-col w-full text-white font-poppins font-light mt-2'>
          {!openOrders || openOrders.length === 0 ? (
            <div className='flex text-2xl font-poppins text-white text-center h-full items-center justify-center'>
              <p>No open orders</p>
            </div>
          ) : (
            <thead>
              <tr className='flex'>
                <th className='w-1/3 flex justify-start text-sm font-poppins font-light'>Time <img src={sort} alt="Sort" /></th>
                <th className='w-1/3 flex justify-center items-center text-sm font-poppins font-light'>{symbols && symbols[0]}<img src={sort} alt="Sort" /></th>
                <th className='w-1/3 flex justify-end text-sm font-poppins font-light'>{symbols && symbols[0]}/{symbols && symbols[1]}<img src={sort} alt="Sort" /></th>
              </tr>
            </thead>
          )}


          <tbody className='text-white font-poppins px-4'>
            {filledOrders && filledOrders.map((order, index) => {
              return (
                <tr className='flex justify-between w-full' key={index}>
                  <td className='w-1/3'>{order.formattedTimestamp}</td>
                  <td className='w-1/3 text-center' style={{ color: `${order.orderTypeClass}`}}>{order.orderSign}{order.token0Amount}</td>
                  <td className='w-1/3 text-right'>{order.tokenPrice}</td>
                </tr>
              )
            })}

          </tbody>
        </table>
      )}

    </div>
  )
}

export default Transactions