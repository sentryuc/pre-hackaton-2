"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  TrendingUp,
  AlertTriangle,
  FileText,
  Settings,
  Home,
  Scale,
  Brain,
  Bell,
  MapPin,
  Clock,
  Target,
  Activity,
  Menu,
  X,
  Send,
  MessageCircle,
  Minimize2,
  Maximize2,
  User,
  Bot,
  BarChart3,
  TrendingDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Datos ficticios para las visualizaciones
const casesByMonth = [
  { mes: "Ene", ingresados: 245, resueltos: 189 },
  { mes: "Feb", ingresados: 289, resueltos: 234 },
  { mes: "Mar", ingresados: 312, resueltos: 267 },
  { mes: "Abr", ingresados: 298, resueltos: 289 },
  { mes: "May", ingresados: 334, resueltos: 298 },
  { mes: "Jun", ingresados: 367, resueltos: 312 },
]

const tiposDelito = [
  { tipo: "Hurto Simple", casos: 1234, porcentaje: 35.2, color: "#3b82f6" },
  { tipo: "Estafa Digital", casos: 892, porcentaje: 25.4, color: "#8b5cf6" },
  { tipo: "Lesiones Personales", casos: 567, porcentaje: 16.2, color: "#06b6d4" },
  { tipo: "Tráfico de Drogas", casos: 445, porcentaje: 12.7, color: "#10b981" },
  { tipo: "Otros Delitos", casos: 234, porcentaje: 10.5, color: "#f59e0b" },
]

const datosRegionales = [
  { region: "Bogotá D.C.", congestion: 78, casos: 2341, tendencia: "up" },
  { region: "Antioquia", congestion: 65, casos: 1987, tendencia: "down" },
  { region: "Valle del Cauca", congestion: 82, casos: 2156, tendencia: "up" },
  { region: "Cundinamarca", congestion: 71, casos: 1654, tendencia: "stable" },
  { region: "Atlántico", congestion: 59, casos: 1432, tendencia: "down" },
]

const eficienciaJueces = [
  { mes: "Ene", promedio: 8.4 },
  { mes: "Feb", promedio: 7.9 },
  { mes: "Mar", promedio: 8.1 },
  { mes: "Abr", promedio: 7.6 },
  { mes: "May", promedio: 7.8 },
  { mes: "Jun", promedio: 7.2 },
]

const menuItems = [
  { title: "Inicio", icon: Home, url: "#", isActive: true },
  { title: "Casos Judiciales", icon: Scale, url: "#", badge: null },
  { title: "Análisis Predictivo", icon: Brain, url: "#", badge: null },
  { title: "Alertas", icon: Bell, url: "#", badge: "3" },
  { title: "Reportes", icon: FileText, url: "#", badge: null },
  { title: "Configuración", icon: Settings, url: "#", badge: null },
]

const mensajesIniciales = [
  {
    id: 1,
    tipo: "bot",
    mensaje: "¡Hola! Soy el asistente de JusticeAI. ¿En qué puedo ayudarte hoy?",
    timestamp: "10:30",
  },
  {
    id: 2,
    tipo: "user",
    mensaje: "¿Cuál es la tendencia de casos de hurto en Bogotá?",
    timestamp: "10:31",
  },
  {
    id: 3,
    tipo: "bot",
    mensaje:
      "Según el análisis de los últimos 6 meses, los casos de hurto simple en Bogotá han aumentado un 12.3%. La mayor concentración se presenta en las localidades de Kennedy y Suba. ¿Te gustaría ver un análisis más detallado?",
    timestamp: "10:31",
  },
]

