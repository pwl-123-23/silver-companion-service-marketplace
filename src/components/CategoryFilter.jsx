import { BookOpen, Heart, MapPin, PackageCheck, Sparkles } from "lucide-react";

const iconMap = {
  all: Sparkles,
  emotional: Heart,
  daily: PackageCheck,
  outdoor: MapPin,
  hobby: BookOpen,
};

export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {categories.map((category) => {
        const Icon = iconMap[category.id] ?? Sparkles;
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={[
              "focus-ring group rounded-lg border p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-soft",
              isActive
                ? "border-orange-300 bg-orange-50 text-orange-900"
                : "border-stone-200 bg-white text-stone-700 hover:border-stone-300",
            ].join(" ")}
          >
            <span className="mb-3 block overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={`${category.label}场景`}
                className="h-20 w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </span>
            <span
              className={[
                "mb-3 grid h-9 w-9 place-items-center rounded-lg",
                isActive ? "bg-orange-100 text-orange-700" : "bg-stone-100 text-stone-500",
              ].join(" ")}
            >
              <Icon size={18} />
            </span>
            <span className="block text-sm font-bold">{category.label}</span>
            <span className="mt-1 block text-xs leading-5 text-stone-500">
              {category.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
