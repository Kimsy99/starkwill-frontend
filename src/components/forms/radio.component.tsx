type RadioBtnProps = {
    id: string,
    name: string,
    label: string
}
type RadioBtnListProps = {
    lists: RadioBtnProps[],
}

export const RadioBtn = ({ lists }: RadioBtnListProps) => <div className="mt-4 space-y-4">
    {lists.map((item) => (
       <div className="flex items-center" key={item.id}>
        <input
            id={item.id}
            name={item.name}
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor={item.id} className="ml-3 block text-sm font-medium text-gray-700">
            {item.label}
        </label>
    </div> 
    ))}
</div>