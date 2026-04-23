'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Test {
  id: string;
  carNumber: string;
  customerName: string;
  testDate: string;
  status: 'פתוח' | 'סגור';
  technician: string;
  notes?: string;
}

interface TestsTableProps {
  tests: Test[];
}

export function TestsTable({ tests }: TestsTableProps) {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewTest = (test: Test) => {
    setSelectedTest(test);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>מספר רכב</TableHead>
              <TableHead>שם לקוח</TableHead>
              <TableHead>תאריך בדיקה</TableHead>
              <TableHead>סטטוס</TableHead>
              <TableHead>טכנאי</TableHead>
              <TableHead className="text-left">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  לא נמצאו בדיקות
                </TableCell>
              </TableRow>
            ) : (
              tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.carNumber}</TableCell>
                  <TableCell>{test.customerName}</TableCell>
                  <TableCell>{test.testDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        test.status === 'פתוח'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {test.status}
                    </span>
                  </TableCell>
                  <TableCell>{test.technician}</TableCell>
                  <TableCell className="text-left">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewTest(test)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">צפה בבדיקה</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>פרטי בדיקה</DialogTitle>
            <DialogDescription>
              מספר רכב: {selectedTest?.carNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedTest && (
            <div className="space-y-4 text-right">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">שם לקוח</p>
                  <p className="text-sm">{selectedTest.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">תאריך בדיקה</p>
                  <p className="text-sm">{selectedTest.testDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">סטטוס</p>
                  <p className="text-sm">{selectedTest.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">טכנאי</p>
                  <p className="text-sm">{selectedTest.technician}</p>
                </div>
              </div>
              {selectedTest.notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">הערות</p>
                  <p className="text-sm">{selectedTest.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
