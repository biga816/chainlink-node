// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@chainlink/contracts/src/v0.7/Operator.sol";

contract Oracle is Operator {
    constructor(address _link, address owner) public Operator(_link, owner) {}
}
