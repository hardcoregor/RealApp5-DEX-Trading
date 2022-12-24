// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IERC20 {
  function transfer(address _to, uint256 _amount) external view returns(bool);
  function balanceOf(address _account) external view returns(uint256);
}

contract Faucet {
  address payable owner;
  IERC20 public token;

  uint256 public withdrawlAmount = 50 * (10**18);
  uint256 public lockTime = 1 minutes;

  event Deposit(address from, uint256 amount);

  mapping(address => uint256) nextAccessTime;

  constructor(address _tokenAddress) payable {
    token = IERC20(_tokenAddress);
    owner = payable(msg.sender);
  }

  function requestTokens() public {
    require(msg.sender != address(0), "Request must not originate from a zero account");
    require(token.balanceOf(address(this)) >= withdrawlAmount, "Insufficient balance in faucet");
    require(block.timestamp => nextAccessTime[msg.sender], "Insufficient time elapsed since last withdrawl - try again later.");

    nextAccessTime[msg.sender] = block.timestamp + lockTime;
    token.transfer(msg.sender, withdrawlAmount);
  }

  receive() external payable {
    emit Deposit(msg.sender, msg.value);
  }

  function getBalance() external view returns(uint256) {
    token.balanceOf(address(this));
  }

  
}