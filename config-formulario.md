# Envío del formulario de contacto

## Pendientes

- **Verificar `laotracaramkt.es` en Resend.** La web ya está en producción en
  `www.laotracaramkt.es`, pero hasta verificar el dominio el aviso sale desde el remitente de
  pruebas de Resend (`onboarding@resend.dev`), que solo entrega al email dueño de la cuenta
  (`diegoalvarezc94@gmail.com`). Ver "Pasar a producción".
- **Reserva de fecha y hora.** No existe y el cliente la ha pedido. Lo más probable es montarla
  con **Calendly** —o un script de calendario equivalente, como Cal.com— incrustado en el modal
  del CTA final, en lugar de construir disponibilidad, antisolapes, zonas horarias y
  recordatorios dentro del repo. Ver "Reserva de citas" al final.

---

## Montaje actual — función de Vercel + Resend

El formulario (`src/components/ContactoForm.astro` + `src/scripts/contacto-form.ts`) hace `POST`
en JSON a **`/api/contacto`**, que es `api/contacto.ts` en la raíz del repo: una función nativa de
Vercel. Vercel la despliega sola junto al sitio estático de Astro, **sin adaptador** (el adaptador
`@astrojs/vercel` se descartó porque en Windows `pnpm build` falla al crear los symlinks de pnpm
dentro de la función).

La función revalida los campos, descarta en silencio si viene el honeypot `botcheck`, y envía el
aviso con la API de Resend (`fetch`, sin dependencias) con `reply_to` = email del formulario, así
que basta con pulsar "Responder" en Gmail. Si algo falla responde un código ≠ 2xx y el front
muestra el error con el email como salida; nunca una confirmación falsa.

Si el aviso sale bien, la función manda además al usuario un **acuse de recibo** breve (saludo
con su nombre y "nos pondremos en contacto pronto"), con "responder a" = la primera dirección de
`CONTACTO_DESTINO`. El texto está en `acuseDeRecibo()` dentro de `api/contacto.ts`. No repite el
mensaje del usuario, para que el formulario no sirva para mandar texto arbitrario a terceros. Si
el acuse falla solo queda en los logs (`[contacto] acuse:`); el usuario ve igualmente el éxito,
porque su mensaje sí nos llegó.

Cuerpo que envía el front:

```json
{ "nombre": "…", "restaurante": "…", "email": "…", "mensaje": "…", "botcheck": "",
  "subject": "Nuevo contacto — <nombre> (<restaurante>)" }
```

### Puesta en marcha (pruebas, a Gmail)

1. Cuenta en **resend.com** creada con `diegoalvarezc94@gmail.com` (con el remitente de pruebas,
   Resend solo entrega al email de la cuenta). **API Keys → Create** con permiso "Sending access".
2. **Vercel → Project → Settings → Environment Variables** (Production y Preview):

   ```
   RESEND_API_KEY=re_…
   CONTACTO_DESTINO=diegoalvarezc94@gmail.com
   ```

   `PUBLIC_CONTACTO_ENDPOINT` debe quedar **vacía o sin definir** (si no, el front envía allí).
3. Redeploy y enviar el formulario desde la URL de Vercel. Si el correo no llega: revisar spam, y
   en Vercel → Deployment → **Logs** buscar líneas `[contacto]` (falta de variables o el error
   exacto que devolvió Resend). En Resend → **Emails** se ve cada envío y su estado.

### Pasar a producción

1. Resend → **Domains → Add** `laotracaramkt.es` y añadir en el DNS del dominio los registros que
   indica (MX y TXT de SPF en el subdominio `send`, TXT de DKIM). Si el DNS lo gestiona Vercel:
   Vercel → Domains → `laotracaramkt.es` → DNS Records. Esperar a "Verified".
2. Variables en Vercel:

   ```
   CONTACTO_REMITENTE=Web La Otra Cara <web@laotracaramkt.es>
   CONTACTO_DESTINO=<buzón definitivo>
   ```

   `web@` no necesita existir como buzón: es solo el remitente. `CONTACTO_DESTINO` admite varios
   separados por comas; con el dominio verificado ya puede ser cualquier dirección, Gmail incluido.
3. Actualizar la Política de Privacidad: Resend como encargado del tratamiento (EE. UU.).

En local, `pnpm dev` no sirve `api/`: el formulario mostrará el estado de error, que es lo
correcto. Para probar la función en local hace falta `vercel dev` (CLI de Vercel). El archivo
`.env` local (en `.gitignore`) ya tiene `CONTACTO_DESTINO`; falta la clave.

