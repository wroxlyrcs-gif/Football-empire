/* ===== FOOTBALL EMPIRE 2.0 — APP.JS ===== */

let G = null;

let S = {
  v: 'menu',
  nf: {
    name: 'Zunex FC',
    logo: '⚽',
    c1: '#d4af37',
    c2: '#1f7a3e',
    co: 'TR',
    bud: 5e7
  },
  fl: { g: '', max: '0', min: '0', q: '' },
  tt: 'b',
  sw: null,
  cur: null,
  fw: null,
  m: null
};

let MV = {
  sp: 2,
  play: true,
  n: 0
};

function toast(t) {
  const e = $('#toast');
  if (!e) return;

  e.textContent = t;
  e.style.display = 'block';

  clearTimeout(toast.t);
  toast.t = setTimeout(() => {
    e.style.display = 'none';
  }, 2300);
}

const back = () =>
  '<button class="btn s" data-a="go" data-v="menu">‹ Menü</button>';

const NAV = [
  ['hub', '🏠', 'Ana'],
  ['club', '👥', 'Kulüp'],
  ['tr', '🔁', 'Transfer'],
  ['tac', '📋', 'Taktik'],
  ['lg', '🏆', 'Lig']
];

const nav = () =>
  `<div class="nav">${
    NAV.map(([v, i, n]) =>
      `<a data-a="go" data-v="${v}" class="${S.v == v ? 'on' : ''}">
        ${i}<br>${n}
      </a>`
    ).join('')
  }</div>`;

const prow = (p, at, lb, cls) => `
<div class="row ${cls || ''}" ${at}>
  <span class="tag">${lb || p.pos}</span>
  <span>
    ${p.name}${p.inj ? ' 🚑' + p.inj : ''}
    <br>
    <small class="m">${p.age} yaş • ${p.yrs} yıl</small>
  </span>
  <b>${p.ovr}</b>
  <span>
    <i class="bar"><u style="width:${p.fit}%"></u></i>
    <i class="bar" style="margin-top:3px">
      <u style="width:${p.mor}%;background:#4fc3f7"></u>
    </i>
  </span>
  <small class="m">${p.pot}</small>
  <small class="m">${p.gl}⚽</small>
</div>`;

const tblH = r => `
<table>
<tr>
  <th>#</th><th>Takım</th><th>O</th><th>G</th>
  <th>B</th><th>M</th><th>A</th><th>Y</th><th>Av</th><th>P</th>
</tr>
${r.map(x => `
<tr class="${x.t.id == 0 ? 'me' : ''}">
  <td>${x.k}</td>
  <td>${x.t.name}</td>
  <td>${x.p}</td>
  <td>${x.w}</td>
  <td>${x.d}</td>
  <td>${x.l}</td>
  <td>${x.gf}</td>
  <td>${x.ga}</td>
  <td>${x.gf - x.ga}</td>
  <td><b>${x.pt}</b></td>
</tr>
`).join('')}
</table>`;

const vMenu = () => `
<div style="text-align:center;padding:26px 0 8px">
  <div style="font-size:54px">🏆</div>
  <h1 style="font-size:30px;letter-spacing:2px">FOOTBALL EMPIRE</h1>
  <div class="m">ZUNEX STUDIOS • v2.0</div>
</div>
${[
  ['new', '⚽ Yeni Kariyer'],
  ['load', '▶ Kariyere Devam Et'],
  ['club', '👥 Kulüp Yönetimi'],
  ['tr', '🔁 Transfer Merkezi'],
  ['tac', '📋 Taktikler'],
  ['lg', '🏆 Ligler'],
  ['set', '⚙ Ayarlar']
].map(([v, n]) =>
  `<button class="btn" data-a="go" data-v="${v}">${n}</button>`
).join('')}
`;

