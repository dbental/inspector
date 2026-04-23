"use client";

import React, { useState } from "react";

type Branch = {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  phone: string;
  managerName: string;
  active: boolean;
};

const mockBranches: Branch[] = [
  {
    id: "1",
    name: "סניף מרכז",
    code: "HQ",
    address: "הרצל 100",
    city: "תל אביב",
    phone: "03-1234567",
    managerName: "אבי לוי",
    active: true,
  },
  {
    id: "2",
    name: "סניף חיפה",
    code: "HA",
    address: "הנמל 5",
    city: "חיפה",
    phone: "04-7654321",
    managerName: "סיגל כהן",
    active: true,
  },
  {
    id: "3",
    name: "סניף באר שבע",
    code: "BS",
    address: "התקווה 20",
    city: "באר שבע",
    phone: "08-1112233",
    managerName: "משה פרץ",
    active: false,
  },
];

export default function AffiliatesPage() {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyBranch: Branch = {
    id: "",
    name: "",
    code: "",
    address: "",
    city: "",
    phone: "",
    managerName: "",
    active: true,
  };

  const [form, setForm] = useState<Branch>(emptyBranch);

  const openNew = () => {
    setForm(emptyBranch);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (branch: Branch) => {
    setForm(branch);
    setEditing(branch);
    setShowForm(true);
  };

  const save = () => {
    if (!form.name.trim() || !form.code.trim()) return;
    if (editing) {
      setBranches((prev) =>
        prev.map((b) => (b.id === editing.id ? { ...form, id: editing.id } : b))
      );
    } else {
      setBranches((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק סניף זה?")) {
      setBranches((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={openNew}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + הוסף סניף
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-right">
            {editing ? "עריכת סניף" : "הוספת סניף חדש"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                שם סניף
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                קוד סניף
              </label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                כתובת
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                עיר
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                טלפון
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                שם מנהל
              </label>
              <input
                type="text"
                value={form.managerName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, managerName: e.target.value }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                id="active"
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm((f) => ({ ...f, active: e.target.checked }))
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="active" className="text-sm text-gray-700">
                סניף פעיל
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-start gap-3">
            <button
              onClick={save}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              שמור
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שם סניף
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                קוד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                כתובת
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                עיר
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                טלפון
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מנהל
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
            {branches.map((branch) => (
              <tr key={branch.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                  {branch.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {branch.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {branch.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {branch.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {branch.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {branch.managerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
                      (branch.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800")
                    }
                  >
                    {branch.active ? "פעיל" : "לא פעיל"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => openEdit(branch)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      ערוך
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      מחק
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {branches.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  לא נמצאו סניפים
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
