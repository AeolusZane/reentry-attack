import hre from "hardhat";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
const accounta = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const accountb = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";


async function deployERC721Fixture() {
    const GLDToken = await hre.ethers.getContractFactory("GLDToken");

    /**
     * a账户初始时有10个代币
     */
    const gld = await GLDToken.deploy(10);

    /**
     * a账户给b账户转账3个代币
     */
    await gld.transfer(accountb, 3);
    return { gld };
}

async function main() {
    await loadFixture(deployERC721Fixture);
}

main();