import { ethers } from 'ethers';

import tokenAbi from '../context/abis/Token.sol/Token.json';
import exchangeAbi from '../context/abis/Exchange.sol/Exchange.json';

export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum);
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

  dispatch({type: 'ETHER_BALANCE_LOADED', balance})

  return account;
}

export const loadToken = async (provider, addresses, dispatch) => {
  const { abi } = tokenAbi;

  let tokenHrdcr = new ethers.Contract(addresses[0], abi, provider)
  let symbolHrdcr = await tokenHrdcr.symbol();
  dispatch({ type: 'TOKEN_1_LOADED', tokenHrdcr, symbolHrdcr });

  let tokenMeth = new ethers.Contract(addresses[1], abi, provider)
  let symbolMeth = await tokenMeth.symbol();
  dispatch({ type: 'TOKEN_2_LOADED', tokenMeth, symbolMeth });

  const tokens = [tokenHrdcr, tokenMeth];

  return tokens;
}

export const loadExchange = async (provider, address, dispatch) => {
  const { abi } = exchangeAbi;

  const exchange = new ethers.Contract(address, abi, provider);
  dispatch({ type: 'EXCHANGE_LOADED', exchange });

  return exchange;
}
