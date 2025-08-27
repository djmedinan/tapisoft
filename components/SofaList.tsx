"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SofaForm from "./SofaForm";

interface Sofa {
  id: string;
  client_id: string;
  description: string;
  status: "pendiente" | "en_proceso" | "completado" | "entregado";
  estimated_cost: number | null;
  final_cost: number | null;
  estimated_delivery: string | null;
  delivered_at: string | null;
  created_at: string;
  clients: {
    name: string;
    phone: string | null;
  };
}

export default function SofaList() {
  const [sofas, setSofas] = useState<Sofa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSofas();
  }, []);

  const fetchSofas = async () => {
    try {
      const { data, error } = await supabase
        .from("sofas")
        .select(
          `
          *,
          clients (name, phone)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSofas(data || []);
    } catch (error) {
      console.error("Error fetching sofas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pendiente":
        return "secondary";
      case "en_proceso":
        return "default";
      case "completado":
        return "outline";
      case "entregado":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendiente":
        return "Pendiente";
      case "en_proceso":
        return "En Proceso";
      case "completado":
        return "Completado";
      case "entregado":
        return "Entregado";
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "-";
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Cargando trabajos...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trabajos de Tapicería</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Trabajo
        </Button>
      </div>

      {showForm && (
        <SofaForm
          onSuccess={() => {
            setShowForm(false);
            fetchSofas();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de Trabajos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Costo Estimado</TableHead>
                <TableHead>Entrega Estimada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sofas.map((sofa) => (
                <TableRow key={sofa.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sofa.clients.name}</div>
                      <div className="text-sm text-gray-500">
                        {sofa.clients.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">{sofa.description}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(sofa.status)}>
                      {getStatusText(sofa.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(sofa.estimated_cost)}
                  </TableCell>
                  <TableCell>
                    {sofa.estimated_delivery
                      ? new Date(sofa.estimated_delivery).toLocaleDateString()
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {sofas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay trabajos registrados
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
