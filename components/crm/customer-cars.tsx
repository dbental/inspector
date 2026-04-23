"use client";

import React, { useState } from "react";

type Car = {
  id: string;
  plate: string;
  manufacturer: string;
  model: string;
  year: number;
  bodyType: string;
  color: string;
  lastTestDate: string;
  nextTestDate: string;
  status: "active" | "sold" | "scrapped";
};

const mockCars: Car[] = [
  {
    id: "1",
    plate: "12-345-67",
    manufacturer: "יונדאי",
    model: "טוסון",
    year: 2020,
    bodyType: "SUV",
    color: "לבן",
    lastTestDate: "2025-03-15",
    nextTestDate: "2026-03-15",
    status: "active",
  },
  {
    id: "2",
    plate: "98-765-43",
    manufacturer: "טויוטה",
    model: "קורולה",
    year: 2018,
    bodyType: "סדאן",
    color: "כסף",
    lastTestDate: "2024-11-20",
    nextTestDate: "2025-11-20",
    status: "active",
  },
  {
    id: "3",
    plate: "11-222-33",
    manufacturer: "קיה",
    model: "פיקנטו",
    year: 2015,
    bodyType: "האצ'בק",
    color: "אדום",
    lastTestDate: "2023-07-10",
    nextTestDate: "2024-07-10",
    status: "sold",
  },
];

const statusLabel: Record<Car["status"], string> = {
  active: "פעיל",
  sold: "נמכר",
  scrapped: "פסולת",
};

const statusBadge: Record<Car["status"], string> = {
  active: "bg-green-100 text-green-800",
  sold: "bg-gray-100 text-gray-800",
  scrapped: "bg-red-100 text-red-800",
};

export default function CustomerCars({
  customerId,
}: {
  customerId: string;
}) {
  const [cars] = useState<Car[]>(mockCars);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => alert(`הוספת רכב ללקוח ${customerId}`)}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + הוסף רכב
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מספר רישוי
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                יצרן
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                דגם
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שנתון
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סוג מרכב
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                צבע
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                בדיקה אחרונה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                בדיקה הבאה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                  {car.plate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {car.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {car.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {car.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {car.bodyType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {car.color}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {car.lastTestDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {car.nextTestDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[car.status]}`}
                  >
                    {statusLabel[car.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => alert(`ערוך רכב ${car.id}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      ערוך
                    </button>
                    <button
                      onClick={() => alert(`בדיקה חדשה לרכב ${car.plate}`)}
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      בדיקה
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  לא נמצאו רכבים
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
