"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Sofa,
  MessageSquare,
  Home,
  Settings,
  BarChart3,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Clientes", href: "/clientes", icon: Users },
  { name: "Trabajos", href: "/trabajos", icon: Sofa },
  { name: "Interacciones", href: "/interacciones", icon: MessageSquare },
  { name: "Calendario", href: "/calendario", icon: Calendar },
  { name: "Reportes", href: "/reportes", icon: BarChart3 },
  { name: "Configuración", href: "/configuracion", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-gray-900">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 shrink-0 px-4 bg-gray-800">
        <div className="flex items-center space-x-2">
          <Sofa className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold text-white">Tapisoft CRM</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col space-y-2 p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User section (opcional) */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-sm font-medium text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-xs text-gray-400 truncate">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
}
