type TextInputProps = {
    id: string,
    name: string,
    type: string,
}

export const TextInput = ({ id, name, type }: TextInputProps) => <input id={id} name={name} type={type} className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>