export type Editorialista = { indice: string; nombre: string; rol: string; placeholder: string };

/**
 * TODO: nombres y roles reales de los fundadores.
 * TODO: faltan los dos retratos 4/5 (README, "Assets pendientes" #3).
 */
export const equipo: Editorialista[] = [
  {
    indice: '01',
    nombre: 'Borja Fernández',
    rol: 'Estrategia · Clientes · Desarrollo de negocio',
    placeholder: 'Retrato fundador 01',
  },
  {
    indice: '02',
    nombre: 'Pablo Guillén',
    rol: 'Dirección creativa · Fotografía · Vídeo',
    placeholder: 'Retrato fundador 02',
  },
];

/** TODO: atribución real del testimonio. */
export const testimonio = {
  cita: 'No solo entendieron nuestra marca. Entendieron ',
  citaEnfasis: 'en qué podía convertirse.',
  autor: 'Nombre Apellido',
  cargo: 'Founder — Casa Brava',
};
