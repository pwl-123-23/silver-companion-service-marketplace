import { Banknote, Landmark, QrCode, Smartphone } from "lucide-react";

export const paymentMethods = [
  {
    id: "wechat",
    label: "微信支付",
    description: "适合移动端扫码或唤起微信支付",
    icon: QrCode,
    tone: "emerald",
    demoLinkPrefix: "weixin://pay/demo",
  },
  {
    id: "alipay",
    label: "支付宝",
    description: "适合跳转支付宝完成订单付款",
    icon: Smartphone,
    tone: "sky",
    demoLinkPrefix: "alipays://pay/demo",
  },
  {
    id: "digital_cny",
    label: "数字人民币",
    description: "适合数字人民币钱包付款演示",
    icon: Banknote,
    tone: "red",
    demoLinkPrefix: "ecny://pay/demo",
  },
  {
    id: "bank_card",
    label: "银行卡支付",
    description: "适合银行卡网关或快捷支付演示",
    icon: Landmark,
    tone: "slate",
    demoLinkPrefix: "bankcard://checkout/demo",
  },
];

export function getPaymentMethod(methodId) {
  return paymentMethods.find((method) => method.id === methodId);
}
