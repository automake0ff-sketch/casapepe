export type Category = 'Tapas frías' | 'Fritos' | 'Sugerencias' | 'Plancha' | 'Platos' | 'Postres';
export type Dish = { id: string; name: string; category: Category; description?: string; formats: { label: string; price: number }[]; tags: ('carne' | 'pescado' | 'vegetariano' | 'tradicional')[] };

// Datos transcritos de la carta pública oficial consultada el 28/10/2026.
// Solo se muestran platos, formatos y precios presentes en esa carta; no se infieren alérgenos.
export const catalog: Dish[] = [
  { id: 'ensaladilla', name: 'Ensaladilla de la casa', category: 'Tapas frías', formats: [{ label: 'Tapa', price: 4.6 }, { label: 'Plato', price: 13.5 }], tags: ['tradicional'] },
  { id: 'salmorejo', name: 'Salmorejo Cordobés', category: 'Tapas frías', formats: [{ label: 'Tapa', price: 4.6 }], tags: ['vegetariano', 'tradicional'] },
  { id: 'aguacate', name: 'Aguacate relleno', category: 'Tapas frías', description: 'Pollo, maíz, lechuga, salsa rosa y langostino.', formats: [{ label: 'Tapa', price: 5 }, { label: 'Plato', price: 14 }], tags: ['carne', 'pescado'] },
  { id: 'boquerones', name: 'Boquerones', category: 'Fritos', formats: [{ label: 'Tapa', price: 4.6 }, { label: '1/2 ración', price: 9.2 }, { label: 'Plato', price: 13.5 }], tags: ['pescado', 'tradicional'] },
  { id: 'croquetas', name: 'Croquetas de puchero', category: 'Fritos', formats: [{ label: '1/2 ración', price: 9 }, { label: 'Plato', price: 13 }], tags: ['carne', 'tradicional'] },
  { id: 'berenjena', name: 'Berenjena con salmorejo y miel de caña', category: 'Fritos', formats: [{ label: '1/2 ración', price: 9 }, { label: 'Plato', price: 13 }], tags: ['vegetariano', 'tradicional'] },
  { id: 'carrillada', name: 'Carrillada en salsa', category: 'Sugerencias', formats: [{ label: '1/2 ración', price: 9.5 }, { label: 'Plato', price: 14 }], tags: ['carne', 'tradicional'] },
  { id: 'bacalao', name: 'Bacalao al Pepe-Hillo', category: 'Sugerencias', formats: [{ label: '1/2 ración', price: 9.5 }, { label: 'Plato', price: 14 }], tags: ['pescado'] },
  { id: 'mortero', name: 'Mortero de solomillo', category: 'Sugerencias', description: 'Con jamón, patatas, tomate y salsa verde.', formats: [{ label: '1/2 ración', price: 10.5 }, { label: 'Plato', price: 15 }], tags: ['carne', 'tradicional'] },
  { id: 'espinacas', name: 'Espinacas con garbanzos', category: 'Sugerencias', formats: [{ label: 'Tapa', price: 4.6 }, { label: 'Plato', price: 13.5 }], tags: ['vegetariano', 'tradicional'] },
  { id: 'solomillo', name: 'Solomillo al whisky / cabrales / mojo picón', category: 'Plancha', formats: [{ label: 'Tapa', price: 4.6 }, { label: 'Plato', price: 13.5 }], tags: ['carne', 'tradicional'] },
  { id: 'atun', name: 'Atún a la plancha con mayonesa de aguacate y soja', category: 'Plancha', formats: [{ label: '1/2 ración', price: 9.2 }, { label: 'Plato', price: 13.5 }], tags: ['pescado'] },
  { id: 'padron', name: 'Pimientos de Padrón', category: 'Platos', formats: [{ label: 'Plato', price: 10 }], tags: ['vegetariano', 'tradicional'] },
  { id: 'flan', name: 'Flan casero', category: 'Postres', formats: [{ label: 'Postre', price: 3.8 }], tags: ['tradicional'] },
  { id: 'torrija', name: 'Torrija con helado de mango', category: 'Postres', formats: [{ label: 'Postre', price: 6.5 }], tags: ['tradicional'] }
];

export const categories: Category[] = ['Tapas frías', 'Fritos', 'Sugerencias', 'Plancha', 'Platos', 'Postres'];
export const euros = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);
