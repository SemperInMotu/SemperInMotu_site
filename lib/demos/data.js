function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WEEKS = Array.from({ length: 26 }, (_, i) => `2026-W${String(i + 1).padStart(2, '0')}`);
const MONTHS = ['2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'];

const CITIES = {
  MSQ: { id: 'MSQ', name: 'Minsk', lng: 27.56, lat: 53.9 },
  WAW: { id: 'WAW', name: 'Warsaw', lng: 21.01, lat: 52.23 },
  BQT: { id: 'BQT', name: 'Brest', lng: 23.69, lat: 52.1 },
  POZ: { id: 'POZ', name: 'Poznan', lng: 16.93, lat: 52.41 },
  VNO: { id: 'VNO', name: 'Vilnius', lng: 25.28, lat: 54.69 },
  BER: { id: 'BER', name: 'Berlin', lng: 13.4, lat: 52.52 },
  KUN: { id: 'KUN', name: 'Kaunas', lng: 23.9, lat: 54.9 },
  PRG: { id: 'PRG', name: 'Prague', lng: 14.44, lat: 50.08 },
  GNA: { id: 'GNA', name: 'Grodno', lng: 23.83, lat: 53.68 },
  KTW: { id: 'KTW', name: 'Katowice', lng: 19.02, lat: 50.26 },
  HAM: { id: 'HAM', name: 'Hamburg', lng: 9.99, lat: 53.55 },
};

const LANES = [
  { id: 'MSQ–WAW', from: 'MSQ', to: 'WAW', late: 0.17, vol: 1.15 },
  { id: 'BQT–POZ', from: 'BQT', to: 'POZ', late: 0.13, vol: 0.95 },
  { id: 'VNO–BER', from: 'VNO', to: 'BER', late: 0.21, vol: 1.05 },
  { id: 'KUN–PRG', from: 'KUN', to: 'PRG', late: 0.15, vol: 0.88 },
  { id: 'GNA–KTW', from: 'GNA', to: 'KTW', late: 0.19, vol: 0.92 },
  { id: 'MSQ–HAM', from: 'MSQ', to: 'HAM', late: 0.41, vol: 0.78 },
];

const MODES = [
  { id: 'FTL', late: 0.72, vol: 1.1 },
  { id: 'LTL', late: 1.05, vol: 1 },
  { id: 'Groupage', late: 1.12, vol: 0.85 },
  { id: 'Express', late: 1.55, vol: 0.7 },
];

const CUSTOMERS = ['Nordholz Sp. z o.o.', 'Baltikum Trade UAB', 'Silezia Parts', 'Hanse Cargo', 'Vistula Foods', 'Amber Components'];

function buildLogistics() {
  const r = rng(20260901);
  const rows = [];
  for (const week of WEEKS) {
    const wi = Number(week.slice(-2));
    const season = 1 + 0.08 * Math.sin((wi / 26) * Math.PI * 2);
    for (const lane of LANES) {
      for (const mode of MODES) {
        const extra = lane.id === 'MSQ–HAM' && mode.id === 'Express' ? 1.35 : 1;
        const hauls = Math.max(4, Math.round((18 + r() * 14) * lane.vol * mode.vol * season));
        const lateP = Math.min(0.72, lane.late * mode.late * extra * (0.9 + r() * 0.2));
        const late = Math.round(hauls * lateP);
        const onTime = hauls - late;
        const delayDays = late === 0 ? 0 : +(1.1 + r() * 3.2 * (lane.id === 'MSQ–HAM' ? 1.6 : 1)).toFixed(2);
        const revenue = Math.round(hauls * (920 + r() * 480) * (mode.id === 'Express' ? 1.45 : 1));
        const customer = CUSTOMERS[Math.floor(r() * CUSTOMERS.length)];
        rows.push({
          week,
          lane: lane.id,
          mode: mode.id,
          from: lane.from,
          to: lane.to,
          customer,
          hauls,
          onTime,
          late,
          delayDays,
          revenue,
          utilized: +(0.62 + r() * 0.28).toFixed(3),
        });
      }
    }
  }
  return {
    rows,
    cities: CITIES,
    lanes: LANES,
    dims: { lane: LANES.map((l) => l.id), mode: MODES.map((m) => m.id) },
    insightFilter: { lane: 'MSQ–HAM' },
  };
}

