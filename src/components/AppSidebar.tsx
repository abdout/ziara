"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart,
  FileText,
  CreditCard,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/admin-dashboard",
    icon: Home,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AppSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const href = `/${locale}${item.href}`;
          const isActive = pathname === href;
          return (
            <Link
              key={item.href}
              href={href}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 ${
                isActive ? "bg-gray-100 text-gray-900" : ""
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}