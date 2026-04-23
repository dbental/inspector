"use client";

import React, { useState } from "react";
import UserForm from "@/components/admin/user-form";

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  status: "active" | "inactive";
};

const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    firstName: "יוסי",
    lastName: "כהן",
    email: "admin@ezcartest.co.il",
    phone: "050-1234567",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    username: "inspector1",
    firstName: "דני",
    lastName: "לוי",
    email: "dani@ezcartest.co.il",
    phone: "052-9876543",
    role: "user",
    status: "active",
  },
  {
    id: "3",
    username: "inspector2",
    firstName: "רונית",
    lastName: "פרץ",
    email: "ronit@ezcartest.co.il",
    phone: "054-1112233",
    role: "user",
    status: "inactive",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) => {
    const q = search.trim();
    if (!q) return true;
    return (
      u.username.includes(q) ||
      u.firstName.includes(q) ||
      u.lastName.includes(q) ||
      u.email.includes(q) ||
      u.phone.includes(q)
    );
  });

  const handleSave = (user: User) => {
    if (users.find((u) => u.id === user.id)) {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers((prev) => [...prev, user]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק משתמש זה?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="חיפוש משתמש..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + הוסף משתמש
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-right">
            {editingUser ? "עריכת משתמש" : "הוספת משתמש חדש"}
          </h2>
          <UserForm
            initial={editingUser ?? undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingUser(null);
            }}
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שם משתמש
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שם פרטי
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שם משפחה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                דוא"ל
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                טלפון נייד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                הרשאה
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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {user.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
                      (user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800")
                    }
                  >
                    {user.role === "admin"
                      ? "מנהל מערכת"
                      : "משתמש רגיל"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
                      (user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800")
                    }
                  >
                    {user.status === "active" ? "פעיל" : "לא פעיל"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      ערוך
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      מחק
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  לא נמצאו משתמשים
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
