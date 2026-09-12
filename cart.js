/* Baby Lux — общая корзина (localStorage + реестр товаров) */
(function (w) {
  'use strict';
  const KEY = 'babyLuxCart';

  const ICONS = {
    stroller: '<svg viewBox="0 0 120 92" fill="none"><path d="M14 44Q30 20 60 22V42" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 46L52 46V74M14 46L14 70" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><line x1="24" y1="76" x2="78" y2="76" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="38" cy="76" r="10" fill="#fff"/><circle cx="38" cy="76" r="4" fill="#F6A5C0"/><circle cx="66" cy="76" r="10" fill="#fff"/><circle cx="66" cy="76" r="4" fill="#F6A5C0"/></svg>',
    bike: '<svg viewBox="0 0 120 84" fill="none"><circle cx="34" cy="56" r="16" stroke="#fff" stroke-width="5"/><circle cx="82" cy="56" r="16" stroke="#fff" stroke-width="5"/><path d="M40 46L62 34M62 34L84 30M50 58L74 44" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><line x1="52" y1="46" x2="52" y2="30" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="52" cy="30" r="4" fill="#fff"/><line x1="82" y1="56" x2="82" y2="24" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M76 26L88 26M82 22L82 30" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>',
    crib: '<svg viewBox="0 0 120 94" fill="none"><path d="M14 84V30H104V84" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 52H104" stroke="#fff" stroke-width="5" stroke-linecap="round"/><line x1="26" y1="38" x2="26" y2="74" stroke="#fff" stroke-width="2.5"/><line x1="40" y1="38" x2="40" y2="74" stroke="#fff" stroke-width="2.5"/><line x1="54" y1="38" x2="54" y2="74" stroke="#fff" stroke-width="2.5"/><line x1="68" y1="38" x2="68" y2="74" stroke="#fff" stroke-width="2.5"/><line x1="82" y1="38" x2="82" y2="74" stroke="#fff" stroke-width="2.5"/></svg>',
    chair: '<svg viewBox="0 0 120 96" fill="none"><path d="M20 38H100" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M30 38L30 60L90 60L90 38" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><line x1="36" y1="70" x2="84" y2="70" stroke="#fff" stroke-width="5" stroke-linecap="round"/><line x1="36" y1="70" x2="36" y2="88" stroke="#fff" stroke-width="5" stroke-linecap="round"/><line x1="84" y1="70" x2="84" y2="88" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M22 88H96" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>',
    car: '<svg viewBox="0 0 120 84" fill="none"><path d="M10 52L22 32Q24 27 30 27H56Q63 27 67 34L82 52Z" fill="#fff"/><circle cx="30" cy="56" r="11" fill="#fff"/><circle cx="76" cy="56" r="11" fill="#fff"/><circle cx="30" cy="56" r="4.4" fill="#2EC8E6"/><circle cx="76" cy="56" r="4.4" fill="#2EC8E6"/><path d="M40 29L40 44M54 29L54 44" stroke="#2EC8E6" stroke-width="4" stroke-linecap="round"/></svg>',
    acc: '<svg viewBox="0 0 120 102" fill="none"><rect x="38" y="26" width="44" height="66" rx="16" fill="#fff"/><path d="M60 26v-8" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M48 14h24" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M34 44h52M34 62h52M34 80h52" stroke="#F6A5C0" stroke-width="4" stroke-linecap="round" opacity=".55"/><path d="M30 92q30 14 60 0" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>'
  };

  const registry = {
    'stroller-breeze': { name: 'Коляска прогулочная Breeze', price: 1990, old: 2290, cat: 'stroller', grad: 1, colors: ['#F6A5C0', '#2EC8E6'] },
    'stroller-sunny': { name: 'Коляска прогулочная Sunny', price: 1690, cat: 'stroller', grad: 3, colors: ['#FFE29A', '#DFF3EC'] },
    'stroller-air': { name: 'Коляска-трость Air 2.5', price: 990, cat: 'stroller', grad: 5, colors: ['#D9C7F3', '#F6A5C0'] },
    'stroller-cloud': { name: 'Коляска 3 в 1 Cloud Combi', price: 4550, old: 5200, cat: 'stroller', grad: 1, colors: ['#F6A5C0', '#D9C7F3', '#BFEBD3'] },
    'stroller-stellar': { name: 'Коляска 3 в 1 Stellar', price: 4150, cat: 'stroller', grad: 2, colors: ['#2EC8E6', '#F6A5C0'] },
    'stroller-metro': { name: 'Коляска Metro 2 в 1', price: 3250, cat: 'stroller', grad: 4, colors: ['#BFEBD3', '#FFE29A'] },

    'bike-balance': { name: 'Беговел BalanceFirst 12"', price: 560, old: 660, cat: 'bike', grad: 3, colors: ['#F97316', '#6A5ACD'] },
    'bike-buddy': { name: 'Беговел Buddy 2 в 1', price: 720, cat: 'bike', grad: 1, colors: ['#F6A5C0', '#2EC8E6'] },
    'bike-city': { name: 'Велосипед City 16"', price: 1150, cat: 'bike', grad: 2, colors: ['#2EC8E6', '#4A3F3A'] },
    'bike-explorer': { name: 'Велосипед Explorer 20"', price: 1750, cat: 'bike', grad: 4, colors: ['#BFEBD3', '#FF9A76'] },

    'crib-dream': { name: 'Кроватка Dream 120×60', price: 2100, cat: 'crib', grad: 5, colors: ['#D9C7F3', '#BFEBD3'] },
    'crib-junior': { name: 'Кроватка Junior с маятником', price: 1850, cat: 'crib', grad: 3, colors: ['#FFE29A', '#F6A5C0'] },
    'crib-porta': { name: 'Кроватка-манеж Porta', price: 990, cat: 'crib', grad: 2, colors: ['#2EC8E6', '#BFEBD3'] },

    'chair-mochi': { name: 'Стульчик Mochi', price: 890, cat: 'chair', grad: 3, colors: ['#FFE29A', '#BFEBD3'] },
    'chair-boost': { name: 'Стульчик Boost 4 в 1', price: 1120, cat: 'chair', grad: 1, colors: ['#F6A5C0', '#D9C7F3'] },
    'chair-uni': { name: 'Стульчик-трансформер Uni', price: 1350, cat: 'chair', grad: 4, colors: ['#BFEBD3', '#FFE29A'] },

    'car-racer': { name: 'Электромобиль Baby Racer PRO', price: 2750, cat: 'car', grad: 2, colors: ['#2EC8E6', '#F97316'] },
    'car-suv': { name: 'Электромобиль SUV Safari', price: 3100, cat: 'car', grad: 3, colors: ['#F97316', '#4A3F3A'] },
    'car-coupe': { name: 'Электромобиль Купе Luxury', price: 3450, cat: 'car', grad: 5, colors: ['#4A3F3A', '#D9C7F3'] },
    'car-tolokar': { name: 'Толокар Mini Runner', price: 480, cat: 'car', grad: 1, colors: ['#F6A5C0', '#2EC8E6'] },

    'acc-seat': { name: 'Автокресло 0–13 кг', price: 1600, cat: 'acc', grad: 2, colors: ['#2EC8E6', '#4A3F3A'] },
    'acc-arc': { name: 'Игровая дуга с игрушками', price: 190, cat: 'acc', grad: 1, colors: ['#F6A5C0', '#BFEBD3'] },
    'acc-bag': { name: 'Термосумка для бутылочек', price: 150, cat: 'acc', grad: 3, colors: ['#FFE29A', '#F6A5C0'] },
    'acc-kit': { name: 'Набор гигиены Starter', price: 120, cat: 'acc', grad: 4, colors: ['#BFEBD3', '#D9C7F3'] }
  };

  const ext = window.BABY_LUX_DATA;
  if (ext && typeof ext === 'object') {
    for (const k in ext) registry[k] = Object.assign({}, registry[k] || {}, ext[k]);
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
    syncBadge();
  }
  function count() {
    return load().reduce((s, it) => s + it.qty, 0);
  }
  function add(id, qty) {
    qty = qty || 1;
    const items = load();
    const found = items.find(it => it.id === id);
    if (found) found.qty += qty; else items.push({ id: id, qty: qty });
    save(items);
    return load();
  }
  function setQty(id, qty) {
    const items = load().map(it => it.id === id ? Object.assign({}, it, { qty: Math.max(1, qty) }) : it);
    save(items);
    return items;
  }
  function remove(id) {
    save(load().filter(it => it.id !== id));
  }
  function clear() {
    save([]);
  }
  function detail(id) {
    const base = registry[id] || { name: id, price: 0, cat: 'acc', grad: 1, colors: [] };
    const ov = overrides()[id];
    return ov ? Object.assign({}, base, ov) : base;
  }
  function overrides() {
    try { return JSON.parse(localStorage.getItem('babyLuxOverrides')) || {}; } catch (e) { return {}; }
  }
  function saveOverrides(map) {
    try { localStorage.setItem('babyLuxOverrides', JSON.stringify(map)); } catch (e) {}
  }
  function orders() {
    try { return JSON.parse(localStorage.getItem('babyLuxOrders')) || []; } catch (e) { return []; }
  }
  function saveOrder(order) {
    const all = orders();
    all.unshift(order);
    try { localStorage.setItem('babyLuxOrders', JSON.stringify(all)); } catch (e) {}
  }
  function clearOrders() {
    try { localStorage.setItem('babyLuxOrders', JSON.stringify([])); } catch (e) {}
  }
  function idByName(name) {
    for (const k in registry) if (registry[k].name === name) return k;
    return '';
  }
  function withDetail() {
    return load().map(it => Object.assign({}, it, detail(it.id)));
  }
  function total() {
    return withDetail().reduce((s, it) => s + it.price * it.qty, 0);
  }
  function syncBadge() {
    const el = document.getElementById('cartBadge');
    if (el) el.textContent = count();
  }

  w.BabyCart = {
    add: add, setQty: setQty, remove: remove, clear: clear,
    load: load, save: save, count: count, total: total,
    detail: detail, idByName: idByName, withDetail: withDetail,
    registry: registry, ICONS: ICONS, syncBadge: syncBadge,
    overrides: overrides, saveOverrides: saveOverrides,
    orders: orders, saveOrder: saveOrder, clearOrders: clearOrders
  };
})(window);