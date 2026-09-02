import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart, ScatterChart, FunnelChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { detectLang, localePrefix } from './locale.js';
import { DEMOS, I18N } from './i18n.js';
import { getPack } from './data.js';

echarts.use([BarChart, LineChart, PieChart, ScatterChart, FunnelChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const INK = '#0e1412';
const MUTED = '#5c6a64';
const COPPER = '#b87333';
const OPS = '#1a3d52';
const LINE = 'rgba(14, 20, 18, 0.14)';
const PAPER = '#f7f9f8';

const euro = (n) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const num = (n) => new Intl.NumberFormat('en-IE', { maximumFractionDigits: 0 }).format(n);

function t(lang) {
  return I18N[lang] || I18N.en;
}

function rowsOf(pack, filters) {
  return pack.rows.filter((row) =>
    Object.entries(filters).every(([k, v]) => !v || row[k] === v),
  );
}

function sum(rows, key) {
  return rows.reduce((a, r) => a + (r[key] || 0), 0);
}

function avg(rows, key) {
  if (!rows.length) return 0;
  return sum(rows, key) / rows.length;
}

function group(rows, key, metrics) {
  const map = new Map();
  for (const row of rows) {
    const id = row[key];
    if (!map.has(id)) map.set(id, []);
    map.get(id).push(row);
  }
  return [...map.entries()].map(([id, rs]) => {
    const out = { id };
    for (const [name, fn] of Object.entries(metrics)) out[name] = fn(rs);
    return out;
  });
}

function baseChart() {
  return {
    textStyle: { fontFamily: 'IBM Plex Sans, system-ui, sans-serif', color: INK },
    grid: { left: 44, right: 18, top: 28, bottom: 36 },
    tooltip: { trigger: 'axis', backgroundColor: PAPER, borderColor: LINE, textStyle: { color: INK } },
    axisPointer: { lineStyle: { color: COPPER } },
  };
}

function axis() {
  return {
    axisLine: { lineStyle: { color: LINE } },
    axisTick: { show: false },
    axisLabel: { color: MUTED, fontSize: 11 },
    splitLine: { lineStyle: { color: LINE } },
  };
}

export function mountDemo(id) {
  const lang = detectLang();
  const prefix = localePrefix(lang);
  const copy = t(lang);
  const root = document.querySelector('[data-demo-root]');
  if (!root) return;

  if (id === 'index') {
    root.innerHTML = renderIndex(copy, lang, prefix);
    return;
  }

  const pack = getPack(id);
  const d = copy[id];
  const state = { ...Object.fromEntries(Object.keys(pack.dims).map((k) => [k, null])) };
  const charts = {};

  root.innerHTML = `
    <section class="page-hero ops demo-hero">
      <div class="wrap">
        <div class="eyebrow ops">${d.eyebrow}</div>
        <h1>${d.title}</h1>
        <p class="lead">${d.lead}</p>
        <div class="demo-nav">${DEMOS.map((demo) => {
          const href = `${prefix}/ops/demos/${demo.href}`;
          const current = demo.id === id ? ' aria-current="page"' : '';
          return `<a href="${href}"${current}>${demo.title[lang] || demo.title.en}</a>`;
        }).join('')}<a href="${prefix}/ops/demos/">${copy.gallery}</a></div>
      </div>
    </section>
    <section class="section-tight demo-body">
      <div class="wrap">
        <p class="demo-banner"><strong>${copy.synthetic}</strong> ${copy.grain}</p>
        <button class="demo-insight" type="button" data-insight>
          <strong>${d.insightTitle}</strong>
          <span>${d.insightBody}</span>
          <em>${d.insightFilter}</em>
        </button>
        <p class="fine demo-hint">${copy.click}</p>
        <div class="demo-kpis" data-kpis></div>
        <div class="demo-filters" data-filters></div>
        <div class="demo-grid" data-grid></div>
        <div class="demo-cta">
          <a class="btn btn-ink" href="${prefix}/contact/?topic=data-dwh">${copy.cta}</a>
          <a class="btn btn-line" href="${prefix}/ops/data/">${copy.how} →</a>
        </div>
      </div>
    </section>
  `;

  const grid = root.querySelector('[data-grid]');
  const chartIds = chartLayout(id);
  grid.innerHTML = chartIds
    .map(
      (cid) =>
        `<div class="demo-panel"><h3 data-chart-title="${cid}"></h3><div class="demo-plot" data-plot="${cid}"></div></div>`,
    )
    .join('');

  chartIds.forEach((cid) => {
    const el = grid.querySelector(`[data-plot="${cid}"]`);
    charts[cid] = echarts.init(el, null, { renderer: 'canvas' });
    charts[cid].on('click', (ev) => onChartClick(id, ev, state, pack, render));
  });

  root.querySelector('[data-insight]').addEventListener('click', () => {
    const next = pack.insightFilter;
    const key = Object.keys(next)[0];
    state[key] = state[key] === next[key] ? null : next[key];
    render();
  });

  function render() {
    const filtered = rowsOf(pack, state);
    paintKpis(id, root.querySelector('[data-kpis]'), d, filtered, pack, copy);
    paintFilters(root.querySelector('[data-filters]'), pack, d, state, copy, render);
    paintTitles(root, d);
    paintCharts(id, charts, filtered, pack, state, d, copy);
  }

  render();
  window.addEventListener('resize', () => Object.values(charts).forEach((c) => c.resize()));
}

function renderIndex(copy, lang, prefix) {
  const d = copy.index;
  return `
    <section class="page-hero ops">
      <div class="wrap">
        <div class="eyebrow ops">${d.eyebrow}</div>
        <h1>${d.title}</h1>
        <p class="lead">${d.lead}</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap grid-2">
        ${DEMOS.map(
          (demo) => `
          <a class="card ops-card" href="${prefix}/ops/demos/${demo.href}">
            <h3>${demo.title[lang] || demo.title.en}</h3>
            <p>${demo.blurb[lang] || demo.blurb.en}</p>
            <span class="more">${copy.open}</span>
          </a>`,
        ).join('')}
      </div>
      <div class="wrap" style="margin-top:1.25rem">
        <p class="fine">${copy.synthetic} ${copy.grain}</p>
        <div class="demo-cta" style="margin-top:1rem">
          <a class="btn btn-ink" href="${prefix}/contact/?topic=data-dwh">${copy.cta}</a>
          <a class="btn btn-line" href="${prefix}/ops/data/">${copy.how} →</a>
        </div>
      </div>
    </section>
  `;
}

function chartLayout(id) {
  return {
    logistics: ['lanes', 'weekly', 'mode', 'customers'],
    retail: ['trend', 'mix', 'bubble', 'stores'],
    manufacturing: ['water', 'cause', 'reliability', 'load'],
    ecommerce: ['gmv', 'funnel', 'sla', 'sku'],
  }[id];
}

function paintTitles(root, d) {
  root.querySelectorAll('[data-chart-title]').forEach((el) => {
    el.textContent = d.charts[el.getAttribute('data-chart-title')];
  });
}

function paintFilters(el, pack, d, state, copy, render) {
  const chips = Object.entries(pack.dims)
    .map(([dim, values]) => {
      const all = `<button type="button" class="${!state[dim] ? 'is-on' : ''}" data-dim="${dim}" data-val="">${copy.reset}</button>`;
      const rest = values
        .map(
          (v) =>
            `<button type="button" class="${state[dim] === v ? 'is-on' : ''}" data-dim="${dim}" data-val="${v}">${v}</button>`,
        )
        .join('');
      return `<div class="demo-filter"><span>${d.filters[dim]}</span><div>${all}${rest}</div></div>`;
    })
    .join('');
  el.innerHTML = chips;
  el.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dim = btn.getAttribute('data-dim');
      const val = btn.getAttribute('data-val');
      state[dim] = val || null;
      render();
    });
  });
}

