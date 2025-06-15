'use client'

import { getServicios } from "@/lib/servicios-api"
import { useEffect, useState } from "react"
import ServiceGrid from "./service-grid"
import { IServicio } from "../interfaces/serviceInterface"

export default function ServiciosPage() {
  const [servicio, setServicios] = useState<IServicio[]>([])
 useEffect(() => {
     const fetchProductos = async () => {
       const serviciosData = await getServicios()
       setServicios(serviciosData)
     }
     fetchProductos()
   }, [])
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nuestros Servicios</h1>
      <ServiceGrid servicios={servicio}/>
    </main>
  )
}
