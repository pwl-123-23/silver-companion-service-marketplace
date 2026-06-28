import { ClipboardList, HeartHandshake, Home } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "服务市场", icon: Home },
  { to: "/orders", label: "订单记录", icon: ClipboardList },
];

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-orange-100 text-orange-700">
            <HeartHandshake size={24} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">
              银发陪伴
            </p>
            <h1 className="text-xl font-bold text-ink sm:text-2xl">
              服务预约平台
            </h1>
          </div>
        </div>

        <nav className="flex rounded-lg border border-stone-200 bg-stone-100 p-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition",
                    isActive
                      ? "bg-white text-orange-700 shadow-sm"
                      : "text-stone-600 hover:bg-white/70 hover:text-ink",
                  ].join(" ")
                }
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
