import { CheckCircle2, Clock3, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createOrder } from "../utils/orders.js";
import { formatCurrency } from "../utils/formatters.js";

const durations = [1, 3, 8];

export default function BookingModal({ service, onClose, onBooked }) {
  const [duration, setDuration] = useState(1);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const totalPrice = useMemo(
    () => (service ? service.pricePerHour * duration : 0),
    [duration, service],
  );

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setDuration(1);
    setConfirmedOrder(null);
  }, [service?.id]);

  if (!service) {
    return null;
  }

  function handleConfirm() {
    const order = createOrder(service, duration);
    setConfirmedOrder(order);
    onBooked(order);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div className="w-full max-w-xl rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-stone-100 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">
              预约确认
            </p>
            <h2 id="booking-title" className="mt-1 text-2xl font-black text-ink">
              {service.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {service.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-ink"
            aria-label="关闭预约弹窗"
            title="关闭"
          >
            <X size={20} />
          </button>
        </div>

        {confirmedOrder ? (
          <div className="p-6">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
              <CheckCircle2 size={28} />
              <h3 className="mt-3 text-lg font-bold">预约已创建</h3>
              <p className="mt-1 text-sm leading-6">
                订单已保存为待服务状态，你可以在订单记录页查看。
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring mt-5 w-full rounded-lg bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-orange-700"
            >
              继续浏览
            </button>
          </div>
        ) : (
          <div className="p-5">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                <Clock3 size={18} />
                选择服务时长
              </div>
              <div className="grid grid-cols-3 gap-3">
                {durations.map((option) => {
                  const isSelected = duration === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      data-testid={`duration-${option}`}
                      onClick={() => setDuration(option)}
                      className={[
                        "focus-ring rounded-lg border px-4 py-3 text-center transition",
                        isSelected
                          ? "border-orange-300 bg-orange-50 text-orange-800"
                          : "border-stone-200 bg-white text-stone-600 hover:border-stone-300",
                      ].join(" ")}
                    >
                      <span className="block text-xl font-black">{option}小时</span>
                      <span className="text-xs font-semibold">服务时长</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center justify-between gap-4 py-2">
                <span className="text-sm text-stone-600">每小时价格</span>
                <span className="font-bold">{formatCurrency(service.pricePerHour)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-2">
                <span className="text-sm text-stone-600">服务时长</span>
                <span className="font-bold">{duration} 小时</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-4 border-t border-stone-200 pt-4">
                <span className="text-base font-bold text-ink">合计金额</span>
                <span className="text-3xl font-black text-orange-600">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              data-testid="confirm-booking"
              onClick={handleConfirm}
              className="focus-ring mt-5 w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700"
            >
              确认预约
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
