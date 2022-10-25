
import { useContract } from "@starknet-react/core";
import {Abi} from "starknet"
import CoreABI from "../abi/core.json"

export function useWillContract() {
    return useContract({
        address: "0x01f51fca15fe380093c6cb81146767cbc2e109e1c9e20940bf9ba7fb9d4e38b0",
        abi: CoreABI as Abi,
    })
}