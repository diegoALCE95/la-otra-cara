/**
 * Recibe el formulario de contacto y lo reenvía por email con Resend.
 *
 * Función nativa de Vercel (carpeta `api/` en la raíz): Vercel la despliega
 * sola junto al sitio estático de Astro, sin adaptador. Responde en
 * `/api/contacto`. Variables (Vercel → Settings → Environment Variables, sin
 * prefijo `PUBLIC_`, así que nunca llegan al navegador):
 *
 *   RESEND_API_KEY     clave de resend.com
 *   CONTACTO_DESTINO   a quién llega el aviso (varias, separadas por comas)
 *   CONTACTO_REMITENTE opcional; por defecto el remitente de pruebas de Resend
 *
 * Tras el aviso interno se envía al usuario un acuse de recibo breve, con
 * "responder a" = la primera dirección de CONTACTO_DESTINO. Si el acuse falla
 * solo se registra: el mensaje ya nos llegó, así que el front muestra éxito.
 *
 * Cualquier respuesta que no sea 2xx hace que el front muestre el error con el
 * email como salida, así que aquí basta con no responder 200 si algo falla.
 */
/** Remitente de pruebas de Resend: solo entrega al email dueño de la cuenta. */
const remitentePruebas = 'Web La Otra Cara <onboarding@resend.dev>';

const limites = { nombre: 120, restaurante: 160, email: 254, mensaje: 5000 } as const;
type CampoFormulario = keyof typeof limites;

const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const responder = (status: number, cuerpo: Record<string, unknown>) =>
  new Response(JSON.stringify(cuerpo), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

const escaparHtml = (texto: string) =>
  texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Quita saltos de línea para que nada del usuario rompa las cabeceras del correo. */
const enUnaLinea = (texto: string) => texto.replace(/[\r\n]+/g, ' ');

interface Email {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  text: string;
  html: string;
}

/** Envía un correo con la API de Resend. Devuelve `true` si lo aceptó. */
async function enviarEmail(apiKey: string, email: Email, etiqueta: string): Promise<boolean> {
  try {
    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(email),
    });
    if (respuesta.ok) return true;
    console.error(`[contacto] ${etiqueta}: Resend respondió`, respuesta.status, await respuesta.text());
  } catch (error) {
    console.error(`[contacto] ${etiqueta}: no se pudo contactar con Resend:`, error);
  }
  return false;
}

/**
 * Acuse de recibo para quien escribe. Solo repite su nombre, nunca el mensaje,
 * para que el formulario no sirva para mandar texto arbitrario a terceros.
 */
function acuseDeRecibo(nombre: string) {
  const saludo = `Hola, ${nombre}:`;
  const parrafos = [
    'Gracias por escribirnos. Hemos recibido tu mensaje y ya lo tenemos sobre la mesa.',
    'Nos pondremos en contacto contigo muy pronto para entender bien qué necesitas. Si quieres adelantarnos algo, puedes responder directamente a este correo.',
  ];

  return {
    subject: 'Hemos recibido tu mensaje — La Otra Cara',
    text: [saludo, '', ...parrafos.flatMap((p) => [p, '']), 'Un saludo,', 'El equipo de La Otra Cara'].join('\n'),
    html: `
      <p>${escaparHtml(saludo)}</p>
      ${parrafos.map((p) => `<p>${p}</p>`).join('\n      ')}
      <p>Un saludo,<br>El equipo de La Otra Cara</p>
    `,
  };
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_DESTINO;
  const remitente = process.env.CONTACTO_REMITENTE || remitentePruebas;

  if (!apiKey || !destino) {
    console.error('[contacto] Faltan RESEND_API_KEY o CONTACTO_DESTINO.');
    return responder(503, { ok: false, error: 'no-configurado' });
  }

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await request.json();
  } catch {
    return responder(400, { ok: false, error: 'json-invalido' });
  }

  // Honeypot: un humano nunca marca la casilla oculta. Se responde 200 para no
  // darle pistas al bot, pero no se envía nada.
  if (cuerpo.botcheck) return responder(200, { ok: true });

  const campos = {} as Record<CampoFormulario, string>;
  for (const nombre of Object.keys(limites) as CampoFormulario[]) {
    const valor = typeof cuerpo[nombre] === 'string' ? (cuerpo[nombre] as string).trim() : '';
    if (!valor || valor.length > limites[nombre]) {
      return responder(422, { ok: false, error: 'campo-invalido', campo: nombre });
    }
    campos[nombre] = valor;
  }

  if (!patronEmail.test(campos.email)) {
    return responder(422, { ok: false, error: 'campo-invalido', campo: 'email' });
  }
  if (campos.mensaje.length < 10) {
    return responder(422, { ok: false, error: 'campo-invalido', campo: 'mensaje' });
  }

  const asunto = enUnaLinea(`Nuevo contacto — ${campos.nombre} (${campos.restaurante})`);

  const texto = [
    `Nombre: ${campos.nombre}`,
    `Restaurante: ${campos.restaurante}`,
    `Email: ${campos.email}`,
    '',
    campos.mensaje,
  ].join('\n');

  const html = `
    <p><strong>Nombre:</strong> ${escaparHtml(campos.nombre)}<br>
    <strong>Restaurante:</strong> ${escaparHtml(campos.restaurante)}<br>
    <strong>Email:</strong> ${escaparHtml(campos.email)}</p>
    <p style="white-space:pre-wrap">${escaparHtml(campos.mensaje)}</p>
    <p style="color:#888;font-size:12px">Enviado desde el formulario de la web. Responde a este correo para contestar directamente.</p>
  `;

  const destinatarios = destino.split(',').map((email) => email.trim()).filter(Boolean);

  const avisoEnviado = await enviarEmail(
    apiKey,
    {
      from: remitente,
      to: destinatarios,
      reply_to: campos.email,
      subject: asunto,
      text: texto,
      html,
    },
    'aviso',
  );
  if (!avisoEnviado) return responder(502, { ok: false, error: 'envio-fallido' });

  await enviarEmail(
    apiKey,
    {
      from: remitente,
      to: [campos.email],
      reply_to: destinatarios[0],
      ...acuseDeRecibo(enUnaLinea(campos.nombre)),
    },
    'acuse',
  );

  return responder(200, { ok: true });
}
