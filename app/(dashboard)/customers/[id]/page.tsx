"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import CustomerDetail from "@/components/crm/customer-detail";
import CustomerCars from "@/components/crm/customer-cars";
import CustomerTests from "@/components/crm/customer-tests";

type Tab = "details" | "cars" | "tests";

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;
  const [tab, setTab] = useState<Tab>("details");

  const tabs: { key: Tab; label: string }[] = [
    { key: "details", label: "פרטי לקוח" },
    { key: "cars", label: "רכבים" },
    { key: "tests", label: "היסטוריית בדיקות" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 text-right">
            כרטיס לקוח
          </h1>
          <p className="text-sm text-gray-500 text-right mt-1">
            מספר לקוח: {customerId}
          </p>
        </div>

        <nav className="mb-6 border-b border-gray-200">
          <ul className="flex gap-6">
            {tabs.map((t) => (
              <li key={t.key}>
                <button
                  onClick={() => setTab(t.key)}
                  className={
                    "inline-block py-3 px-1 text-sm font-medium border-b-2 transition-colors " +
                    (tab === t.key
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300")
                  }
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {tab === "details" && <CustomerDetail customerId={customerId} />}
          {tab === "cars" && <CustomerCars customerId={customerId} />}
          {tab === "tests" && <CustomerTests customerId={customerId} />}
        </div>
      </div>
    </div>
  );
}
