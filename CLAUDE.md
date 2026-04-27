# Automate IT — Website Cinematográfico

## Quién soy
CEO y dueño de Automate IT (automateit.com). Empresa de automatización empresarial con agentes de IA en n8n.

## Qué estamos construyendo
Un website de una sola página (single-page) con scroll cinematográfico al estilo Resn.global. Experiencia visual inmersiva con Three.js + GSAP ScrollTrigger.

## Identidad de marca
- Colores: Azul Principal #0052CC · Navy #003DA5 · Cyan Neón #00D9FF · Fondo oscuro #050A18
- Tipografía: Proxima Nova (títulos) + Open Sans (cuerpo)
- Personalidad: Tecnológico, sobrio, cinematográfico, con cierre emocional humano

## Estructura de escenas
1. Hero: isotipo neón trazándose solo
2. El caos: emails y notificaciones acumulándose
3. El túnel: cámara viajando dentro de fibra óptica (Three.js)
4. Los agentes: nodos con chat en vivo escribiéndose solo
5. El cierre: emprendedor cerrando laptop, niños al fondo
6. CTA final

## Reglas de trabajo
- Siempre usar Vite como bundler
- Componentes separados por escena
- Mobile: reemplazar WebGL con video pregrabado
- Nunca usar colores fuera de la paleta de marca
- Cada cambio debe ser visible y testeable en browser antes de continuar
cd C:\Users\Gerardo\Documents\automate-it-website
Integra el video src/assets/cierre.mp4 en la Escena 5. Reemplaza la silueta CSS que está actualmente por el video real.

Comportamiento:
1. El video ocupa fullscreen (100vw x 100vh), object-fit: cover, centrado
2. Autoplay, muted, playsinline — sin controles visibles
3. El video corre una sola vez (no loop)
4. Sobre el video: overlay oscuro rgba(0,0,0,0.3) para dar profundidad cinematográfica
5. Cuando el video termina, fade a negro en 1.5s
6. Después del negro aparece el texto en secuencia, Manifold CF ExtraBold, centrado:
   - "Esto es lo que compras cuando automatizas." — 52px, blanco, fade in 1s
   - Pausa 2s
   - "Tiempo. El único recurso que no se recupera." — 36px, #00D9FF, fade in 1s
7. Debajo del texto, fade in después de 1s:
   - Botón primario: "Quiero una consulta gratuita" — fondo #0052CC, texto blanco, padding 16px 40px, border-radius 4px, Manifold CF
   - Botón secundario: "Ver cómo funciona" — borde 1px solid #00D9FF, texto #00D9FF, mismo padding
   - Ambos botones en fila centrada con gap 20px
8. Debajo de los botones, texto pequeño Open Sans 12px color #667788:
   "automateit.com · automateit@yourbizupgraded.com"
9. Fondo de toda la sección después del video: #050A18
