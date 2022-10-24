type SectionTitleProps = {
    title: string,
}

export const SectionTitle = ({ title }: SectionTitleProps) => <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>