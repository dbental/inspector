"use client";

import React from "react";
import FaultManager from "@/components/admin/fault-manager";

export default function FaultsPage() {
  return (
    <div dir="rtl">
      <div className="mb-6">
        <p className="text-gray-600 text-right">
          נהל קטגוריות בדיקה ופריטי פסילה. הגדר חומרה לכל פריט.
        </p>
      </div>
      <FaultManager />
    </div>
  );
}
