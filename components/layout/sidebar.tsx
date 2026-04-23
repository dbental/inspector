'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Car,
  ClipboardList,
  UserPlus,
  Users,
  Shield,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  {
    title: 'בדיקות רכבים',
    href: '/',
    icon: Car,
  },
  {
    title: 'בדיקה חדשה',
    href: '/new-test',
    icon: ClipboardList,
  },
  {
    title: 'רשימת לקוחות',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'לקוח חדש',
    href: '/new-customer',
    icon: UserPlus,
  },
  {
    title: 'ממשק ניהול',
    href: '/admin',
    icon: Shield,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 z-40 h-screen w-64 border-l border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-border px-4">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">EzCarTest</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="border-b border-border p-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="w-full justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">יוסי כהן</p>
                    <p className="text-xs text-muted-foreground">מנהל מערכת</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>החשבון שלי</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>פרופיל</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>הגדרות</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>התנתקות</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4 text-center text-xs text-muted-foreground">
          EzCarTest v1.0.0
        </div>
      </div>
    </aside>
  );
}
