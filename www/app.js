/* ===== FOOTBALL EMPIRE 2.0 — APP.JS ===== */

let G = null;

let S = {
  v: 'menu',
  nf: {
    name: '',
    logo: '⚽',
    c1: '#d4af37',
    c2: '#1f7a3e',
    co: 'TR',
    bud: 50000000
  },
  fl: {g:'',max:'0',min:'0',q:''},
  tt: 'b',
  sw: null,
  cur: null,
  fw: null,
  m: null,
  so: false,
  sb: null,
  neg: null
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
  toast.t = setTimeout(() => e.style.display='none',2300);
}

function save() {
  if (!G) return;
  try {
    localStorage.setItem('fe_s_'+G.id,JSON.stringify(G));
  } catch(e) {
    toast('Kayıt hatası: Depolama alanı dolu olabilir');
  }
}

function ixs() {
  const out=[];
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(!k || !k.startsWith('fe_s_')) continue;
    try{
      const g=JSON.parse(localStorage.getItem(k));
      if(g && g.teams){
        out.push({
          id:g.id,
          name:g.teams[0]?.name || 'Kulüp',
          logo:g.logo || '⚽',
          s:g.season || 1,
          w:g.week || 0,
          ts:+g.id || Date.now()
        });
      }
    }catch(e){}
  }
  return out.sort((a,b)=>b.ts-a.ts);
}

const back=()=>'<button class="btn s" data-a="go" data-v="menu">‹ Menü</button>';

const NAV=[
  ['hub','🏠','Ana'],
  ['club','👥','Kadro'],
  ['tr','🔁','Transfer'],
  ['tac','📋','Taktik'],
  ['lg','🏆','Lig']
];

const nav=()=>`<div class="nav">${
  NAV.map(([v,i,n])=>`
    <a data-a="go" data-v="${v}" class="${S.v==v?'on':''}">
      ${i}<br>${n}
    </a>
  `).join('')
}</div>`;

