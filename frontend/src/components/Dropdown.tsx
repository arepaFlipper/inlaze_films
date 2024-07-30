type Props = {
  options: string[];
}

const Dropdown = ({ options }: Props) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Sort By</h2>
      <select className="w-full p-2 mb-2 text-zinc-50 bg-[#1C1C1C]">
        {options.map((filter, idx) => {
          return (
            <option key={`${filter}-${idx}`}>{filter}</option>
          );
        })}
      </select>
    </div>
  )
}

export default Dropdown
