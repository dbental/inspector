"use client";

import React from "react";
import CustomerForm from "@/components/crm/customer-form";

export default function NewCustomerPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-right">
          לקוח חדש
        </h1>
        <CustomerForm
          onSave={(data) => {
            console.log("Customer saved:", data);
            alert("הלקוח נוצר בהצלחה");
          }}
          onCancel={() => {
            window.history.back();
          }}
        />
      </div>
    </div>
  );
}
