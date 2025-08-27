"use client";

import { useState } from "react";
import ClientList from "@/components/ClientList";
import SofaList from "@/components/SofaList";
import InteractionList from "@/components/InteractionList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type View = "clients" | "sofas" | "interactions";

export default function TrabajosPage() {
  const [currentView, setCurrentView] = useState<View>("clients");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión</h1>
        <p className="text-gray-600">
          Administra clientes, trabajos e interacciones
        </p>
      </div>

      <Tabs
        value={currentView}
        onValueChange={(value) => setCurrentView(value as View)}
      >
        <TabsList>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="sofas">Trabajos</TabsTrigger>
          <TabsTrigger value="interactions">Interacciones</TabsTrigger>
        </TabsList>
      </Tabs>

      <div>
        {currentView === "clients" && <ClientList />}
        {currentView === "sofas" && <SofaList />}
        {currentView === "interactions" && <InteractionList />}
      </div>
    </div>
  );
}
