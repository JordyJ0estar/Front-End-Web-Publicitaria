export interface IServicio {
  id: number
  documentId: string
  nombre: string
  disponible: boolean
  descripcion: BloqueDescripcion[]
  precio: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  imagen: ImagenServicio[]
  categoria: CategoriaServicio
  tiempoEstimado?: number
}

export interface BloqueDescripcion {
  type: string
  children: {
    text: string
    type: string
  }[]
}

export interface ImagenServicio {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large?: FormatoImagen
    medium?: FormatoImagen
    small?: FormatoImagen
    thumbnail?: FormatoImagen
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface FormatoImagen {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface CategoriaServicio {
  id: number
  documentId: string
  name: string
  slug: string | null
  description: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}


