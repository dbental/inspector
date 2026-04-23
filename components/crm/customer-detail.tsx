"use client";

import React, { useState } from "react";
import Link from "next/link";

type Activity = {
  id: string;
  type: "test" | "edit" | "call" | "note";
  description: string;
  createdAt: string;
  createdBy: string;
};

const mockCustomer = {
  id: "1",
  fullName: "יוסי כהן",
  idNumber: "123456789",
  type: "private" as const,
  phone: "050-1234567",
  email: "yossi@example.com",
  address: "הרצל 10",
  city: "תל אביב",
  zipCode: "61234",
  createdAt: "2024-01-15",
};

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "test",
    description: "ביצע בדיקת רכב לרכב מספר רישוי 12-345-67",
    createdAt: "2025-03-20T10:30:00",
    createdBy: "דני לוי",
  },
  {
    id: "2",
    type: "edit",
    description: "עודכן כתובת דוא״ל",
    createdAt: "2025-02-10T14:00:00",
    createdBy: "מנהל",
  },
  {
    id: "3",
    type: "call",
    description: "שיחת תזכורת לבדיקה שנתית",
    createdAt: "2025-01-05T09:15:00",
    createdBy: "רונית פרץ",
  },
  {
    id: "4",
    type: "note",
    description: "הלקוח ביקש לתאם בדיקה לשבוע הבא",
    createdAt: "2024-12-20T16:45:00",
    createdBy: "דני לוי",
  },
];

const typeLabel = { private: "פרטי", company: "חברה", fleet: "צי רכב" };

const activityIcon: Record<Activity["type"], string> = {
  test: "🔧",
  edit: "✏️",
  call: "📞",
  note: "📝",
};

export default function CustomerDetail({
  customerId,
}: {
  customerId: string;
}) {
  const [editMode, setEditMode] = useState(false);
  const [customer, setCustomer] = useState(mockCustomer);
  const [activities] = useState<Activity[]>(mockActivities);

  const handleSave = () => {
    setEditMode(false);
    alert("הפרטים נשמרו");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 text-right">
            פרטים אישיים
          </h2>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              ערוך
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                שמור
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                ביטול
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "שם", value: customer.fullName, key: "fullName" },
            {
              label: 'ת"ז / ח.פ.',
              value: customer.idNumber,
              key: "idNumber",
            },
            { label: "סוג לקוח", value: typeLabel[customer.type], key: "type" },
            { label: "טלפון", value: customer.phone, key: "phone" },
            { label: 'דוא״ל', value: customer.email, key: "email" },
            { label: "כתובת", value: customer.address, key: "address" },
            { label: "עיר", value: customer.city, key: "city" },
            { label: "מיקוד", value: customer.zipCode, key: "zipCode" },
          ].map(({ label, value, key }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 text-right">
                {label}
              </label>
              {editMode && key !== "type" ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setCustomer((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900 text-right">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-right">
          סיכום
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href={`/customers/${customerId}?tab=cars`}
            className="rounded-md border border-gray-200 bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
          >
            <p className="text-sm text-gray-500 text-right">רכבים</p>
            <p className="text-2xl font-bold text-gray-900 text-right">3</p>
          </Link>
          <Link
            href={`/customers/${customerId}?tab=tests`}
            className="rounded-md border border-gray-200 bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
          >
            <p className="text-sm text-gray-500 text-right">בדיקות</p>
            <p className="text-2xl font-bold text-gray-900 text-right">12</p>
          </Link>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-500 text-right">לקוח מאז</p>
            <p className="text-2xl font-bold text-gray-900 text-right">
              {customer.createdAt}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-right">
          יומן פעילות
        </h2>
        <ul className="space-y-4">
          {activities.map((a) => (
            <li
              key={a.id}
              className="flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <span className="text-lg">{activityIcon[a.type]}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-800 text-right">
                  {a.description}
                </p>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">{a.createdBy}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(a.createdAt).toLocaleString("he-IL")}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
