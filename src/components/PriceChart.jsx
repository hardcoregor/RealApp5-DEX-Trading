import React from 'react'
import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';

import upArrow from '../assets/up-arrow.svg';
import downArrow from '../assets/down-arrow.svg';
import { options, defaultSeries } from './PriceChart.config';
import { Banner } from './Banner';
import { priceChartSelector } from '../store/selectors';

export const PriceChart = () => {
  const account = useSelector(state => state.provider.account);
  const symbols = useSelector(state => state.tokens.symbols);

  const priceChart = useSelector(priceChartSelector);

  return (
    <div className='btn-background m-3 rounded-lg p-2 h-1/3 pb-6'>
      <div className='flex'>
        <h2 className='text-white font-poppins text-left font-medium'>{symbols && `${symbols[0]}/${symbols[1]}`}</h2>
        {priceChart &&
          <div className='flex'>

            {priceChart.lastPriceChange === '+' ?
              <img src={upArrow} alt="ArrowUp" width={45} height={35} /> :
              <img src={downArrow} alt="ArrowDown" width={45} height={35} />
            }

            <span className='text-white font-poppins text-left font-medium'>{priceChart.lastPrice}</span>
          </div>
        }
      </div>

      {!account ? (
        <Banner text={'Please connect with Metamask'} />
      ) : (
        <Chart
          type="candlestick"
          options={options}
          series={priceChart ? priceChart.series : defaultSeries}
          width="100%"
          height="100%"
        />
      )}
    </div>
  )
}
