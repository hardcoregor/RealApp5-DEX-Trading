// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import './Token.sol';

contract Exchange {
  address public feeAccount;
  uint public feePercent;
  uint public ordersCount;

  mapping(address => mapping(address => uint)) public tokens;
  mapping(uint => _Order) public orders;

  event Deposit(address _token, address _user, uint _amount, uint _balance);
  event Withdraw(address _token, address _user, uint _amount, uint _balance);
  event Order(uint id, address user, address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint timestamp);

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
}