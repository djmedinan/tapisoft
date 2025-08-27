"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractionForm from "./InteractionForm";

interface Interaction {
  id: string;
  client_id: string;
  sofa_id: string | null;
  type: string;
  notes: string | null;
  created_at: string;
  clients: {
    name: string;
  };
  sofas: {
    description: string;
  } | null;
}

export default function InteractionList() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const { data, error } = await supabase
        .from("interactions")
        .select(
          `
          *,
          clients (name),
          sofas (description)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInteractions(data || []);
    } catch (error) {
      console.error("Error fetching interactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "llamada":
        return "📞";
      case "email":
        return "✉️";
      case "visita":
        return "👁️";
      case "cotizacion":
        return "💰";
      case "seguimiento":
        return "🔄";
      default:
        return "📝";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "llamada":
        return "Llamada";
      case "email":
        return "Email";
      case "visita":
        return "Visita";
      case "cotizacion":
        return "Cotización";
      case "seguimiento":
        return "Seguimiento";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Cargando interacciones...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Interacciones</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Interacción
        </Button>
      </div>

      {showForm && (
        <InteractionForm
          onSuccess={() => {
            setShowForm(false);
            fetchInteractions();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Historial de Interacciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interactions.map((interaction) => (
              <div key={interaction.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">
                        {getInteractionIcon(interaction.type)}
                      </span>
                      <h3 className="text-lg font-medium">
                        {getTypeText(interaction.type)} -{" "}
                        {interaction.clients.name}
                      </h3>
                    </div>

                    {interaction.sofas && (
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Trabajo:</strong>{" "}
                        {interaction.sofas.description}
                      </p>
                    )}

                    {interaction.notes && (
                      <p className="text-gray-700 mb-2">{interaction.notes}</p>
                    )}

                    <p className="text-sm text-gray-500">
                      {new Date(interaction.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {interactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay interacciones registradas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
