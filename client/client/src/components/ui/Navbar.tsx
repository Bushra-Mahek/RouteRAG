"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Web Search Agent",
      href: "/",
      badge: "LCEL",
    },
    {
      label: "LightRAG Knowledge Base",
      href: "/kb",
      badge: "RAG",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
            AI
          </span>
          <span>Agent Workspace</span>
        </Link>

        <div className="flex items-center gap-1.5 rounded-xl bg-gray-100 p-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}