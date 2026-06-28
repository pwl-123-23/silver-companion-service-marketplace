import { ArrowRight, Star } from "lucide-react";
import { categories } from "../data/services.js";
import { formatCategoryLabel, formatCurrency } from "../utils/formatters.js";

export default function ServiceCard({ service, onBook }) {
  return (
    <article
      data-testid={`service-card-${service.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={service.image}
          alt={`${service.title}服务场景`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-orange-700 shadow-sm backdrop-blur">
          {service.badge}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-meadow">
              {formatCategoryLabel(service.category, categories)}
            </p>
            <h2 className="mt-2 text-lg font-bold text-ink">{service.title}</h2>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
            <Star size={14} fill="currentColor" />
            {service.rating}
          </div>
        </div>

        <p className="min-h-20 flex-1 text-sm leading-6 text-stone-600">
          {service.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-stone-100 pt-4">
          <div>
            <p className="text-xs font-medium text-stone-500">服务单价</p>
            <p className="text-2xl font-black text-orange-600">
              {formatCurrency(service.pricePerHour)}
              <span className="text-sm font-semibold text-stone-500">/小时</span>
            </p>
          </div>
          <button
            type="button"
            data-testid={`book-service-${service.id}`}
            onClick={() => onBook(service)}
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            立即预约
            <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
