# Envío del formulario de contacto

El formulario (`src/components/ContactoForm.astro` + `src/scripts/contacto-form.ts`) ya hace
`POST` en JSON a la URL que pongas en `PUBLIC_CONTACTO_ENDPOINT`, y añade `access_key` al
cuerpo si defines `PUBLIC_CONTACTO_ACCESS_KEY`.

Cuerpo que envía:

```json
{
  "nombre": "…",
  "empresa": "…",
  "email": "…",
  "telefono": "…",
  "tamano": "…",
  "servicio": "…",
  "mensaje": "…",
  "botcheck": "",
  "subject": "Nuevo contacto — <nombre> (<empresa>)",
  "access_key": "solo si PUBLIC_CONTACTO_ACCESS_KEY está definida"
}
```

Sin `PUBLIC_CONTACTO_ENDPOINT` el formulario valida, no envía nada y avisa de que el envío no
está configurado, ofreciendo el email. Nunca muestra una confirmación falsa.

Las variables se declaran en `.env` para local (está en `.gitignore`) y en
**Vercel → Project → Settings → Environment Variables** para producción. Al llevar prefijo
`PUBLIC_` se incrustan en el bundle del cliente: son públicas por diseño, no metas ahí nada
secreto.

---

## Opción 1 — Proveedor de formularios (el sitio sigue 100 % estático)

Recomendada para salir a producción ya: no hace falta adaptador, ni servidor, ni tocar código.

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

## Opción 2 — Función propia en Vercel + Resend (control total)

La clave vive en el servidor, puedes validar otra vez ahí, limitar por IP, guardar copia de cada
mensaje y enviar desde tu dominio.

1. Adaptador de Vercel:

   ```bash
   pnpm astro add vercel
   ```

   Deja el sitio prerenderizado y solo la ruta de API como función: en `astro.config.mjs`,
   `adapter: vercel()` con `output: 'static'` y `export const prerender = false` en la ruta.

2. Cuenta en resend.com, dominio `laotracara.com` verificado (registros DNS que te indican) y
   una API key. En Vercel, **sin** prefijo `PUBLIC_`:

   ```
   RESEND_API_KEY=re_…
   CONTACTO_DESTINO=hola@laotracara.com
   ```

3. `src/pages/api/contacto.ts`: revalidar los campos obligatorios, rechazar si `botcheck` viene
   lleno, enviar con Resend (`from: 'Web La Otra Cara <web@laotracara.com>'`,
   `reply_to: <email del formulario>`) y responder `200` en JSON. Cualquier otro código hace que
   el front muestre el estado de error, que es lo que queremos.

4. Front: una sola variable, sin `access_key`.

   ```
   PUBLIC_CONTACTO_ENDPOINT=/api/contacto
   ```

Extras que esta opción habilita cuando haga falta: Cloudflare Turnstile (la validación del token
va en la función), rate-limit con Vercel KV, y copia de los envíos en Vercel Postgres, Airtable
o Notion.

Qué asumes: una función serverless que mantener y el dominio verificado en Resend.

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
3. Enviar vacío: siete campos validados, foco en el primero con error.
