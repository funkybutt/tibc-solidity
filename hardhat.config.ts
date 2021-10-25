import "@nomiclabs/hardhat-waffle"
import "@openzeppelin/hardhat-upgrades"
import "@openzeppelin/hardhat-defender"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "hardhat-contract-sizer"
import "hardhat-abi-exporter"
import "./tasks/deployLibraries"
import "./tasks/deployTendermintClient"
import "./tasks/deployClientManager"
import "./tasks/deployPacket"
import "./tasks/deployRouting"
import "./tasks/deployERC1155Bank"
import "./tasks/deployNFTTransfer"

module.exports = {
  defaultNetwork: 'hardhat',
  defender: {
    apiKey: "BzKzK5EC8A5SFVqsWWXf9VkzQToYk29t",
    apiSecret: "Q9ZNN9GAosU3iTXZqSxkUZyZ6QvN7hcDRuWJm9pbr5dg1rswW6FbL2ccUdbB5qmd",
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/023f2af0f670457d9c4ea9cb524f0810',
      gasPrice: 1500000000,
      chainId: 4,
      gas: 4100000,
      accounts: ['d0ce43e074a9a057b4ba6b018e7a1f4072246f288be3a6e72d1805de4c9ad4dd'],
    },
  },
  solidity: {
    compilers: [{
      version: '0.6.8', settings: {
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      }
    }],
  },
  gasReporter: {
    enabled: true,
    showMethodSig: true,
    maxMethodDiff: 10,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  abiExporter: {
    path: './abi',
    clear: true,
    spacing: 2,
  }
}