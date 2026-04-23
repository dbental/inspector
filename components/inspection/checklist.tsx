"use client";

import { useState, useCallback } from "react";
import { Category, CategoryState } from "@/types/inspection";
import { categories } from "@/lib/inspection-data";
import CategoryCard from "./category-card";

function createInitialState(cats: Category[]): CategoryState[] {
  return cats.map((c) => ({
    categoryId: c.id,
    selectedFaultIds: [],
    comment: "",
  }));
}

export default function Checklist() {
  const [states, setStates] = useState<CategoryState[]>(() =>
    createInitialState(categories)
  );

  const updateCategory = useCallback(
    (categoryId: string, updater: (prev: CategoryState) => CategoryState) => {
      setStates((prev) =>
        prev.map((s) => (s.categoryId === categoryId ? updater(s) : s))
      );
    },
    []
  );

  const handleToggleFault = useCallback(
    (categoryId: string, faultId: string) => {
      updateCategory(categoryId, (prev) => {
        const selected = new Set(prev.selectedFaultIds);
        if (selected.has(faultId)) {
          selected.delete(faultId);
        } else {
          selected.add(faultId);
        }
        return { ...prev, selectedFaultIds: Array.from(selected) };
      });
    },
    [updateCategory]
  );

  const handleSelectAll = useCallback(
    (categoryId: string) => {
      updateCategory(categoryId, (prev) => {
        const cat = categories.find((c) => c.id === categoryId);
        const allIds = cat?.faults.map((f) => f.id) ?? [];
        return { ...prev, selectedFaultIds: allIds };
      });
    },
    [updateCategory]
  );

  const handleSelectNone = useCallback(
    (categoryId: string) => {
      updateCategory(categoryId, (prev) => ({
        ...prev,
        selectedFaultIds: [],
      }));
    },
    [updateCategory]
  );

  const handleCommentChange = useCallback(
    (categoryId: string, comment: string) => {
      updateCategory(categoryId, (prev) => ({ ...prev, comment }));
    },
    [updateCategory]
  );

  const totalSelected = states.reduce(
    (sum, s) => sum + s.selectedFaultIds.length,
    0
  );

  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">רשימת בדיקה</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {totalSelected} תקלות נבחרו
        </span>
      </div>

      {categories.map((cat) => {
        const state = states.find((s) => s.categoryId === cat.id)!;
        return (
          <CategoryCard
            key={cat.id}
            category={cat}
            state={state}
            onToggleFault={(faultId) => handleToggleFault(cat.id, faultId)}
            onSelectAll={() => handleSelectAll(cat.id)}
            onSelectNone={() => handleSelectNone(cat.id)}
            onCommentChange={(comment) => handleCommentChange(cat.id, comment)}
          />
        );
      })}
    </div>
  );
}
