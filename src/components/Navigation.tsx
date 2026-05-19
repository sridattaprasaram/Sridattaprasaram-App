"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarHeart, Clapperboard, HeartHandshake } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", label: "Darshan", icon: Home },
    { href: "/habits", label: "Habits", icon: CalendarHeart },
    { href: "/media", label: "Media", icon: Clapperboard },
    { href: "/connect", label: "Seva", icon: HeartHandshake },
  ];

  if (pathname === "/") return null; // Don't show on onboarding

  return (
    <nav className="fixed bottom-0 w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-saffron-600 dark:text-saffron-500" : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