function buildRetail() {
  const r = rng(77411);
  const chains = [
    { id: 'Nordline', yoy: -0.018, gm: 0.278, sqm: 0.82, share: 0.68 },
    { id: 'Atelier', yoy: 0.12, gm: 0.364, sqm: 1.28, share: 0.32 },
  ];
  const cats = [
    { id: 'Womens', yoy: -0.041, ret: 0.092 },
    { id: 'Mens', yoy: 0.03, ret: 0.054 },
    { id: 'Home', yoy: 0.07, ret: 0.038 },
    { id: 'Beauty', yoy: 0.11, ret: 0.061 },
  ];
  const districts = [
    { id: 'WAW-01', city: 'Warsaw', chain: 'Nordline', new: false, sqm: 820 },
    { id: 'WAW-02', city: 'Warsaw', chain: 'Atelier', new: false, sqm: 410 },
    { id: 'POZ-01', city: 'Poznan', chain: 'Nordline', new: false, sqm: 640 },
    { id: 'VNO-01', city: 'Vilnius', chain: 'Nordline', new: true, sqm: 510 },
    { id: 'KUN-01', city: 'Kaunas', chain: 'Atelier', new: true, sqm: 280 },
    { id: 'PRG-01', city: 'Prague', chain: 'Atelier', new: false, sqm: 360 },
    { id: 'WRO-01', city: 'Wroclaw', chain: 'Nordline', new: false, sqm: 700 },
    { id: 'GDN-01', city: 'Gdansk', chain: 'Nordline', new: true, sqm: 480 },
  ];
  const rows = [];
  for (const month of MONTHS) {
    const mi = MONTHS.indexOf(month);
    const season = 1 + (month.endsWith('11') || month.endsWith('12') ? 0.22 : 0) + (month.endsWith('01') ? -0.08 : 0);
    for (const d of districts) {
      const chain = chains.find((c) => c.id === d.chain);
      for (const cat of cats) {
        const base = d.sqm * 42 * chain.share * (0.85 + r() * 0.3) * season;
        const sales = Math.round(base * (cat.id === 'Womens' ? 1.25 : 0.85) * (d.new && mi < 4 ? mi / 4 : 1));
        const ly = Math.round(sales / (1 + chain.yoy + cat.yoy + (r() - 0.5) * 0.04));
        const profit = Math.round(sales * chain.gm * (0.9 + r() * 0.15));
        const returns = Math.round(sales * cat.ret * (d.chain === 'Nordline' && cat.id === 'Womens' ? 1.25 : 1));
        rows.push({
          month,
          district: d.id,
          city: d.city,
          chain: d.chain,
          category: cat.id,
          newStore: d.new,
          sqm: d.sqm,
          sales,
          ly,
          profit,
          returns,
        });
      }
    }
  }
  return {
    rows,
    dims: { chain: chains.map((c) => c.id), category: cats.map((c) => c.id) },
    insightFilter: { chain: 'Nordline' },
    storeCount: { total: 42, neu: 6 },
  };
}

function buildManufacturing() {
  const r = rng(33001);
  const centers = [
    { id: 'Press', avail: 0.9, mttr: 0.7 },
    { id: 'Weld', avail: 0.86, mttr: 1.1 },
    { id: 'Paint', avail: 0.71, mttr: 2.4 },
    { id: 'Assemble', avail: 0.84, mttr: 1.0 },
    { id: 'Pack', avail: 0.91, mttr: 0.5 },
  ];
  const causes = [
    { id: 'Material delay', defect: 1.4, down: 0.25 },
    { id: 'Prep', defect: 1.1, down: 0.45 },
    { id: 'Plan change', defect: 0.9, down: 0.7 },
    { id: 'Quality', defect: 0.85, down: 1.6 },
    { id: 'Labor', defect: 0.7, down: 0.9 },
    { id: 'Mold', defect: 0.35, down: 1.2 },
  ];
  const rows = [];
  for (const week of WEEKS) {
    for (const c of centers) {
      for (const cause of causes) {
        const planned = 2400;
        const downMin = Math.round((1 - c.avail) * planned * 60 * cause.down * (0.7 + r() * 0.6) * (c.id === 'Paint' && cause.id === 'Quality' ? 1.8 : 1));
        const runMin = planned * 60 - downMin;
        const good = Math.round((380 + r() * 40) * c.avail);
        const defect = Math.max(2, Math.round(good * 0.032 * cause.defect * (c.id === 'Paint' ? 0.7 : 1)));
        const mtbf = +(6 + r() * 5 * c.avail).toFixed(2);
        const mttr = +(c.mttr * (0.85 + r() * 0.35)).toFixed(2);
        rows.push({
          week,
          center: c.id,
          cause: cause.id,
          good,
          defect,
          runMin,
          downMin,
          mtbf,
          mttr,
        });
      }
    }
  }
  return {
    rows,
    dims: { center: centers.map((c) => c.id), cause: causes.map((c) => c.id) },
    insightFilter: { center: 'Paint' },
  };
}

