/**
 * Datos del formulario de contacto.
 *
 * Por defecto el formulario envía a la función propia `/api/contacto`
 * (`src/pages/api/contacto.ts`), que reenvía el mensaje por email con Resend.
 * `PUBLIC_CONTACTO_ENDPOINT` permite apuntar a otro sitio (p. ej. Web3Forms)
 * sin tocar código. Si el envío falla, el formulario avisa y ofrece el email:
 * nunca da por enviado algo que no salió.
 */
export const endpoint = (import.meta.env.PUBLIC_CONTACTO_ENDPOINT || '/api/contacto') as string;

/** Clave pública del proveedor de formularios (solo Web3Forms y similares). */
export const accessKey = (import.meta.env.PUBLIC_CONTACTO_ACCESS_KEY ?? '') as string;
