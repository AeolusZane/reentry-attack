import { useWeb3React } from "@web3-react/core";
import { Contract } from '@ethersproject/contracts'
import Abi from '../../artifacts/contracts/GLDToken.sol/GLDToken.json'
import { useEffect } from "react";
const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const accounta = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const accountb = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

/**
 * 1. 初始化合约，给A，B两个账户分别分配7个、3个代币
 * 2. 切换到A账户，授权B账户可以从A账户转账3个代币
 * 3. 切换到B账户，从A账户转账3个代币
 * 4. A账户现在剩余4个代币，B账户现在有6个代币
 */

export function useContract() {
    const { provider, connector, account } = useWeb3React()

    useEffect(() => {
        const signer = provider?.getSigner();
        if (!signer) {
            console.error('no signer');
            connector.activate();
            return;
        }
    }, [provider, connector, account])

    // 给B授权可以从A转账
    const approve = async () => {
        const signer = provider?.getSigner();
        if (!signer) {
            console.error('no signer');
            connector.activate();
            return;
        }
        console.log(account)
        const contract = new Contract(address, Abi.abi, signer);
        await contract.functions.approve(accountb, 3);
    }
    // 从B转账给A
    const transfer = async () => {
        const signer = provider?.getSigner();
        if (!signer) {
            console.error('no signer');
            connector.activate();
            return;
        }
        console.log(account)
        const contract = new Contract(address, Abi.abi, signer);
        /**
         * 不授权这步会报错
         */
        await contract.functions.transferFrom(accounta, accountb, 3);
    }

    const balanceOf = async () => {
        const signer = provider?.getSigner();
        if (!signer) {
            console.error('no signer');
            connector.activate();
            return;
        }
        const contract = new Contract(address, Abi.abi, signer);
        const balancea = await contract.functions.balanceOf(accounta);
        const balanceb = await contract.functions.balanceOf(accountb);
        console.log('balancea', balancea.toString());
        console.log('balanceb', balanceb.toString());
    }

    return {
        approve,
        transfer,
        balanceOf
    }
}