function buildEcommerce() {
  const r = rng(91002);
  const channels = [
    { id: 'Site', conv: 0.028, refund: 0.041, otif: 0.96, aov: 52 },
    { id: 'Marketplace', conv: 0.019, refund: 0.094, otif: 0.89, aov: 41 },
    { id: 'Social', conv: 0.012, refund: 0.071, otif: 0.92, aov: 38 },
  ];
  const dcs = [
    { id: 'Warsaw DC', pick: 7, sla: 1.08 },
    { id: 'Minsk DC', pick: 14, sla: 0.86 },
  ];
  const rows = [];
  for (const week of WEEKS) {
    const wi = Number(week.slice(-2));
    const season = 1 + (wi >= 20 && wi <= 24 ? 0.18 : 0);
    for (const ch of channels) {
      for (const dc of dcs) {
        const sessions = Math.round((18000 + r() * 6000) * season * (ch.id === 'Marketplace' ? 1.4 : 1));
        const orders = Math.round(sessions * ch.conv * (0.9 + r() * 0.2));
        const aov = ch.aov * (0.92 + r() * 0.16);
        const gmv = Math.round(orders * aov);
        const refunds = Math.round(orders * ch.refund * (dc.id === 'Minsk DC' ? 1.2 : 0.9));
        const pickHrs = +(dc.pick * (0.85 + r() * 0.3) * (ch.id === 'Marketplace' ? 1.15 : 1)).toFixed(2);
        const otifN = Math.round(orders * ch.otif * dc.sla * (0.96 + r() * 0.05));
        rows.push({
          week,
          channel: ch.id,
          dc: dc.id,
          sessions,
          orders,
          gmv,
          refunds,
          pickHrs,
          onTime: Math.min(orders, otifN),
        });
      }
    }
  }
  const skus = [
    ['Linen throw', 0.42, 18],
    ['Ceramic mug', 0.31, 42],
    ['Wool beanie', 0.48, 11],
    ['Desk lamp', 0.22, 9],
    ['Tote bag', 0.37, 33],
    ['Candle set', 0.51, 14],
    ['Phone stand', 0.18, 27],
    ['Linen shirt', 0.29, 16],
    ['Yoga mat', 0.34, 12],
    ['Tea tin', 0.44, 21],
    ['Wool socks', 0.39, 24],
    ['Notebook', 0.55, 19],
    ['Plant pot', 0.26, 8],
    ['Rain jacket', 0.17, 7],
    ['Espresso cups', 0.46, 13],
    ['Wall clock', 0.21, 6],
    ['Silk scrunchie', 0.58, 15],
    ['Floor vase', 0.12, 4],
  ].map(([name, margin, vol], i) => ({
    sku: name,
    margin,
    volume: Math.round(vol * (8 + rng(i + 3)() * 4)),
    channel: i % 3 === 0 ? 'Marketplace' : 'Site',
  }));
  return {
    rows,
    skus,
    dims: { channel: channels.map((c) => c.id), dc: dcs.map((d) => d.id) },
    insightFilter: { dc: 'Minsk DC' },
  };
}

let cache;
export function getPack(id) {
  if (!cache) {
    cache = {
      logistics: buildLogistics(),
      retail: buildRetail(),
      manufacturing: buildManufacturing(),
      ecommerce: buildEcommerce(),
    };
  }
  return cache[id];
}
