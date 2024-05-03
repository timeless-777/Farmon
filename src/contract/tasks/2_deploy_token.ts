import { task } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import { FarmonToken__factory } from "../types";

task("deploy:token", "deploy Farmon Token Contract")
  .addParam("initialOwner", "Contract Initial Owner")
  .addParam("minter", "Minter address")
  .setAction(async (args, hre) => {
    try {
      const { initialOwner, minter } = args;
      const factory = (await hre.ethers.getContractFactory(
        "FarmonToken"
      )) as FarmonToken__factory;

      const contract = await factory.deploy(initialOwner);

      await contract.waitForDeployment();

      console.log(
        "🚀 Farmon Token contract deployed to:",
        await contract.getAddress()
      );
      const MINTER_ROLE = contract.MINTER_ROLE();
        await contract.grantRole(MINTER_ROLE, minter);

        console.log(
          "👌 grant minter role",
          await contract.getAddress()
        );
    } catch (e) {
      console.error(e);
    }
  });
