import { task } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import { ContractFactory } from "ethers";

task("deploy:nft", "deploy Farmon Contract")
  .addParam("baseUri", "NFT metadata baseUri")
  .addParam("category", "NFT Symbol")
  .addParam("freeMintDuration", "Free Mint Duration")
  .setAction(async (args, hre) => {
    try {
      const { baseUri, category, freeMintDuration } = args;
      const factory = (await hre.ethers.getContractFactory(
        "Farmon"
      )) as ContractFactory;

      const contract = await factory.deploy(baseUri, category, freeMintDuration);

      await contract.waitForDeployment();

      console.log(
        "🚀 Farmon contract deployed to:",
        await contract.getAddress()
      );
    } catch (e) {
      console.error(e);
    }
  });
