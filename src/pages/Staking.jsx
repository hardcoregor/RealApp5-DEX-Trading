import React from 'react'
import Button from '../components/Button'

const Staking = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col justify-center btn-background w-1/2 h-1/2 rounded-2xl p-4'>

        <div>
          <h3 className='text-white font-poppins font-bold text-2xl text-center uppercase mb-2'>Deposit</h3>
          <div className='flex p-4 justify-between border border-bordergray rounded-full'>
            <input type="number" placeholder='0.1 HRDCR' className='w-2/5 bg-transparent border placeholder:text-white text-white flex mr-4 rounded-2xl px-4 outline-none text-bold font-poppins' />
            <div>
            <Button btnName="9510.01 HRDCR" classStyle="hover:text-black mr-4" />
            <Button btnName="Stake" classStyle="border nft-gradient" />
            </div>
          </div>
        </div>

        <div className='my-6'>
          <h3 className='text-white font-poppins font-bold text-2xl text-center uppercase mb-2'>Withdraw</h3>
          <div className='flex p-4 justify-between border border-bordergray rounded-full'>
            <input type="number" placeholder='0.1 HRDCR' className='w-2/5 bg-transparent border placeholder:text-white text-white flex mr-4 rounded-2xl px-4 outline-none text-bold font-poppins' />
            <div>
              <Button btnName="25.65 HRDCR" classStyle="hover:text-black mr-4" />
              <Button btnName="Unstake" classStyle="border nft-gradient" />
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-white font-poppins font-bold text-2xl text-center uppercase mb-2'>Your rewards</h3>
          <div className='flex p-4 justify-between border border-bordergray rounded-full'>
            <input type="number" placeholder='0.1 mEth' className='w-2/5 bg-transparent border placeholder:text-white text-white flex mr-4 rounded-2xl px-4 outline-none text-bold font-poppins' />
            <div>
            <Button btnName="13.25 mEth" classStyle="hover:text-black mr-4" />
              <Button btnName="Claim" classStyle="border nft-gradient" />
            </div>
          </div>
        </div>

      </div>

      <div className="pink_gradient z-10" />
      <div className="blue_gradient z-10" />
    </div>
  )
}

export default Staking