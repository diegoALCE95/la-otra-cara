/**
 * `destacado` es el cierre de la frase de apoyo que va en negrilla; se pinta
 * justo detrás de `apoyo`, así que `apoyo` termina con el espacio separador.
 */
export type Paso = { numero: string; titulo: string; apoyo: string; destacado?: string };

export const proceso: Paso[] = [
  {
    numero: '01',
    titulo: 'Conocemos el restaurante',
    apoyo: 'Entendemos su propuesta, su público, sus objetivos y lo ',
    destacado: 'que necesita mejorar.',
  },
  {
    numero: '02',
    titulo: 'Definimos el enfoque',
    apoyo: 'Acordamos ',
    destacado: 'qué comunicar, a quién y en qué canales.',
  },
  {
    numero: '03',
    titulo: 'Creamos y activamos',
    apoyo: 'Desarrollamos los contenidos y las acciones incluidos en el servicio contratado.',
  },
  {
    numero: '04',
    titulo: 'Revisamos y ajustamos',
    apoyo: 'Analizamos la evolución y proponemos ',
    destacado: 'los siguientes pasos.',
  },
];
