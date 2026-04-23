"use client";

import { forwardRef } from "react";
import { TestInfo, CategoryState, Category } from "@/types/inspection";
import { categories, getSeverityLabel, getSeverityColor } from "@/lib/inspection-data";
import { cn } from "@/lib/utils";

interface PrintReportProps {
  testInfo: TestInfo;
  states: CategoryState[];
}

const PrintReport = forwardRef<HTMLDivElement, PrintReportProps>(
  ({ testInfo, states }, ref) => {
    const activeStates = states.filter(
      (s) => s.selectedFaultIds.length > 0 || s.comment.trim()
    );

    const getCategory = (id: string): Category | undefined =>
      categories.find((c) => c.id === id);

    const getFaults = (catId: string, faultIds: string[]) => {
      const cat = getCategory(catId);
      if (!cat) return [];
      return cat.faults.filter((f) => faultIds.includes(f.id));
    };

    return (
      <div
        ref={ref}
        className="hidden print:block"
        dir="rtl"
      >
        <div className="mx-auto max-w-4xl bg-white p-8">
          <header className="mb-8 border-b-2 border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  דוח בדיקת רכב
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  מספר בדיקה: {testInfo.id} | תאריך: {testInfo.testDate}
                </p>
              </div>
              <div className="text-left text-sm text-slate-600">
                <p><strong>EzCarTest</strong></p>
                <p>מערכת בדיקות רכב</p>
              </div>
            </div>
          </header>

          <section className="mb-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded border border-slate-200 p-3">
              <h3 className="mb-2 font-bold text-slate-800">פרטי רכב</h3>
              <div className="grid grid-cols-2 gap-y-1">
                <span className="text-slate-500">מספר רכב:</span>
                <span className="font-semibold">{testInfo.carNumber}</span>
                <span className="text-slate-500">יצרן:</span>
                <span className="font-semibold">{testInfo.make}</span>
                <span className="text-slate-500">דגם:</span>
                <span className="font-semibold">{testInfo.model}</span>
                <span className="text-slate-500">שנה:</span>
                <span className="font-semibold">{testInfo.year}</span>
                <span className="text-slate-500">VIN:</span>
                <span className="font-semibold">{testInfo.vin}</span>
              </div>
            </div>

            <div className="rounded border border-slate-200 p-3">
              <h3 className="mb-2 font-bold text-slate-800">פרטי לקוח</h3>
              <div className="grid grid-cols-2 gap-y-1">
                <span className="text-slate-500">שם:</span>
                <span className="font-semibold">{testInfo.customerName}</span>
                <span className="text-slate-500">טלפון:</span>
                <span className="font-semibold">{testInfo.customerPhone}</span>
                <span className="text-slate-500">בודק:</span>
                <span className="font-semibold">{testInfo.testerName}</span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="mb-4 border-b border-slate-200 pb-1 text-lg font-bold text-slate-800">
              תוצאות בדיקה
            </h3>

            {activeStates.length === 0 && (
              <p className="text-sm text-slate-500">לא נבחרו תקלות בבדיקה זו.</p>
            )}

            {activeStates.map((state) => {
              const cat = getCategory(state.categoryId);
              if (!cat) return null;
              const faults = getFaults(state.categoryId, state.selectedFaultIds);

              return (
                <div
                  key={state.categoryId}
                  className="mb-4 rounded border border-slate-200"
                >
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2">
                    <span className="font-bold text-slate-800">{cat.name}</span>
                    <span className="text-xs text-slate-500">
                      ({faults.length} תקלות)
                    </span>
                  </div>

                  <div className="px-4 py-2">
                    {faults.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between py-1"
                      >
                        <span className="text-sm text-slate-700">{f.label}</span>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs font-semibold",
                            getSeverityColor(f.severity)
                          )}
                        >
                          {getSeverityLabel(f.severity)}
                        </span>
                      </div>
                    ))}

                    {state.comment.trim() && (
                      <div className="mt-2 border-t border-dashed border-slate-200 pt-2">
                        <span className="text-xs font-semibold text-slate-500">
                          הערות:
                        </span>
                        <p className="text-sm text-slate-700">
                          {state.comment}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          <footer className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
            EzCarTest - מערכת בדיקות רכב | דוח זה הופק אוטומטית
          </footer>
        </div>
      </div>
    );
  }
);

PrintReport.displayName = "PrintReport";

export default PrintReport;
