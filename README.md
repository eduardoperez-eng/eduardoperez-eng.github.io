# Portafolio de Eduardo de Jesús Pérez López

Portafolio personal de un desarrollador de software en formación en Riwi, desde Barranquilla, Colombia. El contenido conecta backend, auditoría contable y procesos de negocio, con una identidad visual oscura y acentos cian.

## Contenido

- Presentación y perfil centrados en APIs, datos consistentes y reglas de negocio.
- Proyecto destacado: [Alexa López](https://alexalopez.com.co/), con una captura real y enlace al sitio publicado.
- Carrusel de Python, JavaScript, TypeScript, Node.js, React, PostgreSQL y NestJS.
- Contacto a través del perfil de GitHub y archivo visual personal.

## Interacciones y accesibilidad

El carrusel permite avanzar y retroceder, seleccionar cualquiera de las siete tecnologías, navegar con las flechas del teclado y usar Inicio/Fin. Tiene reproducción automática y un botón para pausarla; se detiene al interactuar, al salir de la pantalla o al ocultar la pestaña. Con la preferencia de movimiento reducido, inicia pausado.

El menú móvil incluye cierre con Escape y navegación por teclado. El contenido permanece visible si JavaScript no está disponible. Las imágenes principales se sirven desde el proyecto, y las marcas visuales de tecnologías se dibujan con SVG y CSS.

## Estructura

- index.html: página principal y contenido.
- src/css/portfolio.css: sistema visual, carrusel, archivo y estilos responsive.
- src/js/main.js: navegación, progreso, apariciones y carrusel.
- src/view/mascotas.html: archivo personal.
- public/img/: fotografías y captura del proyecto destacado.

## Vista previa local

No requiere compilación ni dependencias. Desde esta carpeta:

    python -m http.server 4174 --bind 127.0.0.1

Abre http://127.0.0.1:4174/. También puedes abrir index.html directamente.

## Publicación

El portafolio se publica con GitHub Pages desde la rama main de eduardoperez-eng/eduardoperez-eng.github.io.

Dirección pública: https://eduardoperez-eng.github.io/
