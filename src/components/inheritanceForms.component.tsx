import { TextInput } from "./forms/textInput.component";
import { InputFieldWrapper } from "./forms/inputFieldWrapper.component";
import { SectionDescription } from "./forms/sectionDescription.component";
import { SectionTitle } from "./forms/sectionTitle.component";
import { Dropdown } from "./forms/dropdown.component";
import React from "react";
import { useContract, useStarknetExecute, useStarknetInvoke } from "@starknet-react/core";
import { useWillContract } from "../hooks/core";

type BeneficiaryInfo = {
  address: string;
  proportion: number;
}
type BeneficiaryProps = {
  index: number;
  info: BeneficiaryInfo;
  onChange: (i: any, e: any) => void;
  addBeneficiaries: () => void;
  removeBeneficiaries: (i: any) => void;
}

type GovernorProps = {
  index: number;
  address: string;
  onChange: (i: any, e: any) => void;
  addGovernor: () => void;
  removeGovernor: (i: any) => void;
}
type OnChangeProps = {
  [key: string]: any;
  e: React.ChangeEvent<HTMLInputElement>
}
function BeneficiaryFormList({ info, index, onChange, addBeneficiaries, removeBeneficiaries }: BeneficiaryProps) {
  console.log("info: ", info)



  return (
    <div className=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-7 mt-4" key={index}>
      <div className="sm:col-span-3">
        <div className="mt-1">
          <input
            type="text"
            placeholder="Beneficiary Address"
            name="address"
            id="address"
            autoComplete="address"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={info.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, e)}
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <div className="mt-1">
          <TextInput id="proportion" name="proportion" type="number" min="1" max="100" step="1" placeholder="Proportion" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, e)} />
        </div>
      </div>
      <div
        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => removeBeneficiaries(index)}
      >
        -
      </div>
      <div
        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={addBeneficiaries}
      >
        +
      </div>
    </div>)
}
function GovernorsFormList({ address, index, onChange, addGovernor, removeGovernor }: GovernorProps) {
  return (
    <div className=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-7 mt-4" key={index}>
      <div className="sm:col-span-3">
        <div className="mt-1">
          <input
            type="text"
            placeholder="Beneficiary Address"
            name="address"
            id="address"
            autoComplete="address"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, e)}
          />
        </div>
      </div>

      <div
        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => removeGovernor(index)}
      >
        -
      </div>
      <div
        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={addGovernor}
      >
        +
      </div>
    </div>)
}

export default function InheritanceForm() {
  const [beneficiaries, setBeneficiaries] = React.useState([{ address: "", proportion: 0 }])
  const addBenficiaries = () => setBeneficiaries([...beneficiaries, { address: "", proportion: 0 }])

  const onChange = (i: any, e: any): void => {
    let tempBeneficiaries = [...beneficiaries];
    const index: keyof BeneficiaryInfo = i;
    tempBeneficiaries[index][e.target.name] = e.target.value;
    setBeneficiaries(tempBeneficiaries)
    console.log(e.target.value)
  }
  const addBeneficiaries = () => {
    setBeneficiaries([...beneficiaries, { address: "", proportion: 0 }])
  }
  const removeBeneficiaries = (i: any) => {
    let tempBeneficiaries = [...beneficiaries];
    tempBeneficiaries.splice(i, 1)
    setBeneficiaries(tempBeneficiaries)
  }

  const [governors, setGovernors] = React.useState([""])
  const addGovernor = () => setGovernors([...governors, ""])

  const onChangeGovernor = (i: any, e: any): void => {
    let tempGovernors = [...governors];
    tempGovernors[i] = e.target.value;
    setGovernors(tempGovernors)
    console.log("governors: ", governors)
  }

  const removeGovernor = (i: any) => {
    let tempGovernors = [...governors];
    tempGovernors.splice(i, 1)
    setGovernors(tempGovernors)
  }
  const { contract } = useWillContract()

  // const {invoke: executeStarkent} = useStarknetInvoke({
  //   contract: contract,
  //   method: 'create_will',
  // })

  const { execute: executeStarkent } = useStarknetExecute({
    calls: {
      // contractAddress: "0x01f51fca15fe380093c6cb81146767cbc2e109e1c9e20940bf9ba7fb9d4e38b0",
      contractAddress: "0x060a5f862297e5fdb77223d5a79a814ea593d4987863f3b02f1920d2f5e04b4b",
      entrypoint: "create_will",
      calldata: [(5 + governors.length + (beneficiaries.length * 3)).toString(),
      BigInt(contract?.address, 16).toString(),
        "1",
        "2",
      governors.length.toString(),
      ...governors.map((governor: string) => { return BigInt(governor, 16).toString() }),
      beneficiaries.length.toString(),
      ...beneficiaries.map((beneficiary) => [BigInt(beneficiary.address, 16).toString(), BigInt("0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9", 16).toString(), beneficiary.proportion.toString()]).flat()
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
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <SectionTitle title="Setting Up Inheritance" />
            <SectionDescription desc="Disclaimer: ...." />
          </div>
          <InputFieldWrapper label="Asset Type">
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Dropdown id="beneficiary-address" name="beneficiary" lists={["DAI", "ETH"]} />
            </div>
          </InputFieldWrapper>
          <div className="sm:col-span-6">
            <label htmlFor="beneficiaries" className="block text-sm font-medium text-gray-700">
              Beneficiaries
            </label>
            {beneficiaries.map((info, index) => (
              <BeneficiaryFormList key={index} info={info} index={index} onChange={onChange} addBeneficiaries={addBeneficiaries} removeBeneficiaries={removeBeneficiaries} />
            ))}
          </div>
          <div className="sm:col-span-6">
            <label htmlFor="beneficiaries" className="block text-sm font-medium text-gray-700">
              Governors
            </label>
            {governors.map((info, index) => (
              <GovernorsFormList key={index} address={info} index={index} addGovernor={addGovernor} onChange={onChangeGovernor} removeGovernor={removeGovernor} />
            ))}
          </div>
        </div>

      </div>
      {/* Submit Form */}
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <div
            // type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            // onClick={() => executeStarkent({args: [[
            //   1,2,1,0x07fce9f7943a788007bfe4097fe17fcbb141fa67a36cb4748d2cba6acb4808b0,1,

            //     0x07fce9f7943a788007bfe4097fe17fcbb141fa67a36cb4748d2cba6acb4808b0, 
            //     0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9, 
            //     50

            // ]]})}
            onClick={() => executeStarkent()}
          >
            Submit
          </div>
        </div>
      </div>
    </form>
  )
}