export default function JusticeAIDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMinimized, setChatMinimized] = useState(false)
  const [mensajeChat, setMensajeChat] = useState("")
  const [mensajes, setMensajes] = useState(mensajesIniciales)

  const enviarMensaje = () => {
    if (mensajeChat.trim()) {
      const nuevoMensaje = {
        id: mensajes.length + 1,
        tipo: "user" as const,
        mensaje: mensajeChat,
        timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
      }
      setMensajes([...mensajes, nuevoMensaje])
      setMensajeChat("")

      // Simular respuesta del bot
      setTimeout(() => {
        const respuestaBot = {
          id: mensajes.length + 2,
          tipo: "bot" as const,
          mensaje: "Estoy procesando tu consulta con los modelos de IA. Un momento por favor...",
          timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
        }
        setMensajes((prev) => [...prev, respuestaBot])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      enviarMensaje()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white border-r border-slate-200 transition-all duration-300 ease-in-out shadow-sm flex flex-col`}
      >
        {/* Header del Sidebar */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">JusticeAI</h2>
                  <p className="text-sm text-slate-600">Análisis Predictivo</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-slate-100"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.title}>
                <a
                  href={item.url}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  title={sidebarCollapsed ? item.title : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Buscador inteligente */}
            <div className="flex-1 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Buscar casos, expedientes, análisis predictivos, jurisprudencia..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-300 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>

            {/* Botón de análisis predictivo */}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all hover:shadow-md">
              <Brain className="h-4 w-4 mr-2" />
              Nuevo Análisis IA
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Título y descripción */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard de Análisis Judicial</h1>
            <p className="text-slate-600">
              Visualización inteligente y análisis predictivo del sistema judicial colombiano mediante IA
            </p>
          </div>

          {/* Tarjetas de resumen */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Casos Activos</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">2,847</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs mes anterior
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Duración Promedio</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">7.2 meses</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -1.2 meses vs objetivo
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Tasa de Resolución</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">78.4%</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2% vs mes anterior
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Alertas Críticas</CardTitle>
                <Bell className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">23</div>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Requieren atención inmediata
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficas principales */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Evolución de casos */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Evolución Mensual de Casos
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Casos ingresados vs resueltos - Últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    ingresados: {
                      label: "Casos Ingresados",
                      color: "#3b82f6",
                    },
                    resueltos: {
                      label: "Casos Resueltos",
                      color: "#10b981",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={casesByMonth}>
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="ingresados" fill="var(--color-ingresados)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="resueltos" fill="var(--color-resueltos)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Distribución por tipo de delito */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Distribución por Tipo de Delito
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Casos activos clasificados por categoría jurídica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tiposDelito.map((delito) => (
                    <div key={delito.tipo} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: delito.color }} />
                        <span className="text-sm font-medium text-slate-700">{delito.tipo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">{delito.casos.toLocaleString()}</span>
                        <Badge variant="outline" className="text-xs">
                          {delito.porcentaje}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Análisis regional y eficiencia */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Análisis regional */}
            <Card className="lg:col-span-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Análisis Regional de Congestión Judicial
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Nivel de congestión y tendencias por departamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {datosRegionales.map((region) => (
                    <div key={region.region} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-900">{region.region}</span>
                          <Badge variant="outline" className="text-xs">
                            {region.casos.toLocaleString()} casos
                          </Badge>
                          {region.tendencia === "up" && <TrendingUp className="h-3 w-3 text-red-500" />}
                          {region.tendencia === "down" && <TrendingDown className="h-3 w-3 text-green-500" />}
                          {region.tendencia === "stable" && <div className="h-3 w-3 rounded-full bg-yellow-500" />}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            region.congestion > 75
                              ? "text-red-600"
                              : region.congestion > 60
                                ? "text-orange-600"
                                : "text-green-600"
                          }`}
                        >
                          {region.congestion}%
                        </span>
                      </div>
                      <Progress
                        value={region.congestion}
                        className={`h-2 ${
                          region.congestion > 75
                            ? "[&>div]:bg-red-500"
                            : region.congestion > 60
                              ? "[&>div]:bg-orange-500"
                              : "[&>div]:bg-green-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eficiencia temporal */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Eficiencia Temporal
                </CardTitle>
                <CardDescription className="text-slate-600">Duración promedio mensual</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    promedio: {
                      label: "Duración Promedio (meses)",
                      color: "#10b981",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={eficienciaJueces}>
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="promedio"
                        stroke="var(--color-promedio)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-promedio)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Alertas y predicciones de IA */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-orange-200 bg-orange-50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Predicción de Congestión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700 mb-3">
                  El modelo de IA predice un aumento del 18% en la congestión judicial para Q3 2024 en Bogotá D.C.,
                  especialmente en casos de hurto simple y estafa digital.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent transition-colors"
                >
                  Ver Análisis Completo
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Análisis NLP Jurisprudencial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 mb-3">
                  Procesamiento de 2,847 sentencias identificó patrones en casos de estafa digital con 94% de precisión.
                  Detectados 12 precedentes relevantes.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent transition-colors"
                >
                  Explorar Patrones
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Optimización Sugerida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 mb-3">
                  Reasignación inteligente de 47 casos de hurto simple podría reducir tiempo promedio en 3.2 días y
                  mejorar eficiencia del 12%.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent transition-colors"
                >
                  Aplicar Sugerencia
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Chat Widget Flotante */}
      {chatOpen && (
        <div
          className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-slate-200 transition-all duration-300 ${
            chatMinimized ? "w-80 h-16" : "w-96 h-[500px]"
          }`}
        >
          {/* Header del Chat */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-700 text-white text-xs">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">Asistente JusticeAI</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  En línea
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatMinimized(!chatMinimized)}
                className="text-white hover:bg-blue-700 h-8 w-8 p-0"
              >
                {chatMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-blue-700 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!chatMinimized && (
            <>
              {/* Área de mensajes */}
              <div className="h-[380px] p-4 overflow-y-auto">
                <div className="space-y-4">
                  {mensajes.map((mensaje) => (
                    <div
                      key={mensaje.id}
                      className={`flex gap-3 ${mensaje.tipo === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {mensaje.tipo === "bot" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          mensaje.tipo === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-900 border border-slate-200"
                        }`}
                      >
                        <p>{mensaje.mensaje}</p>
                        <p className={`text-xs mt-1 ${mensaje.tipo === "user" ? "text-blue-100" : "text-slate-500"}`}>
                          {mensaje.timestamp}
                        </p>
                      </div>
                      {mensaje.tipo === "user" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Input de mensaje */}
              <div className="p-4 border-t border-slate-200">
                <div className="flex gap-2">
                  <Input
                    placeholder="Escribe tu consulta legal..."
                    value={mensajeChat}
                    onChange={(e) => setMensajeChat(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 text-sm"
                  />
                  <Button onClick={enviarMensaje} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-3">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Botón flotante para abrir chat */}
      {!chatOpen && (
        <Button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
