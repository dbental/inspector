"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TestHeader from "@/components/inspection/test-header";
import Checklist from "@/components/inspection/checklist";
import PrintReport from "@/components/inspection/print-report";
import { TestInfo, CategoryState } from "@/types/inspection";

export default function TestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  // Demo data; replace with API call in production
  const testInfo: TestInfo = {
    id: String(params.id),
    carNumber: "12-345-67",
    make: "יונדאי",
    model: "i35",
    year: 2018,
    vin: "KMHDU4AD2AU123456",
    customerName: "ישראל ישראלי",
    customerPhone: "050-1234567",
    testDate: new Date().toLocaleDateString("he-IL"),
    testerName: "משה בודק",
  };

  const [reportStates] = useState<CategoryState[]>([]);

  const handleSave = async () => {
    setSaving(true);
    // Replace with real API call
    await new Promise((res) => setTimeout(res, 800));
    setSaving(false);
    alert("הבדיקה נשמרה בהצלחה");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    router.push("/tests");
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 py-6 print:hidden">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-slate-900">
            בדיקת רכב #{testInfo.id}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              סגור
            </button>
            <button
              onClick={handlePrint}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              הדפס
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "שומר..." : "שמור בדיקה"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-base font-bold text-slate-800">פרטי לקוח</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <span className="block text-xs font-medium text-slate-500">שם</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {testInfo.customerName}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-500">טלפון</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {testInfo.customerPhone}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-500">בודק</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {testInfo.testerName}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <TestHeader testInfo={testInfo} />
            </div>
            <Checklist />
          </main>
        </div>
      </div>

      <PrintReport ref={reportRef} testInfo={testInfo} states={reportStates} />
    </div>
  );
}
