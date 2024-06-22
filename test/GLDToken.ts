import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { abi } from "../artifacts/contracts/GLDToken.sol/GLDToken.json";

describe("GameItem ERC721", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployERC721Fixture() {
    const GLDToken = await hre.ethers.getContractFactory("GLDToken");

    const gld = await GLDToken.deploy(10);
    return { gld };
  }

  describe("Deployment", function () {
    it("deploy", async function () {
      const { gld: b } = await loadFixture(deployERC721Fixture);
      const contract = new hre.ethers.Contract(await b.getAddress(), abi, hre.ethers.provider);
      // await b.call0({
      //   value: hre.ethers.parseEther("100")
      // })
      // await b.call1({
      //   value: hre.ethers.parseEther("100")
      // })
      // await b.call2({
      //   value: hre.ethers.parseEther("100")
      // })
      // const provider = hre.ethers.provider;
      // console.log('balance',await provider.getBalance(await provider.getSigner()))


      // return;
      const call0 = contract.interface.encodeFunctionData("call0", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]) as any;
      const call1 = contract.interface.encodeFunctionData("call1", []) as any;
      const call2 = contract.interface.encodeFunctionData("call2", []) as any;
      const address = await b.getAddress();
      const callList0 = [];
      for (let i = 0; i < 100; i++) {
        const value = {
          target: address,
          callData: call0
        }
        callList0.push(value);
      }
      const tx = await b.batch(callList0, true, {
        value: hre.ethers.parseEther("100")
      });
      // const tx = await b.batch([{
      //   target: address,
      //   callData: call0
      // }, {
      //   target: address,
      //   callData: call1
      // }, {
      //   target: address,
      //   callData: call2
      // }], true, {
      //   value: hre.ethers.parseEther("100")
      // });
      const receipt = await tx.wait() as any;
      // const results0 = contract.interface.decodeFunctionResult("call0", receipt.logs[0].data)[0];
      // const results1 = contract.interface.decodeFunctionResult("call0", receipt.logs[1].data)[0];
      // const results2 = contract.interface.decodeFunctionResult("call0", receipt.logs[2].data)[0];


      try {
        const balance = await hre.ethers.provider.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        console.log('🐷', balance)
        // console.log(BigInt(results0).toString(16), BigInt(results1).toString(16), BigInt(results2).toString(16))
      } catch (e) {
        // console.log(e)
      }
    });
  });
});
