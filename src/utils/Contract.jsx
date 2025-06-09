import { ethers } from "ethers";
import { abi } from "../abi/todoAbi";

const contractAddress = "0x08EFafAEcfe31ef78bDB1eA423e2A2067F9dE76d";

export const getContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};
