import Image from "next/image"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

interface CardBaseProps {
  title: string
  description: string
  price?: number
  imageUrl?: string
  imageAlt?: string
  category?: string
  available?: boolean
  duration?: string
  button?: React.ReactNode
  onClick?: () => void
}

export const CardBase = ({
  title,
  description,
  price,
  imageUrl,
  imageAlt = "Imagen",
  category,
  available,
  duration,
  button,
  onClick,
}: CardBaseProps) => {
  return (
    <Card onClick={onClick} className="overflow-hidden flex flex-col h-full shadow-lg">
      {/* Imagen con categoría y estado */}
      <div className="relative aspect-square w-full overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}

        {/* Badge de categoría */}
        {category && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        )}

        {/* Badge de estado */}
        {available !== undefined && (
          <div className="absolute top-2 right-2">
            <Badge
              variant={available ? "default" : "destructive"}
              className="flex items-center gap-1"
            >
              {available ? (
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
        )}
      </div>

      {/* Header */}
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
      </CardHeader>

      {/* Descripción */}
      <CardContent>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col items-start gap-4">
        {duration && (
          <div className="text-sm text-muted-foreground">
            Duración estimada: {duration}
          </div>
        )}
        <div className="w-full flex justify-between items-center">
          {price !== undefined && (
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Precio</span>
              <span className="font-bold text-xl">${price.toLocaleString()}</span>
            </div>
          )}
          {button && button}
        </div>
      </CardFooter>
    </Card>
  )
}
