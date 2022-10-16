type InputFieldWrapperProps = {
    label: string,
    children: JSX.Element
}


export const InputFieldWrapper = ({ label, children }: InputFieldWrapperProps) => 
<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
  <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
    {label}
  </label>
  <div className="mt-1 sm:col-span-2 sm:mt-0">
   {children} 
  </div>
</div>