function vNew() {
  const f = S.nf;

  return back() + `
  <h2>Yeni Kariyer</h2>

  <div class="card">
    <label class="m">Kulüp Adı</label>
    <input data-f="name" value="${f.name}" maxlength="20">

    <label class="m">Logo</label>

    <div class="logos">
      ${D.LOGOS.map(l => `
        <span data-a="logo" data-v="${l}"
          class="${l == f.logo ? 'on' : ''}">${l}</span>
      `).join('')}
    </div>

    <div class="g2">
      <div>
        <label class="m">Forma Rengi 1</label>
        <input type="color" data-f="c1" value="${f.c1}">
      </div>

      <div>
        <label class="m">Forma Rengi 2</label>
        <input type="color" data-f="c2" value="${f.c2}">
      </div>
    </div>

    <label class="m">Ülke / Lig</label>

    <select data-f="co">
      ${Object.entries(D.C).map(([k, c]) => `
        <option value="${k}" ${k == f.co ? 'selected' : ''}>
          ${c.n} – ${c.l}
        </option>
      `).join('')}
    </select>

    <label class="m">Başlangıç Bütçesi</label>

    <select data-f="bud">
      ${[3e7, 5e7, 1e8].map(b => `
        <option value="${b}" ${b == f.bud ? 'selected' : ''}>
          ${M$(b)}
        </option>
      `).join('')}
    </select>
  </div>

  <button class="btn p" data-a="start">Kariyere Başla</button>`;
}

function vLoad() {
  const ix = ixs();

  return back() + '<h2>Kariyere Devam Et</h2>' +
    (ix.length
      ? ix.map(s => `
        <div class="card">
          <div class="sc">
            <span style="font-size:30px">${s.logo}</span>
            <span style="flex:1">
              ${s.name}
              <br>
              <small class="m">
                Sezon ${s.s} • Hafta ${s.w}/38
                <br>
                ${new Date(s.ts).toLocaleString('tr-TR')}
              </small>
            </span>
          </div>

          <button class="btn s p" data-a="ld" data-id="${s.id}">
            ▶ Devam
          </button>

          <button class="btn s" data-a="del" data-id="${s.id}">
            Sil
          </button>
        </div>
      `).join('')
      : '<div class="card m">Kayıtlı kariyer yok.</div>');
}

const vSet = () => back() + `
<h2>Ayarlar</h2>

<div class="card">
  <label class="m">Varsayılan Maç Hızı</label>

  <select data-sp="1">
    ${[1, 2, 4, 8].map(s => `
      <option ${((+localStorage.getItem('fe_sp') || 2) == s) ? 'selected' : ''}>
        ${s}
      </option>
    `).join('')}
  </select>
</div>

<div class="card">
  <button class="btn" data-a="delall">Tüm Kayıtları Sil</button>
</div>

<div class="card m">
  Football Empire v2.0 • ZUNEX STUDIOS
  <br>
  Tamamen çevrimdışı.
</div>`;

function vHub() {
  const T = G.teams;
  const u = T[0];
  const tb = table();
  const me = tb.find(r => r.t.id == 0);
  const done = G.week >= 38;

  let h = `
  <div class="card">
    <div class="sc">
      <span style="font-size:34px">${G.logo}</span>

      <span style="flex:1">
        ${u.name}
        <br>
        <small class="m">
          Sezon ${G.season} • Hafta ${Math.min(G.week + 1, 38)}/38
          • ${me.k}. sıra
        </small>
      </span>

      <span style="text-align:right">
        <small class="m">Bütçe</small>
        <br>
        <b style="font-size:17px">${M$(G.bud)}</b>
      </span>
    </div>

    <button class="btn s" data-a="go" data-v="menu">☰ Menü</button>
  </div>`;

  if (done) {
    h += `
    <div class="card" style="text-align:center">
      <h2>🏆 Sezon Bitti</h2>
      <p>
        Şampiyon: <b>${tb[0].t.name}</b>
        <br>
        Sıralaman: ${me.k}.
      </p>

      <button class="btn p" data-a="ns">
        Yeni Sezonu Başlat
      </button>
    </div>`;
  } else {
    const [a, b] = G.fix[G.week].find(f => f[0] == 0 || f[1] == 0);
    const op = T[a == 0 ? b : a];
    const ra = rate(op);

    h += `
    <div class="card">
      <div class="m">Sıradaki maç • ${a == 0 ? 'İç saha' : 'Deplasman'}</div>

      <div class="sc" style="margin:6px 0">
        <span>${u.name}</span>
        <span class="m">vs</span>
        <span>${op.name}</span>
      </div>

      <div class="m" style="margin-bottom:6px">
        Rakip: Hücum ${Math.round(ra.at)}
        • Orta ${Math.round(ra.md)}
        • Savunma ${Math.round(ra.df)}
        <br>
        Dizilişin: ${u.form}
      </div>

      <button class="btn p" data-a="play">▶ Maçı Oyna</button>
      <button class="btn" data-a="quick">⏩ Hızlı Simüle Et</button>
    </div>`;
  }

  if (G.last) {
    h += `
    <div class="card">
      <div class="m">Son maç</div>
      <div class="sc">
        <span style="flex:1">${T[G.last.h].name}</span>
        <b>${G.last.r[0]}-${G.last.r[1]}</b>
        <span style="flex:1;text-align:right">${T[G.last.a].name}</span>
      </div>
    </div>`;
  }

  const top = tb.slice(0, 5);
  if (me.k > 5) top.push(me);

  return h + `
  <div class="card">
    <h3>Puan Durumu</h3>
    ${tblH(top)}
  </div>

  <div class="card m">
    ${G.news.slice(0, 5).join('<br>')}
  </div>`;
}

