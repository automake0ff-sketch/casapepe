import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { catalog, categories, euros, type Dish } from './catalog';
import { makePlan, total, type Choice } from './planner';
import './styles.css';

const RESERVATION_URL = 'https://widget.thefork.com/es/babb8d97-1e0d-42f1-a9ab-abeab52d90a0?step=date';
const OFFICIAL_MENU = 'https://www.casapepehillo.com/carta/';
type Tab = 'inicio' | 'carta' | 'plan' | 'reserva';

function App() {
  const [tab, setTab] = useState<Tab>('inicio');
  const nav = (next: Tab) => { setTab(next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <main>
    <header className="topbar"><button className="brand" onClick={() => nav('inicio')} aria-label="Inicio Casa Pepe Hillo"><span>CASA</span> PEPE HILLO</button><button className="reserve-small" onClick={() => nav('reserva')}>Reservar</button></header>
    {tab === 'inicio' && <Home go={nav} />}
    {tab === 'carta' && <Menu />}
    {tab === 'plan' && <Planner />}
    {tab === 'reserva' && <Reservations />}
    <nav className="bottom-nav" aria-label="Navegación principal">
      <NavButton icon="⌂" label="Inicio" active={tab === 'inicio'} onClick={() => nav('inicio')} />
      <NavButton icon="▤" label="Carta" active={tab === 'carta'} onClick={() => nav('carta')} />
      <NavButton icon="✦" label="Tapeo" active={tab === 'plan'} onClick={() => nav('plan')} />
      <NavButton icon="⌖" label="Reserva" active={tab === 'reserva'} onClick={() => nav('reserva')} />
    </nav>
  </main>;
}
function NavButton({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) { return <button className={active ? 'active' : ''} onClick={onClick}><b>{icon}</b><span>{label}</span></button>; }
function Home({ go }: { go: (tab: Tab) => void }) { return <>
  <section className="hero"><div className="hero-copy"><p className="eyebrow">SEVILLA · EL ARENAL</p><h1>El tapeo<br/><i>con historia.</i></h1><p>Una guía independiente para descubrir Casa Pepe Hillo: carta verificada, ideas para compartir y acceso directo a la reserva oficial.</p><button className="primary" onClick={() => go('carta')}>Ver la carta <span>→</span></button></div></section>
  <section className="intro"><p className="eyebrow">PARA COMPARTIR</p><h2>Todo empieza alrededor de la mesa.</h2><p>Selecciona tus preferencias y presupuesto: el planificador compone una propuesta a partir de platos y precios publicados.</p><button className="outline" onClick={() => go('plan')}>Crear un tapeo <span>✦</span></button></section>
  <section className="quick"><article><span>01</span><h3>Carta digital</h3><p>Por categorías, con precios y formatos publicados.</p><button onClick={() => go('carta')}>Explorar →</button></article><article><span>02</span><h3>Reserva mesa</h3><p>Enlace al sistema oficial de TheFork.</p><button onClick={() => go('reserva')}>Reservar →</button></article></section>
  <p className="disclaimer">Demo independiente no afiliada ni aprobada por Casa Pepe Hillo. Consulta siempre la carta oficial para disponibilidad y cambios.</p>
</> }
function Menu() { const [category, setCategory] = useState<'Todas' | (typeof categories)[number]>('Todas'); const dishes = category === 'Todas' ? catalog : catalog.filter(d => d.category === category); return <section className="page menu-page">
  <p className="eyebrow">CARTA DIGITAL</p><h1>Para picar,<br/><i>sin prisa.</i></h1><div className="source-note">Precios y formatos de la carta oficial consultada el 28/10/2026 · <a href={OFFICIAL_MENU} target="_blank" rel="noreferrer">ver fuente ↗</a></div>
  <div className="chips"><button className={category === 'Todas' ? 'selected' : ''} onClick={() => setCategory('Todas')}>Todas</button>{categories.map(c => <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
  <div className="menu-list">{dishes.map(d => <DishCard key={d.id} dish={d} />)}</div>
  <p className="photo-note">No se incluyen fotografías de platos porque no se han verificado imágenes individuales en la fuente oficial. Los alérgenos deben consultarse en la carta oficial y con el personal.</p>
</section> }
function DishCard({ dish }: { dish: Dish }) { return <article className="dish"><div><p className="dish-category">{dish.category}</p><h3>{dish.name}</h3>{dish.description && <p className="description">{dish.description}</p>}</div><div className="formats">{dish.formats.map(f => <p key={f.label}><span>{f.label}</span><b>{euros(f.price)}</b></p>)}</div></article> }
function Planner() { const [people, setPeople] = useState(2); const [budget, setBudget] = useState(15); const [preference, setPreference] = useState('cualquiera'); const [meal, setMeal] = useState('cualquiera'); const [choices, setChoices] = useState<Choice[]>([]);
  const cost = useMemo(() => total(choices), [choices]); const max = people * budget;
  const generate = () => setChoices(makePlan({ people, budget, preference, meal }));
  const change = (id: string, amount: number) => setChoices(cs => cs.map(c => c.dish.id === id ? { ...c, quantity: Math.max(0, c.quantity + amount) } : c).filter(c => c.quantity));
  const reset = () => { setChoices([]); setPeople(2); setBudget(15); setPreference('cualquiera'); setMeal('cualquiera'); };
  return <section className="page planner"><p className="eyebrow">PLANIFICADOR DE TAPEO</p><h1>Una ronda<br/><i>a vuestra medida.</i></h1><p className="lead">Crea una propuesta con formatos y precios reales publicados. Es una sugerencia; no es un pedido ni una reserva.</p>
    <div className="form-card"><div className="step"><label>¿Cuántas personas?</label><div className="counter"><button onClick={() => setPeople(Math.max(1, people - 1))}>−</button><strong>{people}</strong><button onClick={() => setPeople(people + 1)}>+</button></div></div><div className="step"><label>Presupuesto por persona</label><div className="budget"><input aria-label="Presupuesto por persona" type="range" min="5" max="40" step="1" value={budget} onChange={e => setBudget(+e.target.value)} /><b>{euros(budget)}</b></div></div><label className="select-label">Preferencia<select value={preference} onChange={e => setPreference(e.target.value)}><option value="cualquiera">Sin preferencia</option><option value="vegetariano">Vegetariano</option><option value="pescado">Pescado</option><option value="carne">Carne</option></select></label><label className="select-label">Tipo de comida<select value={meal} onChange={e => setMeal(e.target.value)}><option value="cualquiera">Para compartir</option>{categories.filter(c => c !== 'Postres').map(c => <option key={c} value={c}>{c}</option>)}</select></label><button className="primary full" onClick={generate}>Crear mi tapeo <span>→</span></button></div>
    {choices.length > 0 && <section className="plan-result"><div className="result-heading"><p className="eyebrow">VUESTRA PROPUESTA</p><button onClick={reset}>Empezar de nuevo</button></div>{choices.map(c => <div className="choice" key={c.dish.id}><div><h3>{c.dish.name}</h3><p>{c.format.label} · {euros(c.format.price)} / unidad</p></div><div className="quantity"><button aria-label={'Restar ' + c.dish.name} onClick={() => change(c.dish.id, -1)}>−</button><b>{c.quantity}</b><button aria-label={'Sumar ' + c.dish.name} onClick={() => change(c.dish.id, 1)}>+</button></div></div>)}<div className="total"><div><span>Total estimado</span><strong>{euros(cost)}</strong></div><div><span>Por persona</span><strong>{euros(cost / people)}</strong></div></div><p className={cost > max ? 'over-budget' : 'within-budget'}>{cost > max ? `Esta selección supera el presupuesto objetivo por ${euros(cost - max)}.` : `Dentro del presupuesto objetivo de ${euros(max)} en total.`}</p></section>}
  </section> }
function Reservations() { return <section className="page reservations"><p className="eyebrow">RESERVAS Y CONTACTO</p><h1>Nos vemos<br/><i>en la mesa.</i></h1><p className="lead">La disponibilidad y confirmación se gestionan exclusivamente desde el sistema oficial del restaurante.</p><a className="primary full external" href={RESERVATION_URL} target="_blank" rel="noreferrer">Reservar con TheFork <span>↗</span></a><p className="booking-note">El enlace abre el widget oficial de reserva de Pepe Hillo. Esta demo no recoge datos personales ni procesa reservas.</p>
  <div className="contact"><a href="tel:+34954564145"><span>Teléfono</span><b>+34 954 56 41 45</b><i>→</i></a><a href="https://www.casapepehillo.com/#contacto" target="_blank" rel="noreferrer"><span>Ubicación</span><b>C/ Adriano, 24 · Sevilla</b><i>→</i></a><a href="https://www.casapepehillo.com/" target="_blank" rel="noreferrer"><span>Web oficial</span><b>casapepehillo.com</b><i>→</i></a></div>
  <div className="hours"><p className="eyebrow">HORARIO PUBLICADO</p><strong>Lunes a domingo</strong><span>12:00 — 00:00</span><small>Verifica horario y disponibilidad en la web oficial antes de tu visita.</small></div>
</section> }
createRoot(document.getElementById('root')!).render(<App />);
