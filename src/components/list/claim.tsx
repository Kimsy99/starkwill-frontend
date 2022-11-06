import { useAccount, useStarknetCall, useStarknetExecute } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useWillContract } from "../../hooks/core";

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

type ClaimList = {
    list: Number[]
}
type ClaimType = {
    beneficiary: any
    token: any
    percentage: Number
    expected_amount: Number
}
export default function ClaimList({ list }: ClaimList) {
    const [claimId, setClaimId] = useState(1)
    const { account, address, status } = useAccount()
    const { contract: willContract } = useWillContract();
    const { data: claimList, loading } = useStarknetCall({
        contract: willContract,
        method: "get_all_splits",
        args: [],
        options: { watch: false }
    })

    const { execute: executeStarkent } = useStarknetExecute({
        calls: {
            contractAddress: "0x060a5f862297e5fdb77223d5a79a814ea593d4987863f3b02f1920d2f5e04b4b",
            entrypoint: "claim_split",
            calldata: [
                claimId
            ]
            // calldata:["9",
            // BigInt("0x06D362f8828cAEDb6953D698dCEc423a3EDC716279aB538172a633b4b5770059", 16).toString(),
            //   "1",
            //   "2",
            //   "1",
            //   BigInt("0x07fce9f7943a788007bfe4097fe17fcbb141fa67a36cb4748d2cba6acb4808b0", 16).toString(),
            //   "1",

            //   BigInt("0x07fce9f7943a788007bfe4097fe17fcbb141fa67a36cb4748d2cba6acb4808b0", 16).toString(), 
            //   BigInt("0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9", 16).toString(), 
            //     "50"
            // ]
        }
    })
    // const startClaim = (id: index) 
    if (loading) return (<div>Loading claims...</div>)
    return (
        <div className="-mx-4 mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Beneficiary
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                        >
                            Token
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Percentage
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Expected Amount
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {console.log("claimList: ", claimList)}
                    {console.log("address: ", address)}
                    {console.log("claim[0].beneficiary.toString(16): ", claimList[0][0].beneficiary.toString(16))}
                    {claimList && claimList.flat().filter((claim) => claim.beneficiary.toString(16) == address?.substring(2)).map((claim, index) => {
                        console.log("claim: ", claim)
                        return (
                            <tr key={index + 1}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    0x{claim.beneficiary.toString(16)}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    0x{claim.token.toString(16)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {claim.percentage.toString(16)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {claim.expected_amount.high.toString(16)}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a onClick={async () => { setClaimId(index + 1); executeStarkent() }} className="text-indigo-600 hover:text-indigo-900">
                                        Claim
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                    {/* {
                        claimList.map((claim) => (
                            <tr key={claim.beneficiary}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {claim.token}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {claim.percentage}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {claim.expected_amount}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Claim
                                    </a>
                                </td>
                            </tr>
                        ))
                    } */}
                </tbody>
            </table>
        </div>
    )
}
