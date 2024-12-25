// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract ERC is ERC20, ReentrancyGuard {
    mapping(address => bool) public requestedAddress;

    constructor(uint initialSupply) ERC20("GOLD", "GLD") {
        console.log("GLDToken constructor called", initialSupply);
        _mint(address(this), initialSupply);
    }

    function requestTokens() external 
    // nonReentrant 
    {
        require(
            !requestedAddress[msg.sender],
            "You have already requested tokens"
        );

        (bool success, ) = address(msg.sender).call{value: 1 ether}("");
        console.log("Success", success);
        require(success, "Failed to send Ether");
        requestedAddress[msg.sender] = true;
    }

    receive() external payable {
        console.log("Received Ether", msg.value);
    }
}
