"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Check, X } from "lucide-react"
import { IServicio } from "../interfaces/serviceInterface"



// Componente para mostrar el grid de servicios
export default function ServiceGrid({ servicios = [] }: { servicios?: IServicio[] }) {
  const [servicio, setServicios] = useState<IServicio[]>([])
  const [loading, setLoading] = useState(true)

  // Simulación de carga de datos desde Strapi
  useEffect(() => {
    // En un caso real, aquí harías un fetch a tu API de Strapi
    // fetch('/api/servicios?populate=imagen,categoria')

    // Simulamos datos para la demostración
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Función para extraer texto plano de los bloques de descripción
  const extractTextFromBlocks = (blocks: any[]) => {
    if (!blocks || !blocks.length) return ""
    return blocks.map((block) => block.children?.map((child: any) => child.text || "").join("") || "").join(" ")
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading
        ? Array(6)
            .fill(0)
            .map((_, index) => <ServiceSkeleton key={index} />)
        : servicios.map((servicio) => (
            <Card key={servicio.id} className="overflow-hidden flex flex-col h-full border-0 shadow-lg rounded-xl">
              <div className="aspect-video relative overflow-hidden rounded-t-xl">
                {servicio.imagen && servicio.imagen[0] ? (
                  <Image
                    src={`http://localhost:4000${servicio.imagen[0].formats.small?.url}`}
                    alt={servicio.imagen[0].alternativeText || servicio.nombre}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
                {servicio.categoria && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                      {servicio.categoria.name}
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={servicio.disponible ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {servicio.disponible ? (
                      <>
                        <Check size={14} />
                        <span>Disponible</span>
                      </>
                    ) : (
                      <>
                        <X size={14} />
                        <span>No disponible</span>
                      </>
                    )}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <h3 className="font-semibold text-xl line-clamp-2">{servicio.nombre}</h3>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {extractTextFromBlocks(servicio.descripcion)}
                </p>
              </CardContent>

              <CardFooter className="pt-4 border-t flex flex-col items-start gap-4">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Duración estimada: 1-2 horas</span>
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Precio</span>
                    <span className="font-bold text-xl">${servicio.precio.toLocaleString()}</span>
                  </div>
                  <button
                    className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-medium disabled:opacity-50 transition-colors"
                    disabled={!servicio.disponible}
                  >
                    Reservar
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
    </div>
  )
}

// Componente de esqueleto para carga
function ServiceSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6">
        <Skeleton className="h-7 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <Skeleton className="h-5 w-40 mb-4" />
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-7 w-24" />
          </div>
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}