function kpi(value, label) {
  return `<div class="demo-kpi"><b>${value}</b><span>${label}</span></div>`;
}

function paintKpis(id, el, d, rows, pack, copy) {
  if (id === 'logistics') {
    const hauls = sum(rows, 'hauls');
    const late = sum(rows, 'late');
    const onTime = sum(rows, 'onTime');
    const otif = hauls ? onTime / hauls : 0;
    const delayW = rows.reduce((a, r) => a + r.delayDays * r.late, 0);
    const delay = late ? delayW / late : 0;
    const risk = rows.reduce((a, r) => a + (r.late / Math.max(1, r.hauls)) * r.revenue, 0);
    const util = avg(rows, 'utilized');
    el.innerHTML = [
      kpi(pct(otif), d.kpis.otif),
      kpi(pct(hauls ? late / hauls : 0), d.kpis.late),
      kpi(`${delay.toFixed(1)}${d.days}`, d.kpis.delay),
      kpi(euro(risk), d.kpis.risk),
      kpi(num(hauls), d.kpis.hauls),
      kpi(pct(util), d.kpis.util),
    ].join('');
    return;
  }
  if (id === 'retail') {
    const sales = sum(rows, 'sales');
    const ly = sum(rows, 'ly');
    const profit = sum(rows, 'profit');
    const returns = sum(rows, 'returns');
    const sqm = [...new Set(rows.map((r) => r.district))].reduce((a, id) => {
      const sample = rows.find((r) => r.district === id);
      return a + (sample?.sqm || 0);
    }, 0);
    el.innerHTML = [
      kpi(euro(sales), d.kpis.sales),
      kpi(ly ? pct((sales - ly) / ly) : '—', d.kpis.yoy),
      kpi(sales ? pct(profit / sales) : '—', d.kpis.gm),
      kpi(sqm ? euro(sales / sqm) : '—', d.kpis.sqm),
      kpi(`${pack.storeCount.total} (${pack.storeCount.neu})`, d.kpis.stores),
      kpi(sales ? pct(returns / sales) : '—', d.kpis.returns),
    ].join('');
    return;
  }
  if (id === 'manufacturing') {
    const good = sum(rows, 'good');
    const defect = sum(rows, 'defect');
    const run = sum(rows, 'runMin');
    const down = sum(rows, 'downMin');
    const avail = run + down ? run / (run + down) : 0;
    const qual = good + defect ? good / (good + defect) : 0;
    const perf = 0.84;
    const oee = avail * perf * qual;
    const mttr = avg(rows, 'mttr');
    el.innerHTML = [
      kpi(pct(oee), d.kpis.oee),
      kpi(pct(avail), d.kpis.avail),
      kpi(pct(perf), d.kpis.perf),
      kpi(pct(qual), d.kpis.qual),
      kpi(pct(good + defect ? defect / (good + defect) : 0), d.kpis.scrap),
      kpi(`${mttr.toFixed(1)} h`, d.kpis.mttr),
    ].join('');
    return;
  }
  const gmv = sum(rows, 'gmv');
  const orders = sum(rows, 'orders');
  const sessions = sum(rows, 'sessions');
  const refunds = sum(rows, 'refunds');
  const onTime = sum(rows, 'onTime');
  const pick = avg(rows, 'pickHrs');
  el.innerHTML = [
    kpi(euro(gmv), d.kpis.gmv),
    kpi(orders ? euro(gmv / orders) : '—', d.kpis.aov),
    kpi(sessions ? pct(orders / sessions) : '—', d.kpis.conv),
    kpi(orders ? pct(refunds / orders) : '—', d.kpis.refund),
    kpi(`${pick.toFixed(1)} h`, d.kpis.pick),
    kpi(orders ? pct(onTime / orders) : '—', d.kpis.otif),
  ].join('');
}

