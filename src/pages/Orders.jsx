import { ClipboardList, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../components/OrderCard.jsx";
import { clearOrders, getOrders, updateOrderStatus } from "../utils/orders.js";

export default function Orders() {
  const [orders, setOrders] = useState(() => getOrders());

  useEffect(() => {
    function refreshOrders() {
      setOrders(getOrders());
    }

    window.addEventListener("orders-updated", refreshOrders);
    window.addEventListener("storage", refreshOrders);
    return () => {
      window.removeEventListener("orders-updated", refreshOrders);
      window.removeEventListener("storage", refreshOrders);
    };
  }, []);

  function handleComplete(orderId) {
    const nextOrders = updateOrderStatus(orderId, "completed");
    setOrders(nextOrders);
  }

  function handleClear() {
    clearOrders();
    setOrders([]);
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-orange-700">
            预约记录
          </p>
          <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">
            订单记录
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
            查看保存在本地的预约订单。未支付订单可进入模拟支付页，支付后再标记服务完成。
          </p>
        </div>

        {orders.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm font-bold text-stone-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 size={17} />
            清空记录
          </button>
        )}
      </section>

      {orders.length > 0 ? (
        <section className="grid gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onComplete={handleComplete} />
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-orange-100 text-orange-700">
            <ClipboardList size={28} />
          </div>
          <h3 className="mt-4 text-lg font-black text-ink">暂无订单</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">
            从服务市场预约后，订单会在这里显示时长、金额、时间和状态。
          </p>
          <Link
            to="/"
            className="focus-ring mt-5 inline-flex rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-black text-white hover:bg-orange-700"
          >
            去预约服务
          </Link>
        </section>
      )}
    </div>
  );
}
