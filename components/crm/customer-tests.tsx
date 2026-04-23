"use client";

import React, { useState } from "react";

type TestResult = "pass" | "fail" | "partial";

type Test = {
  id: string;
  date: string;
  carPlate: string;
  carInfo: string;
  result: TestResult;
  inspector: string;
  branch: string;
  faultsCount: number;
  notes: string;
};

const mockTests: Test[] = [
  {
    id: "T-2025-001",
    date: "2025-03-15",
    carPlate: "12-345-67",
    carInfo: "יונדאי טוסון 2020",
    result: "pass",
    inspector: "דני לוי",
    branch: "סניף מרכז",
    faultsCount: 0,
    notes: "הרכב במצב מצוין",
  },
  {
    id: "T-2024-089",
    date: "2024-11-20",
    carPlate: "98-765-43",
    carInfo: "טויוטה קורולה 2018",
    result: "partial",
    inspector: "רונית פרץ",
    branch: "סניף חיפה",
    faultsCount: 2,
    notes: "נדרשת תיקון פנס ראשי",
  },
  {
    id: "T-2024-045",
    date: "2024-06-10",
    carPlate: "12-345-67",
    carInfo: "יונדאי טוסון 2020",
    result: "fail",
    inspector: "דני לוי",
    branch: "סניף מרכז",
    faultsCount: 4,
    notes: "בלמים לא תקינים, דרוש תיקון",
  },
  {
    id: "T-2023-112",
    date: "2023-07-10",
    carPlate: "11-222-33",
    carInfo: "קיה פיקנטו 2015",
    result: "pass",
    inspector: "אבי לוי",
    branch: "סניף מרכז",
    faultsCount: 0,
    notes: "",
  },
];

const resultLabel: Record<TestResult, string> = {
  pass: "עבר",
  fail: "נכשל",
  partial: "עבר עם הערות",
};

const resultBadge: Record<TestResult, string> = {
  pass: "bg-green-100 text-green-800",
  fail: "bg-red-100 text-red-800",
  partial: "bg-yellow-100 text-yellow-800",
};

export default function CustomerTests({
  customerId,
}: {
  customerId: string;
}) {
  const [tests] = useState<Test[]>(mockTests);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => alert(`יצירת בדיקה חדשה ללקוח ${customerId}`)}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + בדיקה חדשה
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מספר בדיקה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תאריך
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                רכב
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תוצאה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                בודק
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סניף
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פסילות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tests.map((test) => (
              <React.Fragment key={test.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {test.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {test.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    <div>{test.carInfo}</div>
                    <div className="text-xs text-gray-500">{test.carPlate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${resultBadge[test.result]}`}
                    >
                      {resultLabel[test.result]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {test.inspector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {test.branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                    {test.faultsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => toggleExpand(test.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {expanded.has(test.id) ? "הסתר" : "פרטים"}
                      </button>
                      <button
                        onClick={() => alert(`הדפס דוח ${test.id}`)}
                        className="text-gray-600 hover:text-gray-800 font-medium"
                      >
                        הדפס
                      </button>
                    </div>
                  </td>
                </tr>
                {expanded.has(test.id) && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-4 bg-gray-50 text-sm text-gray-700 text-right"
                    >
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold">הערות: </span>
                          {test.notes || "אין הערות"}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              alert(`צפייה בדוח מלא ${test.id}`)
                            }
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            צפייה בדוח מלא
                          </button>
                          <button
                            onClick={() =>
                              alert(`שליחת דוא"ל ${test.id}`)
                            }
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            שלח בדוא"ל
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {tests.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  לא נמצאו בדיקות
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
