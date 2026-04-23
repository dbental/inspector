"use client";

import { Fault } from "@/types/inspection";
import { getSeverityLabel, getSeverityColor } from "@/lib/inspection-data";
import { cn } from "@/lib/utils";

interface FaultItemProps {
  fault: Fault;
  checked: boolean;
  onToggle: (faultId: string) => void;
}

export default function FaultItem({ fault, checked, onToggle }: FaultItemProps) {
  return (
    <label
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors cursor-pointer",
        checked
          ? "border-slate-400 bg-slate-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      )}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          checked={checked}
          onChange={() => onToggle(fault.id)}
        />
        <span
          className={cn(
            "text-sm font-medium text-slate-700",
            checked && "line-through opacity-60"
          )}
        >
          {fault.label}
        </span>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
          getSeverityColor(fault.severity)
        )}
        title={getSeverityLabel(fault.severity)}
      >
        {getSeverityLabel(fault.severity)}
      </span>
    </label>
  );
}
