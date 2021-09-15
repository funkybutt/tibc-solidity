import "@nomiclabs/hardhat-web3";
import { ethers } from "hardhat";
import { task, types } from "hardhat/config"

const CLIENT_MANAGER_ADDRES = process.env.CLIENT_MANAGER_ADDRES;
const ROUTING_ADDRES = process.env.ROUTING_ADDRES;

task("deployPacket", "Deploy Packet")
    .addParam("client", "Chain Name")
    .addParam("routing", "Client Address")
    .setAction(async (taskArgs, hre) => {
        const packetFactory = await hre.ethers.getContractFactory('Packet')

        const packet = await packetFactory.deploy(String(CLIENT_MANAGER_ADDRES), String(ROUTING_ADDRES));
        await packet.deployed();
        console.log("Packet deployed to:", packet.address);
        console.log("export PACKET_ADDRES=%s", packet.address);
    });

module.exports = {};
