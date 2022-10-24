type CheckboxProps = {
    id: string,
    name: string
    label: string,
    description: string
}

export const Checkbox = ({ id, name, label, description }: CheckboxProps) =>
<div className="relative flex items-start">
    <div className="flex h-5 items-center">
    <input
        id={id}
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    />
    </div>
    <div className="ml-3 text-sm">
    <label htmlFor="comments" className="font-medium text-gray-700">
       {label} 
    </label>
    <p className="text-gray-500">{description}</p>
    </div>
</div>