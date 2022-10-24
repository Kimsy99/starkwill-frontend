type HeadingProps = {
    heading: string,
    children: JSX.Element
}

export default function Heading({heading, children}: HeadingProps) {
    return (
        <div className="md:flex md:items-center md:justify-between mb-4">
            <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {heading}
            </h2>
            </div>
            {children}
        </div>
    )
  }
  