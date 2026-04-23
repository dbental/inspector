"use client";

import React, { useState } from "react";
import Link from "next/link";

type CustomerType = "private" | "company" | "fleet";

type Customer = {
  id: string;
  fullName: string;
  idNumber: string;
  phone: string;
  email: string;
  type: CustomerType;
  city: string;
  carCount: number;
  testCount: number;
  lastTestDate: string;
};

const mockCustomers: Customer[] = Array.from({ length: 35 }, (_, i) => {
  const types: CustomerType[] = ["private", "company", "fleet"];
  const type = types[i % 3];
  return {
    id: `${i + 1}`,
    fullName:
      i % 3 === 0
        ? `לקוח פרטי ${i + 1}`
        : i % 3 === 1
        ? `חברה ${i + 1} בע"מ`
        : `צי רכב ${i + 1}`,
    idNumber: `${100000000 + i}`,
    phone: `05${i % 10}${1000000 + i}`,
    email: `customer${i + 1}@example.com`,
    type,
    city: ["תל אביב", "חיפה", "ירושלים", "באר שבע", "פתח תקווה"][i % 5],
    carCount: (i % 5) + 1,
    testCount: Math.floor(i / 2),
    lastTestDate: `2025-${String((i % 12) + 1).padStart(2, "0")}-15`,
  };
});

const typeLabel: Record<CustomerType, string> = {
  private: "פרטי",
  company: "חברה",
  fleet: "צי רכב",
};

const typeBadge: Record<CustomerType, string> = {
  private: "bg-blue-100 text-blue-800",
  company: "bg-purple-100 text-purple-800",
  fleet: "bg-orange-100 text-orange-800",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<CustomerType | "all">("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = mockCustomers.filter((c) => {
    const q = search.trim();
    const matchesSearch =
      !q ||
      c.fullName.includes(q) ||
      c.idNumber.includes(q) ||
      c.phone.includes(q);
    const matchesType = typeFilter === "all" || c.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 text-right">
            רשימת לקוחות
          </h1>
          <Link
            href="/customers/new"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + לקוח חדש
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="חיפוש לפי שם, ת״ז או טלפון..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as CustomerType | "all");
              setPage(1);
            }}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">כל הלקוחות</option>
            <option value="private">פרטי</option>
            <option value="company">חברה</option>
            <option value="fleet">צי רכב</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  שם
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ת״ז / ח.פ.
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  טלפון
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  עיר
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סוג
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  רכבים
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  בדיקות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  בדיקה אחרונה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginated.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {c.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {c.idNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {c.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {c.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadge[c.type]}`}
                    >
                      {typeLabel[c.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {c.carCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {c.testCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {c.lastTestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/customers/${c.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        צפה
                      </Link>
                      <Link
                        href={`/customers/${c.id}?edit=true`}
                        className="text-gray-600 hover:text-gray-800 font-medium"
                      >
                        ערוך
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-8 text-center text-sm text-gray-500"
                  >
                    לא נמצאו לקוחות
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            מציג {filtered.length > 0 ? (page - 1) * pageSize + 1 : 0}–
            {Math.min(page * pageSize, filtered.length)} מתוך {filtered.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              הקודם
            </button>
            <span className="text-sm text-gray-700">
              עמוד {page} מתוך {totalPages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              הבא
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
