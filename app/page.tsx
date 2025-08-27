"use client";

import { useState } from "react";
import ClientList from "@/components/ClientList";
import SofaList from "@/components/SofaList";
import InteractionList from "@/components/InteractionList";
import { Users, Sofa, MessageSquare } from "lucide-react";

// Importaciones de Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type View = "clients" | "sofas" | "interactions";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("clients");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">CRM Tapicería</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botones de navegación con Shadcn */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={currentView === "clients" ? "default" : "outline"}
            onClick={() => setCurrentView("clients")}
            className="flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Clientes
          </Button>
          <Button
            variant={currentView === "sofas" ? "default" : "outline"}
            onClick={() => setCurrentView("sofas")}
            className="flex items-center gap-2"
          >
            <Sofa className="w-5 h-5" />
            Trabajos
          </Button>
          <Button
            variant={currentView === "interactions" ? "default" : "outline"}
            onClick={() => setCurrentView("interactions")}
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Interacciones
          </Button>
        </div>

        {/* Tarjeta contenedora */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentView === "clients" && "Gestión de Clientes"}
              {currentView === "sofas" && "Gestión de Trabajos"}
              {currentView === "interactions" && "Gestión de Interacciones"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contenido dinámico */}
            {currentView === "clients" && <ClientList />}
            {currentView === "sofas" && <SofaList />}
            {currentView === "interactions" && <InteractionList />}
          </CardContent>
        </Card>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Clientes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Trabajos Activos
              </CardTitle>
              <Sofa className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">En progreso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Interacciones
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
