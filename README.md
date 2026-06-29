# 银发陪伴服务平台

## 网页版在线体验

不需要安装，直接在浏览器打开：

[打开网页版银发陪伴服务平台](https://pwl-123-23.github.io/silver-companion-service-marketplace/)

## 直接下载桌面版

如果你只是想安装使用，不需要看代码，直接点下面链接：

| 系统 | 下载 |
| --- | --- |
| Windows | [下载 Windows .exe 安装包](https://github.com/pwl-123-23/silver-companion-service-marketplace/releases/latest/download/Silver-Companion-Service-Marketplace-1.0.0-win-x64-Setup.exe) |
| macOS Apple 芯片 | [下载 macOS arm64 .dmg](https://github.com/pwl-123-23/silver-companion-service-marketplace/releases/latest/download/Silver-Companion-Service-Marketplace-1.0.0-mac-arm64.dmg) |
| macOS Intel 芯片 | [下载 macOS x64 .dmg](https://github.com/pwl-123-23/silver-companion-service-marketplace/releases/latest/download/Silver-Companion-Service-Marketplace-1.0.0-mac-x64.dmg) |
| Linux | [下载 Linux AppImage](https://github.com/pwl-123-23/silver-companion-service-marketplace/releases/latest/download/Silver-Companion-Service-Marketplace-1.0.0-linux-x86_64.AppImage) / [下载 Linux .deb](https://github.com/pwl-123-23/silver-companion-service-marketplace/releases/latest/download/Silver-Companion-Service-Marketplace-1.0.0-linux-amd64.deb) |

如果链接暂时显示 404，说明 GitHub Actions 还没有生成安装包。进入仓库的 **Actions** 页面，运行 **Build desktop installers**，完成后再回来下载。

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
- Electron
- electron-builder

## 项目结构

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
├── electron
│   ├── main.cjs
│   └── preload.cjs
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

启动桌面软件开发模式：

```bash
npm run desktop
```

生产构建：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

本机打包桌面安装包：

```bash
npm run dist
```

在 macOS 上会生成 `.dmg`。如果需要 Windows `.exe`，推荐把仓库上传到 GitHub 后，在 **Actions** 页面运行 `Build desktop installers` 工作流，完成后从 artifacts 下载 `windows-installer`。

也可以在 Windows 电脑上运行：

```bash
npm install
npm run dist:win
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
