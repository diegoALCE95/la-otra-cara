import { accessKey, endpoint } from '../data/contacto';
import { site } from '../data/site';

/**
 * Formulario de contacto: validación propia (el formulario lleva `novalidate`
 * para que los mensajes sean los nuestros, en español y con el mismo estilo) y
 * envío por `fetch` al endpoint configurado en las variables de entorno.
 *
 * Estados: idle → enviando → exito | error. El error siempre deja a la vista
 * el email como salida, y nunca se muestra confirmación si el envío falló.
 */

const mensajes = {
  requerido: 'Completa este campo para poder responderte.',
  email: 'Revisa el email: debe tener la forma nombre@empresa.com.',
  telefono: 'Revisa el teléfono: solo números, espacios, guiones, + y paréntesis.',
  corto: 'Cuéntanos un poco más (al menos 10 caracteres).',
};

type Campo = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const patronTelefono = /^[+()\d\s.-]{6,}$/;

/** Devuelve el mensaje de error del campo, o `null` si es válido. */
function validar(campo: Campo): string | null {
  const valor = campo.value.trim();

  if (campo.required && !valor) return mensajes.requerido;
  if (!valor) return null;
  if (campo.type === 'email' && !patronEmail.test(valor)) return mensajes.email;
  if (campo.type === 'tel' && !patronTelefono.test(valor)) return mensajes.telefono;
  if (campo instanceof HTMLTextAreaElement && valor.length < 10) return mensajes.corto;

  return null;
}

export function initContactoForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contacto-form]');
  if (!form) return;

  const campos = Array.from(form.querySelectorAll<Campo>('[data-campo]'));
  const boton = form.querySelector<HTMLButtonElement>('[data-contacto-submit]');
  const botonLabel = boton?.querySelector<HTMLElement>('[data-label]');
  const estado = form.querySelector<HTMLElement>('[data-contacto-estado]');
  const exito = document.querySelector<HTMLElement>('[data-contacto-exito]');
  if (!boton || !botonLabel || !estado || !exito) return;

  const labelInicial = botonLabel.textContent ?? '';

  const pintarError = (campo: Campo, error: string | null) => {
    const caja = form.querySelector<HTMLElement>(`[data-error-de="${campo.name}"]`);
    if (caja) {
      caja.textContent = error ?? '';
      caja.hidden = !error;
    }
    campo.setAttribute('aria-invalid', String(Boolean(error)));
  };

  const mostrarEstado = (texto: string) => {
    estado.textContent = texto;
    estado.hidden = !texto;
  };

  // Delegación: un solo par de listeners para todos los campos. El error se
  // pinta al salir del campo y se limpia en cuanto se corrige.
  form.addEventListener(
    'blur',
    (event) => {
      const campo = event.target as Campo | null;
      if (campo && campo.matches?.('[data-campo]')) pintarError(campo, validar(campo));
    },
    true,
  );

  form.addEventListener('input', (event) => {
    const campo = event.target as Campo | null;
    if (!campo?.matches?.('[data-campo]')) return;
    if (campo.getAttribute('aria-invalid') === 'true' && !validar(campo)) pintarError(campo, null);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    mostrarEstado('');

    let primerInvalido: Campo | null = null;
    for (const campo of campos) {
      const error = validar(campo);
      pintarError(campo, error);
      if (error && !primerInvalido) primerInvalido = campo;
    }

    if (primerInvalido) {
      mostrarEstado('Revisa los campos marcados y vuelve a enviar.');
      primerInvalido.focus();
      return;
    }

    if (!endpoint) {
      mostrarEstado(
        `El envío todavía no está configurado. Escríbenos a ${site.email} y te contestamos igual.`,
      );
      return;
    }

    const datos = Object.fromEntries(new FormData(form).entries());
    boton.disabled = true;
    boton.setAttribute('aria-busy', 'true');
    botonLabel.textContent = 'Enviando…';

    try {
      const respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...datos,
          ...(accessKey ? { access_key: accessKey } : {}),
          subject: `Nuevo contacto — ${datos.nombre} (${datos.empresa})`,
        }),
      });

      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

      form.hidden = true;
      exito.hidden = false;
      exito.focus();
    } catch {
      mostrarEstado(
        `No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos a ${site.email}.`,
      );
    } finally {
      boton.disabled = false;
      boton.removeAttribute('aria-busy');
      botonLabel.textContent = labelInicial;
    }
  });
}
