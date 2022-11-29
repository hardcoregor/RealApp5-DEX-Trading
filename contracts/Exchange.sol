// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import './Token.sol';

contract Exchange {
  address public feeAccount;
  uint public feePercent;
  uint public ordersCount;

  mapping(address => mapping(address => uint)) public tokens;
  mapping(uint => _Order) public orders;
  mapping(uint => bool) public orderCancelled;
  mapping(uint => bool) public orderFilled;

  event Deposit(address _token, address _user, uint _amount, uint _balance);
  event Withdraw(address _token, address _user, uint _amount, uint _balance);
  event Order(uint id, address user, address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint timestamp);
  event Cancel(uint id, address user, address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint timestamp);
  event Trade(uint id, address user, address tokenGet, uint amountGet, address tokenGive, uint amountGive, address creator, uint timestamp);

  struct _Order {
    uint id;
    address user;
    address tokenGet;
    uint amountGet;
    address tokenGive;
    uint amountGive;
    uint timestamp;
  }

  constructor(address _feeAccount, uint _feePercent) {
    feeAccount = _feeAccount;
    feePercent = _feePercent;
  }

  function depositToken(address _token, uint _amount) public {
    require(Token(_token).transferFrom(msg.sender, address(this), _amount), 'can not transfer from');

    tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;

    emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
  }

  function withdrawToken(address _token, uint _amount) public {
    require(tokens[_token][msg.sender] >= _amount, 'not enough balance');

    tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;

    Token(_token).transfer(msg.sender, _amount);

    emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
  }

  function balanceOf(address _token, address _user) public view returns(uint) {
    return tokens[_token][_user];
  }

  function makeOrder(address _tokenGet, uint _amountGet, address _tokenGive, uint _amountGive) public {
    require(balanceOf(_tokenGive, msg.sender) >= _amountGive, 'Not enough tokens for create order');

    ordersCount++;

    orders[ordersCount] = _Order(
        ordersCount,
        msg.sender,
        _tokenGet,
        _amountGet,
        _tokenGive,
        _amountGive,
        block.timestamp
        );

    emit Order(ordersCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, block.timestamp);
  }

  function cancelOrder(uint _id) public {
    _Order storage _order = orders[_id];
    require(address(_order.user) == msg.sender, 'You are not owner this order');
    require(_order.id == _id, 'Uncorrect order id');

    orderCancelled[_id] = true;

    emit Cancel(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, block.timestamp);
  }

  function fillOrder(uint _id) public {
    require(_id > 0 && _id <= ordersCount, 'Order does not exist');
    require(!orderFilled[_id], 'This is order filled');
    require(!orderCancelled[_id], 'This is order cancelled');

    _Order storage _order = orders[_id];

    _trade(_order.id, _order.user, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive);

    orderFilled[_order.id] = true;
  }

  function _trade(
    uint _orderId,
    address _user,
    address _tokenGet,
    uint _amountGet,
    address _tokenGive,
    uint _amountGive
    ) internal {
        uint256 _feeAmount = (_amountGet * feePercent) / 100;

        tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender] - (_amountGet + _feeAmount);
        tokens[_tokenGet][_user] = tokens[_tokenGet][_user] + _amountGet;
        tokens[_tokenGet][feeAccount] = tokens[_tokenGet][feeAccount] + _feeAmount;

        tokens[_tokenGive][_user] = tokens[_tokenGive][_user] - _amountGive;
        tokens[_tokenGive][msg.sender] = tokens[_tokenGive][msg.sender] + _amountGive;

        emit Trade(_orderId, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, _user, block.timestamp);
  }
}