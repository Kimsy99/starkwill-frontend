
import { useContract } from "@starknet-react/core";
import { Abi } from "starknet"
import CoreABI from "../abi/core.json"

export function useWillContract() {
    return useContract({
        address: "0x057791be782275e83b3986d0baced52a334de5f4b94eb507b542c6535f23204c",
        abi: CoreABI as Abi,
    })
}