// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
contract ERC is ERC20 {
    mapping(address => bool) public requestedAddress;

    constructor(uint initialSupply) ERC20("GOLD", "GLD") {
        console.log("GLDToken constructor called", initialSupply);
        _mint(address(this), initialSupply);
    }

    function f() public payable {}

    function requestTokens() external {
        require(
            !requestedAddress[msg.sender],
            "You have already requested tokens"
        );

        address(msg.sender).call{value: 1 ether}("");
        requestedAddress[msg.sender] = true;
    }
}
