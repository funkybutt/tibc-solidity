// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.6.8;
pragma experimental ABIEncoderV2;

import "../02-client/ClientManager.sol";
import "../../libraries/Types.sol";
import "../../libraries/02-client/Client.sol";
import "../../libraries/04-packet/Packet.sol";
import "../../interfaces/IClientManager.sol";
import "../../interfaces/IClient.sol";
import "../../interfaces/IModule.sol";
import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

contract Packet is ReentrancyGuard {
    IClientManager public clientManager;

    // port -> module app implementation address
    mapping(string => IModule) public modules;

    function sendPacket(
        uint64 sequence,
        string calldata sourceChain,
        string calldata destChain,
        string calldata relayChain,
        bytes calldata data
    ) external nonReentrant {}

    function recvPacket(
        PacketTypes.Packet calldata packet,
        bytes calldata proof,
        Height.Data calldata height
    ) external nonReentrant {
        IClient client = clientManager.getClient(packet.sourceChain);
        client.verifyPacketCommitment(
            height,
            proof,
            packet.sourceChain,
            packet.destChain,
            packet.sequence,
            packet.data
        );
        IModule module = modules[packet.port];
        module.onRecvPacket(packet);
    }

    function acknowledgePacket(
        PacketTypes.Packet calldata packet,
        bytes calldata acknowledgement,
        bytes calldata proofAcked,
        Height.Data calldata height
    ) external nonReentrant {
        IClient client = clientManager.getClient(packet.destChain);
        client.verifyPacketAcknowledgement(
            height,
            proofAcked,
            packet.sourceChain,
            packet.destChain,
            packet.sequence,
            acknowledgement
        );
        IModule module = modules[packet.port];
        module.onAcknowledgementPacket(packet, acknowledgement);
    }

    function cleanPacket(
        uint64 sequence,
        string calldata sourceChain,
        string calldata destChain,
        string calldata relayChain
    ) external nonReentrant {}

    function recvCleanPacket(
        uint64 sequence,
        string calldata sourceChain,
        string calldata destChain,
        string calldata relayChain,
        bytes calldata proof,
        ClientTypes.Height calldata height
    ) external nonReentrant {}

    function writeAcknowledgement(
        uint64 sequence,
        string memory port,
        string memory sourceChain,
        string memory destChain,
        string memory relayChain,
        bytes memory data
    ) internal nonReentrant {}
}
