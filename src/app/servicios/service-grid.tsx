"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Check, X } from "lucide-react"

// Tipo para el servicio basado en el esquema de Strapi
interface Servicio {
  id: number
  attributes: {
    nombre: string
    disponible: boolean
    descripcion: {
      type: string
      children: { text: string }[]
    }[]
    precio: number
    imagen: {
      data: {
        id: number
        attributes: {
          url: string
          width: number
          height: number
          alternativeText?: string
        }
      }[]
    }
    categoria?: {
      data: {
        id: number
        attributes: {
          nombre: string
        }
      }
    }
  }
}

// Componente para mostrar el grid de servicios
export default function ServiceGrid() {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(true)

  // Simulación de carga de datos desde Strapi
  useEffect(() => {
    // En un caso real, aquí harías un fetch a tu API de Strapi
    // fetch('/api/servicios?populate=imagen,categoria')

    // Simulamos datos para la demostración
    setTimeout(() => {
      setServicios(mockServicios)
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
                {servicio.attributes.imagen.data && servicio.attributes.imagen.data[0] ? (
                  <Image
                    src={servicio.attributes.imagen.data[0].attributes.url || "/placeholder.svg"}
                    alt={servicio.attributes.imagen.data[0].attributes.alternativeText || servicio.attributes.nombre}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
                {servicio.attributes.categoria?.data && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                      {servicio.attributes.categoria.data.attributes.nombre}
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={servicio.attributes.disponible ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {servicio.attributes.disponible ? (
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
                <h3 className="font-semibold text-xl line-clamp-2">{servicio.attributes.nombre}</h3>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {extractTextFromBlocks(servicio.attributes.descripcion)}
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
                    <span className="font-bold text-xl">${servicio.attributes.precio.toLocaleString()}</span>
                  </div>
                  <button
                    className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-medium disabled:opacity-50 transition-colors"
                    disabled={!servicio.attributes.disponible}
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

// Datos de ejemplo para la demostración
const mockServicios: Servicio[] = [
  {
    id: 1,
    attributes: {
      nombre: "Consultoría de marketing digital",
      disponible: true,
      descripcion: [
        {
          type: "paragraph",
          children: [
            {
              text: "Servicio completo de consultoría para optimizar tu presencia digital y aumentar la visibilidad de tu marca en línea.",
            },
          ],
        },
      ],
      precio: 150000,
      imagen: {
        data: [
          {
            id: 1,
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
              width: 600,
              height: 400,
              alternativeText: "Consultoría de marketing digital",
            },
          },
        ],
      },
      categoria: {
        data: {
          id: 1,
          attributes: {
            nombre: "Marketing",
          },
        },
      },
    },
  },
  {
    id: 2,
    attributes: {
      nombre: "Desarrollo de sitios web personalizados",
      disponible: true,
      descripcion: [
        {
          type: "paragraph",
          children: [
            {
              text: "Creación de sitios web a medida con diseño responsivo, optimizados para SEO y con integración de CMS para fácil gestión de contenido.",
            },
          ],
        },
      ],
      precio: 350000,
      imagen: {
        data: [
          {
            id: 2,
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
              width: 600,
              height: 400,
              alternativeText: "Desarrollo de sitios web",
            },
          },
        ],
      },
      categoria: {
        data: {
          id: 2,
          attributes: {
            nombre: "Desarrollo Web",
          },
        },
      },
    },
  },
  {
    id: 3,
    attributes: {
      nombre: "Gestión de redes sociales",
      disponible: false,
      descripcion: [
        {
          type: "paragraph",
          children: [
            {
              text: "Administración completa de tus perfiles en redes sociales, incluyendo creación de contenido, programación de publicaciones y análisis de resultados.",
            },
          ],
        },
      ],
      precio: 120000,
      imagen: {
        data: [
          {
            id: 3,
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
              width: 600,
              height: 400,
              alternativeText: "Gestión de redes sociales",
            },
          },
        ],
      },
      categoria: {
        data: {
          id: 1,
          attributes: {
            nombre: "Marketing",
          },
        },
      },
    },
  },
  {
    id: 4,
    attributes: {
      nombre: "Optimización SEO",
      disponible: true,
      descripcion: [
        {
          type: "paragraph",
          children: [
            {
              text: "Mejora el posicionamiento de tu sitio web en los motores de búsqueda con nuestro servicio completo de optimización SEO on-page y off-page.",
            },
          ],
        },
      ],
      precio: 180000,
      imagen: {
        data: [
          {
            id: 4,
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
              width: 600,
              height: 400,
              alternativeText: "Optimización SEO",
            },
          },
        ],
      },
      categoria: {
        data: {
          id: 3,
          attributes: {
            nombre: "SEO",
          },
        },
      },
    },
  },
  {
    id: 5,
    attributes: {
      nombre: "Diseño de identidad corporativa",
      disponible: true,
      descripcion: [
        {
          type: "paragraph",
          children: [
            {
              text: "Creación de identidad visual para tu empresa, incluyendo logotipo, paleta de colores, tipografía y manual de marca completo.",
            },
          ],
        },
      ],
      precio: 250000,
      imagen: {
        data: [
          {
            id: 5,
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
              width: 600,
              height: 400,
              alternativeText: "Diseño de identidad corporativa",
            },
          },
        ],
      },
      categoria: {
        data: {
          id: 4,
          attributes: {
            nombre: "Diseño",
          },
        },
      },
    },
  },
  {
    id: 6,
    attributes: {
      nombre: "Campañas de email marketing",
      disponible: true,
      descripcion: [
        {
          type: "paragraph",
          children: [
            {
              text: "Diseño, implementación y análisis de campañas de email marketing efectivas para aumentar la conversión y fidelización de clientes.",
            },
          ],
        },
      ],
      precio: 95000,
      imagen: {
        data: [
          {
            id: 6,
            attributes: {
              url: "/placeholder.svg?height=400&width=600",
              width: 600,
              height: 400,
              alternativeText: "Campañas de email marketing",
            },
          },
        ],
      },
      categoria: {
        data: {
          id: 1,
          attributes: {
            nombre: "Marketing",
          },
        },
      },
    },
  },
]