function onChartClick(_id, ev, state, pack, render) {
  const candidates = [ev.name, ev.seriesName].filter(Boolean);
  for (const [dim, values] of Object.entries(pack.dims)) {
    const hit = candidates.find((c) => values.includes(c));
    if (hit) {
      state[dim] = state[dim] === hit ? null : hit;
      render();
      return;
    }
  }
}

function paintCharts(id, charts, rows, pack, state, d, copy) {
  if (id === 'logistics') paintLogistics(charts, rows, pack, state);
  if (id === 'retail') paintRetail(charts, rows);
  if (id === 'manufacturing') paintMfg(charts, rows);
  if (id === 'ecommerce') paintEcom(charts, rows, pack);
}

function paintLogistics(charts, rows, pack, state) {
  const laneStats = group(rows, 'lane', {
    hauls: (rs) => sum(rs, 'hauls'),
    late: (rs) => sum(rs, 'late'),
  });
  const cities = pack.cities;
  const lineSeries = pack.lanes.map((lane) => {
    const st = laneStats.find((s) => s.id === lane.id) || { hauls: 0, late: 0 };
    const lateP = st.hauls ? st.late / st.hauls : 0;
    const a = cities[lane.from];
    const b = cities[lane.to];
    const active = !state.lane || state.lane === lane.id;
    return {
      type: 'line',
      name: lane.id,
      data: [
        [a.lng, a.lat],
        [b.lng, b.lat],
      ],
      symbol: 'none',
      lineStyle: {
        width: 2.5 + Math.min(8, st.hauls / 280),
        color: lateP > 0.3 ? COPPER : OPS,
        opacity: active ? 1 : 0.2,
      },
      emphasis: { focus: 'series' },
    };
  });
  const cityData = Object.values(cities).map((c) => ({
    name: c.name,
    value: [c.lng, c.lat],
  }));
  charts.lanes.setOption(
    {
      ...baseChart(),
      grid: { left: 28, right: 16, top: 16, bottom: 20 },
      tooltip: { trigger: 'item' },
      xAxis: { type: 'value', min: 8, max: 29, show: false },
      yAxis: { type: 'value', min: 49.5, max: 55.5, show: false },
      series: [
        ...lineSeries,
        {
          type: 'scatter',
          name: 'cities',
          data: cityData,
          symbolSize: 8,
          itemStyle: { color: INK },
          label: { show: true, formatter: '{b}', color: MUTED, fontSize: 10, position: 'right' },
        },
      ],
    },
    true,
  );

  const weekly = group(rows, 'week', {
    hauls: (rs) => sum(rs, 'hauls'),
    otif: (rs) => {
      const h = sum(rs, 'hauls');
      return h ? (sum(rs, 'onTime') / h) * 100 : 0;
    },
  }).sort((a, b) => a.id.localeCompare(b.id));
  charts.weekly.setOption({
    ...baseChart(),
    legend: { data: ['Hauls', 'OTIF %'], top: 0, textStyle: { color: MUTED } },
    xAxis: { type: 'category', data: weekly.map((w) => w.id.replace('2026-', '')), ...axis(), splitLine: { show: false } },
    yAxis: [
      { type: 'value', ...axis(), name: 'Hauls' },
      { type: 'value', ...axis(), min: 50, max: 100, name: '%', splitLine: { show: false } },
    ],
    series: [
      { name: 'Hauls', type: 'bar', data: weekly.map((w) => w.hauls), itemStyle: { color: OPS }, barWidth: '55%' },
      {
        name: 'OTIF %',
        type: 'line',
        yAxisIndex: 1,
        data: weekly.map((w) => +w.otif.toFixed(1)),
        itemStyle: { color: COPPER },
        lineStyle: { color: COPPER, width: 2 },
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
  });

  const modes = group(rows, 'mode', {
    lateP: (rs) => {
      const h = sum(rs, 'hauls');
      return h ? (sum(rs, 'late') / h) * 100 : 0;
    },
  });
  charts.mode.setOption({
    ...baseChart(),
    tooltip: { trigger: 'item' },
    grid: { left: 88, right: 28, top: 12, bottom: 24 },
    xAxis: { type: 'value', ...axis(), name: '%' },
    yAxis: { type: 'category', data: modes.map((m) => m.id), ...axis(), splitLine: { show: false } },
    series: [
      {
        type: 'bar',
        name: 'Late %',
        data: modes.map((m) => ({
          name: m.id,
          value: +m.lateP.toFixed(1),
          itemStyle: { color: m.lateP > 30 ? COPPER : OPS },
        })),
        barWidth: 14,
      },
    ],
  });

  const customers = group(rows, 'customer', {
    late: (rs) => sum(rs, 'late'),
    hauls: (rs) => sum(rs, 'hauls'),
  })
    .map((c) => ({ ...c, lateP: c.hauls ? c.late / c.hauls : 0 }))
    .sort((a, b) => b.late - a.late)
    .slice(0, 6);
  charts.customers.setOption({
    ...baseChart(),
    tooltip: { trigger: 'axis' },
    grid: { left: 128, right: 24, top: 12, bottom: 24 },
    xAxis: { type: 'value', ...axis() },
    yAxis: { type: 'category', data: customers.map((c) => c.id).reverse(), ...axis(), splitLine: { show: false } },
    series: [
      {
        type: 'bar',
        name: 'Late hauls',
        data: customers.map((c) => c.late).reverse(),
        itemStyle: { color: COPPER },
        barWidth: 12,
      },
    ],
  });
}

function paintRetail(charts, rows) {
  const months = group(rows, 'month', {
    ty: (rs) => sum(rs, 'sales'),
    ly: (rs) => sum(rs, 'ly'),
  }).sort((a, b) => a.id.localeCompare(b.id));
  charts.trend.setOption({
    ...baseChart(),
    legend: { data: ['TY', 'LY'], top: 0, textStyle: { color: MUTED } },
    xAxis: { type: 'category', data: months.map((m) => m.id.slice(5)), ...axis(), splitLine: { show: false } },
    yAxis: { type: 'value', ...axis(), axisLabel: { ...axis().axisLabel, formatter: (v) => `${Math.round(v / 1000)}k` } },
    series: [
      { name: 'TY', type: 'line', data: months.map((m) => m.ty), areaStyle: { color: 'rgba(26,61,82,0.12)' }, itemStyle: { color: OPS }, lineStyle: { width: 2 }, symbol: 'none' },
      { name: 'LY', type: 'line', data: months.map((m) => m.ly), itemStyle: { color: MUTED }, lineStyle: { width: 1.5, type: 'dashed' }, symbol: 'none' },
    ],
  });

  const mix = group(rows, 'category', { sales: (rs) => sum(rs, 'sales') });
  charts.mix.setOption({
    ...baseChart(),
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        name: 'Category',
        radius: ['42%', '68%'],
        data: mix.map((m, i) => ({
          name: m.id,
          value: m.sales,
          itemStyle: { color: [OPS, COPPER, MUTED, '#2f6b5c'][i] },
        })),
        label: { color: INK, fontSize: 11 },
      },
    ],
  });

  const bubbles = group(rows, 'district', {
    sales: (rs) => sum(rs, 'sales'),
    ly: (rs) => sum(rs, 'ly'),
    sqm: (rs) => rs[0].sqm,
    chain: (rs) => rs[0].chain,
    city: (rs) => rs[0].city,
  }).map((d) => ({
    name: d.id,
    chain: d.chain,
    value: [d.ly ? ((d.sales - d.ly) / d.ly) * 100 : 0, d.sales / d.sqm, d.sales],
  }));
  charts.bubble.setOption({
    ...baseChart(),
    tooltip: {
      trigger: 'item',
      formatter: (p) =>
        `${p.data.name}<br/>${p.data.chain}<br/>Var ${p.data.value[0].toFixed(1)}%<br/>${euro(p.data.value[1])}/m²`,
    },
    xAxis: { type: 'value', name: 'Variance % vs LY', ...axis() },
    yAxis: { type: 'value', name: '€ / m²', ...axis() },
    series: [
      {
        type: 'scatter',
        name: 'Nordline',
        data: bubbles.filter((b) => b.chain === 'Nordline'),
        symbolSize: (v) => 8 + Math.sqrt(v[2]) / 90,
        itemStyle: { color: OPS },
      },
      {
        type: 'scatter',
        name: 'Atelier',
        data: bubbles.filter((b) => b.chain === 'Atelier'),
        symbolSize: (v) => 8 + Math.sqrt(v[2]) / 90,
        itemStyle: { color: COPPER },
      },
    ],
    legend: { top: 0, textStyle: { color: MUTED } },
  });

  const stores = group(rows, 'district', {
    sales: (rs) => sum(rs, 'sales'),
    city: (rs) => rs[0].city,
    chain: (rs) => rs[0].chain,
  })
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 8);
  charts.stores.setOption({
    ...baseChart(),
    grid: { left: 108, right: 20, top: 8, bottom: 24 },
    xAxis: { type: 'value', ...axis(), axisLabel: { ...axis().axisLabel, formatter: (v) => `${Math.round(v / 1000)}k` } },
    yAxis: { type: 'category', data: stores.map((s) => s.id).reverse(), ...axis(), splitLine: { show: false } },
    series: [
      {
        type: 'bar',
        name: 'Sales',
        data: stores
          .map((s) => ({ name: s.chain, value: s.sales, itemStyle: { color: s.chain === 'Atelier' ? COPPER : OPS } }))
          .reverse(),
        barWidth: 12,
      },
    ],
  });
}

