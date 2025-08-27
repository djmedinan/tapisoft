"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface InteractionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface Client {
  id: string;
  name: string;
}

interface Sofa {
  id: string;
  description: string;
  client_id: string;
}

export default function InteractionForm({
  onSuccess,
  onCancel,
}: InteractionFormProps) {
  const [formData, setFormData] = useState({
    client_id: "",
    sofa_id: "",
    type: "llamada" as const,
    notes: "",
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [sofas, setSofas] = useState<Sofa[]>([]);
  const [filteredSofas, setFilteredSofas] = useState<Sofa[]>([]);
  const [loading, setLoading] = useState(false);
  const [clientsLoading, setClientsLoading] = useState(true);

  useEffect(() => {
    fetchClients();
    fetchSofas();
  }, []);

  useEffect(() => {
    if (formData.client_id) {
      setFilteredSofas(
        sofas.filter((sofa) => sofa.client_id === formData.client_id)
      );
    } else {
      setFilteredSofas([]);
    }
  }, [formData.client_id, sofas]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setClientsLoading(false);
    }
  };

  const fetchSofas = async () => {
    try {
      const { data, error } = await supabase
        .from("sofas")
        .select("id, description, client_id")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSofas(data || []);
    } catch (error) {
      console.error("Error fetching sofas:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const interactionData = {
        client_id: formData.client_id,
        sofa_id: formData.sofa_id || null,
        type: formData.type,
        notes: formData.notes || null,
      };

      const { error } = await supabase
        .from("interactions")
        .insert([interactionData]);
      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error("Error creating interaction:", error);
      alert("Error al crear interacción");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Nueva Interacción</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <select
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {clientsLoading && (
              <p className="text-sm text-gray-500 mt-1">Cargando clientes...</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trabajo relacionado (opcional)
            </label>
            <select
              name="sofa_id"
              value={formData.sofa_id}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={!formData.client_id}
            >
              <option value="">Seleccionar trabajo</option>
              {filteredSofas.map((sofa) => (
                <option key={sofa.id} value={sofa.id}>
                  {sofa.description}
                </option>
              ))}
            </select>
            {formData.client_id && filteredSofas.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No hay trabajos para este cliente
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Interacción
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="llamada">Llamada</option>
              <option value="email">Email</option>
              <option value="visita">Visita</option>
              <option value="cotizacion">Cotización</option>
              <option value="seguimiento">Seguimiento</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notas
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detalles de la interacción..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
