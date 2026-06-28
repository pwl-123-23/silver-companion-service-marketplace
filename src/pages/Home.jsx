import { useMemo, useState } from "react";
import BookingModal from "../components/BookingModal.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import SearchBox from "../components/SearchBox.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { categories, services } from "../data/services.js";
import heroImage from "../assets/images/hero-companion.jpg";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [latestOrder, setLatestOrder] = useState(null);

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return services.filter((service) => {
      const matchesCategory =
        activeCategory === "all" || service.category === activeCategory;
      const matchesSearch =
        !normalizedQuery ||
        service.title.toLowerCase().includes(normalizedQuery) ||
        service.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  return (
    <div className="space-y-8">
      <section className="relative min-h-[420px] overflow-hidden rounded-lg bg-stone-900">
        <img
          src={heroImage}
          alt="长者与陪护员一起使用平板的服务场景"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/30 to-transparent" />
        <div className="relative flex min-h-[420px] max-w-3xl flex-col justify-end px-5 py-8 sm:px-8 lg:px-10">
          <p className="w-fit rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-orange-700 shadow-sm backdrop-blur">
            本地可信陪伴服务
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-5xl">
            为长者快速预约安心陪护。
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/90">
            浏览陪聊、代办、就医陪同与兴趣陪伴服务。选择时长后系统会自动计算价格，确认后订单会保存到本地。
          </p>
          <div className="mt-6 grid gap-3 text-white/90 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-black">8项</p>
              <p className="text-sm">精选服务</p>
            </div>
            <div>
              <p className="text-2xl font-black">1/3/8小时</p>
              <p className="text-sm">灵活预约</p>
            </div>
            <div>
              <p className="text-2xl font-black">本地保存</p>
              <p className="text-sm">订单可追踪</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <h3 className="text-xl font-black text-ink">选择一个服务场景</h3>
          <p className="mt-1 text-sm leading-6 text-stone-500">
            用真实生活场景快速判断服务类型，再按需求筛选。
          </p>
        </div>
        <SearchBox value={query} onChange={setQuery} />
      </section>

      {latestOrder && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          已创建“{latestOrder.serviceTitle}”预约，订单已保存为待服务状态。
        </div>
      )}

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-ink">可预约服务</h3>
            <p className="mt-1 text-sm text-stone-500">
              共找到 {filteredServices.length} 项服务
            </p>
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={setSelectedService}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center">
            <h3 className="text-lg font-bold text-ink">没有找到匹配服务</h3>
            <p className="mt-2 text-sm text-stone-500">
              可以换一个关键词，或切换到全部服务。
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setQuery("");
              }}
              className="focus-ring mt-5 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-700"
            >
              重置筛选
            </button>
          </div>
        )}
      </section>

      <BookingModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBooked={setLatestOrder}
      />
    </div>
  );
}
