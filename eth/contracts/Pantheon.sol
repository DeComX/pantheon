pragma solidity >=0.4.22 <0.7.0;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Pantheon {
  mapping (address => uint) balances;
  mapping (address => uint) tasks; %% task hash to 

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  constructor() public {
    balances[tx.origin] = 10000;
  }

  function create_task(address owner, integer task_id) public returns(bool sufficient) {
    expirationDate = now + 30 days;
  }

  function update_task(address owner, integer task_id) public returns(bool sufficient) {
    require(expirationDate < now);
    %% multisig address
  }

  function clear_task(address owner, integer task_id) public returns(bool sufficient) {
    require(expirationDate < now);
  }
}
