import { IProducto } from "@/app/interfaces/productoInterface"
import { CardBase } from "./card-base" 
import { extractPlainTextFromBlocks } from "../../app/utils/TextExtractor"

export const ProductCard = ({ producto }: { producto: IProducto }) => {
  return (
    <CardBase
      title={producto.nombre}
      description={extractPlainTextFromBlocks(producto.descripcion)}
      price={producto.precio_unitario}
      imageUrl={`http://localhost:4000${producto.imagen?.[0]?.formats?.small?.url ?? ""}`}
      imageAlt={producto.imagen?.[0]?.alternativeText ?? producto.nombre}
      category={producto.categoria?.name}
      available={producto.disponible}
      button={
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
          disabled={!producto.disponible}
        >
          solicitar
        </button>
      }
    />
  )
}
