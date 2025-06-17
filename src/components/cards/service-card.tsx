import { CardBase } from "./card-base" 
import { IServicio } from "@/app/interfaces/serviceInterface"
import { extractPlainTextFromBlocks } from "../../app/utils/TextExtractor"

export const ServiceCard = ({ servicio }: { servicio: IServicio }) => {
  return (
    <CardBase
      title={servicio.nombre}
      description={extractPlainTextFromBlocks(servicio.descripcion)}
      price={servicio.precio}
      imageUrl={`http://localhost:4000${servicio.imagen?.[0]?.formats?.small?.url ?? ""}`}
      imageAlt={servicio.imagen?.[0]?.alternativeText ?? servicio.nombre}
      category={servicio.categoria?.name}
      available={servicio.disponible}
      duration={servicio.tiempoEstimado ? `${servicio.tiempoEstimado} minutos` : undefined}

      button={
        <button
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-medium disabled:opacity-50 transition-colors"
          disabled={!servicio.disponible}
        >
          solicitar
        </button>
      }
    />
  )
}
