"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
          <div className="space-y-2">
            <Label htmlFor="client_id">Cliente</Label>
            <Select
              value={formData.client_id}
              onValueChange={(value) => handleSelectChange("client_id", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {clientsLoading && (
              <p className="text-sm text-gray-500">Cargando clientes...</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sofa_id">Trabajo relacionado (opcional)</Label>
            <Select
              value={formData.sofa_id}
              onValueChange={(value) => handleSelectChange("sofa_id", value)}
              disabled={!formData.client_id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar trabajo" />
              </SelectTrigger>
              <SelectContent>
                {filteredSofas.map((sofa) => (
                  <SelectItem key={sofa.id} value={sofa.id}>
                    {sofa.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.client_id && filteredSofas.length === 0 && (
              <p className="text-sm text-gray-500">
                No hay trabajos para este cliente
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Interacción</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="llamada">Llamada</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="visita">Visita</SelectItem>
                <SelectItem value="cotizacion">Cotización</SelectItem>
                <SelectItem value="seguimiento">Seguimiento</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Detalles de la interacción..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