function paintMfg(charts, rows) {
  const good = sum(rows, 'good');
  const defect = sum(rows, 'defect');
  const run = sum(rows, 'runMin');
  const down = sum(rows, 'downMin');
  const avail = run + down ? run / (run + down) : 0;
  const qual = good + defect ? good / (good + defect) : 0;
  const perf = 0.84;
  const oee = avail * perf * qual;
  const aLoss = 1 - avail;
  const pLoss = avail * (1 - perf);
  const qLoss = avail * perf * (1 - qual);
  charts.water.setOption({
    ...baseChart(),
    xAxis: { type: 'category', data: ['Start', 'A loss', 'P loss', 'Q loss', 'OEE'], ...axis(), splitLine: { show: false } },
    yAxis: { type: 'value', max: 100, ...axis(), axisLabel: { ...axis().axisLabel, formatter: '{value}%' } },
    series: [
      {
        type: 'bar',
        stack: 'w',
        data: [0, (1 - aLoss) * 100, (1 - aLoss - pLoss) * 100, (1 - aLoss - pLoss - qLoss) * 100, 0],
        itemStyle: { color: 'transparent' },
        tooltip: { show: false },
        silent: true,
      },
      {
        type: 'bar',
        stack: 'w',
        data: [
          { value: 100, itemStyle: { color: OPS } },
          { value: aLoss * 100, itemStyle: { color: COPPER } },
          { value: pLoss * 100, itemStyle: { color: COPPER } },
          { value: qLoss * 100, itemStyle: { color: COPPER } },
          { value: oee * 100, itemStyle: { color: OPS } },
        ],
        barWidth: 36,
        label: { show: true, position: 'top', formatter: (p) => `${p.value.toFixed(1)}%`, color: MUTED, fontSize: 11 },
      },
    ],
  });

  const causes = group(rows, 'cause', { defect: (rs) => sum(rs, 'defect') });
  charts.cause.setOption({
    ...baseChart(),
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        name: 'Cause',
        radius: ['40%', '68%'],
        data: causes.map((c, i) => ({
          name: c.id,
          value: c.defect,
          itemStyle: { color: [OPS, COPPER, MUTED, '#2f6b5c', '#1a2420', '#b87333'][i] },
        })),
        label: { fontSize: 11, color: INK },
      },
    ],
  });

  const weekly = group(rows, 'week', {
    mtbf: (rs) => avg(rs, 'mtbf'),
    mttr: (rs) => avg(rs, 'mttr'),
  }).sort((a, b) => a.id.localeCompare(b.id));
  charts.reliability.setOption({
    ...baseChart(),
    legend: { data: ['MTBF h', 'MTTR h'], top: 0, textStyle: { color: MUTED } },
    xAxis: { type: 'category', data: weekly.map((w) => w.id.replace('2026-', '')), ...axis(), splitLine: { show: false } },
    yAxis: { type: 'value', ...axis() },
    series: [
      { name: 'MTBF h', type: 'bar', data: weekly.map((w) => +w.mtbf.toFixed(2)), itemStyle: { color: OPS }, barWidth: '40%' },
      { name: 'MTTR h', type: 'line', data: weekly.map((w) => +w.mttr.toFixed(2)), itemStyle: { color: COPPER }, lineStyle: { width: 2 }, symbol: 'circle', symbolSize: 5 },
    ],
  });

  const load = group(rows, 'center', {
    down: (rs) => sum(rs, 'downMin'),
    run: (rs) => sum(rs, 'runMin'),
  });
  charts.load.setOption({
    ...baseChart(),
    tooltip: { trigger: 'item' },
    grid: { left: 80, right: 24, top: 12, bottom: 24 },
    xAxis: { type: 'value', ...axis(), name: 'Down min' },
    yAxis: { type: 'category', data: load.map((c) => c.id), ...axis(), splitLine: { show: false } },
    series: [
      {
        type: 'bar',
        name: 'Downtime',
        data: load.map((c) => ({
          name: c.id,
          value: c.down,
          itemStyle: { color: c.id === 'Paint' ? COPPER : OPS },
        })),
        barWidth: 14,
      },
    ],
  });
}