function vClub() {
  const u = G.teams[0];
  const c = pl(u, S.cur);
  const B = bench(u);
  const wg = u.sq.reduce((a, p) => a + p.sal, 0);

  const r = p => prow(
    p,
    `data-a="pk" data-id="${p.id}"`,
    p.pos,
    S.cur == p.id ? 'sel' : ''
  );

  return `
  <h2>Kulüp Yönetimi</h2>

  <div class="card">
    <div class="g2">
      <div>Kadro: <b>${u.sq.length}</b></div>
      <div>Ort. Yetenek:
        <b>${Math.round(u.sq.reduce((a, p) => a + p.ovr, 0) / u.sq.length)}</b>
      </div>
      <div>Maaş: <b>${M$(wg)}</b>/yıl</div>
      <div>Bütçe: <b>${M$(G.bud)}</b></div>
    </div>
  </div>

  ${c ? `
  <div class="card">
    <h3>${c.name} • ${D.GN[c.g]} (${c.pos})</h3>

    <div class="g2">
      <div>Yaş: ${c.age}</div>
      <div>Yetenek: ${c.ovr} / Pot. ${c.pot}</div>
      <div>Kondisyon: %${c.fit}</div>
      <div>Moral: %${c.mor}</div>
      <div>Maaş: ${M$(c.sal)}/yıl</div>
      <div>Sözleşme: ${c.yrs} yıl</div>
      <div>Değer: ${M$(c.val)}</div>
      <div>Gol: ${c.gl}</div>
    </div>

    <button class="btn s p" data-a="renew">
      Sözleşme Yenile
    </button>

    <button class="btn s" data-a="sell" data-id="${c.id}">
      Sat
    </button>
  </div>` : ''}

  <div class="card">
    <h3>İlk 11</h3>
    ${u.lu.map(i => r(pl(u, i))).join('')}
  </div>

  <div class="card">
    <h3>Yedekler</h3>
    ${B.map(r).join('')}
  </div>`;
}

