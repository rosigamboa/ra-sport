R&A SPORT — PROYECTO ACADÉMICO

CONTENIDO
- index.html: estructura de la aplicación.
- style.css: diseño adaptable a celulares y computadoras.
- app.js: catálogo, búsqueda, filtros y carrito.
- manifest.webmanifest: configuración de instalación PWA.
- service-worker.js: caché para uso sin conexión después de la primera visita.
- icons/: iconos de la aplicación.

PROBAR EN LA COMPUTADORA
No abras index.html directamente si querés probar la instalación PWA. Publicá el proyecto en GitHub Pages o usá un servidor local.

PUBLICAR EN GITHUB PAGES
1. Creá un repositorio público llamado ra-sport.
2. Subí todos los archivos y carpetas manteniendo esta estructura.
3. En GitHub: Settings > Pages > Deploy from a branch.
4. Elegí la rama main y la carpeta / (root), guardá.
5. Esperá la publicación. La URL será https://TU-USUARIO.github.io/ra-sport/.
6. Abrí esa URL desde Chrome en Android. Menú ⋮ > Instalar aplicación o Agregar a pantalla principal.

PERSONALIZACIÓN IMPORTANTE
Los productos y precios de ejemplo están en el arreglo `products` al comienzo de app.js. Reemplazalos por el catálogo real. El botón de pedido copia el resumen para pegarlo en WhatsApp; no se configuró un número porque todavía no fue proporcionado.

NOTA
Las imágenes de producto se representan con ilustraciones/emoji de muestra. Para una versión comercial, reemplazalas por fotografías propias y verificá precios, talles, stock y condiciones de venta.
