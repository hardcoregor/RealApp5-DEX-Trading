import React from 'react'
import Alert from '../components/Alert'
import Balance from '../components/Balance'
import Markets from '../components/Markets'
import Order from '../components/Order'
import OrderBook from '../components/OrderBook'
import { PriceChart } from '../components/PriceChart'
import Trades from '../components/Trades'
import Transactions from '../components/Transactions'

const Dex = () => {
  return (
    <>
      <main className='h-[calc(100%-78px)] flex flex-1 relative'>
        <section className='w-1/4  border-r border-pink-1 border-opacity-30 z-10 flex flex-col'>
          <Markets />
          <Balance />
          <Order />
          <div className="pink_gradient -z-5" />
          <div className="blue_gradient -z-5" />
        </section>
        <section className='w-3/4 pb-12'>
          <PriceChart />
          <div className='flex w-full h-1/3'>
            <Transactions />
            <Trades />
          </div>
          <OrderBook />
        </section>
      </main>
      <Alert />
    </>
  )
}

export default Dex