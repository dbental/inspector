export type Severity = "minor" | "moderate" | "major" | "critical";

export interface Fault {
  id: string;
  label: string;
  severity: Severity;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  faults: Fault[];
}

export interface CategoryState {
  categoryId: string;
  selectedFaultIds: string[];
  comment: string;
}

export interface TestInfo {
  id: string;
  carNumber: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  customerName: string;
  customerPhone: string;
  testDate: string;
  testerName: string;
}

export interface InspectionReport {
  testInfo: TestInfo;
  categories: CategoryState[];
}
