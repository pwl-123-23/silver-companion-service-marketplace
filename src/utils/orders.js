const STORAGE_KEY = "silver-companion-orders";

function normalizeOrder(order) {
  const isLegacyCompletedOrder = order.paymentStatus == null && order.status === "completed";

  return {
    paymentStatus: isLegacyCompletedOrder ? "paid" : "unpaid",
    paymentMethod: null,
    paidAt: null,
    ...order,
    paymentStatus:
      order.paymentStatus ?? (isLegacyCompletedOrder ? "paid" : "unpaid"),
  };
}

export function getOrders() {
  try {
    const storedOrders = window.localStorage.getItem(STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders).map(normalizeOrder) : [];
  } catch {
    return [];
  }
}

export function getOrderById(orderId) {
  return getOrders().find((order) => order.id === orderId);
}

export function saveOrders(orders) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function createOrder(service, duration) {
  const order = {
    id: crypto.randomUUID(),
    serviceId: service.id,
    serviceTitle: service.title,
    duration,
    totalPrice: service.pricePerHour * duration,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: null,
    paidAt: null,
    createdAt: new Date().toISOString(),
  };

  const nextOrders = [order, ...getOrders()];
  saveOrders(nextOrders);

  window.dispatchEvent(new Event("orders-updated"));
  return order;
}

export function updateOrderStatus(orderId, status) {
  const nextOrders = getOrders().map((order) =>
    order.id === orderId ? { ...order, status } : order,
  );

  saveOrders(nextOrders);
  window.dispatchEvent(new Event("orders-updated"));
  return nextOrders;
}

export function markOrderPaid(orderId, paymentMethod) {
  const nextOrders = getOrders().map((order) =>
    order.id === orderId
      ? {
          ...order,
          paymentStatus: "paid",
          paymentMethod,
          paidAt: new Date().toISOString(),
        }
      : order,
  );

  saveOrders(nextOrders);
  window.dispatchEvent(new Event("orders-updated"));
  return nextOrders.find((order) => order.id === orderId);
}

export function clearOrders() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("orders-updated"));
}
