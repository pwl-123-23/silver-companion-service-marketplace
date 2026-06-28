import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";
import Payment from "./pages/Payment.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-ink">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment/:orderId" element={<Payment />} />
        </Routes>
      </main>
    </div>
  );
}
