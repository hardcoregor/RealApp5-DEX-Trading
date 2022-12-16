import React from 'react'
import { useSelector } from 'react-redux';

import Banner from './Banner';
import sort from '../assets/sort.svg'
import { filledOrdersSelector } from '../store/selectors';

const Trades = () => {

  const filledOrders = useSelector(filledOrdersSelector);
  const symbols = useSelector(state => state.tokens.symbols);

  return (
    <div className='w-1/2 btn-background m-3 rounded-lg p-2 pb-6 '>
      <div>
        <h2 className='text-white font-poppins font-bold text-lg text-center pb-1'>Trades</h2>
      </div>

      {!filledOrders || filledOrders.length === 0 ? (
        <Banner text="No transactions"/>
      ) : (
        <table className='flex flex-col w-full text-white font-poppins font-light'>
          <thead>
            <tr className='flex'>
              <th className='w-1/3 flex flex-col justify-center items-center font-light'>Time <img src={sort} alt="Sort" /></th>
              <th className='w-1/3 flex flex-col justify-center items-center font-light'>{symbols && symbols[0]}<img src={sort} alt="Sort" /></th>
              <th className='w-1/3 flex flex-col justify-center items-center font-light'>{symbols && symbols[0]}/{symbols && symbols[1]}<img src={sort} alt="Sort" /></th>
            </tr>
          </thead>
          <tbody className='w-full mt-1'>

            {filledOrders && filledOrders.map((order, index) => {
              return (
                <tr key={index} className='text-white font-poppins flex justify-between'>
                  <td className='w-1/3 flex flex-col justify-center items-center'>{order.formattedTimestamp}</td>
                  <td className='w-1/3 flex flex-col justify-center items-center' style={{ color: `${order.tokenPriceClass}` }}>{order.token0Amount}</td>
                  <td className='w-1/3 flex flex-col justify-center items-center'>{order.tokenPrice}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}


    </div>
  )
}

export default Trades;