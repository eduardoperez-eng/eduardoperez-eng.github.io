# Portafolio de Eduardo de Jesús Pérez López

Portafolio personal de un desarrollador de software en formación en Riwi, desde Barranquilla, Colombia. El contenido conecta backend, auditoría contable y procesos de negocio, con una identidad visual oscura y acentos cian.

## Contenido

- Presentación y perfil centrados en APIs, datos consistentes y reglas de negocio.
- Proyecto destacado: [Alexa López](https://alexalopez.com.co/), con una captura real y enlace al sitio publicado.
- Experiencia aplicada: control de consumos e inventarios en C. I. La Samaria mediante Excel y macros, presentado como herramienta interna con una portada ilustrativa y datos de ejemplo.
- Carrusel de Python, JavaScript, TypeScript, Node.js, React, PostgreSQL, MySQL, NestJS, TypeORM, Prisma y Zod.
- Contacto a través del perfil de GitHub y archivo visual personal.

## Interacciones y accesibilidad

El carrusel permite avanzar y retroceder, seleccionar cualquiera de las once tecnologías, navegar con las flechas del teclado y usar Inicio/Fin. Tiene reproducción automática y un botón para pausarla; se detiene al interactuar, al salir de la pantalla o al ocultar la pestaña. Con la preferencia de movimiento reducido, inicia pausado.

El menú móvil incluye cierre con Escape y navegación por teclado. El contenido permanece visible si JavaScript no está disponible. Las imágenes y los once iconos SVG de tecnologías se sirven desde el proyecto. Los iconos proceden de [Devicon](https://github.com/devicons/devicon) y de los sitios oficiales de [Node.js](https://nodejs.org/en/about/branding) y [Zod](https://zod.dev/); sus fuentes y licencias se conservan en public/img/technologies/.

## Estructura

- index.html: página principal y contenido.
- src/css/portfolio.css: sistema visual, carrusel, archivo y estilos responsive.
- src/js/main.js: navegación, progreso, apariciones y carrusel.
- src/view/mascotas.html: archivo personal.
- public/img/: fotografías, captura de Alexa López y portada ilustrativa de C. I. La Samaria.
- public/img/technologies/: iconos SVG, fuentes y licencia de Devicon.

## Vista previa local

No requiere compilación ni dependencias. Desde esta carpeta:

    python -m http.server 4174 --bind 127.0.0.1

Abre http://127.0.0.1:4174/. También puedes abrir index.html directamente.

## Publicación

El portafolio se publica con GitHub Pages desde la rama main de eduardoperez-eng/eduardoperez-eng.github.io.

Dirección pública: https://eduardoperez-eng.github.io/