Extras que este montaje habilita cuando haga falta: Cloudflare Turnstile (la validación del token
va en la función), rate-limit con Vercel KV, y copia de los envíos en una hoja, Airtable o Notion.

---

## Alternativa — Proveedor de formularios externo

Si se prefiere no mantener la función: basta con definir `PUBLIC_CONTACTO_ENDPOINT` (y la clave, si la pide) y el front envía allí en lugar de a `/api/contacto`.

**Web3Forms** (250 envíos/mes gratis):

1. Alta en web3forms.com con el email que va a recibir los avisos (`hola@laotracara.com`).
   Devuelve un `access_key` (un UUID).
2. Variables de entorno en Vercel, para Production, Preview y Development:

   ```
   PUBLIC_CONTACTO_ENDPOINT=https://api.web3forms.com/submit
   PUBLIC_CONTACTO_ACCESS_KEY=<el uuid que te dan>
   ```

3. Redeploy. Fin: no hay que cambiar ni una línea del repo.

**Formspree** (50/mes gratis) funciona igual, con endpoint por formulario y sin `access_key`:

```
PUBLIC_CONTACTO_ENDPOINT=https://formspree.io/f/<id-del-formulario>
```

Lo mismo sirve para Basin y Formcarry, y para un webhook de n8n / Make / Zapier que reparta el
aviso a Gmail, una hoja o el CRM (comprobar que el webhook responda con CORS abierto).

Qué asumes: los datos pasan por un tercero y la clave es pública. El honeypot `botcheck` ya
filtra bots simples; si llega spam, activa el captcha del propio proveedor.

---

## Alternativa low-cost: Google Apps Script

Hoja de cálculo + Apps Script publicado como Web App: gratis y sin límite práctico, pero el aviso
por email lo montas tú en el script y Apps Script solo acepta peticiones "simples" — habría que
cambiar el `fetch` de `contacto-form.ts` a `text/plain` o `FormData`. Solo tiene sentido si lo que
quieres es el registro en hoja, no el aviso.

---

## Cómo probar que funciona

1. Con las variables puestas, `pnpm dev` y enviar el formulario de verdad: debe aparecer el panel
   "MENSAJE ENVIADO" y llegar el correo.
2. Provocar un fallo (una URL mala en `PUBLIC_CONTACTO_ENDPOINT`): el formulario debe conservar los
   datos y mostrar el aviso de error con el email, sin confirmación.
3. Enviar vacío: los cuatro campos validados, foco en el primero con error.

---

## Reserva de citas (pendiente de montar)

Reservar fecha y hora no es una sección más: necesita disponibilidad leída de un calendario
real, escritura sin colisiones entre dos personas que miran el mismo hueco, zonas horarias
(se trabaja con toda LATAM), invitación `.ics` con enlace de videollamada, cancelar y
reprogramar, recordatorio previo y un panel para bloquear festivos. Construirlo aquí significa
estrenar la parte de servidor del proyecto —adaptador, base de datos, OAuth con Google
Calendar y envío transaccional—, y mantenerla. Por eso la vía prevista es incrustar una
herramienta existente.

**Decisión provisional:** Calendly, o un script de calendario equivalente. Cal.com es la
alternativa directa. El plan gratuito de Calendly permite un tipo de cita y un calendario, que
es justo lo que pide la consultoría de 30 minutos; quitar la marca del proveedor exige plan de
pago en ambos.

Lo que tiene que preparar el cliente, sin tocar código:

1. Cuenta en el proveedor.
2. Conectar el calendario real donde ya apunta sus compromisos.
3. Crear el tipo de cita "Consultoría gratuita — 30 min" con sus horas disponibles y el enlace
   de videollamada automático.

Lo que toca en el repo:

1. El enlace del evento en una variable `PUBLIC_` más, como el endpoint del formulario.
2. Incrustarlo en el modal de `CtaFinalModal.astro`, con **carga diferida al abrir el modal**:
   el script no entra en la carga inicial, así que no toca el presupuesto de ~10 KB de JS ni la
   puntuación de Lighthouse.
3. Fallback si el script de terceros no carga: enlace a la página pública de reserva. Nunca un
   hueco vacío.
4. El formulario se queda como segunda vía, para quien prefiera escribir antes de comprometerse
   a una hora.

Datos que hay que pedir antes de montarlo: de quién es el calendario que manda, horas
disponibles reales y zona horaria, antelación mínima para reservar, máximo de citas al día,
Meet / Zoom / teléfono, quién recibe el aviso de cada reserva, y si la marca del proveedor en
el widget es aceptable o hay presupuesto para quitarla.
