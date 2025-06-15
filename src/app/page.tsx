'use client'

import { useEffect, useState } from "react"
import ProductGrid from "./productos/product-grid"
import type { IProducto } from "./interfaces/productoInterface"
import "./globals.css"
import NavBar from "./navBar/nav-bar"

const Home = () => {
 
  
  // Retorna el componente principal que muestra los productos
  // Este componente utiliza el componente ProductGrid para mostrar los productos en una cuadrícula
  return (
    <main className="">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Bienvenido a la Comercializadora Rodolfo</h1>
        <p className="text-lg">Explora nuestros productos y servicios.</p>
      </div>
    </main>
  )
}

export default Home