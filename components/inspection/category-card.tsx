"use client";

import { useState } from "react";
import Image from "next/image";
import { Category, CategoryState } from "@/types/inspection";
import { getSeverityColor, getSeverityLabel } from "@/lib/inspection-data";
import FaultItem from "./fault-item";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  state: CategoryState;
  onToggleFault: (faultId: string) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  onCommentChange: (comment: string) => void;
}

export default function CategoryCard({
  category,
  state,
  onToggleFault,
  onSelectAll,
  onSelectNone,
  onCommentChange,
}: CategoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const selectedCount = state.selectedFaultIds.length;
  const totalCount = category.faults.length;
  const hasFaults = selectedCount > 0;

  const maxSeverity = category.faults
    .filter((f) => state.selectedFaultIds.includes(f.id))
    .reduce(
      (max, f) => {
        const order: Record<string, number> = { minor: 1, moderate: 2, major: 3, critical: 4 };
        return (order[f.severity] ?? 0) > (order[max] ?? 0) ? f.severity : max;
      },
      "minor" as string
    );

  return (
    <div
      className={cn(
        "rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md",
        hasFaults && "ring-1 ring-blue-200"
      )}
      dir="rtl"
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center gap-4 px-5 py-4 text-right"
        aria-expanded={expanded}
      >
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={category.icon}
            alt={category.name}
            fill
            className="object-contain p-1"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-800">{category.name}</h3>
          <p className="text-xs text-slate-500">
            {selectedCount}/{totalCount} תקלות נבחרו
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasFaults && (
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                getSeverityColor(maxSeverity)
              )}
            >
              {selectedCount} {getSeverityLabel(maxSeverity)}
            </span>
          )}
          <span
            className={cn(
              "text-slate-400 transition-transform",
              expanded && "rotate-180"
            )}
          >
            ▼
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-3">
          <div className="mb-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onSelectNone}
              className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-700 hover:underline"
            >
              ביטול הכל
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={onSelectAll}
              className="text-xs font-medium text-blue-600 underline-offset-2 hover:text-blue-700 hover:underline"
            >
              בחר הכל
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {category.faults.map((fault) => (
              <FaultItem
                key={fault.id}
                fault={fault}
                checked={state.selectedFaultIds.includes(fault.id)}
                onToggle={onToggleFault}
              />
            ))}
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              הערות לקטגוריה
            </label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-blue-200 transition focus:border-blue-500 focus:ring-2"
              placeholder="הזן הערות..."
              value={state.comment}
              onChange={(e) => onCommentChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
