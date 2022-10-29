
import { useContract } from "@starknet-react/core";
import {Abi} from "starknet"
import CoreABI from "../abi/core.json"

export function useWillContract() {
    return useContract({
        address: "0x01ad0df75c076e5433f1ee9b336634d201f651c15c583a0b50ce15ebbd9e13b9",
        abi: CoreABI as Abi,
    })
}