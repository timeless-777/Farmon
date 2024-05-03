import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-foundry";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
import "dotenv/config";
import "./tasks";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    base_sepolia: {
      url: "https://sepolia.base.org",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 84532,
    },
    base: {
      url: "https://mainnet.base.org",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 8453,
    },
  },
  etherscan: {
    apiKey: {
      base_sepolia: "5a112fff-727a-4f16-b4ff-24b4c51f832a",
    },
    customChains: [
      {
        network: "base_sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
    alwaysGenerateOverloads: false,
    externalArtifacts: ["externalArtifacts/*.json"],
    dontOverrideCompile: false,
  },
};

export default config;
