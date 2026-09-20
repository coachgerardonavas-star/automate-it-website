# Lo que dejas al salir

---

## Lo que ya está construido y funcionando

Antes de comprar nada, mira lo que ya tienes:

**La página personalizada** (`/pulso/<negocio>`) para 40 prospectos. Cada una trae:

- Una frase de apertura dirigida al dueño por su nombre
- Los hallazgos, **con el enlace a la fuente** para que él lo compruebe
- Un apartado de **"lo que desconozco"** — esto es lo que la hace creíble
- Qué revisarías y por qué
- Un botón a tu WhatsApp con el mensaje ya escrito: *"Hola Gerardo, vi la revisión que preparaste para [su negocio] y quiero hablar contigo"*

**El enlace corto** (`/r/<negocio>`) que redirige a esa página y marca de dónde vino la visita. Así sabes quién la abrió.

**La medición** ya está puesta: el clic al botón de WhatsApp se registra.

Ese botón manda a **(407) 404-9495**, que es el número que unificamos hoy. Coincide.

---

## La decisión: qué imprimir

Estás cotizando 10 tarjetas NFC metálicas. Antes de mandarlas a hacer, ojo con esto:

**Una tarjeta metálica no se deja.** Cuesta demasiado para regalarla. El punto de una tarjeta NFC metálica es que **tú la conservas**: la acercas al teléfono del otro, se abre el enlace, y te la guardas. Es un gesto, no un obsequio.

Así que necesitas dos cosas distintas:

### 1. La tarjeta metálica — es tuya, no se va

| | |
|---|---|
| **Cuántas** | Una o dos. No diez. |
| **Qué abre al tocarla** | Tu página de diagnóstico: `yourbizupgraded.com/diagnostico` |
| **Cara frontal** | Logo, "Automate IT", tu nombre |
| **Cara trasera** | (407) 404-9495 · automateit@yourbizupgraded.com · **un código QR** |
| **Por qué el QR** | El NFC falla si el teléfono está bloqueado o lo tiene apagado. Si falla delante del dueño, el momento se muere. El QR es el respaldo. |

**Cuándo la usas:** cuando te pregunten a qué te dedicas y quieras que se vea serio. No en la visita en frío — ahí es demasiado pronto.

### 2. El papel que sí dejas — uno por prospecto

Tamaño tarjeta de presentación, impreso normal, barato. Uno por cada negocio que visitas.

**Lo que va impreso:**

```
                    [logo]

      Lo que encontré revisando
         [NOMBRE DEL NEGOCIO]


              [código QR]


         Automate IT · Gerardo Navas
            (407) 404-9495
        yourbizupgraded.com/r/jet-plumbing
```

El QR apunta a `/r/<su-negocio>`. Cuando lo escanea, abre **su** página, con **su** nombre y **sus** hallazgos.

**Por qué esto funciona mejor que una tarjeta normal:** nadie tira un papel que lleva el nombre de su propio negocio. Y si lo escanea tres días después, tú te enteras.

---

## Lo que NO debe decir el papel

- **No pongas el hallazgo impreso.** Si lo lee después y se siente señalado por escrito, se cierra. El hallazgo se dice en persona, con las dos frases que lo suavizan. El papel solo lo invita a mirar.
- **No pongas precios.**
- **No pongas "automatización con IA".** Tu manual es explícito: la IA es cómo entregas, no lo que vendes.
- **No pongas un descuento ni una promoción.** Estás escogiendo cliente, no rebajando.

---

## Lo que te falta construir

De los que te recomendé visitar, **seis ya tienen página** (El Plomero Latino, JET Plumbing, Absolute Best, Baez & Son, JPI Mechanical, HOME AC).

Los siete de respaldo de la Cola Maestra **no la tienen**. Si decides visitarlos, hay que escribirles la página: es agregar un bloque a `src/lib/pulso/` con el nombre del dueño, dos hallazgos con sus fuentes, lo que desconoces y el cierre. Media hora por negocio, y la ruta `/r/<slug>` funciona sola.

Dime cuáles y las escribo.

---

## Orden de gasto, si tuviera que elegir

1. **Imprimir las tarjetas de papel de los seis que ya tienen página.** Cuesta casi nada y es lo único que necesitas para salir mañana.
2. **La ficha de Google.** Gratis.
3. **Las tarjetas metálicas.** Cuando ya hayas hecho diez visitas y sepas si el material sirve. Comprar diez tarjetas caras antes de la primera conversación es exactamente el patrón que te tiene con 308 expedientes y cero clientes.
