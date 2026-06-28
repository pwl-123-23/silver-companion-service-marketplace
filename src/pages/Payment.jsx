import { ArrowLeft, CheckCircle2, LockKeyhole, ReceiptText } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { paymentMethods } from "../data/paymentMethods.js";
import { formatCurrency, formatDateTime } from "../utils/formatters.js";
import { getOrderById, markOrderPaid } from "../utils/orders.js";

const toneClasses = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  sky: "border-sky-200 bg-sky-50 text-sky-700",
  red: "border-red-200 bg-red-50 text-red-700",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
};

export default function Payment() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const order = useMemo(() => getOrderById(orderId), [orderId]);
  const method = paymentMethods.find((item) => item.id === selectedMethod);

  if (!order) {
    return (
      <section className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center">
        <h2 className="text-2xl font-black text-ink">没有找到订单</h2>
        <p className="mt-2 text-sm text-stone-500">
          这个支付链接对应的订单不存在，可能已被清空。
        </p>
        <Link
          to="/orders"
          className="focus-ring mt-5 inline-flex rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-black text-white hover:bg-orange-700"
        >
          返回订单记录
        </Link>
      </section>
    );
  }

  const isPaid = order.paymentStatus === "paid";
  const demoPaymentLink = `${method.demoLinkPrefix}?orderId=${order.id}&amount=${order.totalPrice}`;

  function handlePay() {
    setIsSubmitting(true);
    window.setTimeout(() => {
      markOrderPaid(order.id, selectedMethod);
      navigate("/orders");
    }, 500);
  }

  return (
    <div className="space-y-6">
      <Link
        to="/orders"
        className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-orange-700"
      >
        <ArrowLeft size={17} />
        返回订单记录
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-700">
            模拟收银台
          </p>
          <h2 className="mt-2 text-3xl font-black text-ink">选择支付方式</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            这里是前端 MVP 的支付演示页，不会发起真实扣款。真实支付需要后端创建预支付订单、签名、回调验签和商户结算配置。
          </p>

          {isPaid ? (
            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
              <CheckCircle2 size={26} />
              <h3 className="mt-3 text-lg font-black">该订单已支付</h3>
              <p className="mt-1 text-sm">你可以返回订单记录查看支付方式和服务状态。</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedMethod === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMethod(item.id)}
                    className={[
                      "focus-ring rounded-lg border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft",
                      isSelected
                        ? toneClasses[item.tone]
                        : "border-stone-200 bg-white text-stone-700 hover:border-stone-300",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/80">
                        <Icon size={21} />
                      </span>
                      <span>
                        <span className="block text-base font-black">{item.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-stone-500">
                          {item.description}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {!isPaid && (
            <div className="mt-6 rounded-lg border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                演示跳转地址
              </p>
              <p className="mt-2 break-all rounded-md bg-white px-3 py-2 font-mono text-xs text-stone-600">
                {demoPaymentLink}
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-orange-100 text-orange-700">
              <ReceiptText size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                订单摘要
              </p>
              <h3 className="text-lg font-black text-ink">{order.serviceTitle}</h3>
            </div>
          </div>

          <div className="mt-5 space-y-3 border-t border-stone-100 pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-stone-500">创建时间</span>
              <span className="font-semibold text-ink">{formatDateTime(order.createdAt)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-stone-500">服务时长</span>
              <span className="font-semibold text-ink">{order.duration}小时</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-stone-500">支付状态</span>
              <span className={isPaid ? "font-bold text-emerald-700" : "font-bold text-orange-700"}>
                {isPaid ? "已支付" : "未支付"}
              </span>
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-stone-100 pt-4">
              <span className="text-base font-black text-ink">应付金额</span>
              <span className="text-3xl font-black text-orange-600">
                {formatCurrency(order.totalPrice)}
              </span>
            </div>
          </div>

          {!isPaid && (
            <button
              type="button"
              onClick={handlePay}
              disabled={isSubmitting}
              className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-3 text-sm font-black text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              <LockKeyhole size={17} />
              {isSubmitting ? "正在模拟支付..." : `确认支付 ${formatCurrency(order.totalPrice)}`}
            </button>
          )}
        </aside>
      </section>
    </div>
  );
}
