// @ts-ignore
import { ethers } from "hardhat";
// @ts-ignore
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/root-with-address";
import {
  ADDRESS_0x0,
  ERC20__factory,
  NetworkType,
  tokenDataByNetwork
} from "@gearbox-protocol/sdk";

export async function detectNetwork(): Promise<NetworkType> {
  const accounts = (await ethers.getSigners()) as Array<SignerWithAddress>;
  const deployer = accounts[0];

  try {
    const usdcMainnet = ERC20__factory.connect(
      tokenDataByNetwork.Mainnet.USDC,
      deployer
    );
    await usdcMainnet.balanceOf(ADDRESS_0x0);
    return "Mainnet";
  } catch {
    try {
      const usdcMainnet = ERC20__factory.connect(
        tokenDataByNetwork.Kovan.USDC,
        deployer
      );
      await usdcMainnet.balanceOf(ADDRESS_0x0);
      return "Kovan";
    } catch {
      throw new Error("Unknown network");
    }
  }
}
