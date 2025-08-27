"use client";

import { useState } from "react";
import ClientList from "@/components/ClientList";
import SofaList from "@/components/SofaList";
import InteractionList from "@/components/InteractionList";
import { Users, Sofa, MessageSquare } from "lucide-react";

type View = "clients" | "sofas" | "interactions";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("clients");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">CRM Tapicería</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setCurrentView("clients")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentView === "clients"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Clientes
          </button>
          <button
            onClick={() => setCurrentView("sofas")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentView === "sofas"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Sofa className="w-5 h-5 mr-2" />
            Trabajos
          </button>
          <button
            onClick={() => setCurrentView("interactions")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentView === "interactions"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Interacciones
          </button>
        </div>

        {currentView === "clients" && <ClientList />}
        {currentView === "sofas" && <SofaList />}
        {currentView === "interactions" && <InteractionList />}
      </main>
    </div>
  );
}
