# Dos prompts listos para copiar y pegar

> 20 de septiembre de 2026. Uno para la herramienta que uses para diseñar/imprimir (Chat), otro para la que tenga acceso a tu cuenta de Google (Work). Cada uno trae los datos exactos — nombres, slugs, teléfono — para que no tengas que completar nada a mano ni la otra herramienta invente algo.

---

## 1 · Prompt para diseñar e imprimir los 6 papeles

Cópialo tal cual. Si la herramienta te pide subir el logo, usa el archivo `public/assets/logo-mark.webp` del repo (o pídeme que te lo mande).

```
Necesito diseñar e imprimir 6 tarjetas, tamaño tarjeta de presentación
(3.5 x 2 pulgadas / 89 x 51 mm), impresión simple a color, papel normal
(no necesita ser cartulina gruesa). Una por cada negocio de la lista.

DISEÑO — igual en las 6, solo cambian el nombre del negocio y el enlace:

- Fondo blanco o azul marino oscuro (#050A18), simple, sin fotos.
- Arriba: mi logo (adjunto / [logo-mark.webp]).
- Debajo del logo, en letra clara: "Lo que encontré revisando [NOMBRE DEL NEGOCIO]"
- Centro: un código QR grande (que ocupe buena parte de la tarjeta) que
  apunte a la URL de cada negocio (ver tabla abajo).
- Abajo, en letra pequeña:
  Automate IT · Gerardo Navas
  (407) 404-9495
  yourbizupgraded.com

NO incluir: precios, la palabra "IA" o "inteligencia artificial",
promociones, descuentos, ni el hallazgo específico del negocio (eso se
dice en persona, no se imprime).

LOS 6 NEGOCIOS Y SUS ENLACES (una tarjeta por fila):

1. JET Plumbing Inc.
   yourbizupgraded.com/r/jet-plumbing

2. El Plomero Latino Inc.
   yourbizupgraded.com/r/el-plomero-latino

3. Absolute Best Plumbing
   yourbizupgraded.com/r/absolute-best-plumbing

4. Baez & Son Air Condition & Heating
   yourbizupgraded.com/r/baez-and-son-ac

5. JPI Mechanical Services Inc.
   yourbizupgraded.com/r/jpi-mechanical-services

6. HOME AC INC
   yourbizupgraded.com/r/home-ac

Genera el código QR real para cada URL (no un QR de ejemplo). Dame las
6 tarjetas listas para imprimir, en un PDF de una sola página con las
6 organizadas para cortar, o como 6 archivos separados — lo que sea
más fácil de imprimir en casa o en una copistería.
```

**Nota para ti, Gerardo:** las URLs `/r/<slug>` son redirecciones cortas que ya funcionan en el sitio — abren la página personalizada de cada negocio y registran que alguien escaneó. No hace falta crear nada más, solo generar el QR apuntando a esa dirección exacta.

---

## 2 · Prompt para la ficha de Google Business Profile

Este es más largo porque trae todo el contenido ya escrito — nombre, categorías, zonas, descripción y servicios — para que la otra herramienta solo tenga que pegarlo en el formulario de Google, sin inventar ni resumir nada.

```
Necesito crear un perfil de Google Business Profile (antes Google My
Business) para mi empresa. Te doy todos los datos exactos — quiero que
los uses tal cual, sin resumir ni cambiar el texto.

NOMBRE DEL NEGOCIO (exacto, sin agregar nada):
Automate IT

TELÉFONO:
(407) 404-9495

SITIO WEB:
https://yourbizupgraded.com

CATEGORÍA PRINCIPAL:
Business management consultant

CATEGORÍAS SECUNDARIAS (agrega las que el formulario permita):
Software company
Business development service
Computer consultant

TIPO DE NEGOCIO — cuando pregunte "¿los clientes te visitan en tu
local?", la respuesta es NO. Es un negocio de área de servicio: la
dirección física queda oculta y en su lugar se muestran las zonas de
servicio de abajo.

ZONAS DE SERVICIO (agrégalas todas, una por una):
Orlando, FL
Kissimmee, FL
St. Cloud, FL
Winter Park, FL
Apopka, FL
Sanford, FL
Condado de Orange, FL
Condado de Osceola, FL
Condado de Seminole, FL

DESCRIPCIÓN (pégala completa, tal cual, no la resumas — tiene 675 de
los 750 caracteres permitidos):

"Automate IT ayuda a dueños de negocios pequeños y medianos a encontrar
dónde su operación pierde tiempo, información o dinero, y a construir
la mejora.

Empezamos entendiendo cómo funciona tu negocio de verdad: cómo entra un
cliente, qué pasa hasta que se entrega el trabajo y cómo sabes que
quedó bien. Con ese mapa decidimos qué conviene arreglar primero y qué
número debería moverse.

La solución puede ser automatizar un proceso, conectar herramientas que
ya usas, simplificar un paso o hacer visible algo que hoy nadie está
mirando. No instalamos herramientas por instalar.

Atendemos en español e inglés, en Orlando y toda Florida. El primer
diagnóstico no tiene costo."

SERVICIOS (agrégalos uno por uno, sin precios):
Diagnóstico de operaciones
Automatización de procesos
Integración de herramientas y sistemas
Seguimiento de clientes potenciales
Atención automatizada por WhatsApp
Recordatorios y confirmación de citas
Paneles e informes de operación
Documentación de procesos

Tres cosas que el formulario va a pedir y que yo tengo que darte
aparte, porque no las tengo escritas todavía — pregúntamelas si llegas
a ese punto y no te las he dado:
1. Horario de atención (para llamadas/consultas)
2. Fecha de apertura del negocio (está en mi registro de Sunbiz)
3. Una foto de perfil (mi logo) y una foto de portada

Al terminar, dame el enlace público del perfil creado — lo necesito
para agregarlo al sitio web.

IMPORTANTE: no cambies ni resumas el nombre del negocio ni la
descripción. Están escritos exactamente como deben quedar publicados.
```

---

## Después de crear la ficha

Cuando tengas el enlace público del perfil, mándamelo. Hay un dato en el código del sitio (`sameAs` del schema en `BaseLayout.astro`) que tengo que actualizar con ese enlace — es lo que le confirma a Google que la ficha y el sitio son el mismo negocio. Dos minutos, y ya queda apuntado para cuando me lo pases.
