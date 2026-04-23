"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/users", label: "ניהול משתמשים" },
  { href: "/admin/faults", label: "ניהול פסילות" },
  { href: "/admin/categories", label: "קטגוריות רכב" },
  { href: "/admin/affiliates", label: "ניהול סניפים" },
  { href: "/admin/settings", label: "פרטי חברה" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-right">
          ממשק ניהול
        </h1>

        <nav className="mb-8 border-b border-gray-200">
          <ul className="flex flex-wrap gap-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      "inline-block py-3 px-1 text-sm font-medium border-b-2 transition-colors " +
                      (active
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
}
