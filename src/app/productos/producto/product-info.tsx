"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { IProducto } from "../../interfaces/productoInterface"

// Importa el store que has creado para manejar el estado global
export default function ProductInfo({producto = []} : {producto?: IProducto[]}){

}