/* Transfer, taktik, lig ekranları */
function vTr() {
  const u = G.teams[0];
  const f = S.fl;
  const tb = S.tt == 'b';

  const sel = (q, o) => `
    <select data-q="${q}">
      ${o.map(([v, n]) => `
        <option value="${v}" ${f[q] == v ? 'selected' : ''}>
          ${n}
        </option>
      `).join('')}
    </select>`;

  let h = `
  <h2>Transfer Merkezi</h2>

  <div class="card">
    <div class="g2">
      <div>Bütçe: <b>${M$(G.bud)}</b></div>
      <div>Kadro: <b>${u.sq.length}/30</b></div>
    </div>

    <button class="btn s ${tb ? 'on' : ''}" data-a="tt" data-v="b">
      Satın Al
    </button>

    <button class="btn s ${tb ? '' : 'on'}" data-a="tt" data-v="s">
      Sat
    </button>
  </div>`;

  if (tb) {
    const L = G.mk.filter(p =>
      (!f.g || p.g == f.g) &&
      (!+f.max || p.val <= +f.max) &&
      p.ovr >= +f.min &&
      (!f.q || (p.name + ' ' + p.from).toLowerCase().includes(f.q.toLowerCase()))
    ).sort((a, b) => b.ovr - a.ovr);

    h += `
    <div class="card">
      <div class="g2">
        ${sel('g', [
          ['', 'Tüm Mevkiler'],
          ['GK', 'Kaleci'],
          ['DF', 'Defans'],
          ['MD', 'Orta Saha'],
          ['FW', 'Forvet']
        ])}

        ${sel('max', [
          [0, 'Her Fiyat'],
          [1e6, '≤ 1M'],
          [5e6, '≤ 5M'],
          [15e6, '≤ 15M'],
          [40e6, '≤ 40M']
        ])}

        ${sel('min', [
          [0, 'Min. Yetenek'],
          [60, '60+'],
          [70, '70+'],
          [75, '75+']
        ])}

        <input data-q="q" placeholder="Ara" value="${f.q}">
      </div>
    </div>

    ${L.length ? L.slice(0, 30).map(p => `
      <div class="card" style="padding:8px">
        <div class="sc">
          <span style="flex:1;font-size:14px">
            <span class="tag">${p.pos}</span> ${p.name}
            <br>
            <small class="m">
              ${p.from} • ${p.age} yaş •
              Yetenek ${p.ovr}/${p.pot} •
              Maaş ${M$(p.sal)}
            </small>
          </span>

          <button class="btn s p" data-a="buy" data-id="${p.id}">
            Al<br>${M$(p.val)}
          </button>
        </div>
      </div>
    `).join('') : '<div class="card m">Oyuncu bulunamadı.</div>'}`;
  } else {
    h += u.sq.slice().sort((a, b) => b.ovr - a.ovr).map(p => `
      <div class="card" style="padding:8px">
        <div class="sc">
          <span style="flex:1;font-size:14px">
            ${p.name}
            <br>
            <small class="m">${p.pos} • ${p.ovr} yetenek</small>
          </span>

          <button class="btn s" data-a="sell" data-id="${p.id}">
            Sat
          </button>
        </div>
      </div>
    `).join('');
  }

  return h;
}

function vTac() {
  const u = G.teams[0];
  const sl = slots(u.form);
  const r = rate(u);
  const B = bench(u);

  const sw = (k, i) =>
    S.sw && S.sw.k == k && S.sw.i == i ? 'sel' : '';

  return `
  <h2>Taktikler</h2>

  <div class="card">
    <div class="m">Diziliş</div>

    ${Object.keys(D.FM).map(f => `
      <button class="btn s ${u.form == f ? 'on' : ''}"
        data-a="fm" data-v="${f}">${f}</button>
    `).join('')}

    <div class="m">Oyun Anlayışı</div>

    ${[
      ['A', 'Hücum'],
      ['B', 'Dengeli'],
      ['D', 'Savunma']
    ].map(([k, n]) => `
      <button class="btn s ${u.tac == k ? 'on' : ''}"
        data-a="tc" data-v="${k}">${n}</button>
    `).join('')}

    <div style="margin:6px 0">
      Hücum <b>${Math.round(r.at)}</b> •
      Orta Saha <b>${Math.round(r.md)}</b> •
      Savunma <b>${Math.round(r.df)}</b>
    </div>

    <button class="btn s" data-a="auto">Otomatik Diz</button>
  </div>

  <div class="card">
    <h3>İlk 11</h3>
    <small class="m">İki oyuncuya dokunarak yer değiştir.</small>

    ${u.lu.map((id, i) =>
      prow(pl(u, id),
        `data-a="sw" data-k="l" data-i="${i}"`,
        lab(sl[i]),
        sw('l', i)
      )
    ).join('')}
  </div>

  <div class="card">
    <h3>Yedekler</h3>
    ${B.map((p, i) =>
      prow(p,
        `data-a="sw" data-k="b" data-i="${i}"`,
        p.pos,
        sw('b', i)
      )
    ).join('')}
  </div>`;
}

function vLg() {
  const T = G.teams;
  const w = S.fw == null ? Math.max(0, G.week - 1) : S.fw;
  const fx = G.res[w] || G.fix[w].map(([h, a]) => [h, a, '-', '-']);

  return `
  <h2>${D.C[G.country].l} • Sezon ${G.season}</h2>

  <div class="card">
    ${tblH(table())}
  </div>

  <div class="card">
    <div class="sc">
      <button class="btn s" data-a="fw" data-v="-1">‹</button>
      <span>${w + 1}. Hafta</span>
      <button class="btn s" data-a="fw" data-v="1">›</button>
    </div>

    ${fx.map(([h, a, x, y]) => `
      <div class="sc" style="font-size:13px;padding:5px 0">
        <span style="flex:1">${T[h].name}</span>
        <b style="font-size:16px">${x}-${y}</b>
        <span style="flex:1;text-align:right">${T[a].name}</span>
      </div>
    `).join('')}
  </div>

  ${G.hist.length
    ? `<div class="card m">${G.hist.join('<br>')}</div>`
    : ''}`;
}

