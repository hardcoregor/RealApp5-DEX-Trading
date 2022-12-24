// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IERC20 {
  function transfer(address _to, uint256 _amount) external returns(bool);
  function balanceOf(address _account) external view returns(uint256);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

contract Faucet {
  address payable owner;
  IERC20 public token;

  uint256 public withdrawlAmount = 50 * (10**18);
  uint256 public lockTime = 1 minutes;

  event Withdrawl(address indexed to, uint256 indexed amount);
  event Deposit(address indexed from, uint256 indexed amount);

  mapping(address => uint256) nextAccessTime;

  constructor(address _tokenAddress) payable {
    token = IERC20(_tokenAddress);
    owner = payable(msg.sender);
  }

  function requestTokens() public {
    require(msg.sender != address(0), "Request must not originate from a zero account");
    require(token.balanceOf(address(this)) >= withdrawlAmount, "Insufficient balance in faucet");
    require(block.timestamp >= nextAccessTime[msg.sender], "Insufficient time elapsed since last withdrawl - try again later.");

    nextAccessTime[msg.sender] = block.timestamp + lockTime;
    token.transfer(msg.sender, withdrawlAmount);
  }

  receive() external payable {
    emit Deposit(msg.sender, msg.value);
  }

  function getBalance() external view returns(uint256) {
    return token.balanceOf(address(this));
  }

  function setWithdrawlAmount(uint256 _amount) public onlyOwner {
    withdrawlAmount = _amount * (10**18);
  }

  function setLockTime(uint256 _amount) public onlyOwner {
    lockTime = _amount * 1 minutes;
  }

  function withdrawl() external onlyOwner {
    emit Withdrawl(msg.sender, token.balanceOf(address(this)));
    token.transfer(msg.sender, token.balanceOf(address(this)));
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "You are not owner");
    _;
  }
}