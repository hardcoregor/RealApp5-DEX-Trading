import React from 'react'
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';

import { options, series } from './PriceChart.config';
import { Banner } from './Banner';

export const PriceChart = () => {
  const account = useSelector(state => state.provider.account);
  const symbols = useSelector(state => state.tokens.symbols);

  return (
    <div className='btn-background m-3 rounded-lg p-2 h-1/3'>
      <h2 className='text-white font-poppins text-center font-medium'>{symbols && `${symbols[0]}/${symbols[1]}`}</h2>

      {!account ? (
        <Banner text={'Please connect with Metamask'} />
      ) : (
        <Chart
          type="candlestick"
          options={options}
          series={series}
          width="100%"
          height="100%"
        />
      )}
    </div>
  )
}
