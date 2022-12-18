import React from 'react'
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { myEventsSelector } from '../store/selectors'

import config from '../context/config.json';

const Alert = () => {
  const alertRef = useRef(null);

  const isPanding = useSelector(state => state.exchange.transaction.isPanding);
  const isError = useSelector(state => state.exchange.transaction.isError);
  const account = useSelector(state => state.provider.account);
  const network = useSelector(state => state.provider.network);
  const events = useSelector(myEventsSelector);

  const removeHandler = () => {
    alertRef.current.className = 'hidden'
  }

  useEffect(() => {
    if (isPanding && account) {
      alertRef.current.className = 'text-center p-4 light-gray-bg rounded-2xl px-8 py-4'
    }

  }, [events, isPanding, account, isError])

  return (
    <div className='absolute bottom-10 right-10 z-50'>

      {isPanding ? (

        <div ref={alertRef}>
          <h1 className='font-poppins text-white font-semibold'>Transaction pending...</h1>
        </div>

      ) : isError ? (
        <div className='text-center p-4 light-gray-bg rounded-2xl px-8 py-4' ref={alertRef} onClick={removeHandler}>
          <h1 className='font-poppins text-white font-semibold'>Transaction failed</h1>
        </div>
      ) : (
        <div className='text-center p-4 light-gray-bg rounded-2xl px-8 py-4' ref={alertRef} onClick={removeHandler}>
          <h1 className='font-poppins text-white font-semibold'>Transaction successful</h1>
          <a href={config[network] ? `${config[network].explorerURL}/tx/${events[0].transactionHash}` : '#'}
            target='_blank'
            rel='noreferrer'
            className='text-white cursor-pointer hover:text-link'
          >
            {events[0] && events[0].transactionHash.slice(0,6) + '....' + events[0].transactionHash.slice(60,66)}
          </a>
        </div>

      )
      }
    </div>
  )
}

export default Alert