"use client";

import React, { useState } from "react";

type CarType = { id: string; name: string };
type BodyType = { id: string; name: string };
type Manufacturer = { id: string; name: string; models: string[] };

const initialCarTypes: CarType[] = [
  { id: "1", name: "פרטי" },
  { id: "2", name: "מסחרי" },
  { id: "3", name: "אופנוע" },
  { id: "4", name: "משאית" },
];

const initialBodyTypes: BodyType[] = [
  { id: "1", name: "סדאן" },
  { id: "2", name: "האצ'בק" },
  { id: "3", name: "SUV" },
  { id: "4", name: "קופה" },
  { id: "5", name: "סטיישן" },
];

const initialManufacturers: Manufacturer[] = [
  { id: "1", name: "יונדאי", models: ["i10", "i20", "i30", "טוסון", "סנטה פה"] },
  { id: "2", name: "טויוטה", models: ["קורולה", "יאריס", "קאמרי", "RAV4", "היילקס"] },
  { id: "3", name: "קיה", models: ["פיקנטו", "ריו", "סיד", "ספורטאז'", "סורנטו"] },
];

export default function CategoriesPage() {
  const [carTypes, setCarTypes] = useState<CarType[]>(initialCarTypes);
  const [bodyTypes, setBodyTypes] = useState<BodyType[]>(initialBodyTypes);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>(initialManufacturers);

  const [newCarType, setNewCarType] = useState("");
  const [newBodyType, setNewBodyType] = useState("");
  const [newManufacturer, setNewManufacturer] = useState("");
  const [newModel, setNewModel] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");

  const addCarType = () => {
    if (!newCarType.trim()) return;
    setCarTypes((prev) => [...prev, { id: Date.now().toString(), name: newCarType.trim() }]);
    setNewCarType("");
  };

  const addBodyType = () => {
    if (!newBodyType.trim()) return;
    setBodyTypes((prev) => [...prev, { id: Date.now().toString(), name: newBodyType.trim() }]);
    setNewBodyType("");
  };

  const addManufacturer = () => {
    if (!newManufacturer.trim()) return;
    setManufacturers((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newManufacturer.trim(), models: [] },
    ]);
    setNewManufacturer("");
  };

  const addModel = () => {
    if (!newModel.trim() || !selectedManufacturer) return;
    setManufacturers((prev) =>
      prev.map((m) =>
        m.id === selectedManufacturer
          ? { ...m, models: [...m.models, newModel.trim()] }
          : m
      )
    );
    setNewModel("");
  };

  const deleteCarType = (id: string) => setCarTypes((prev) => prev.filter((c) => c.id !== id));
  const deleteBodyType = (id: string) => setBodyTypes((prev) => prev.filter((b) => b.id !== id));
  const deleteManufacturer = (id: string) =>
    setManufacturers((prev) => prev.filter((m) => m.id !== id));
  const deleteModel = (manufacturerId: string, model: string) =>
    setManufacturers((prev) =>
      prev.map((m) =>
        m.id === manufacturerId
          ? { ...m, models: m.models.filter((mod) => mod !== model) }
          : m
      )
    );

  const SectionCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 text-right">{title}</h2>
      {children}
    </div>
  );

  return (
    <div dir="rtl" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="סוגי רכב">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCarType}
              onChange={(e) => setNewCarType(e.target.value)}
              placeholder="הוסף סוג רכב..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addCarType}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              הוסף
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {carTypes.map((ct) => (
              <li
                key={ct.id}
                className="flex items-center justify-between py-2 text-right"
              >
                <span className="text-sm text-gray-800">{ct.name}</span>
                <button
                  onClick={() => deleteCarType(ct.id)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  מחק
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="סוגי מרכב">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newBodyType}
              onChange={(e) => setNewBodyType(e.target.value)}
              placeholder="הוסף סוג מרכב..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addBodyType}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              הוסף
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {bodyTypes.map((bt) => (
              <li
                key={bt.id}
                className="flex items-center justify-between py-2 text-right"
              >
                <span className="text-sm text-gray-800">{bt.name}</span>
                <button
                  onClick={() => deleteBodyType(bt.id)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  מחק
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="יצרנים ודגמים">
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newManufacturer}
                onChange={(e) => setNewManufacturer(e.target.value)}
                placeholder="הוסף יצרן..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addManufacturer}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                הוסף
              </button>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">בחר יצרן</option>
                {manufacturers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                placeholder="הוסף דגם..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addModel}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                הוסף דגם
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {manufacturers.map((m) => (
                <div
                  key={m.id}
                  className="rounded-md border border-gray-100 bg-gray-50 p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {m.name}
                    </span>
                    <button
                      onClick={() => deleteManufacturer(m.id)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      מחק יצרן
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {m.models.map((model) => (
                      <span
                        key={model}
                        className="inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 px-2.5 py-1 text-xs text-gray-700"
                      >
                        {model}
                        <button
                          onClick={() => deleteModel(m.id, model)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {m.models.length === 0 && (
                      <span className="text-xs text-gray-400">אין דגמים</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
