import { useState, useEffect, useMemo, useCallback, useRef } from 'preact/hooks';

const GEOS = [
  { id: '8741', label: 'Península' },
  { id: '8742', label: 'Canarias' },
  { id: '8743', label: 'Baleares' },
  { id: '8744', label: 'Ceuta' },
  { id: '8745', label: 'Melilla' },
];

const APPLIANCES = [
  { id: 'lavadora', label: 'Lavadora', duration: 2, abbr: 'LAV' },
  { id: 'lavavajillas', label: 'Lavavajillas', duration: 2, abbr: 'LVJ' },
  { id: 'coche', label: 'Coche eléctrico', duration: 4, abbr: 'EV' },
  { id: 'termo', label: 'Termo / ducha', duration: 1, abbr: 'ACS' },
];

const CHEAP = '#2DD4BF';
const MID = '#F5B83D';
const EXPENSIVE = '#F2545B';
const INK = '#0B0D12';
const SURFACE = '#14171F';
const SURFACE_HI = '#1A1F2A';
const BORDER = '#232733';
const TEXT = '#ECEAE3';
const MUTED = '#8A8F9C';
const IE_RATE = 0.0511269632;

function hexToRgb(hex) {
  const v = hex.replace('#', '');
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');
}
function lerpColor(a, b, t) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}
function colorForRatio(t) {
  const c = Math.max(0, Math.min(1, t));
  return c < 0.5 ? lerpColor(CHEAP, MID, c / 0.5) : lerpColor(MID, EXPENSIVE, (c - 0.5) / 0.5);
}
function statusForRatio(t) {
  if (t < 0.33) return { label: 'Barata', color: CHEAP };
  if (t < 0.66) return { label: 'Media', color: MID };
  return { label: 'Cara', color: EXPENSIVE };
}
function pad(n) { return String(n).padStart(2, '0'); }
function madridParts(date) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const parts = {};
  fmt.formatToParts(date).forEach(p => { parts[p.type] = p.value; });
  return parts;
}
function madridDateStr(date) {
  const p = madridParts(date);
  return `${p.year}-${p.month}-${p.day}`;
}
function addDaysToDateStr(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}
async function fetchDay(dateStr, geoId) {
  const bust = Date.now();
  const url = `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${dateStr}T00:00&end_date=${dateStr}T23:59&time_trunc=hour&geo_ids=${geoId}&_=${bust}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' });
  if (!res.ok) throw new Error('http_' + res.status);
  const json = await res.json();
  const candidates = (json.included || []).filter(s => s && s.attributes && Array.isArray(s.attributes.values));
  const pvpc = candidates.find(s => ((s.attributes.title || s.type || '') + '').toUpperCase().includes('PVPC'));
  const series = pvpc || candidates[0];
  const values = (series && series.attributes && series.attributes.values) || [];
  if (!values.length) throw new Error('no_data');
  const firstDate = values[0].datetime.slice(0, 10);
  if (firstDate !== dateStr) throw new Error('no_data');
  return values.map(v => ({
    hour: parseInt(v.datetime.slice(11, 13), 10),
    priceRaw: v.value / 1000,
  }));
}
function fmt4(p) { return p.toLocaleString('es-ES', { minimumFractionDigits: 4, maximumFractionDigits: 4 }); }
function fmt3(p) { return p.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 }); }

/* ---------- iconos ---------- */
function IconZap({ size = 18, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><polygon points="13 2 4 14 11 14 9 22 18 10 11 10 13 2" /></svg>);
}
function IconChevronDown({ size = 13, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>);
}
function IconX({ size = 13, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
}
function IconAlertCircle({ size = 22, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>);
}
function IconClock({ size = 22, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
}
function IconTrendingUp({ size = 12, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>);
}
function IconTrendingDown({ size = 12, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></svg>);
}
function IconRefresh({ size = 16, color = 'currentColor' }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>);
}

/* ---------- componentes ---------- */
function SegButton({ active, onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex-1 px-3 py-2 text-sm font-medium rounded-full transition-colors focus:outline focus:outline-2 focus:outline-offset-2"
      style={{
        backgroundColor: active ? TEXT : 'transparent',
        color: active ? INK : disabled ? `${MUTED}66` : MUTED,
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function StatTile({ label, value, sub }) {
  return (
    <div className="flex-1 rounded-2xl px-3 py-3" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
      <div className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>{label}</div>
      <div className="mono text-lg font-semibold mt-1" style={{ color: TEXT }}>{value}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: MUTED }}>{sub}</div>}
    </div>
  );
}

function ApplianceCard({ appliance, best, dayAvg, noteLabel }) {
  if (!best) return null;
  const { abbr, label, duration } = appliance;
  const startHour = best.startHour;
  const endHour = (startHour + duration) % 24;
  const pct = dayAvg > 0 ? Math.round((1 - best.avg / dayAvg) * 100) : 0;
  return (
    <div className="rounded-2xl p-3" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
      <div className="flex items-center gap-2">
        <div className="rounded-full px-2 py-1 mono text-xs font-bold" style={{ backgroundColor: INK, color: MID }}>{abbr}</div>
        <span className="text-sm font-medium" style={{ color: TEXT }}>{label}</span>
      </div>
      <div className="mono text-base mt-2" style={{ color: TEXT }}>
        {pad(startHour)}:00–{pad(endHour)}:00
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs" style={{ color: MUTED }}>{fmt3(best.avg)} €/kWh · {noteLabel}</span>
        {pct > 0 && (
          <span className="text-xs font-semibold rounded-full px-2 py-0.5" style={{ color: CHEAP, backgroundColor: '#2DD4BF22' }}>
            -{pct}%
          </span>
        )}
      </div>
    </div>
  );
}

function ChartView({ prices, stats, currentIdx, selectedIdx, setSelectedIdx, viewDay }) {
  return (
    <>
      <div className="flex items-end gap-1 h-40">
        {prices.map((p, idx) => {
          const t = stats.max.price !== stats.min.price ? (p.price - stats.min.price) / (stats.max.price - stats.min.price) : 0.5;
          const heightPct = 28 + t * 72;
          const color = colorForRatio(t);
          const isNow = viewDay === 'today' && idx === currentIdx;
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={p.hour}
              onClick={() => setSelectedIdx(s => (s === idx ? null : idx))}
              className="flex-1 relative flex flex-col items-center justify-end focus:outline-none"
              style={{ height: '100%' }}
              aria-label={`${pad(p.hour)}:00, ${fmt3(p.price)} euros por kilovatio hora`}
            >
              {isNow && (<span className="absolute -top-2.5 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TEXT }} />)}
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: color,
                  outline: isSelected ? `2px solid ${TEXT}` : 'none',
                  outlineOffset: '1px',
                  opacity: isNow || isSelected ? 1 : 0.85,
                }}
              />
            </button>
          );
        })}
      </div>
      <div className="flex mt-1.5">
        {prices.map((p, idx) => (
          <div key={p.hour} className="flex-1 text-center text-xs" style={{ color: MUTED }}>
            {idx % 4 === 0 ? pad(p.hour) : ''}
          </div>
        ))}
      </div>
      <p className="text-xs text-center mt-2" style={{ color: MUTED }}>Toca una barra para ver el detalle</p>
    </>
  );
}

function ListView({ prices, stats, currentIdx, selectedIdx, setSelectedIdx, viewDay }) {
  return (
    <div className="list-scroll" style={{ maxHeight: '420px', overflowY: 'auto' }}>
      <div className="flex items-center px-2 pb-1.5 text-xs uppercase tracking-wider" style={{ color: MUTED }}>
        <span style={{ width: '52px' }}>Hora</span>
        <span className="flex-1 text-center">Precio relativo</span>
        <span style={{ width: '72px' }} className="text-right">€/kWh</span>
      </div>
      <div className="space-y-0.5">
        {prices.map((p, idx) => {
          const t = stats.max.price !== stats.min.price ? (p.price - stats.min.price) / (stats.max.price - stats.min.price) : 0.5;
          const color = colorForRatio(t);
          const isNow = viewDay === 'today' && idx === currentIdx;
          const isSelected = selectedIdx === idx;
          const widthPct = 8 + t * 92;
          return (
            <button
              key={p.hour}
              onClick={() => setSelectedIdx(s => (s === idx ? null : idx))}
              className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors focus:outline-none"
              style={{
                backgroundColor: isSelected ? SURFACE_HI : isNow ? '#1A1F2A99' : 'transparent',
                outline: isSelected ? `1px solid ${BORDER}` : 'none',
              }}
            >
              <span className="mono text-sm font-semibold text-left" style={{ width: '52px', color: isNow ? TEXT : MUTED }}>
                {pad(p.hour)}:00
              </span>
              <div className="flex-1 h-3 rounded-sm" style={{ backgroundColor: INK }}>
                <div className="h-full rounded-sm" style={{ width: `${widthPct}%`, backgroundColor: color, opacity: isNow || isSelected ? 1 : 0.85 }} />
              </div>
              <span className="mono text-sm text-right" style={{ width: '72px', color: TEXT }}>
                {fmt3(p.price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- countdown helper ---------- */
function useCountdownTo2015(now) {
  const mp = madridParts(now);
  const h = parseInt(mp.hour, 10);
  const m = parseInt(mp.minute, 10);
  const targetH = 20;
  const targetM = 15;
  if (h > targetH || (h === targetH && m >= targetM)) return null; // ya pasó
  const totalNow = h * 60 + m;
  const totalTarget = targetH * 60 + targetM;
  const diff = totalTarget - totalNow;
  const rh = Math.floor(diff / 60);
  const rm = diff % 60;
  if (rh > 0) return `${rh}h ${pad(rm)}min`;
  return `${rm} min`;
}

/* ---------- App ---------- */
export default function Vatio() {
  const [region, setRegion] = useState('8741');
  const [viewDay, setViewDay] = useState('today');
  const [chartView, setChartView] = useState('chart');
  const [taxesOn, setTaxesOn] = useState(false);
  const [ivaRate, setIvaRate] = useState(0.21);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [tomorrowAvailable, setTomorrowAvailable] = useState(null); // null=checking, true, false
  const reqId = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const todayStr = madridDateStr(now);
  const tomorrowStr = addDaysToDateStr(todayStr, 1);
  const dateStr = viewDay === 'today' ? todayStr : tomorrowStr;
  const cacheKey = `${region}_${dateStr}`;
  const tomorrowCacheKey = `${region}_${tomorrowStr}`;

  const countdown = useCountdownTo2015(now);

  const load = useCallback((key, ds, geo) => {
    setError(null);
    setLoading(true);
    const myReq = ++reqId.current;
    fetchDay(ds, geo)
      .then(data => {
        if (myReq !== reqId.current) return;
        setCache(c => ({ ...c, [key]: data }));
        setLastFetch(new Date());
        setLoading(false);
      })
      .catch(e => {
        if (myReq !== reqId.current) return;
        setError(e.message === 'no_data' ? 'no_data' : 'fetch_error');
        setLoading(false);
      });
  }, []);

  /* silently pre-check tomorrow */
  const checkTomorrow = useCallback((geo, tmStr, tmKey) => {
    if (!tmStr) return;
    fetchDay(tmStr, geo)
      .then(data => {
        setCache(c => ({ ...c, [tmKey]: data }));
        setTomorrowAvailable(true);
      })
      .catch(() => {
        setTomorrowAvailable(false);
      });
  }, []);

  /* on mount + when region changes: fetch today + silently probe tomorrow */
  useEffect(() => {
    setSelectedIdx(null);
    setTomorrowAvailable(null);
    if (!cache[`${region}_${todayStr}`]) {
      load(`${region}_${todayStr}`, todayStr, region);
    } else {
      setLoading(false);
      setError(null);
    }
    checkTomorrow(region, tomorrowStr, `${region}_${tomorrowStr}`);
    // eslint-disable-next-line
  }, [region, todayStr]);

  /* re-check tomorrow availability every 5 min after 19:45 */
  useEffect(() => {
    const mp = madridParts(now);
    const h = parseInt(mp.hour, 10);
    if (h < 19 || tomorrowAvailable === true) return;
    const t = setInterval(() => {
      checkTomorrow(region, tomorrowStr, tomorrowCacheKey);
    }, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, [now, region, tomorrowStr, tomorrowCacheKey, tomorrowAvailable, checkTomorrow]);

  /* when switching tabs */
  useEffect(() => {
    setSelectedIdx(null);
    if (cache[cacheKey]) {
      setLoading(false);
      setError(null);
      return;
    }
    if (viewDay === 'tomorrow' && tomorrowAvailable === false) {
      setLoading(false);
      setError('no_data');
      return;
    }
    load(cacheKey, dateStr, region);
    // eslint-disable-next-line
  }, [cacheKey]);

  /* auto-refresh current view every 10 min */
  useEffect(() => {
    const t = setInterval(() => load(cacheKey, dateStr, region), 10 * 60 * 1000);
    return () => clearInterval(t);
  }, [cacheKey, dateStr, region, load]);

  const rawData = cache[cacheKey];

  const prices = useMemo(() => {
    if (!rawData) return null;
    return rawData.map(d => ({
      hour: d.hour,
      price: taxesOn ? d.priceRaw * (1 + IE_RATE) * (1 + ivaRate) : d.priceRaw,
    }));
  }, [rawData, taxesOn, ivaRate]);

  const stats = useMemo(() => {
    if (!prices || !prices.length) return null;
    let min = prices[0], max = prices[0], sum = 0;
    prices.forEach(p => {
      if (p.price < min.price) min = p;
      if (p.price > max.price) max = p;
      sum += p.price;
    });
    return { min, max, avg: sum / prices.length };
  }, [prices]);

  const nowHour = parseInt(madridParts(now).hour, 10);
  const nowMinute = madridParts(now).minute;
  const currentIdx = prices ? prices.findIndex(p => p.hour === nowHour) : -1;
  const activeIdx = selectedIdx !== null ? selectedIdx : (viewDay === 'today' ? currentIdx : null);
  const activePrice = activeIdx !== null && activeIdx >= 0 && prices ? prices[activeIdx] : null;

  const displayedPrice = activePrice ? activePrice.price : (stats ? stats.avg : null);
  const ratio = stats && displayedPrice != null && stats.max.price !== stats.min.price
    ? (displayedPrice - stats.min.price) / (stats.max.price - stats.min.price)
    : 0.5;
  const status = statusForRatio(ratio);
  const heroColor = colorForRatio(ratio);
  const delta = activePrice && stats ? ((activePrice.price - stats.avg) / stats.avg) * 100 : null;

  const bestWindows = useMemo(() => {
    if (!prices || !stats) return {};
    const startIdx = viewDay === 'today' && currentIdx >= 0 ? currentIdx : 0;
    const out = {};
    APPLIANCES.forEach(a => {
      if (prices.length < a.duration) return;
      const from = (prices.length - startIdx >= a.duration) ? startIdx : 0;
      let best = null;
      for (let i = from; i <= prices.length - a.duration; i++) {
        let sum = 0;
        for (let j = i; j < i + a.duration; j++) sum += prices[j].price;
        const avg = sum / a.duration;
        if (!best || avg < best.avg) best = { start: i, avg, startHour: prices[i].hour };
      }
      out[a.id] = best ? { ...best, future: best.start >= startIdx } : null;
    });
    return out;
  }, [prices, stats, viewDay, currentIdx]);

  const minutesAgo = lastFetch ? Math.max(0, Math.round((now.getTime() - lastFetch.getTime()) / 60000)) : null;
  const regionLabel = (GEOS.find(g => g.id === region) || {}).label || 'Península';

  const tomorrowTabLabel = useMemo(() => {
    if (tomorrowAvailable === true) return 'Mañana';
    if (tomorrowAvailable === false && countdown) return `Mañana · ${countdown}`;
    return 'Mañana';
  }, [tomorrowAvailable, countdown]);

  return (
    <div className="w-full flex justify-center" style={{ backgroundColor: INK }}>
      <div className="w-full px-4 py-5" style={{ color: TEXT }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconZap size={20} color={MID} />
            <span className="mono text-base font-bold tracking-wide">VATIO</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="text-sm font-medium bg-transparent focus:outline-none pr-1"
              style={{ color: TEXT, appearance: 'none', WebkitAppearance: 'none' }}
              aria-label="Zona eléctrica"
            >
              {GEOS.map(g => <option key={g.id} value={g.id} style={{ backgroundColor: SURFACE }}>{g.label}</option>)}
            </select>
            <IconChevronDown size={13} color={MUTED} />
          </div>
        </div>

        {/* Day toggle */}
        <div className="flex gap-1 mt-4 p-1 rounded-full" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
          <SegButton active={viewDay === 'today'} onClick={() => setViewDay('today')}>Hoy</SegButton>
          <SegButton active={viewDay === 'tomorrow'} onClick={() => setViewDay('tomorrow')}>
            {tomorrowTabLabel}
            {tomorrowAvailable === true && (
              <span className="inline-block ml-1.5 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CHEAP, verticalAlign: 'middle' }} />
            )}
          </SegButton>
        </div>

        {/* Hero */}
        <div className="rounded-2xl mt-4 p-5 text-center" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
          {loading && !prices && (
            <div className="animate-pulse space-y-3">
              <div className="h-3 w-24 mx-auto rounded" style={{ backgroundColor: BORDER }} />
              <div className="h-10 w-40 mx-auto rounded" style={{ backgroundColor: BORDER }} />
              <div className="h-3 w-32 mx-auto rounded" style={{ backgroundColor: BORDER }} />
            </div>
          )}

          {!loading && error && !prices && (
            <div className="py-4">
              {error === 'no_data' && viewDay === 'tomorrow' ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-full p-3" style={{ backgroundColor: INK }}>
                    <IconClock size={28} color={MID} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: TEXT }}>
                      Precios de mañana aún no disponibles
                    </p>
                    {countdown ? (
                      <p className="text-sm mt-1.5" style={{ color: MUTED }}>
                        REE los publica sobre las 20:15h.
                        <br />
                        <span className="mono font-semibold" style={{ color: MID }}>Faltan ~{countdown}</span>
                      </p>
                    ) : (
                      <p className="text-sm mt-1.5" style={{ color: MUTED }}>
                        Ya deberían estar publicados. A veces se retrasan unos minutos.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setTomorrowAvailable(null);
                      checkTomorrow(region, tomorrowStr, tomorrowCacheKey);
                      load(cacheKey, dateStr, region);
                    }}
                    className="text-sm font-medium rounded-full px-5 py-2 focus:outline focus:outline-2 mt-1"
                    style={{ backgroundColor: TEXT, color: INK }}
                  >
                    Comprobar ahora
                  </button>
                </div>
              ) : error === 'no_data' ? (
                <div className="flex flex-col items-center gap-3">
                  <IconClock size={22} color={MUTED} />
                  <p className="text-sm" style={{ color: MUTED }}>Todavía no hay datos disponibles para hoy.</p>
                  <button
                    onClick={() => load(cacheKey, dateStr, region)}
                    className="text-sm font-medium rounded-full px-4 py-1.5 focus:outline focus:outline-2"
                    style={{ backgroundColor: TEXT, color: INK }}
                  >
                    Reintentar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <IconAlertCircle size={22} color={EXPENSIVE} />
                  <p className="text-sm" style={{ color: MUTED }}>No se han podido cargar los precios. Comprueba tu conexión.</p>
                  <button
                    onClick={() => load(cacheKey, dateStr, region)}
                    className="text-sm font-medium rounded-full px-4 py-1.5 focus:outline focus:outline-2"
                    style={{ backgroundColor: TEXT, color: INK }}
                  >
                    Reintentar
                  </button>
                </div>
              )}
            </div>
          )}

          {prices && stats && (
            <>
              <div className="flex items-center justify-center gap-2">
                {viewDay === 'today' && selectedIdx === null && (
                  <span className="relative flex h-2 w-2">
                    <span className="pulse-dot absolute inline-flex h-full w-full rounded-full" style={{ backgroundColor: heroColor }} />
                  </span>
                )}
                <span className="mono text-xs uppercase tracking-widest" style={{ color: MUTED }}>
                  {viewDay === 'today' && selectedIdx === null
                    ? `Ahora · ${pad(nowHour)}:${nowMinute}`
                    : activePrice
                      ? `${pad(activePrice.hour)}:00–${pad((activePrice.hour + 1) % 24)}:00`
                      : 'Media prevista de mañana'}
                </span>
                {selectedIdx !== null && (
                  <button onClick={() => setSelectedIdx(null)} aria-label="Quitar selección" className="focus:outline focus:outline-2 rounded-full">
                    <IconX size={13} color={MUTED} />
                  </button>
                )}
              </div>

              <div className="mono text-5xl font-bold mt-2" style={{ color: TEXT, textShadow: `0 0 28px ${heroColor}55` }}>
                {fmt4(displayedPrice)}
              </div>
              <div className="text-sm" style={{ color: MUTED }}>€/kWh</div>

              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-xs font-semibold rounded-full px-2.5 py-1" style={{ backgroundColor: `${heroColor}22`, color: heroColor }}>
                  {status.label}
                </span>
                {delta != null && (
                  <span className="flex items-center gap-1 text-xs" style={{ color: MUTED }}>
                    {delta >= 0 ? <IconTrendingUp size={12} /> : <IconTrendingDown size={12} />}
                    {Math.abs(Math.round(delta))}% {delta >= 0 ? 'más cara' : 'más barata'} que la media
                  </span>
                )}
              </div>

              <button
                onClick={() => setSettingsOpen(s => !s)}
                className="text-xs mt-4 underline decoration-dotted focus:outline focus:outline-2 rounded"
                style={{ color: MUTED }}
              >
                {taxesOn ? `Con impuestos (IVA ${Math.round(ivaRate * 100)}%)` : 'Sin impuestos'} · ajustar
              </button>

              {settingsOpen && (
                <div className="mt-3 text-left rounded-xl p-3 space-y-3" style={{ backgroundColor: INK, border: `1px solid ${BORDER}` }}>
                  <div>
                    <div className="text-xs mb-1.5" style={{ color: MUTED }}>Impuestos</div>
                    <div className="flex gap-1 p-1 rounded-full" style={{ backgroundColor: SURFACE }}>
                      <SegButton active={!taxesOn} onClick={() => setTaxesOn(false)}>Sin</SegButton>
                      <SegButton active={taxesOn} onClick={() => setTaxesOn(true)}>Con</SegButton>
                    </div>
                  </div>
                  {taxesOn && (
                    <div>
                      <div className="text-xs mb-1.5" style={{ color: MUTED }}>Tipo de IVA</div>
                      <div className="flex gap-1 p-1 rounded-full" style={{ backgroundColor: SURFACE }}>
                        <SegButton active={ivaRate === 0.21} onClick={() => setIvaRate(0.21)}>21%</SegButton>
                        <SegButton active={ivaRate === 0.10} onClick={() => setIvaRate(0.10)}>10%</SegButton>
                      </div>
                    </div>
                  )}
                  <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
                    El precio base es el PVPC publicado por Red Eléctrica (REData/ESIOS), antes de impuestos.
                    Aquí se le suma el impuesto eléctrico (5,11%) y el IVA que elijas. España aplicó un IVA
                    reducido del 10% de forma temporal en distintos periodos: confirma en tu factura cuál te
                    aplican. Desde finales de septiembre de 2025 el mercado fija un precio cada 15 minutos,
                    pero la factura doméstica se sigue calculando con la media horaria, que es lo que se
                    muestra aquí.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Stats */}
        {prices && stats && (
          <div className="flex gap-2 mt-3">
            <StatTile label="Mínimo" value={fmt3(stats.min.price)} sub={`${pad(stats.min.hour)}:00h`} />
            <StatTile label="Media" value={fmt3(stats.avg)} sub="el día" />
            <StatTile label="Máximo" value={fmt3(stats.max.price)} sub={`${pad(stats.max.hour)}:00h`} />
          </div>
        )}

        {/* Chart / List */}
        {prices && stats && (
          <div className="rounded-2xl mt-3 p-4" style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between mb-3 gap-2">
              <div className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>
                Precio por horas · {regionLabel}
              </div>
              <div className="flex gap-1 p-0.5 rounded-full" style={{ backgroundColor: INK, border: `1px solid ${BORDER}` }}>
                <button
                  onClick={() => setChartView('chart')}
                  className="text-xs font-medium px-2.5 py-1 rounded-full focus:outline focus:outline-2"
                  style={{ backgroundColor: chartView === 'chart' ? TEXT : 'transparent', color: chartView === 'chart' ? INK : MUTED }}
                >
                  Gráfico
                </button>
                <button
                  onClick={() => setChartView('list')}
                  className="text-xs font-medium px-2.5 py-1 rounded-full focus:outline focus:outline-2"
                  style={{ backgroundColor: chartView === 'list' ? TEXT : 'transparent', color: chartView === 'list' ? INK : MUTED }}
                >
                  Lista
                </button>
              </div>
            </div>

            {chartView === 'chart' ? (
              <ChartView prices={prices} stats={stats} currentIdx={currentIdx} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} viewDay={viewDay} />
            ) : (
              <ListView prices={prices} stats={stats} currentIdx={currentIdx} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} viewDay={viewDay} />
            )}
          </div>
        )}

        {/* Appliances */}
        {prices && stats && (
          <div className="mt-4">
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: MUTED }}>Mejor momento para…</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {APPLIANCES.map(a => {
                const best = bestWindows[a.id];
                if (!best) return null;
                const noteLabel = viewDay === 'tomorrow' ? 'mañana' : (best.future ? 'a partir de ahora' : 'mejor franja del día');
                return <ApplianceCard key={a.id} appliance={a} best={best} dayAvg={stats.avg} noteLabel={noteLabel} />;
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 px-1">
          <p className="text-xs leading-snug" style={{ color: MUTED }}>
            Datos oficiales de Red Eléctrica de España (REData/ESIOS).
            {minutesAgo != null && <> Actualizado hace {minutesAgo < 1 ? 'instantes' : `${minutesAgo} min`}.</>}
          </p>
          <button
            onClick={() => load(cacheKey, dateStr, region)}
            aria-label="Actualizar precios"
            className="p-2 rounded-full focus:outline focus:outline-2 ml-2"
            style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}` }}
          >
            <span className={loading ? 'spin' : ''} style={{ color: MUTED, display: 'inline-flex' }}>
              <IconRefresh size={16} color={MUTED} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
