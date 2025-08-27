"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus } from "lucide-react";
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

  if (loading) return <div>Cargando interacciones...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Interacciones</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva Interacción
        </button>
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

      <div className="space-y-4">
        {interactions.map((interaction) => (
          <div key={interaction.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">
                    {getInteractionIcon(interaction.type)}
                  </span>
                  <h3 className="text-lg font-medium capitalize">
                    {interaction.type} - {interaction.clients.name}
                  </h3>
                </div>

                {interaction.sofas && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Trabajo:</strong> {interaction.sofas.description}
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
        <div className="text-center py-12 text-gray-500">
          No hay interacciones registradas
        </div>
      )}
    </div>
  );
}
