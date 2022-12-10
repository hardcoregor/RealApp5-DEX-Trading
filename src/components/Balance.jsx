import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Button from './Button';
import { loadBalances, transferTokens } from '../context/Interactions';

const Balance = () => {
  const dispatch = useDispatch();

  const exchangeBalance = useSelector(state => state.exchange.balances);
  const exchange = useSelector(state => state.exchange.contract);
  const transferInProgress = useSelector(state => state.exchange.transferInProgress);

  const tokens = useSelector(state => state.tokens.contracts);
  const symbols = useSelector(state => state.tokens.symbols);

  const tokenBalance = useSelector(state => state.tokens.balances);
  const account = useSelector(state => state.provider.account);
  const provider = useSelector(state => state.provider.connection);

  const [tokenOne, setTokenOne] = useState(0);
  const [tokenTwo, setTokenTwo] = useState(0);

  const amountHandler = (e, token) => {
    if (token.address === tokens[0].address) {
      setTokenOne(e.target.value);
    } else {
      setTokenTwo(e.target.value);
    }
  }

  const depositHandler = async (e, token) => {
    e.preventDefault();
    if (token.address === tokens[0].address) {
      await transferTokens(provider, exchange, 'Deposit', token, tokenOne, dispatch);
      setTokenOne(0);
    } else {
      await transferTokens(provider, exchange, 'Deposit', token, tokenTwo, dispatch);
      setTokenTwo(0);
    }
  }

  const depositButton = async (token) => {
    if (token.address === tokens[0].address) {
      await transferTokens(provider, exchange, 'Deposit', token, tokenOne, dispatch);
      setTokenOne(0);
    } else {
      await transferTokens(provider, exchange, 'Deposit', token, tokenTwo, dispatch);
      setTokenTwo(0);
    }
  }

  const withdrawButton = async (token) => {
    if (token.address === tokens[0].address) {
      await transferTokens(provider, exchange, 'Withdraw', token, tokenOne, dispatch);
      setTokenOne(0);
    } else {
      await transferTokens(provider, exchange, 'Withdraw', token, tokenTwo, dispatch);
      setTokenTwo(0);
    }
  }

  useEffect(() => {
    if (exchange && tokens[0] && tokens[1] && account) {
      loadBalances(dispatch, exchange, tokens, account);
    }
  }, [exchange, tokens, account, dispatch, transferInProgress])

  return (
    <div className='w-full mt-3 pb-3 border-b border-pink-1 border-opacity-30'>
      <div className='flex flex-col items-center border-b border-pink-1 border-opacity-30 pb-3'>
        <h2 className='font-poppins font-bold text-white text-lg text-center'>Balance</h2>
      </div>
      <div className='p-2 mt-2'>

        <div className='flex justify-between mb-2 w-full text-white font-poppins px-2'>
          <div className='text-center'>
            <small>Token</small>
            <p className='text-sm'>{symbols && symbols[0]}</p>
          </div>

          <div className='text-center'>
            <small>On wallet</small>
            <p
              className='cursor-pointer text-sm'
              onClick={() => {
                setTokenOne(tokenBalance[0])
              }}
            >
              {tokenBalance && tokenBalance[0]}</p>
          </div>

          <div className='text-center'>
            <small>On exchange</small>
            <p
              className='cursor-pointer text-sm'
              onClick={() => {
                setTokenOne(exchangeBalance[0])
              }}
            >{exchangeBalance && exchangeBalance[0]}</p>
          </div>
        </div>

        <form onSubmit={(e) => depositHandler(e, tokens[0])}>
          <label htmlFor='token0'></label>
          <div>
            <input
              className='w-full rounded-3xl btn-background pl-4 py-2 text-white outline-none font-poppins'
              min="0"
              type="number"
              step="any"
              id='token0'
              value={tokenOne === 0 ? '' : tokenOne}
              placeholder={`0.000 ${symbols && symbols[0]}`}
              onChange={(e) => amountHandler(e, tokens[0])}
            />
          </div>
        </form>

        <div className='flex justify-between'>
          <Button
            btnName="Deposit"
            classStyle="py-0 bg-none border mt-4 w-49 hover:text-black"
            handleClick={() => {
              depositButton(tokens[0])
            }}
          />
          <Button
            btnName="Withdraw"
            classStyle="py-0 bg-none border mt-4 w-49 hover:text-black"
            handleClick={() => {
              withdrawButton(tokens[0])
            }}
          />
        </div>
      </div>

      <div className='p-2 mt-2'>

        <div className='flex justify-between mb-2 w-full text-white font-poppins px-2'>
          <div className='text-center'>
            <small>Token</small>
            <p className='text-sm'>{symbols && symbols[1]}</p>
          </div>

          <div className='text-center'>
            <small>On wallet</small>
            <p
              className='cursor-pointer text-sm'
              onClick={() => {
                setTokenTwo(tokenBalance[1])
              }}
            >{tokenBalance && tokenBalance[1]}</p>
          </div>

          <div className='text-center'>
            <small>On exchange</small>
            <p
              className='cursor-pointer text-sm'
              onClick={() => {
                setTokenTwo(exchangeBalance[1])
              }}
            >{exchangeBalance && exchangeBalance[1]}</p>
          </div>
        </div>

        <form onSubmit={(e) => depositHandler(e, tokens[1])}>
          <label htmlFor='token1'></label>
          <div>
            <input
              className='w-full rounded-3xl btn-background pl-4 py-2 text-white outline-none font-poppins'
              min="0"
              type="number"
              step="any"
              id='token1'
              value={tokenTwo === 0 ? '' : tokenTwo}
              placeholder={`0.000 ${symbols && symbols[1]}`}
              onChange={(e) => amountHandler(e, tokens[1])}
            />
          </div>
        </form>

        <div className='flex justify-between'>
          <Button
            btnName="Deposit"
            classStyle="py-0 bg-none border mt-4 w-49 hover:text-black"
            handleClick={() => {
              depositButton(tokens[1])
            }}
          />
          <Button
            btnName="Withdraw"
            classStyle="py-0 bg-none border mt-4 w-49 hover:text-black"
            handleClick={() => {
              withdrawButton(tokens[1])
            }}
          />
        </div>

      </div>
    </div>
  )
}

export default Balance