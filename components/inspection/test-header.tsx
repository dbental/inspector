"use client";

import { TestInfo } from "@/types/inspection";

interface TestHeaderProps {
  testInfo: TestInfo;
}

export default function TestHeader({ testInfo }: TestHeaderProps) {
  const infoItems = [
    { label: "מספר רכב", value: testInfo.carNumber },
    { label: "יצרן", value: testInfo.make },
    { label: "דגם", value: testInfo.model },
    { label: "שנה", value: testInfo.year.toString() },
    { label: "מספר שילדה (VIN)", value: testInfo.vin },
    { label: "תאריך בדיקה", value: testInfo.testDate },
    { label: "בודק", value: testInfo.testerName },
  ];

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      dir="rtl"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">פרטי הרכב</h2>
        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
          מספר בדיקה: {testInfo.id}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {infoItems.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-xs font-medium text-slate-500">{item.label}</span>
            <span className="text-sm font-semibold text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
