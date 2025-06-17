'use client'

import ProductGrid from "@/app/productos/product-grid" // ajusta el path según tu estructura
import { IProducto } from "../interfaces/productoInterface"
import { useEffect, useState } from "react"
import { getProductos } from "@/lib/productos-api" // ajusta el path según tu estructura


export default function ProductosPage() {
 const [productos, setProductos] = useState<IProducto[]>([])
  useEffect(() => {
    const fetchProductos = async () => {
      const productosData = await getProductos()
      setProductos(productosData)
    }
    fetchProductos()
  }, [])
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nuestros Productos</h1>
      <ProductGrid productos={productos}/>
    </main>
  )
}
