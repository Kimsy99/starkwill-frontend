import { TextInput } from "./forms/textInput.component";
import { InputFieldWrapper } from "./forms/inputFieldWrapper.component";
import { SectionDescription } from "./forms/sectionDescription.component";
import { SectionTitle } from "./forms/sectionTitle.component";
import { Dropdown } from "./forms/dropdown.component";
import React from "react";

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
type OnChangeProps = {
  [key: string]: any;
  e:React.ChangeEvent<HTMLInputElement> 
}
function BeneficiaryFormList({info, index, onChange, addBeneficiaries, removeBeneficiaries}: BeneficiaryProps)  {
  console.log("info: ", info)
  return(
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
        onChange={(e: React.ChangeEvent<HTMLInputElement> ) => onChange(index, e)}
      />
    </div>
  </div>

<div className="sm:col-span-2">
  <div className="mt-1">
    <TextInput id="proportion" name="proportion" type="number" min="1" max="100" step="1" placeholder="Proportion" onChange={(e: React.ChangeEvent<HTMLInputElement> )  => onChange(index, e)}/>
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

export default function InheritanceForm() {
  const [beneficiaries, setBeneficiaries] = React.useState([{address: "", proportion: 0}])
  const addBenficiaries = () => setBeneficiaries([...beneficiaries, {address: "", proportion: 0}])
  const onChange = (i: any, e: any): void => {
    let tempBeneficiaries = [...beneficiaries];
    const index: keyof BeneficiaryInfo = i;
    // const name: keyof BeneficiaryInfo = e.target.name;
    tempBeneficiaries[index][e.target.name] = e.target.value;
    setBeneficiaries(tempBeneficiaries)
    console.log(e.target.value)
  }
  const addBeneficiaries = () => {
    console.log("add")
    setBeneficiaries([...beneficiaries, {address: "", proportion: 0}])
  }
  const removeBeneficiaries = (i: any) => {
    let tempBeneficiaries = [...beneficiaries];
    tempBeneficiaries.splice(i,1)
    setBeneficiaries(tempBeneficiaries)
  }
    return (
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <SectionTitle title="Setting Up Inheritance"/>
              <SectionDescription desc="Disclaimer: ...."/>
            </div>
            <InputFieldWrapper label="Asset Type">
            <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Dropdown id="beneficiary-address" name="beneficiary" lists={["USDC", "ETH"]} />
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
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    )
  }
  