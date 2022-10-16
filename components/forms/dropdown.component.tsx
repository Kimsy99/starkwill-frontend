type DropdownProps = {
    id: string,
    name: string,
    lists: string[],
}

export const Dropdown = ({ id, name, lists }: DropdownProps) => <select id={id} name={name} className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
        {lists.map((item) => <option>{item}</option>)}
    </select>