"use client";

import { useState } from "react";
import ClientList from "@/components/ClientList";
import SofaList from "@/components/SofaList";
import InteractionList from "@/components/InteractionList";
import { Users, Sofa, MessageSquare, Home as HomeIcon } from "lucide-react"; // ← Alias aquí

// Importaciones de Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type View = "clients" | "sofas" | "interactions";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("clients");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Sofa className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Tapisoft CRM</h1>
            </div>
            <Button variant="outline" size="sm">
              <HomeIcon className="w-4 h-4 mr-2" /> {/* ← Usa el alias aquí */}
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Gestión de Tapicería</CardTitle>

              <Tabs
                value={currentView}
                onValueChange={(value) => setCurrentView(value as View)}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                  <TabsTrigger
                    value="clients"
                    className="flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">Clientes</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="sofas"
                    className="flex items-center gap-2"
                  >
                    <Sofa className="w-4 h-4" />
                    <span className="hidden sm:inline">Trabajos</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="interactions"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Interacciones</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mt-6">
              {currentView === "clients" && <ClientList />}
              {currentView === "sofas" && <SofaList />}
              {currentView === "interactions" && <InteractionList />}
            </div>
          </CardContent>
        </Card>

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
