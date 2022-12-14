import { ethers } from 'ethers';

import tokenAbi from '../context/abis/Token.sol/Token.json';
import exchangeAbi from '../context/abis/Exchange.sol/Exchange.json';
import faucetAbi from '../context/abis/Faucet.sol/Faucet.json';

export const loadProvider = (dispatch) => {
  const connection = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());
  dispatch({ type: 'PROVIDER_LOADED', connection })

  return connection;
}

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch({ type: 'NETWORK_LOADED', chainId })

  return chainId;
}

export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = ethers.utils.getAddress(accounts[0]);
  dispatch({ type: 'ACCOUNT_LOADED', account });

  let balanceRaw = await provider.getBalance(account);
  let balance = ethers.utils.formatEther(balanceRaw);

  dispatch({ type: 'ETHER_BALANCE_LOADED', balance })

  return account;
}

export const loadToken = async (provider, addresses, dispatch) => {
  const { abi } = tokenAbi;
  let token, symbol;

  token = new ethers.Contract(addresses[0], abi, provider)
  symbol = await token.symbol();
  dispatch({ type: 'TOKEN_1_LOADED', token, symbol });

  token = new ethers.Contract(addresses[1], abi, provider)
  symbol = await token.symbol();
  dispatch({ type: 'TOKEN_2_LOADED', token, symbol });

  return token;
}

export const loadExchange = async (provider, address, dispatch) => {
  const { abi } = exchangeAbi;

  const exchange = new ethers.Contract(address, abi, provider);
  dispatch({ type: 'EXCHANGE_LOADED', exchange });

  return exchange;
}

export const loadFaucet = async (provider, addresses, dispatch) => {
  const { abi } = faucetAbi;
  let faucet, token

  faucet = new ethers.Contract(addresses[0], abi, provider);
  token = await faucet.token();
  dispatch({ type: 'FAUCET_1_LOADED', faucet, token });

  faucet = new ethers.Contract(addresses[1], abi, provider);
  token = await faucet.token();
  dispatch({ type: 'FAUCET_2_LOADED', faucet, token });

  faucet = new ethers.Contract(addresses[2], abi, provider);
  token = await faucet.token();
  dispatch({ type: 'FAUCET_3_LOADED', faucet, token });

  return faucet;
}

export const subscribeToEvents = (exchange, dispatch) => {
  exchange.on('Cancel', (id, user, tokenGet, amountGet, tokenGive, amountGive, timestamp, event) => {
    const order = event.args
    dispatch({ type: 'ORDER_CANCEL_SUCCESS', order, event })
  })

  exchange.on('Deposit', (token, user, amount, balance, event) => {
    dispatch({ type: 'TRANSFER_SUCCESS', event });
  })

  exchange.on('Withdraw', (token, user, amount, balance, event) => {
    dispatch({ type: 'TRANSFER_SUCCESS', event });
  })

  exchange.on('Order', (id, user, tokenGet, amountGet, tokenGive, amountGive, timestamp, event) => {
    const order = event.args
    dispatch({ type: 'NEW_ORDER_SUCCESS', order, event });
  })

  exchange.on('Trade', (id, user, tokenGet, amountGet, tokenGive, amountGive, creator, timestamp, event) => {
    const order = event.args
    dispatch({ type: 'ORDER_FILL_SUCCESS', order, event });
  })
}

export const loadBalances = async (dispatch, exchange, tokens, account) => {
  let balance;

  balance = ethers.utils.formatUnits(await tokens[0].balanceOf(account), 18);
  dispatch({ type: 'TOKEN_1_BALANCE_LOADED', balance });

  balance = ethers.utils.formatUnits(await exchange.balanceOf(tokens[0].address, account), 18);
  dispatch({ type: 'EXCHANGE_TOKEN_1_BALANCE_LOADED', balance });

  balance = ethers.utils.formatUnits(await tokens[1].balanceOf(account), 18);
  dispatch({ type: 'TOKEN_2_BALANCE_LOADED', balance });

  balance = ethers.utils.formatUnits(await exchange.balanceOf(tokens[1].address, account), 18);
  dispatch({ type: 'EXCHANGE_TOKEN_2_BALANCE_LOADED', balance });
}