function paintEcom(charts, rows, pack) {
  const weekly = group(rows, 'week', {
    gmv: (rs) => sum(rs, 'gmv'),
    refund: (rs) => {
      const o = sum(rs, 'orders');
      return o ? (sum(rs, 'refunds') / o) * 100 : 0;
    },
  }).sort((a, b) => a.id.localeCompare(b.id));
  charts.gmv.setOption({
    ...baseChart(),
    legend: { data: ['GMV', 'Refund %'], top: 0, textStyle: { color: MUTED } },
    xAxis: { type: 'category', data: weekly.map((w) => w.id.replace('2026-', '')), ...axis(), splitLine: { show: false } },
    yAxis: [
      { type: 'value', ...axis(), axisLabel: { ...axis().axisLabel, formatter: (v) => `${Math.round(v / 1000)}k` } },
      { type: 'value', ...axis(), splitLine: { show: false }, axisLabel: { ...axis().axisLabel, formatter: '{value}%' } },
    ],
    series: [
      { name: 'GMV', type: 'bar', data: weekly.map((w) => w.gmv), itemStyle: { color: OPS }, barWidth: '50%' },
      { name: 'Refund %', type: 'line', yAxisIndex: 1, data: weekly.map((w) => +w.refund.toFixed(1)), itemStyle: { color: COPPER }, lineStyle: { width: 2 }, symbol: 'circle', symbolSize: 5 },
    ],
  });

  const sessions = sum(rows, 'sessions');
  const orders = sum(rows, 'orders');
  const kept = orders - sum(rows, 'refunds');
  charts.funnel.setOption({
    ...baseChart(),
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'funnel',
        name: 'Funnel',
        left: '12%',
        width: '76%',
        minSize: '20%',
        data: [
          { name: 'Sessions', value: sessions, itemStyle: { color: OPS } },
          { name: 'Orders', value: orders, itemStyle: { color: '#1a3d52' } },
          { name: 'Kept', value: kept, itemStyle: { color: COPPER } },
        ],
        label: { color: INK, fontSize: 12 },
      },
    ],
  });

  const sla = group(rows, 'dc', {
    pick: (rs) => avg(rs, 'pickHrs'),
    otif: (rs) => {
      const o = sum(rs, 'orders');
      return o ? (sum(rs, 'onTime') / o) * 100 : 0;
    },
  });
  const byCh = group(rows, 'channel', {
    otif: (rs) => {
      const o = sum(rs, 'orders');
      return o ? (sum(rs, 'onTime') / o) * 100 : 0;
    },
  });
  charts.sla.setOption({
    ...baseChart(),
    legend: { data: sla.map((s) => s.id), top: 0, textStyle: { color: MUTED } },
    xAxis: { type: 'category', data: byCh.map((c) => c.id), ...axis(), splitLine: { show: false } },
    yAxis: { type: 'value', min: 70, max: 100, ...axis(), name: 'OTIF %' },
    series: sla.map((dc, i) => ({
      type: 'bar',
      name: dc.id,
      data: pack.dims.channel.map((ch) => {
        const rs = rows.filter((r) => r.dc === dc.id && r.channel === ch);
        const o = sum(rs, 'orders');
        return o ? +((sum(rs, 'onTime') / o) * 100).toFixed(1) : 0;
      }),
      itemStyle: { color: i ? COPPER : OPS },
      barWidth: 14,
    })),
  });

  charts.sku.setOption({
    ...baseChart(),
    tooltip: {
      trigger: 'item',
      formatter: (p) => `${p.data.name}<br/>Margin ${(p.data.value[1] * 100).toFixed(0)}%<br/>Vol ${p.data.value[0]}`,
    },
    xAxis: { type: 'value', name: 'Volume', ...axis() },
    yAxis: { type: 'value', name: 'Margin', max: 0.7, ...axis(), axisLabel: { ...axis().axisLabel, formatter: (v) => `${Math.round(v * 100)}%` } },
    series: [
      {
        type: 'scatter',
        name: 'SKU',
        data: pack.skus.map((s) => ({ name: s.sku, value: [s.volume, s.margin] })),
        symbolSize: 10,
        itemStyle: { color: OPS },
      },
    ],
  });
}
