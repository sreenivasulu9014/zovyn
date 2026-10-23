"use client";

import React from "react";
import Link from "next/link";
import { Building2, Terminal, Shield, Award, Landmark, GraduationCap, Flame, Sparkles } from "lucide-react";

interface QuickFiltersProps {
  activeCategory?: string;
}

export function QuickFilters({ activeCategory = "all" }: QuickFiltersProps) {
  const categories = [
    { id: "all", name: "All Alerts", icon: Sparkles, href: "/jobs" },
    { id: "govt", name: "Govt / PSU", icon: Building2, href: "/category/govt" },
    { id: "it", name: "IT & Software", icon: Terminal, href: "/category/it" },
    { id: "railway", name: "Railways RRB", icon: Landmark, href: "/category/railway" },
    { id: "bank", name: "Banking & PO", icon: Landmark, href: "/category/bank" },
    { id: "defence", name: "Army & Defence", icon: Shield, href: "/category/defence" },
    { id: "police", name: "Police & Security", icon: Shield, href: "/category/police" },
    { id: "freshers", name: "Freshers & Off-Campus", icon: GraduationCap, href: "/category/freshers" },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        return (
          <Link
            key={cat.id}
            href={cat.href}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
              isActive
                ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20 scale-[1.02]"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-slate-700 hover:bg-slate-50"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
            <span>{cat.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
