import { CheckCircle2, Clock, CreditCard, ReceiptText, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { getPaymentMethod } from "../data/paymentMethods.js";
import {
  formatCurrency,
  formatDateTime,
  formatPaymentStatusLabel,
  formatStatusLabel,
} from "../utils/formatters.js";

export default function OrderCard({ order, onComplete }) {
  const isCompleted = order.status === "completed";
  const isPaid = order.paymentStatus === "paid";
  const paymentMethod = getPaymentMethod(order.paymentMethod);
  const paymentMethodLabel = paymentMethod?.label ?? (isPaid ? "历史订单" : "待选择");

  return (
    <article
      data-testid={`order-card-${order.id}`}
      className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-orange-100 text-orange-700">
            <ReceiptText size={22} />
          </div>
          <div>
            <h2 className="text-lg font-black text-ink">{order.serviceTitle}</h2>
            <p className="mt-1 text-sm text-stone-500">{formatDateTime(order.createdAt)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={[
              "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
              isCompleted
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700",
            ].join(" ")}
          >
            {isCompleted ? <CheckCircle2 size={14} /> : <Clock size={14} />}
            {formatStatusLabel(order.status)}
          </span>
          <span
            className={[
              "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
              isPaid ? "bg-sky-50 text-sky-700" : "bg-stone-100 text-stone-600",
            ].join(" ")}
          >
            <CreditCard size={14} />
            {formatPaymentStatusLabel(order.paymentStatus)}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-stone-100 pt-4 sm:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            服务时长
          </p>
          <p className="mt-1 text-lg font-bold text-ink">{order.duration}小时</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            合计金额
          </p>
          <p className="mt-1 text-lg font-bold text-orange-600">
            {formatCurrency(order.totalPrice)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            支付方式
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm font-bold text-ink">
            <WalletCards size={17} className="text-stone-400" />
            {paymentMethodLabel}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2 sm:justify-end">
          {!isPaid && !isCompleted && (
            <Link
              to={`/payment/${order.id}`}
              data-testid={`pay-order-${order.id}`}
              className="focus-ring rounded-lg bg-orange-600 px-4 py-2 text-sm font-black text-white transition hover:bg-orange-700"
            >
              去支付
            </Link>
          )}
          {isPaid && !isCompleted && (
            <button
              type="button"
              data-testid={`complete-order-${order.id}`}
              onClick={() => onComplete(order.id)}
              className="focus-ring rounded-lg border border-stone-200 px-4 py-2 text-sm font-bold text-stone-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              标记完成
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
