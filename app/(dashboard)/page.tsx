'use client';

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TestsTable } from '@/components/tables/tests-table';

const mockTests = [
  {
    id: '1',
    carNumber: '12-345-67',
    customerName: 'יוסי כהן',
    testDate: '2024-01-15',
    status: 'פתוח' as const,
    technician: 'דני לוי',
    notes: 'בדיקת תקופתית שנתית',
  },
  {
    id: '2',
    carNumber: '23-456-78',
    customerName: 'רונית שמעוני',
    testDate: '2024-01-14',
    status: 'סגור' as const,
    technician: 'אבי פרץ',
    notes: '',
  },
  {
    id: '3',
    carNumber: '34-567-89',
    customerName: 'משה דיין',
    testDate: '2024-01-13',
    status: 'פתוח' as const,
    technician: 'דני לוי',
    notes: 'תיקון בלמים נדרש',
  },
  {
    id: '4',
    carNumber: '45-678-90',
    customerName: 'שרה גולן',
    testDate: '2024-01-12',
    status: 'סגור' as const,
    technician: 'אבי פרץ',
    notes: '',
  },
  {
    id: '5',
    carNumber: '56-789-01',
    customerName: 'יוסי כהן',
    testDate: '2024-01-10',
    status: 'פתוח' as const,
    technician: 'דני לוי',
    notes: 'בדיקת רישוי',
  },
];

const customers = Array.from(new Set(mockTests.map((t) => t.customerName)));

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [customerFilter, setCustomerFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredTests = useMemo(() => {
    return mockTests.filter((test) => {
      const matchesSearch = test.carNumber.includes(searchQuery);
      const matchesStatus =
        statusFilter === 'all' || test.status === statusFilter;
      const matchesCustomer =
        customerFilter === 'all' || test.customerName === customerFilter;
      const matchesDateFrom = !dateFrom || test.testDate >= dateFrom;
      const matchesDateTo = !dateTo || test.testDate <= dateTo;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCustomer &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [searchQuery, statusFilter, customerFilter, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCustomerFilter('all');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">בדיקות רכבים</h1>
        <p className="text-muted-foreground">נהל את כל בדיקות הרכב במערכת</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <CardTitle>סינון</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              נקה סינון
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">חיפוש לפי מספר רכב</label>
              <div className="relative">
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="הכנס מספר רכב..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">סטטוס</label>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר סטטוס" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">הכל</SelectItem>
                  <SelectItem value="פתוח">פתוח</SelectItem>
                  <SelectItem value="סגור">סגור</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">לקוח</label>
              <Select value={customerFilter} onValueChange={(v) => setCustomerFilter(v ?? 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר לקוח" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הלקוחות</SelectItem>
                  {customers.map((customer) => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">מתאריך</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">עד תאריך</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>רשימת בדיקות</CardTitle>
        </CardHeader>
        <CardContent>
          <TestsTable tests={filteredTests} />
        </CardContent>
      </Card>
    </div>
  );
}
