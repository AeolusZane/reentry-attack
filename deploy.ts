import hre from "hardhat";
import { abi } from './artifacts/contracts/GLDToken.sol/GLDToken.json'
const accounta = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const accountb = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";


async function deploy() {
    const GLDToken = await hre.ethers.getContractFactory("GLDToken");

    /**
     * a账户初始时有10个代币
     */
    const gld = await GLDToken.deploy(10);

    /**
     * a账户给b账户转账3个代币
     */
    await gld.transfer(accountb, 3);

    // const ba = await gld.balanceOf(accounta);
    // console.log('ba', ba.toString());

    // await gld.aa(2, accounta, accountb);
    return { gld };
}

async function newContract() {
    const provider = hre.ethers.provider
    const signer = await hre.ethers.provider.getSigner();
    const GLDToken = new hre.ethers.Contract("0xdbc43ba45381e02825b14322cddd15ec4b3164e6", abi, signer);
    await GLDToken.approve(accounta, 10);
    const gld = await GLDToken.balanceOf(accounta);
    console.log(gld);
    await GLDToken.aa(2, accounta, accountb, {
        value: 100000
    });
    // // GLDToken.approve("0xdbc43ba45381e02825b14322cddd15ec4b3164e6", 2);
    // console.log('gld', gld.toString());

}

async function main() {
    await deploy();
    // await newContract();
}

main();