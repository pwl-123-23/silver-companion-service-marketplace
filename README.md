# 银发陪伴服务平台

一个完整的 React + Vite 前端 MVP，用于展示银发陪护与日常协助服务市场。

用户可以浏览服务、按分类筛选和搜索、选择 1/3/8 小时时长进行预约，系统会自动计算总价，并把订单记录保存到 `localStorage`。

## 功能

- 市场卡片式服务列表
- 首页主视觉图与服务场景配图
- 分类筛选与服务搜索
- 预约弹窗与实时价格计算
- 创建待服务状态订单，内部状态值为 `pending`
- 模拟支付页，支持微信、支付宝、数字人民币、银行卡支付方式选择
- 使用 `localStorage` 持久保存订单记录
- 支持将订单标记为已完成
- 响应式 TailwindCSS 布局

## 技术栈

- React
- Vite
- TailwindCSS
- React Router
- localStorage

## 项目结构

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets
    │   └── images
    ├── components
    │   ├── BookingModal.jsx
    │   ├── CategoryFilter.jsx
    │   ├── Header.jsx
    │   ├── OrderCard.jsx
    │   ├── SearchBox.jsx
    │   └── ServiceCard.jsx
    ├── data
    │   ├── paymentMethods.js
    │   └── services.js
    ├── pages
    │   ├── Home.jsx
    │   ├── Orders.jsx
    │   └── Payment.jsx
    └── utils
        ├── formatters.js
        └── orders.js
```

## 运行方式

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

## 数据模型

```js
{
  id,
  title,
  category,
  description,
  pricePerHour
}
```

```js
{
  id,
  serviceId,
  serviceTitle,
  duration,
  totalPrice,
  status,
  paymentStatus,
  paymentMethod,
  paidAt,
  createdAt
}
```

## 说明

这是一个纯前端 MVP，不需要后端、数据库、登录系统或真实支付集成。支付页为演示流程，不会产生真实扣款。
