export interface IProducto {
  id: number;
  documentId: string;
  nombre: string;
  disponible: boolean;
  descripcion: RichTextContent[];
  precio_unitario: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  imagen: IImagen[];
  categoria: ICategoria;
}

export interface IImagen {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface ICategoria {
  id: number;
  documentId: string;
  name: string;
  slug: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface RichTextContent {
  type: string;
  children: { text: string; type: string }[];
}