/* Maç ekranı */
function vMatch() {
  const m = S.m;

  return `
  <div class="card" style="padding:8px">
    <div class="sc">
      <span style="flex:1;color:${m.h.c1}">● ${m.h.name}</span>
      <b id="sco">0 - 0</b>
      <span style="flex:1;text-align:right;color:${m.a.c1}">
        ${m.a.name} ●
      </span>
    </div>

    <div class="m" id="mn" style="text-align:center">0'</div>
  </div>

  <canvas id="cv"></canvas>

  <div class="card" style="padding:6px;text-align:center">
    <button class="btn s" data-a="pz" id="pz">⏸ Duraklat</button>

    ${[1, 2, 4].map(s => `
      <button class="btn s sp ${MV.sp == s ? 'on' : ''}"
        data-a="sp" data-v="${s}">x${s}</button>
    `).join('')}

    <button class="btn s" data-a="skip">⏭ Bitir</button>
  </div>

  <div id="fin"></div>
  <div id="hud"></div>`;
}

const V = {
  menu: vMenu,
  new: vNew,
  load: vLoad,
  set: vSet,
  hub: vHub,
  club: vClub,
  tr: vTr,
  tac: vTac,
  lg: vLg,
  match: vMatch
};

function render() {
  $('#app').innerHTML =
    V[S.v]() +
    (G && NAV.some(n => n[0] == S.v) ? nav() : '');

  if (S.v == 'match') startMV();
}

/* Maç istatistikleri */
function hud() {
  const m = S.m;
  if (!m) return;

  const s = m.st;
  const tt = (s.po[0] + s.po[1]) || 1;

  const bar = (n, a, b) => `
    <div style="margin:6px 0">
      <div class="sc" style="font-size:13px">
        <span>${a}</span>
        <span class="m">${n}</span>
        <span>${b}</span>
      </div>

      <i class="bar">
        <u style="width:${a / ((a + b) || 1) * 100}%"></u>
      </i>
    </div>`;

  $('#sco').textContent = m.s[0] + ' - ' + m.s[1];
  $('#mn').textContent = m.min >= 90 ? 'Maç Sonu' : m.min + "'";

  $('#hud').innerHTML = `
    <div class="card">
      ${bar('Topla Oynama %',
        Math.round(s.po[0] / tt * 100),
        Math.round(s.po[1] / tt * 100))}
      ${bar('Şut', s.sh[0], s.sh[1])}
      ${bar('İsabetli Şut', s.ot[0], s.ot[1])}
      ${bar('Korner', s.co[0], s.co[1])}
      ${bar('Faul', s.fo[0], s.fo[1])}
    </div>

    <div class="card">
      ${m.log.slice(0, 8).join('<br>') || 'Maç başlıyor…'}
    </div>`;

  if (m.min >= 90) {
    $('#fin').innerHTML = `
      <button class="btn p" data-a="mfin">
        Maçı Bitir
      </button>`;
  }
}

