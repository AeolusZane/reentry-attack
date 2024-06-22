// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
contract GLDToken is ERC20 {
    uint a;

    constructor(uint initialSupply) ERC20("GOLD", "GLD") {
        console.log("GLDToken constructor called", initialSupply);
        _mint(msg.sender, initialSupply);
    }

    function approve(
        address spender,
        uint256 amount
    ) public override returns (bool) {
        console.log("Approve called");
        return super.approve(spender, amount);
    }
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        console.log("TransferFrom called");
        return super.transferFrom(sender, recipient, amount);
    }
}