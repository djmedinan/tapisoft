import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Sofa, MessageSquare, DollarSign, Calendar } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Clientes",
      value: "24",
      icon: Users,
      change: "+2",
      changeType: "positive",
    },
    {
      title: "Trabajos Activos",
      value: "8",
      icon: Sofa,
      change: "+1",
      changeType: "positive",
    },
    {
      title: "Interacciones",
      value: "56",
      icon: MessageSquare,
      change: "Esta semana",
      changeType: "neutral",
    },
    {
      title: "Ingresos",
      value: "$12,450",
      icon: DollarSign,
      change: "+$1,200",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Resumen general de tu taller de tapicería
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent clients card */}
        <Card>
          <CardHeader>
            <CardTitle>Clientes Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cliente {i}</p>
                    <p className="text-sm text-gray-600">
                      cliente{i}@email.com
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">Hoy</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Próximas Entregas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sofá {i}</p>
                    <p className="text-sm text-gray-600">Cliente {i}</p>
                  </div>
                  <div className="flex items-center text-sm text-orange-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Mañana
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
