"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { IProducto } from "../interfaces/productoInterface"
import { useBoundStore } from "store/boundedStore" 

// Importa el store que has creado para manejar el estado global
export default function ProductGrid({ productos = [] }: { productos?: IProducto[] }) {
  console.log(productos)
  const addProducto = useBoundStore ((state)=>state.addProducto)
  const productoInfo = useBoundStore ((state)=>state.producto)
  // Función para extraer texto de los bloques de descripción
  // Esta función toma un array de bloques y devuelve un string con el texto concatenado
  const extractTextFromBlocks = (blocks: any[]) => {
    if (!blocks || !blocks.length) return ""
    return blocks
      .map((block) => block.children?.map((child: any) => child.text || "").join("") || "")
      .join(" ")
  }
// Si no hay productos, muestra un esqueleto de carga
  if (!productos) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => <ProductSkeleton key={index} />)}
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
    // Muestra los productos en una cuadrícula
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productos.map((producto) => {
        const img = producto.imagen[0].formats.small?.url
        const categoria = producto.categoria.name

        return (
          // Cada producto se muestra como una tarjeta
          // Al hacer clic en la tarjeta, se llama a handleClickCard con el producto
          <Card key={producto.id} className="overflow-hidden flex flex-col h-150" onClick={() => handleClickCard(producto)}>
            <div className="aspect-square relative overflow-hidden">
              {img ? (
                <Image
                  src={`http://localhost:4000${img}`}
                  alt={img || producto.nombre}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Sin imagen</span>
                </div>
              )}
              {categoria && (
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                    {categoria}
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg line-clamp-2">
                  {producto.nombre}
                </h3>
                <Badge variant={producto.disponible ? "default" : "destructive"}>
                  {producto.disponible ? "Disponible" : "Agotado"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {extractTextFromBlocks(producto.descripcion)}
              </p>
            </CardContent>

            <CardFooter className="pt-2 border-t">
              <div className="w-full flex justify-between items-center">
                <span className="font-bold text-lg">
                  ${producto.precio_unitario.toLocaleString()}
                </span>
                <button
                  className="bg-primary hover:bg-primary/90   text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                  disabled={!producto.disponible}
                >
                  Consultar
                </button>
              </div>
            </CardFooter>
           </Card>
        )
      })}
    </div>
  )
}

// Componente ProductSkeleton que muestra un esqueleto de carga para los productos
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
