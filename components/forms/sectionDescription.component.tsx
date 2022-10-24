type SectionDescriptionProps = {
    desc: string,
}


export const SectionDescription = ({ desc }: SectionDescriptionProps) => <p className="mt-1 max-w-2xl text-sm text-gray-500">
    {desc}
</p>
