import { TextInput } from "./forms/textInput.component";
import { InputFieldWrapper } from "./forms/inputFieldWrapper.component";
import { SectionDescription } from "./forms/sectionDescription.component";
import { SectionTitle } from "./forms/sectionTitle.component";
import { Dropdown } from "./forms/dropdown.component";
import React from "react";

export default function FromTest() {
  const [inheritanceCount, addInheritanceCount] = React.useState(1)
  const [formValues, setFormValues] = React.useState([{address: "", email: ""}])
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
            <div className=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-7">
            <div className="sm:col-span-3">
              <div className="mt-1">
                <input
                  type="text"
                  placeholder="Beneficiary Address"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              
              <div className="mt-1">
              <TextInput id="beneficiary-address" name="beneficiary" type="number" min="1" max="100" step="1" placeholder="Proportion"/>
              </div>
            </div>
            <div
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              -
            </div> 
            <div
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              +
            </div> 
            </div>
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
  