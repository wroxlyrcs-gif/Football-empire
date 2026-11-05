
'use strict';
const $=s=>document.querySelector(s),R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),P=a=>a[R(0,a.length-1)],cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const M$=v=>(v<0?'-':'')+(Math.abs(v)>=1e6?(Math.abs(v)/1e6).toFixed(1)+'M':Math.round(Math.abs(v)/1e3)+'K')+' €';
/* ===== VERİ MODÜLÜ ===== */
const D={
C:{TR:{n:'Türkiye',l:'Süper Lig',c:'İstanbul,Ankara,İzmir,Bursa,Antalya,Adana,Konya,Trabzon,Samsun,Kayseri,Gaziantep,Eskişehir,Rize,Mersin,Denizli,Sivas,Malatya,Hatay,Bolu,Kocaeli'.split(',')},
EN:{n:'İngiltere',l:'Premier Lig',c:'London,Manchester,Liverpool,Leeds,Newcastle,Brighton,Bristol,Derby,Leicester,Norwich,Sheffield,Wolverhampton,Nottingham,Southampton,Coventry,Burnley,Ipswich,Reading,Oxford,Cardiff'.split(',')},
ES:{n:'İspanya',l:'La Liga',c:'Madrid,Barcelona,Sevilla,Valencia,Bilbao,Málaga,Zaragoza,Vigo,Granada,Alicante,Murcia,Córdoba,Gijón,Vitoria,Pamplona,Valladolid,Santander,Almería,Elche,Getafe'.split(',')}},
FN:'Ahmet,Mehmet,Emre,Burak,Can,Kerem,Arda,Efe,Yusuf,Oğuz,Luca,Marco,Diego,Pablo,Jack,Tom,Ivan,Karim,Leo,Hugo'.split(','),
LN:'Yılmaz,Demir,Kaya,Çelik,Şahin,Aydın,Öztürk,Arslan,Koç,Polat,Rossi,Silva,García,Smith,Novak,Costa,Müller,Diaz,Brown,Kovač'.split(','),
SUF:['SK','FK','United','Spor','City'],LOGOS:['⚽','🦅','🦁','🐺','⭐','🛡️','🔥','👑'],
POS:{GK:['KL'],DF:['STP','SLB','SĞB'],MD:['DOS','OS','OOS'],FW:['SF','SLK','SĞK']},GN:{GK:'Kaleci',DF:'Defans',MD:'Orta Saha',FW:'Forvet'},
FM:{'4-3-3':[['GK',.05,[.5]],['DF',.22,[.15,.38,.62,.85]],['MD',.46,[.25,.5,.75]],['FW',.72,[.2,.5,.8]]],
'4-4-2':[['GK',.05,[.5]],['DF',.22,[.15,.38,.62,.85]],['MD',.47,[.15,.38,.62,.85]],['FW',.72,[.38,.62]]],
'4-2-3-1':[['GK',.05,[.5]],['DF',.22,[.15,.38,.62,.85]],['MD',.4,[.35,.65]],['MD',.58,[.2,.5,.8]],['FW',.75,[.5]]],
'3-5-2':[['GK',.05,[.5]],['DF',.22,[.25,.5,.75]],['MD',.46,[.1,.3,.5,.7,.9]],['FW',.72,[.38,.62]]]}};
const slots=f=>D.FM[f].flatMap(([g,x,ys])=>ys.map(y=>({g,x,y})));
const lab=s=>s.g=='GK'?'KL':s.g=='DF'?(s.y<.3?'SLB':s.y>.7?'SĞB':'STP'):s.g=='MD'?(s.y<.3?'SLO':s.y>.7?'SĞO':'OS'):(s.y<.3?'SLK':s.y>.7?'SĞK':'SF');