/* Maç animasyonu */
function startMV() {
  const id = ++MV.n;
  const cv = $('#cv');

  const W = cv.clientWidth || 340;
  const H = Math.round(W * 1.35);
  const d = window.devicePixelRatio || 1;
  const x = cv.getContext('2d');

  cv.width = W * d;
  cv.height = H * d;
  cv.style.width = W + 'px';
  cv.style.height = H + 'px';

  x.scale(d, d);

  const m = S.m;
  const T = [m.h, m.a];

  const B = T.map((t, k) =>
    slots(t.form).map(s =>
      k
        ? { x: (1 - s.y) * W, y: H * s.x }
        : { x: s.y * W, y: H * (1 - s.x) }
    )
  );

  const Q = B.map(a => a.map(p => ({ ...p })));

  const ba = {
    x: W / 2,
    y: H / 2,
    tx: W / 2,
    ty: H / 2
  };

  let last = performance.now();
  let acc = 0;
  let sub = 0;
  let fl = 0;

  const pass = () => {
    const p = Q[m.t][R(0, 10)];
    if (!p) return;

    ba.tx = p.x;
    ba.ty = p.y;
  };

  function tick() {
    if (sub % 3 == 0) {
      step(m);
      pass();
    } else if (sub % 3 == 1) {
      pass();
    } else {
      ba.tx = m.fin.x * W;
      ba.ty = m.fin.y * H;

      if (m.goal) {
        fl = 45;
        m.goal = 0;
      }
    }

    sub++;
    hud();
  }

  function frame(ts) {
    if (S.v != 'match' || id != MV.n) return;

    const dt = Math.min(60, ts - last);
    last = ts;

    if (MV.play && m.min < 90) {
      acc += dt * MV.sp;

      while (acc >= 250 && m.min < 90) {
        acc -= 250;
        tick();
      }
    }

    ba.x += (ba.tx - ba.x) * 0.14;
    ba.y += (ba.ty - ba.y) * 0.14;

    x.fillStyle = '#1f7a3e';
    x.fillRect(0, 0, W, H);

    x.fillStyle = 'rgba(255,255,255,.05)';

    for (let i = 0; i < 10; i += 2) {
      x.fillRect(0, i * H / 10, W, H / 10);
    }

    x.strokeStyle = 'rgba(255,255,255,.75)';
    x.lineWidth = 2;

    x.strokeRect(6, 6, W - 12, H - 12);

    x.beginPath();
    x.moveTo(6, H / 2);
    x.lineTo(W - 6, H / 2);
    x.stroke();

    x.beginPath();
    x.arc(W / 2, H / 2, W * 0.13, 0, 7);
    x.stroke();

    x.strokeRect(W * 0.22, 6, W * 0.56, H * 0.14);
    x.strokeRect(W * 0.22, H - 6 - H * 0.14, W * 0.56, H * 0.14);

    x.strokeRect(W * 0.4, 0, W * 0.2, 6);
    x.strokeRect(W * 0.4, H - 6, W * 0.2, 6);

    T.forEach((t, k) => {
      Q[k].forEach((p, i) => {
        const b = B[k][i];
        const dy = m.t == k ? (k ? 1 : -1) * H * 0.06 : 0;

        p.x += (b.x + (ba.x - b.x) * 0.15 - p.x) * 0.06;
        p.y += (b.y + dy + (ba.y - b.y) * 0.15 - p.y) * 0.06;

        x.beginPath();
        x.arc(p.x, p.y, W * 0.026, 0, 7);

        x.fillStyle = i ? t.c1 : '#e8d44d';
        x.fill();

        x.lineWidth = 2;
        x.strokeStyle = t.c2;
        x.stroke();
      });
    });

    x.beginPath();
    x.arc(ba.x, ba.y, W * 0.013, 0, 7);
    x.fillStyle = '#fff';
    x.fill();

    x.lineWidth = 1;
    x.strokeStyle = '#000';
    x.stroke();

    if (fl > 0) {
      fl--;

      x.fillStyle = 'rgba(0,0,0,.5)';
      x.fillRect(0, H / 2 - 32, W, 64);

      x.fillStyle = '#d4af37';
      x.font = 'bold 34px sans-serif';
      x.textAlign = 'center';
      x.fillText('GOOOL!', W / 2, H / 2 + 12);
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
  hud();
}

/* Eylemler */
function act(a, d) {
  const u = G && G.teams[0];

  switch (a) {

    case 'go':
      if (['hub', 'club', 'tr', 'tac', 'lg'].includes(d.v) && !G) {
        return toast('Önce bir kariyer başlat veya yükle');
      }

      S.v = d.v;
      S.sw = null;
      render();
      scrollTo(0, 0);
      break;

    case 'logo':
      S.nf.logo = d.v;
      render();
      break;

    case 'start':
      startCareer();
      break;

    case 'ld': {
      G = JSON.parse(localStorage.getItem('fe_s_' + d.id));

      if (!G) return toast('Kayıt bulunamadı');

      PID = Math.max(
        ...G.teams.flatMap(t => t.sq.map(p => p.id)),
        ...G.mk.map(p => p.id)
      );

      S.v = 'hub';
    
