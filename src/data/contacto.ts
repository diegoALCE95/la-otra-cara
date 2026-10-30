/**
 * Datos del formulario de contacto.
 *
 * El envío real se configura con variables de entorno (Vercel → Settings →
 * Environment Variables). Sin `PUBLIC_CONTACTO_ENDPOINT` el formulario valida
 * y avisa de que no se pudo enviar, ofreciendo el email como alternativa:
 * nunca da por enviado algo que no salió.
 */
export const endpoint = (import.meta.env.PUBLIC_CONTACTO_ENDPOINT ?? '') as string;

/** Clave pública del proveedor de formularios (Web3Forms y similares). */
export const accessKey = (import.meta.env.PUBLIC_CONTACTO_ACCESS_KEY ?? '') as string;

