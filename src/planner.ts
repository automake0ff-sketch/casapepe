import { catalog, type Dish } from './catalog';
export type Choice = { dish: Dish; format: Dish['formats'][number]; quantity: number };
export type Preferences = { preference: string; meal: string; people: number; budget: number };

export function total(choices: Choice[]) { return choices.reduce((sum, choice) => sum + choice.format.price * choice.quantity, 0); }
export function makePlan({ preference, meal, people, budget }: Preferences): Choice[] {
  const wanted = catalog.filter(d => (preference === 'cualquiera' || d.tags.includes(preference as 'carne')) && (meal === 'cualquiera' || d.category === meal));
  const pool = (wanted.length ? wanted : catalog).filter(d => !['Postres', 'Platos'].includes(d.category));
  const cap = people * budget;
  const selected: Choice[] = [];
  let spent = 0;
  for (const dish of pool) {
    const format = dish.formats[0];
    if (spent + format.price <= cap || selected.length < Math.max(2, Math.ceil(people / 2))) {
      selected.push({ dish, format, quantity: 1 }); spent += format.price;
    }
    if (selected.length >= Math.max(3, people)) break;
  }
  return selected;
}
