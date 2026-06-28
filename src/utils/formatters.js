export function formatCurrency(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTime(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatCategoryLabel(categoryId, categories) {
  return categories.find((category) => category.id === categoryId)?.label ?? categoryId;
}

export function formatStatusLabel(status) {
  const statusMap = {
    pending: "待服务",
    completed: "已完成",
  };

  return statusMap[status] ?? status;
}

export function formatPaymentStatusLabel(status) {
  const statusMap = {
    unpaid: "未支付",
    paid: "已支付",
  };

  return statusMap[status] ?? status;
}
