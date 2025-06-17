"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { IServicio } from "../interfaces/serviceInterface"
import { CardBase } from "@/components/cards/card-base" 
import { useBoundStore } from "store/boundedStore"

export default function ServiceGrid({ servicios = [] }: { servicios?: IServicio[] }) {
  const [loading, setLoading] = useState(true)
  const addServicio = useBoundStore((state) => state.addServicio)
  const servicioInfo = useBoundStore((state) => state.servicio)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const handleClickCard = (servicio:IServicio) => {
  
      console.log('prueba',servicio)
      addServicio(servicio)
      console.log(servicioInfo)
      window.location.href = `/servicios/${servicio.documentId}`
    }
  const extractTextFromBlocks = (blocks: any[]) => {
    if (!blocks || !blocks.length) return ""
    return blocks.map((block) => block.children?.map((child: any) => child.text || "").join("") || "").join(" ")
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
      {loading
        ? Array(6).fill(0).map((_, index) => <ServiceSkeleton key={index} />)
        : servicios.map((servicio) => (
            <CardBase
              key={servicio.id}
              title={servicio.nombre}
              description={extractTextFromBlocks(servicio.descripcion)}
              price={servicio.precio}
              imageUrl={`http://localhost:4000${servicio.imagen?.[0]?.formats?.small?.url ?? ""}`}
              imageAlt={servicio.imagen?.[0]?.alternativeText ?? servicio.nombre}
              category={servicio.categoria?.name}
              available={servicio.disponible}
              onClick={() => handleClickCard(servicio)}
              duration={
                servicio.tiempoEstimado
                  ? `${servicio.tiempoEstimado} hora${servicio.tiempoEstimado > 1 ? "s" : ""}`
                  : "No especificado"
              }
              button={
                <button
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                  disabled={!servicio.disponible}
                  onClick={() => handleClickCard(servicio)}
                >
                  Reservar
                </button>
              }
            />
          ))}
    </div>
  )
}

// Esqueleto
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
