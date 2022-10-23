type TextInputProps = {
    id: string,
    name: string,
    type: string,
    max?: string,
    min?: string,
    step?: string,
    proportion?: string
}

export const TextInput = (props: TextInputProps) => <input {...props} className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>