export const loadAllOrders = async (provider, exchange, dispatch) => {
  const block = await provider.getBlockNumber();

  const cancelStream = await exchange.queryFilter('Cancel', 0, block);
  const cancelledOrders = cancelStream.map(event => event.args);

  dispatch({ type: 'CANCELLED_ORDERS_LOADED', cancelledOrders });

  const tradeStream = await exchange.queryFilter('Trade', 0, block);
  const filledOrders = tradeStream.map(event => event.args);

  dispatch({ type: 'FILLED_ORDERS_LOADED', filledOrders });


  const orderStream = await exchange.queryFilter('Order', 0, block);
  const allOrders = orderStream.map(event => event.args);

  dispatch({ type: 'ALL_ORDERS_LOADED', allOrders });

}

export const transferTokens = async (provider, exchange, transferType, token, amount, dispatch) => {
  let transaction;

  dispatch({ type: 'TRANSFER_REQUEST' })
  const signer = await provider.getSigner();
  const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18);

  if (transferType === 'Deposit') {
    try {
      transaction = await token.connect(signer).approve(exchange.address, amountToTransfer);
      await transaction.wait();
      transaction = await exchange.connect(signer).depositToken(token.address, amountToTransfer);
      await transaction.wait();

    } catch (error) {
      dispatch({ type: 'TRANSFER_FAIL' })
    }
  } else {
    try {
      transaction = await exchange.connect(signer).withdrawToken(token.address, amountToTransfer);
      await transaction.wait();
    } catch (error) {
      dispatch({ type: 'TRANSFER_FAIL' })
    }
  }
}

export const makeBuyOrder = async (provider, exchange, tokens, order, dispatch) => {
  let transaction;

  const signer = await provider.getSigner();

  const tokenGet = tokens[0].address;
  const amountGet = ethers.utils.parseUnits(order.amount, 18);
  const tokenGive = tokens[1].address;
  const amountGive = ethers.utils.parseUnits((order.amount * order.price).toString(), 18);

  dispatch({ type: 'NEW_ORDER_REQUEST' });

  try {
    transaction = await exchange.connect(signer).makeOrder(tokenGet, amountGet, tokenGive, amountGive);
    await transaction.wait();
  } catch (error) {
    dispatch({ type: 'NEW_ORDER_FAILED' });
  }
}

export const makeSellOrder = async (provider, exchange, tokens, order, dispatch) => {
  let transaction;

  const signer = await provider.getSigner();

  const tokenGet = tokens[1].address;
  const amountGet = ethers.utils.parseUnits((order.amount * order.price).toString(), 18);
  const tokenGive = tokens[0].address;
  const amountGive = ethers.utils.parseUnits(order.amount, 18);

  dispatch({ type: 'NEW_ORDER_REQUEST' });

  try {
    transaction = await exchange.connect(signer).makeOrder(tokenGet, amountGet, tokenGive, amountGive);
    await transaction.wait();
  } catch (error) {
    dispatch({ type: 'NEW_ORDER_FAILED' });
  }
}

export const cancelOrder = async (provider, exchange, order, dispatch) => {

  dispatch({ type: 'ORDER_CANCEL_REQUEST' })

  try {
    const signer = await provider.getSigner()
    const transaction = await exchange.connect(signer).cancelOrder(order.id)
    await transaction.wait()
  } catch (error) {
    dispatch({ type: 'ORDER_CANCEL_FAIL' })
  }
}

export const fillOrder = async (provider, exchange, order, dispatch) => {
  dispatch({ type: 'ORDER_FILL_REQUEST' });

  try {
    const signer = await provider.getSigner();
    const transaction = await exchange.connect(signer).fillOrder(order.id);
    await transaction.wait();
  } catch (error) {
    dispatch({ type: 'ORDER_FILL_FAIL' });
  }
}

export const deleteHash = async (dispatch) => {
  dispatch({ type: 'CLEAR_TRANSFER_SUCCESS' });
}

export const usingFaucet = async (provider, faucet) => {
  const signer = await provider.getSigner();
  const transaction = await faucet.connect(signer).requestTokens();
  await transaction.wait();

  return transaction.hash;
} 