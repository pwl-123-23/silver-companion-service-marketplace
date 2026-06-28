import { Search } from "lucide-react";

export default function SearchBox({ value, onChange }) {
  return (
    <label className="focus-within:ring-orange-500 relative block rounded-lg shadow-sm ring-1 ring-stone-200">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-400">
        <Search size={18} />
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring h-12 w-full rounded-lg border-0 bg-white pl-10 pr-4 text-sm text-ink placeholder:text-stone-400"
        placeholder="搜索陪聊、代办、就医陪同..."
        type="search"
      />
    </label>
  );
}
