"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { IProducto } from "../interfaces/productoInterface"
import { useBoundStore } from "store/boundedStore"
import { CardBase } from "@/components/cards/card-base"

export default function ProductGrid({ productos = [] }: { productos?: IProducto[] }) {
  const addProducto = useBoundStore((state) => state.addProducto)
  const productoInfo = useBoundStore((state) => state.producto)

  const extractTextFromBlocks = (blocks: any[]) => {
    if (!blocks || !blocks.length) return ""
    return blocks.map((block) => block.children?.map((child: any) => child.text || "").join("") || "").join(" ")
  }

  if (!productos) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, index) => <ProductSkeleton key={index} />)}
      </div>
    )
  }

  const handleClickCard = (producto:IProducto) => {

    console.log('prueba',producto)
    addProducto(producto)
    console.log(productoInfo)
    window.location.href = `/productos/${producto.id}`
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {productos.map((producto) => {
        const img = producto.imagen?.[0]?.formats?.small?.url
        const categoria = producto.categoria?.name

        return (
          <CardBase
            key={producto.id}
            title={producto.nombre}
            description={extractTextFromBlocks(producto.descripcion)}
            price={producto.precio_unitario}
            imageUrl={`http://localhost:4000${img ?? ""}`}
            imageAlt={producto.imagen?.[0]?.alternativeText ?? producto.nombre}
            category={categoria}
            available={producto.disponible}
            onClick={() => handleClickCard(producto)}
            button={
              <button
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                disabled={!producto.disponible}
                onClick={() => handleClickCard(producto)}
              >
                Consultar
              </button>
            }
          />
        )
      })}
    </div>
  )
}

// Esqueleto para carga
function ProductSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col h-full">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex justify-between items-center pt-2 border-t">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  )
}
