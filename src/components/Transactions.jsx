import React from 'react'
import { useSelector } from 'react-redux'
import { myOpenOrdersSelector } from '../store/selectors'
import Button from './Button'

const Transactions = () => {
  const openOrders = useSelector(myOpenOrdersSelector);

  return (
    <div className='w-1/2 flex flex-col btn-background m-3 rounded-lg p-2 pb-6'>
      <div className='flex justify-between'>
        <h2 className='text-white font-poppins font-bold text-lg'>Transactions</h2>

        <div>
          <Button btnName="Orders" classStyle="bg-none border hover:text-black font-medium text-xs py-1 px-2 active:bg-nft-gray-1" />
          <Button btnName="Trades" classStyle="bg-none border hover:text-black ml-2 font-medium text-xs py-1 px-2 active:bg-nft-gray-1" />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody className='text-white font-poppins'>
          {openOrders && openOrders.map((order, index) => {
            return (
              <tr className='flex justify-between w-full' key={index}>
                <td style={{ color: `${order.orderTypeClass}` }}>{order.token0Amount}</td>
                <td>{order.tokenPrice}</td>
                <td>cancel</td>
              </tr>
            )
          })}

        </tbody>

      </table>
    </div>
  )
}

export default Transactions