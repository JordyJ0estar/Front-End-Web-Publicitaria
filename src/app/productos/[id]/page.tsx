import { getProductoById } from '@/lib/productos-api'; 
import { RichTextContent } from '@/app/interfaces/productoInterface'; 

interface ProductPageProps {
  params: {
    id: string; 
  };
}

function renderRichText(content: RichTextContent[] | undefined) {
  if (!content) return null;

  return content.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-2">
            {block.children.map((child, childIndex) => (
              <span key={childIndex} className={child.type === 'text' ? '' : 'font-semibold'}>
                {child.text}
              </span>
            ))}
          </p>
        );
      default:
        return (
          <p key={index} className="mb-2">
            {block.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
    }
  });
}

// Este es un Server Component, por lo que debe ser `async`
export default async function ProductoInfoPage({ params }: ProductPageProps) {
  // Desestructura el ID de los parámetros, asegurándote de usar 'await'
  const { id } = await params;

  // Llama a la función para obtener el producto por su ID
  const producto = await getProductoById(id);

  // Si el producto no se encuentra, muestra un mensaje de error o redirige
  if (!producto) {
    return (
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error: Producto no encontrado</h1>
        <p className="text-lg">Lo sentimos, no pudimos encontrar un producto con el ID: <span className="font-semibold">{id}</span>.</p>
        <p className="mt-4">Por favor, verifica la URL o vuelve a la lista de productos.</p>
        <a href="/productos" className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver a Productos
        </a>
      </main>
    );
  }

  // Si el producto se encontró, muestra sus detalles
  return (
    <main className="container w-auto mt-12 mx-auto p-4 bg-gray-700 text-white-500 shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna de la imagen */}
        <div className="md:col-span-1 flex justify-center items-center">
          {producto.imagen && producto.imagen.length > 0 && (
            <img
              src={`${"http://localhost:4000"}${producto.imagen[0].url}`}
              alt={producto.nombre}
              className="max-w-full h-auto rounded-lg shadow-md"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          )}
          {!producto.imagen || producto.imagen.length === 0 && (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
              No hay imagen disponible
            </div>
          )}
        </div>

        {/* Columna de detalles del producto */}
        <div className="md:col-span-1">
          <h1 className="text-4xl font-extrabold  mb-4">{producto.nombre}</h1>
          <p className="text-2xl font-semibold  mb-6">${producto.precio_unitario.toLocaleString('es-CL')}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Descripción:</h2>
            <div className=" leading-relaxed">
              {renderRichText(producto.descripcion)}
            </div>
          </div>

          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${producto.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {producto.disponible ? 'Disponible' : 'No disponible'}
            </span>
          </div>

          {producto.categoria && (
            <div className="mb-4 ">
              <span className="font-semibold">Categoría:</span> {producto.categoria.name}
            </div>
          )}

          <div className="text-2xl font-medium mt-6">
            <p>Contactar a rjguzmanromero@gmail.com</p>
            <p>WhatsApps +569423376613 </p>
          </div>
        </div>
      </div>
    </main>
  );
}
