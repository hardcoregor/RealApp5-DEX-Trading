import moment from "moment";
import { createSelector } from "reselect";
import { get } from 'lodash';
import { ethers } from "ethers";

const tokens = state => get(state, 'tokens.contracts');
const allOrders = state => get(state, 'exchange.allOrders.data', []);

const decorateOrder = (order, tokens) => {
  let token0Amount, token1Amount;
  if (order.tokenGive === tokens[1].address) {
    token0Amount = order.amountGive;
    token1Amount = order.amountGet;
  } else {
    token0Amount = order.amountGet;
    token1Amount = order.amountGive;
  }

  const precision = 100000
  let tokenPrice = (token1Amount / token0Amount)
  tokenPrice = Math.round(tokenPrice * precision) / precision;

  return ({
    ...order,
    token0Amount: ethers.utils.formatUnits(token0Amount, "ether"),
    token1Amount: ethers.utils.formatUnits(token1Amount, "ether"),
    tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ssa d MMM D')
  })
}

export const orderBookSelector = createSelector(allOrders, tokens, (orders, tokens) => {

  if (!tokens[0] || !tokens[1]) { return };
  orders = orders.filter((o) => o.tokenGet === tokens[0].address || o.tokenGet === tokens[1].address);
  orders = orders.filter((o) => o.tokenGive === tokens[0].address || o.tokenGive === tokens[1].address);

  orders = decorateOrderBookOrders(orders, tokens);

  console.log(orders);
})

const decorateOrderBookOrders = (orders, tokens) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order, tokens)
      order = decorateOrderBookOrder(order, tokens)
      return(order);
    })
  )
}

const GREEN = '#25CE8F';
const RED = '#F45353';

const decorateOrderBookOrder = (order, tokens) => {
  const orderType = order.tokenGive === tokens[1].address ? 'buy' : 'sell';

  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED)
  })
}