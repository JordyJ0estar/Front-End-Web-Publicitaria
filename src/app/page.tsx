'use client'

import { useEffect, useState } from "react";
import "./globals.css"; // Tus estilos globales

const Home = () => {
  // Ejemplos de imágenes para el carrusel
  const carouselImages = [
    { src: 'carrusel/impresion.png', caption: 'Impresiones de Alta Calidad' },
    { src: 'carrusel/gigantografias.png', caption: 'Gigantografias' },
    { src: 'carrusel/guillotina.png', caption: 'Cortes Prolijos' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para avanzar a la siguiente imagen
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para retroceder a la imagen anterior
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Efecto para auto-avanzar el carrusel
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000); // Cambia la imagen cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []); // El array vacío asegura que el efecto solo se ejecute una vez

  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar (si ya está en layout.tsx, puedes comentarla o quitarla de aquí) */}
      {/* <NavBar /> */}

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Sección de Bienvenida */}
        <section className="text-center mb-12 p-8 rounded-lg shadow-md">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Bienvenido a <span className="text-blue-600">Comercializadora Rodolfo</span>
          </h1>
          <p className="text-lg md:text-xl">
            Explora nuestra amplia gama de productos y servicios de alta calidad para tu hogar y oficina.
          </p>
          <p className="text-md text-gray-500 mt-2">
            ¡Encuentra todo lo que necesitas con los mejores precios del mercado!
          </p>
          <a
            href="/productos"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ver Productos
          </a>
        </section>

        {/* Sección del Carrusel Manual */}
        <section className="mb-12 relative w-full overflow-hidden rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Nuestras Ofertas Destacadas</h2>
          <div className="relative w-full h-96"> {/* Contenedor para el carrusel */}
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out
                            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <img
                  src={image.src}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0  bg-opacity-20 flex items-center justify-center p-4">
                  <p className="text-white text-4xl font-bold text-shadow-[-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black] text-center drop-shadow-md">
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}

            {/* Flechas de navegación */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
              aria-label="Imagen anterior"
            >
              &#10094;
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
              aria-label="Imagen siguiente"
            >
              &#10095; 
            </button>

            {/* Puntos de paginación */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-70'
                  } hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label={`Ir a imagen ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de "Sobre Nosotros" o "Servicios" (ejemplo) */}
        <section className=" p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl text-blue-600 font-bold mb-4">Comprometidos con la Calidad</h2>
          <p className=" leading-relaxed mb-4">
            Comercializadora Rodolfo es tu socio confiable para suministros de oficina y mucho más.
            Nos dedicamos a ofrecer productos de la más alta calidad con un servicio al cliente excepcional.
          </p>
        </section>

        {/* Puedes añadir más secciones aquí, como un listado de categorías, productos destacados, etc. */}

      </main>

      {/* Pie de página (ejemplo simple) */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Comercializadora Rodolfo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;