const prow=(p,at,lb,cls)=>`
<div class="row ${cls||''}" ${at}>
  <span class="tag">${lb||p.pos}</span>
  <span>
    ${p.name}${p.inj?' 🚑'+p.inj:''}
    <br><small class="m">${p.age} yaş • ${p.yrs} yıl</small>
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

const tblH=r=>`
<table>
<tr>
<th>#</th><th>Takım</th><th>O</th><th>G</th>
<th>B</th><th>M</th><th>A</th><th>Y</th><th>Av</th><th>P</th>
</tr>
${r.map(x=>`
<tr class="${x.t.id==0?'me':''}">
<td>${x.k}</td><td>${x.t.name}</td><td>${x.p}</td>
<td>${x.w}</td><td>${x.d}</td><td>${x.l}</td>
<td>${x.gf}</td><td>${x.ga}</td>
<td>${x.gf-x.ga}</td><td><b>${x.pt}</b></td>
</tr>`).join('')}
</table>`;

function vMenu(){
  return `
  <div style="text-align:center;padding:26px 0">
    <div style="font-size:54px">🏆</div>
    <h1>FOOTBALL EMPIRE</h1>
    <div class="m">ZUNEX STUDIOS • 2.0</div>
  </div>
  <div class="mg">
  ${[
    ['new','⚽','Yeni Kariyer'],
    ['load','▶️','Kariyere Devam Et'],
    ['team','🏟️','Kulübüm'],
    ['club','👥','Kadro'],
    ['tr','🔁','Transfer'],
    ['tac','📋','Taktikler'],
    ['train','🏋️','Antrenman'],
    ['lg','🏆','Ligler'],
    ['stad','🏗️','Stadyum'],
    ['fin','💰','Finans'],
    ['stat','📊','İstatistikler'],
    ['set','⚙️','Ayarlar']
  ].map(([v,i,n])=>`
    <button class="mb" data-a="go" data-v="${v}">
      <span>${i}</span>${n}
    </button>
  `).join('')}
  </div>`;
}

function vNew(){
  const f=S.nf;
  return back()+`
  <h2>Yeni Kariyer</h2>
  <div class="card">
    <label class="m">Kulüp Adı</label>
    <input data-f="name" maxlength="20"
      placeholder="Kulübünün adını yaz" value="${f.name}">
    <label class="m">Logo</label>
    <div class="logos">
      ${D.LOGOS.map(l=>`
        <span data-a="logo" data-v="${l}"
        class="${l==f.logo?'on':''}">${l}</span>
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
      ${Object.entries(D.C).map(([k,c])=>`
        <option value="${k}" ${k==f.co?'selected':''}>
          ${c.n} – ${c.l}
        </option>
      `).join('')}
    </select>
    <label class="m">Başlangıç Bütçesi</label>
    <select data-f="bud">
      ${[30000000,50000000,100000000].map(b=>`
        <option value="${b}" ${b==f.bud?'selected':''}>
          ${M$(b)}
        </option>
      `).join('')}
    </select>
  </div>
  <button class="btn p" data-a="start">Kariyere Başla</button>`;
}

function vLoad(){
  const list=ixs();
  return back()+'<h2>Kariyere Devam Et</h2>'+
  (list.length?list.map(s=>`
    <div class="card">
      <div class="sc">
        <span style="font-size:30px">${s.logo}</span>
        <span style="flex:1">${s.name}
          <br><small class="m">Sezon ${s.s} • Hafta ${s.w}/38</small>
        </span>
      </div>
      <button class="btn s p" data-a="ld" data-id="${s.id}">▶ Devam</button>
      <button class="btn s" data-a="del" data-id="${s.id}">Sil</button>
    </div>
  `).join(''):'<div class="card">Kayıtlı kariyer yok.</div>');
}

function vSet(){
  return back()+`
  <h2>Ayarlar</h2>
  <div class="card">
    <label class="m">Maç Hızı</label>
    <select data-sp="1">
      ${[1,2,4,8].map(n=>`
        <option ${(+localStorage.getItem('fe_sp')||2)==n?'selected':''}>${n}</option>
      `).join('')}
    </select>
  </div>
  <div class="card">
    <button class="btn" data-a="delall">Tüm Kayıtları Sil</button>
  </div>
  <div class="card m">Football Empire 2.0 • ZUNEX STUDIOS</div>`;
}

function vHub(){
  const T=G.teams,u=T[0],tb=table();
  const me=tb.find(r=>r.t.id==0);
  let h=`
  <div class="card">
    <div class="sc">
      <span style="font-size:34px">${G.logo}</span>
      <span style="flex:1">${u.name}
        <br><small class="m">Sezon ${G.season} • Hafta ${Math.min(G.week+1,38)}/38 • ${me.k}. sıra</small>
      </span>
      <b>${M$(G.bud)}</b>
    </div>
    <button class="btn s" data-a="go" data-v="menu">☰ Menü</button>
  </div>`;
  if(G.week>=38){
    h+=`<div class="card">
      <h2>🏆 Sezon Bitti</h2>
      Şampiyon: ${tb[0].t.name}<br>Sıralaman: ${me.k}.
      <button class="btn p" data-a="ns">Yeni Sezon</button>
    </div>`;
  }else{
    const f=G.fix[G.week].find(x=>x[0]==0||x[1]==0);
    const op=T[f[0]==0?f[1]:f[0]];
    const ra=rate(op);
    h+=`<div class="card">
      <div class="m">Sıradaki maç • ${f[0]==0?'İç saha':'Deplasman'}</div>
      <div class="sc"><span>${u.name}</span><b>VS</b><span>${op.name}</span></div>
      <div class="m">Rakip hücum ${Math.round(ra.at)} • Savunma ${Math.round(ra.df)}</div>
      <button class="btn p" data-a="play">▶ Maçı Oyna</button>
      <button class="btn" data-a="quick">⏩ Hızlı Simüle Et</button>
    </div>`;
  }
  if(G.last){
    h+=`<div class="card">
      <div class="m">Son maç</div>
      <div class="sc">
        <span>${T[G.last.h].name}</span>
        <b>${G.last.r[0]}-${G.last.r[1]}</b>
        <span>${T[G.last.a].name}</span>
      </div>
    </div>`;
  }
  let top=tb.slice(0,5);
  if(me.k>5)top.push(me);
  return h+`<div class="card"><h3>Puan Durumu</h3>${tblH(top)}</div>
  <div class="card m">${G.news.slice(0,5).join('<br>')}</div>`;
}

function vClub(){
  const u=G.teams[0],c=pl(u,S.cur),B=bench(u);
  const row=p=>prow(p,`data-a="pk" data-id="${p.id}"`,p.pos,S.cur==p.id?'sel':'');
  return `<h2>Kadro</h2>
  <div class="card">
    Kadro: ${u.sq.length}/30
    <br>Bütçe: ${M$(G.bud)}
  </div>
  ${c?`<div class="card">
    <h3>${c.name}</h3>
    ${c.age} yaş • ${c.ovr} yetenek • ${c.pot} potansiyel
    <br>Maaş: ${M$(c.sal)} • Değer: ${M$(c.val)}
    <button class="btn s" data-a="renew">Sözleşme Yenile</button>
    <button class="btn s" data-a="sell" data-id="${c.id}">Sat</button>
  </div>`:''}
  <div class="card"><h3>İlk 11</h3>${u.lu.map(id=>row(pl(u,id))).join('')}</div>
  <div class="card"><h3>Yedekler</h3>${B.map(row).join('')}</div>`;
}

function vTr(){
  const u=G.teams[0],f=S.fl;
  const sel=(q,o)=>`<select data-q="${q}">${o.map(([v,n])=>`
    <option value="${v}" ${f[q]==v?'selected':''}>${n}</option>
  `).join('')}</select>`;
  let h=`<h2>Transfer Merkezi</h2>
  <div class="card">
    Bütçe: ${M$(G.bud)} • Kadro: ${u.sq.length}/30
    <button class="btn s ${S.tt=='b'?'on':''}" data-a="tt" data-v="b">Satın Al</button>
    <button class="btn s ${S.tt=='s'?'on':''}" data-a="tt" data-v="s">Sat</button>
  </div>`;
  if(S.tt=='b'){
    const L=G.mk.filter(p=>
      (!f.g||p.g==f.g)&&(!+f.max||p.val<=+f.max)&&
      p.ovr>=+f.min&&(!f.q||(p.name+' '+p.from).toLowerCase().includes(f.q.toLowerCase()))
    ).sort((a,b)=>b.ovr-a.ovr);
    h+=`<div class="card"><div class="g2">
      ${sel('g',[['','Tüm Mevkiler'],['GK','Kaleci'],['DF','Defans'],['MD','Orta Saha'],['FW','Forvet']])}
      ${sel('max',[[0,'Her Fiyat'],[1000000,'1M'],[5000000,'5M'],[15000000,'15M'],[40000000,'40M']])}
      ${sel('min',[[0,'Min. Yetenek'],[60,'60+'],[70,'70+'],[75,'75+']])}
      <input data-q="q" placeholder="Oyuncu ara" value="${f.q}">
    </div></div>`;
    h+=L.slice(0,30).map(p=>`
      <div class="card">
        <b>${p.name}</b> • ${p.pos}
        <br><small class="m">${p.from} • ${p.age} yaş • ${p.ovr}/${p.pot}</small>
        <br>${M$(p.val)}
        <button class="btn s p" data-a="buy" data-id="${p.id}">Satın Al</button>
      </div>`).join('');
  }else{
    h+=u.sq.slice().sort((a,b)=>b.ovr-a.ovr).map(p=>`
      <div class="card">${p.name} • ${p.ovr}
      <button class="btn s" data-a="sell" data-id="${p.id}">Sat</button></div>
    `).join('');
  }
  return h;
}

function vTac(){
  const u=G.teams[0],sl=slots(u.form),r=rate(u),B=bench(u);
  return `<h2>Taktikler</h2>
  <div class="card">
    <div class="m">Diziliş</div>
    ${Object.keys(D.FM).map(f=>`
      <button class="btn s ${u.form==f?'on':''}" data-a="fm" data-v="${f}">${f}</button>
    `).join('')}
    <div class="m">Oyun Anlayışı</div>
    ${[['A','Hücum'],['B','Dengeli'],['D','Savunma']].map(([k,n])=>`
      <button class="btn s ${u.tac==k?'on':''}" data-a="tc" data-v="${k}">${n}</button>
    `).join('')}
    <p>Hücum ${Math.round(r.at)} • Orta ${Math.round(r.md)} • Savunma ${Math.round(r.df)}</p>
    <button class="btn s" data-a="auto">Otomatik Diz</button>
  </div>
  <div class="card"><h3>İlk 11</h3>
    ${u.lu.map((id,i)=>prow(pl(u,id),`data-a="sw" data-k="l" data-i="${i}"`,lab(sl[i]),S.sw?.k=='l'&&S.sw.i==i?'sel':'')).join('')}
  </div>
  <div class="card"><h3>Yedekler</h3>
    ${B.map((p,i)=>prow(p,`data-a="sw" data-k="b" data-i="${i}" data-id="${p.id}"`,p.pos,S.sw?.k=='b'&&S.sw.i==i?'sel':'')).join('')}
  </div>`;
}

function vLg(){
  const T=G.teams,w=S.fw==null?Math.max(0,G.week-1):S.fw;
  const fx=G.res[w]||G.fix[w].map(([h,a])=>[h,a,'-','-']);
  return `<h2>${D.C[G.country].l} • Sezon ${G.season}</h2>
  <div class="card">${tblH(table())}</div>
  <div class="card">
    <div class="sc">
      <button class="btn s" data-a="fw" data-v="-1">‹</button>
      <b>${w+1}. Hafta</b>
      <button class="btn s" data-a="fw" data-v="1">›</button>
    </div>
    ${fx.map(([h,a,x,y])=>`
      <div class="sc" style="font-size:13px;padding:5px 0">
        <span>${T[h].name}</span><b>${x}-${y}</b><span>${T[a].name}</span>
      </div>
    `).join('')}
  </div>
  ${G.hist.length?`<div class="card">${G.hist.join('<br>')}</div>`:''}`;
}

function vMatch(){
  const m=S.m;
  return `<div class="card">
    <div class="sc">
      <span>${m.h.name}</span><b id="sco">0-0</b><span>${m.a.name}</span>
    </div>
    <div id="mn" class="m" style="text-align:center">0'</div>
  </div>
  <canvas id="cv"></canvas>
  <div class="card">
    <button class="btn s" data-a="pz" id="pz">⏸ Duraklat</button>
    ${[1,2,4].map(s=>`<button class="btn s sp" data-a="sp" data-v="${s}">x${s}</button>`).join('')}
    <button class="btn s" data-a="skip">⏭ Bitir</button>
  </div>
  <div id="subp"></div><div id="fin"></div><div id="hud"></div>`;
}

const V={
  menu:vMenu,new:vNew,load:vLoad,set:vSet,hub:vHub,
  club:vClub,tr:vTr,tac:vTac,lg:vLg,match:vMatch
};

function render(){
  const el=$('#app');
  if(!el)return;
  const fn=V[S.v]||V.menu;
  el.innerHTML=fn()+(G&&NAV.some(n=>n[0]==S.v)?nav():'');
  if(S.v=='match')startMV();
}

function hud(){
  const m=S.m;
  if(!m)return;
  const s=m.st,tt=(s.po[0]+s.po[1])||1;
  const bar=(n,a,b)=>`
    <div style="margin:6px 0">
      <div class="sc"><span>${a}</span><span>${n}</span><span>${b}</span></div>
      <i class="bar"><u style="width:${a/((a+b)||1)*100}%"></u></i>
    </div>`;
  $('#sco').textContent=m.s[0]+' - '+m.s[1];
  $('#mn').textContent=m.min>=90?'Maç Sonu':m.min+"'";
  $('#hud').innerHTML=`<div class="card">
    ${bar('Topla Oynama',s.po[0],s.po[1])}
    ${bar('Şut',s.sh[0],s.sh[1])}
    ${bar('İsabetli Şut',s.ot[0],s.ot[1])}
    ${bar('Korner',s.co[0],s.co[1])}
    ${bar('Faul',s.fo[0],s.fo[1])}
  </div><div class="card">${m.log.slice(0,8).join('<br>')||'Maç başlıyor…'}</div>`;
  if(m.min>=90&&!m.sum){
    $('#fin').innerHTML='<button class="btn p" data-a="mfin">Maçı Bitir</button>';
  }
}

function startMV(){
  const id=++MV.n,cv=$('#cv');
  if(!cv)return;
  const W=cv.clientWidth||340,H=Math.round(W*1.35),d=window.devicePixelRatio||1;
  const x=cv.getContext('2d');
  cv.width=W*d;cv.height=H*d;cv.style.height=H+'px';x.scale(d,d);
  const m=S.m,T=[m.h,m.a];
  const B=T.map((t,k)=>slots(t.form).map(s=>k?
    {x:(1-s.y)*W,y:H*s.x}:{x:s.y*W,y:H*(1-s.x)}));
  const Q=B.map(a=>a.map(p=>({...p})));
  const ba={x:W/2,y:H/2,tx:W/2,ty:H/2};
  let last=performance.now(),acc=0,sub=0,fl=0;
  function tick(){
    if(m.min>=90)return;
    step(m);
    const side=m.t||0;
    const p=Q[side][R(0,10)];
    if(p){ba.tx=p.x;ba.ty=p.y}
    if(m.goal){fl=35;m.goal=0}
    sub++;hud();
  }
  function frame(ts){
    if(S.v!='match'||id!=MV.n)return;
    const dt=Math.min(60,ts-last);last=ts;
    if(MV.play&&m.min<90){
      acc+=dt*MV.sp;
      while(acc>=250&&m.min<90){acc-=250;tick()}
    }
    ba.x+=(ba.tx-ba.x)*.14;ba.y+=(ba.ty-ba.y)*.14;
    x.fillStyle='#1f7a3e';x.fillRect(0,0,W,H);
    x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=2;
    x.strokeRect(6,6,W-12,H-12);
    x.beginPath();x.moveTo(6,H/2);x.lineTo(W-6,H/2);x.stroke();
    x.beginPath();x.arc(W/2,H/2,W*.13,0,7);x.stroke();
    x.strokeRect(W*.22,6,W*.56,H*.14);
    x.strokeRect(W*.22,H-6-H*.14,W*.56,H*.14);
    T.forEach((t,k)=>Q[k].forEach((p,i)=>{
      const b=B[k][i];
      p.x+=(b.x+(ba.x-b.x)*.15-p.x)*.06;
      p.y+=(b.y+(ba.y-b.y)*.15-p.y)*.06;
      x.beginPath();x.arc(p.x,p.y,W*.026,0,7);
      x.fillStyle=i?t.c1:'#e8d44d';x.fill();
      x.strokeStyle=t.c2;x.stroke();
    }));
    x.beginPath();x.arc(ba.x,ba.y,W*.013,0,7);
    x.fillStyle='#fff';x.fill();
    if(fl>0){
      fl--;x.fillStyle='rgba(0,0,0,.5)';
      x.fillRect(0,H/2-32,W,64);
      x.fillStyle='#d4af37';x.font='bold 34px sans-serif';
      x.textAlign='center';x.fillText('GOOOL!',W/2,H/2+12);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);hud();
}

function act(a,d={}){
  const u=G&&G.teams[0];
  switch(a){
    case 'go':
      if(!G&&!['menu','new','load','set'].includes(d.v))
        return toast('Önce kariyer başlat veya yükle');
      S.v=d.v;S.sw=null;render();break;

    case 'logo':
      S.nf.logo=d.v;render();break;

    case 'start':
      if(!S.nf.name.trim())return toast('Kulübüne isim ver');
      startCareer();break;

    case 'ld':{
      try{G=JSON.parse(localStorage.getItem('fe_s_'+d.id))}
      catch(e){G=null}
      if(!G)return toast('Kayıt bulunamadı');
      initG();migrate();
      PID=Math.max(0,...G.teams.flatMap(t=>t.sq.map(p=>p.id)),...(G.mk||[]).map(p=>p.id));
      G.mk=G.mk||[];G.res=G.res||[];G.news=G.news||[];
      G.hist=G.hist||[];G.week=Math.min(38,G.week||0);
      G.teams.forEach(t=>fixLU(t));
      S.v='hub';save();render();break;
    }

    case 'del':
      if(confirm('Bu kariyer silinsin mi?')){
        localStorage.removeItem('fe_s_'+d.id);render();
      }break;

    case 'delall':
      if(confirm('Tüm kayıtlar silinsin mi?')){
        Object.keys(localStorage).filter(k=>k.startsWith('fe_s_')).forEach(k=>localStorage.removeItem(k));
        G=null;S.v='menu';render();
      }break;

    case 'pk':
      S.cur=+d.id;render();break;

    case 'tt':
      S.tt=d.v;render();break;

    case 'buy':{
      const p=G.mk.find(x=>x.id==+d.id);
      if(!p)return;
      const msg=negotiate(p.id,1,1);
      toast(msg);save();render();break;
    }

    case 'sell':{
      const p=pl(u,+d.id);
      if(!p)return;
      if(u.sq.length<=15)return toast('Kadro en az 15 oyuncu olmalı');
      if(p.g=='GK'&&u.sq.filter(x=>x.g=='GK').length<=2)
        return toast('En az 2 kaleci kalmalı');
      G.bud+=p.val*.8;
      G.fn.tr+=p.val*.8;
      u.sq=u.sq.filter(x=>x.id!=p.id);
      fixLU(u);S.cur=null;save();render();break;
    }

    case 'renew':{
      const p=pl(u,S.cur);
      if(!p)return;
      const cost=p.sal*2;
      if(G.bud<cost)return toast('Bütçe yetersiz');
      G.bud-=cost;p.yrs+=2;p.mor=cl(p.mor+8,0,100);
      save();toast('Sözleşme yenilendi');render();break;
    }

    case 'fm':
      u.form=d.v;autoLU(u);save();render();break;

    case 'tc':
      u.tac=d.v;save();render();break;

    case 'auto':
      autoLU(u);save();render();break;

    case 'sw':{
      if(!S.sw){S.sw={k:d.k,i:+d.i,id:+d.id};render();break}
      const first=S.sw;
      if(first.k=='l'&&d.k=='l'){
        const a=u.lu[first.i],b=u.lu[+d.i];
        u.lu[first.i]=b;u.lu[+d.i]=a;
      }else if(first.k=='l'&&d.k=='b'){
        const old=u.lu[first.i],n=bench(u)[+d.i];
        if(n){u.lu[first.i]=n.id;S.sw=null}
        else return;
      }else if(first.k=='b'&&d.k=='l'){
        const n=bench(u)[first.i],old=u.lu[+d.i];
        if(n){u.lu[+d.i]=n.id}
      }
      S.sw=null;fixLU(u);save();render();break;
    }

    case 'fw':
      S.fw=cl((S.fw==null?Math.max(0,G.week-1):S.fw)+ +d.v,0,37);
      render();break;

    case 'play':{
      if(G.week>=38)return toast('Sezon bitti');
      const f=G.fix[G.week].find(x=>x[0]==0||x[1]==0);
      if(!f)return toast('Maç bulunamadı');
      fixInj(u);
      S.m=newM(G.teams[f[0]],G.teams[f[1]]);
      S.v='match';MV.play=true;MV.sp=+localStorage.getItem('fe_sp')||2;
      render();break;
    }

    case 'quick':{
      if(G.week>=38)return toast('Sezon bitti');
      const f=G.fix[G.week].find(x=>x[0]==0||x[1]==0);
      if(!f)return toast('Maç bulunamadı');
      fixInj(u);
      G.live=0;
      week(quick(G.teams[f[0]],G.teams[f[1]]));
      S.v='hub';render();break;
    }

    case 'pz':
      MV.play=!MV.play;
      $('#pz').textContent=MV.play?'⏸ Duraklat':'▶ Devam';
      break;

    case 'sp':
      MV.sp=+d.v;localStorage.setItem('fe_sp',MV.sp);render();break;

    case 'skip':
      MV.play=false;
      while(S.m.min<90)step(S.m);
      hud();break;

    case 'mfin':
      if(!S.m)return;
      G.live=1;week(S.m.s);
      S.m=null;S.v='hub';save();render();break;

    case 'ns':
      newSeason();S.v='hub';render();break;

    default:
      toast('Bu işlem henüz desteklenmiyor');
  }
}

/* Form ve düğme olayları */
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-a]');
  if(!el)return;
  act(el.dataset.a,el.dataset);
});

document.addEventListener('input',e=>{
  const el=e.target;
  if(el.dataset.f){
    S.nf[el.dataset.f]=el.value;
  }
  if(el.dataset.q){
    S.fl[el.dataset.q]=el.value;
    if(el.dataset.q=='q')render();
  }
});

document.addEventListener('change',e=>{
  const el=e.target;
  if(el.dataset.f){
    S.nf[el.dataset.f]=el.value;
  }
  if(el.dataset.q){
    S.fl[el.dataset.q]=el.value;render();
  }
  if(el.dataset.sp){
    localStorage.setItem('fe_sp',el.value);
    MV.sp=+el.value;
  }
});
