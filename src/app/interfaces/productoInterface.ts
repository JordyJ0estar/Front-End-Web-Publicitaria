interface ImageFormat {
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

interface Image {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large?: ImageFormat
    small?: ImageFormat
    medium?: ImageFormat
    thumbnail?: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface Categoria {
  id: number
  documentId: string
  name: string
  slug: string | null
  description: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface DescripcionBlock {
  type: string
  children: Array<{
    text: string
    type?: string
  }>
}

export interface IProducto {
  id: number
  documentId: string
  nombre: string
  disponible: boolean
  descripcion: DescripcionBlock[]
  precio_unitario: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  imagen: Image[]
  categoria: Categoria
}

// Si estás usando Strapi v4 con la estructura de data/attributes:
export interface StrapiProductoResponse {
  id: number
  attributes: Omit<IProducto, 'id'> & {
    imagen: {
      data: Image[]
    }
    categoria: {
      data: Categoria
    }
  }
}