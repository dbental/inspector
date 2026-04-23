"use client";

import React, { useState } from "react";

type Severity = "minor" | "major" | "critical";

const severityLabels: Record<Severity, string> = {
  minor: "קלה",
  major: "חמורה",
  critical: "קריטית",
};

const severityBadge: Record<Severity, string> = {
  minor: "bg-yellow-100 text-yellow-800",
  major: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

type FaultItem = {
  id: string;
  name: string;
  severity: Severity;
};

type FaultCategory = {
  id: string;
  name: string;
  items: FaultItem[];
};

const initialCategories: FaultCategory[] = [
  {
    id: "1",
    name: "בלמים",
    items: [
      { id: "11", name: "בלם יד לא תקין", severity: "major" },
      { id: "12", name: "דיסקיות שחוקות", severity: "critical" },
      { id: "13", name: "דליפת שמן בצילינדר", severity: "critical" },
    ],
  },
  {
    id: "2",
    name: "תאורה",
    items: [
      { id: "21", name: "פנס ראשי לא תקין", severity: "major" },
      { id: "22", name: "איתות לא עובד", severity: "minor" },
      { id: "23", name: "תאורת בלם לא תקינה", severity: "major" },
    ],
  },
  {
    id: "3",
    name: "מיתלים",
    items: [
      { id: "31", name: "בולם זעזועים דולף", severity: "critical" },
      { id: "32", name: "קפיצים שבורים", severity: "critical" },
      { id: "33", name: "מעצורים גמישים מקרטעים", severity: "major" },
    ],
  },
];

export default function FaultManager() {
  const [categories, setCategories] = useState<FaultCategory[]>(initialCategories);
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(initialCategories.map((c) => c.id))
  );
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItem, setNewItem] = useState<Record<string, { name: string; severity: Severity }>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const id = Date.now().toString();
    setCategories((prev) => [
      ...prev,
      { id, name: newCategoryName.trim(), items: [] },
    ]);
    setExpanded((prev) => new Set(prev).add(id));
    setNewCategoryName("");
  };

  const deleteCategory = (id: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק קטגוריה זו?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const addItem = (categoryId: string) => {
    const item = newItem[categoryId];
    if (!item?.name.trim()) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              items: [
                ...c.items,
                {
                  id: Date.now().toString(),
                  name: item.name.trim(),
                  severity: item.severity,
                },
              ],
            }
          : c
      )
    );
    setNewItem((prev) => ({ ...prev, [categoryId]: { name: "", severity: "major" } }));
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
          : c
      )
    );
  };

  const updateItemSeverity = (
    categoryId: string,
    itemId: string,
    severity: Severity
  ) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              items: c.items.map((i) =>
                i.id === itemId ? { ...i, severity } : i
              ),
            }
          : c
      )
    );
  };

  const renameCategory = (id: string, name: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="שם קטגוריה חדשה..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
        />
        <button
          onClick={addCategory}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + קטגוריה
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleExpand(cat.id)}
                  className="text-gray-500 hover:text-gray-700 font-bold w-6"
                >
                  {expanded.has(cat.id) ? "−" : "+"}
                </button>
                {editingCategory === cat.id ? (
                  <input
                    autoFocus
                    value={cat.name}
                    onChange={(e) => renameCategory(cat.id, e.target.value)}
                    onBlur={() => setEditingCategory(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditingCategory(null);
                    }}
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  />
                ) : (
                  <button
                    onClick={() => setEditingCategory(cat.id)}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-700"
                  >
                    {cat.name}
                  </button>
                )}
                <span className="text-xs text-gray-500">({cat.items.length})</span>
              </div>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                מחק קטגוריה
              </button>
            </div>

            {expanded.has(cat.id) && (
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                          פריט
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                          חומרה
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                          פעולות
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {cat.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 text-sm text-gray-800 text-right">
                            {item.name}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <select
                              value={item.severity}
                              onChange={(e) =>
                                updateItemSeverity(
                                  cat.id,
                                  item.id,
                                  e.target.value as Severity
                                )
                              }
                              className={`rounded-md px-2 py-1 text-xs font-medium border-0 ${severityBadge[item.severity]}`}
                            >
                              {(Object.keys(severityLabels) as Severity[]).map(
                                (s) => (
                                  <option key={s} value={s}>
                                    {severityLabels[s]}
                                  </option>
                                )
                              )}
                            </select>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button
                              onClick={() => deleteItem(cat.id, item.id)}
                              className="text-xs text-red-600 hover:text-red-800"
                            >
                              מחק
                            </button>
                          </td>
                        </tr>
                      ))}
                      {cat.items.length === 0 && (
                        <tr>
                          <td
                            colSpan={3}
                            className="px-4 py-4 text-center text-sm text-gray-400"
                          >
                            אין פריטים בקטגוריה זו
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newItem[cat.id]?.name ?? ""}
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        [cat.id]: {
                          ...(prev[cat.id] ?? { severity: "major" }),
                          name: e.target.value,
                        },
                      }))
                    }
                    placeholder="הוסף פריט פסילה..."
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  />
                  <select
                    value={newItem[cat.id]?.severity ?? "major"}
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        [cat.id]: {
                          ...(prev[cat.id] ?? { name: "" }),
                          severity: e.target.value as Severity,
                        },
                      }))
                    }
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  >
                    <option value="minor">קלה</option>
                    <option value="major">חמורה</option>
                    <option value="critical">קריטית</option>
                  </select>
                  <button
                    onClick={() => addItem(cat.id)}
                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    + פריט
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
