const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

type ListProps ={
  column: string[];
  keys: string[];
  data: any[]|undefined
}

export default function List({column, data, keys}: ListProps) {
  console.log("column: ", column)
  console.log("data: ", data)
  return (
    <div className="-mx-4 mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {
                column.map((header: string) => (
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    {header}
                  </th>
                ) )
              }
              {/* <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Title
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Role
              </th> */}
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.map((object, index) => {
              console.log("object: ", object)
              return (
                <tr key={index}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {object.length}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {/* {object.map((beneficiary) => (
                      <span>{beneficiary.}</span>
                    ))} */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {object[0].token.length}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      Edit
                      {/* <span className="sr-only">, {person.name}</span> */}
                    </a>
                  </td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
  )
}
