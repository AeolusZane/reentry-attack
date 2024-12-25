import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre, { ethers } from "hardhat";
import { abi } from "../artifacts/contracts/ERC.sol/ERC.json";

describe("GameItem ERC721", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployERCFixture() {
    const Token = await hre.ethers.getContractFactory("ERC");

    const token = await Token.deploy(5000);
    return { token };
  }

  async function deployAttackFixture() {
    const Attack = await hre.ethers.getContractFactory("Attack");
    const attack = await Attack.deploy();
    return { attack };
  }

  async function printInfo(attack: any, token: any) {
    const signer = await hre.ethers.provider.getSigner();
    const provider = hre.ethers.provider;
    const signer1 = await provider.getSigner(1);

    // 攻击合约的资金
    const attackBalance = await provider.getBalance(await attack.getAddress());
    // token合约的资金
    const tokenBalance = await provider.getBalance(await token.getAddress());
    // 盗窃者账号的资金
    const attackerBalance = await provider.getBalance(signer1);
    // 创建者账号的资金
    const creatorBalance = await provider.getBalance(signer);
    console.table({
      "攻击合约中的资金": attackBalance.toString(),
      "token合约的资金": tokenBalance.toString(),
      "盗窃者账号的资金": attackerBalance.toString(),
      "创建者账号的资金": creatorBalance.toString()
    })
  }

  describe("Deployment", function () {
    it("deploy", async function () {
      const { token } = await loadFixture(deployERCFixture);
      const { attack } = await loadFixture(deployAttackFixture);

      const signer = await hre.ethers.provider.getSigner();
      const provider = hre.ethers.provider;
      const signer1 = await provider.getSigner(1);
      /**
       * 盗窃者账号
       * 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
       * 当前账号
       * 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
       * 合约地址
       * 0x5FbDB2315678afecb367f032d93F642f64180aa3
       * 攻击合约地址
       * 0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0
       */

      /**
       * 流程
       * 1.当前账号创建ERC20合约
       * 2.当前账号创建攻击合约
       * 3.当前账号给ERC20合约转账
       * 4.攻击合约调用ERC20合约提取资金（调用一次提走合约中所有的钱）
       */
      console.log("😄创建完合约初始状态");
      await printInfo(attack, token);

      console.log('⏰当前账号往token合约中转账...')
      await signer.sendTransaction({
        to: await token.getAddress(),
        value: hre.ethers.parseEther("5"),
      })
      await printInfo(attack, token);

      // 攻击者攻击合约
      console.log("💀攻击者攻击合约");
      await attack.connect(signer1).attack(await token.getAddress());
      await printInfo(attack, token);

      // 攻击者提取资金
      console.log("💰攻击者提取资金");
      await attack.connect(signer1).withdraw();
      await printInfo(attack, token);
    });
  });
});
