import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import config from '../context/config.json'
import { loadToken } from '../context/Interactions';

const Markets = () => {
  const dispatch = useDispatch();
  const provider = useSelector(state => state.provider.connection);
  const chainId = useSelector(state => state.provider.chainId);

  const marketHandler = async(e) => {
    const addresses = (e.target.value).split(",");
    loadToken(provider, addresses, dispatch)
  }

  return (
    <div className='p-3 border-b border-pink-1 border-opacity-30'>
      <h2 className='font-poppins font-bold text-white text-lg text-center mb-2'>Select Market</h2>

      {chainId && config[chainId] ? (
        <select
          name="markets"
          id="markets"
          className='btn-background outline-none cursor-pointer text-center w-full pl-3 rounded-3xl text-white font-poppins font-semibold'
          onChange={marketHandler}
        >

          <option value={`${config[chainId].Hrdcr.address},${config[chainId].mEth.address}`}>
            HRDCR / mETH
          </option>

          <option value={`${config[chainId].Hrdcr.address},${config[chainId].mDai.address}`}>
            HRDCR / mDAI
          </option>

          <option value={`${config[chainId].mEth.address},${config[chainId].mDai.address}`}>
            mEth / mDAI
          </option>

        </select>
      ) : (
        <div>
          <p>Not deployed to network</p>
        </div>
      )}


    </div>
  )
}

export default Markets