'use client'

import { useEffect, useState } from "react"
import ProductGrid from "./productos/product-grid"
import type { IProducto } from "./productos/productoInterface"

const Home = () => {
  const [productos, setProductos] = useState<IProducto[]>([])
  
  const getProductos = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/productos?populate=*', {
        cache: "no-store",
        headers: {
          "Accept": "application/json",
        }
      })
      const response = await res.json()
      setProductos(response.data || [])
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProductos()
  }, []) 

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>
      <ProductGrid productos={productos} />
    </main>
  )
}

export default Home