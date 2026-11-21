/* ===== v2 additions ===== */
Object.assign(IC,{phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',msg:'<path d="M4 5h16v11H9l-5 4z"/>',cfg:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',pin:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',warn:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>'});

/* Preferences (wika, laki ng teksto, contrast, nakita na ang gabay) */
try{const p=JSON.parse(localStorage.getItem('fc_prefs')||'{}');if('tl'in p)S.tl=!!p.tl;if(p.ts==='l')S.ts='l';S.seen=!!p.seen}catch(e){}
const savePrefs=()=>{try{localStorage.setItem('fc_prefs',JSON.stringify({tl:S.tl,ts:S.ts,hc:S.hc,seen:S.seen}))}catch(e){}};
function closeOv(){if(S.ov==='guide'){S.seen=true;savePrefs()}S.ov='';S.warn=[]}

/* Bayan: humigit-kumulang na sentro ng bayan, pang-ranggo lang ng pinakamalapit */
const PC={Daet:[14.1132,122.9559],Mercedes:[14.1094,123.0093],Labo:[14.1555,122.8309],Paracale:[14.2786,122.7864],'Jose Panganiban':[14.2951,122.6817],Vinzons:[14.1693,122.9047],Talisay:[14.138,122.922],Basud:[14.0662,122.9631],'San Vicente':[14.1064,122.8731],'Santa Elena':[14.1851,122.3938],Capalonga:[14.3394,122.4833]};
const hav=(a,b,c,d)=>{const r=x=>x*Math.PI/180,k=r(c-a),l=r(d-b),h=Math.sin(k/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(l/2)**2;return 12742*Math.asin(Math.sqrt(h))};
const TWN=()=>{const f=S.q.trim().toLowerCase(),list=PL.filter(p=>p.toLowerCase().includes(f));
 if(S.near&&!f)return `<p class="lead">${T('Closest to you','Pinakamalapit sa iyo')}</p><div class="g1">${S.near.map(n=>`<button class="opt" data-a="set" data-k="loc" data-v="${n.p}">${ic('pin')}<span style="flex:1">${n.p}</span><small class="fine" style="font-weight:700">≈ ${n.d<10?n.d.toFixed(1):Math.round(n.d)} km</small></button>`).join('')}</div><button class="ghost" data-a="allt">${T('Show all towns','Ipakita lahat ng bayan')}</button>`;
 if(!list.length)return `<p class="fine">${T('No town found.','Walang nahanap na bayan.')}</p>`;
 return `<div class="g2 pl">${list.map(p=>`<button class="opt"${p==='Jose Panganiban'&&!f?' style="grid-column:1/-1"':''} data-a="set" data-k="loc" data-v="${p}">${p}</button>`).join('')}</div>`};
const LOCUI=()=>{const m={busy:T('Finding your location…','Hinahanap ang lokasyon mo…'),deny:T('Location was not allowed. Search or pick a town below.','Hindi pinayagan ang lokasyon. Maghanap o pumili ng bayan sa ibaba.'),err:T('Could not get your location. Pick a town below.','Hindi makuha ang lokasyon. Pumili ng bayan sa ibaba.'),far:T('You seem far from these towns. Pick one below.','Mukhang malayo ka sa mga bayang ito. Pumili sa ibaba.')}[S.nst];
 return `<button class="opt dash" data-a="near"${S.nst==='busy'?' disabled':''}>${ic('pin')}${T('Near me','Malapit sa akin')}</button>${m?`<p class="fine" role="status">${m}</p>`:`<p class="fine">${T('Your location is only used to find the nearest town.','Gagamitin lang ang lokasyon mo para hanapin ang pinakamalapit na bayan.')}</p>`}<div class="srch">${ic('search')}<input class="t" id="ts" type="search" autocomplete="off" aria-label="${T('Search town','Hanapin ang bayan')}" placeholder="${T('Search town','Hanapin ang bayan')}" value="${esc(S.q)}"></div><div id="tl">${TWN()}</div>`};
function locate(){if(!navigator.geolocation){S.nst='err';return R_()}S.nst='busy';R_();
 navigator.geolocation.getCurrentPosition(p=>{const a=p.coords.latitude,b=p.coords.longitude,L=PL.map(n=>({p:n,d:hav(a,b,PC[n][0],PC[n][1])})).sort((x,y)=>x.d-y.d);
  if(L[0].d>40){S.near=null;S.nst='far'}else{S.near=L.slice(0,3);S.nst=''}S.q='';R_()},e=>{S.nst=e&&e.code===1?'deny':'err';R_()},{timeout:10000,maximumAge:300000})}

/* Status: kulay + icon + salita */
const SB={w:['clock','sw',()=>T('Waiting','Hinihintay')],ok:['msg','sy',()=>T('Replied','Sumagot')],acc:['match','sg',()=>T('Accepted','Tinanggap')]};
const badge=s=>{const[i,c,l]=SB[s];return `<span class="sb ${c}">${ic(i)}${l()}</span>`};
const card=(p,i,L,AR)=>`<div class="pc${p.s==='acc'?' done':''}${p.fresh?' arrive':''}${S.fresh===i?' fresh':''}" data-s="${p.s}"><div class="pt"><span class="pi">${ic(PI[p.n])}</span><div><b>${L[p.n]}</b><small>${PV[p.n][0]} · ${PV[p.n][1]}</small></div></div><div class="pb">${badge(p.s)}${p.s==='w'?`<div class="skl" aria-hidden="true"><i></i><i></i></div>`:`<span class="arr">${AR(p.n)}</span>`+(p.s==='ok'?`<button class="opt" data-a="acc" data-i="${i}">${ic('match')}${T('Accept','Tanggapin')}</button>`:CB(i,PV[p.n][0]))}</div></div>`;

/* Lumilipad na slip (sent: pataas, saved: pababa sa phone) */
const SLIPI=c=>`<svg class="slipi ${c}" viewBox="0 0 60 76" aria-hidden="true"><path d="M6 4h48v68l-6-5-6 5-6-5-6 5-6-5-6 5-6-5z" style="fill:var(--cell);stroke:var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M14 20h32M14 32h32M14 44h22" style="stroke:var(--mute)" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`;
/* Kumikislap ang Sagot sa navigation kahit hindi naka-render ang buong screen */
function navFlash(){const n=S.prov.filter(p=>p.s==='ok').length,b=$('#nav [data-v="match"]');if(!b)return;const s=b.querySelector('span');if(s)s.textContent=T('Replies','Sagot')+(n?' ('+n+')':'');b.classList.remove('flash');void b.offsetWidth;b.classList.add('flash')}

/* Buong screen ng kumpirmasyon */
const BIGCK=(bg,fg)=>`<svg class="bigck" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="56" style="fill:${bg}"/><path class="ck" d="M34 62l18 18 34-38" pathLength="1" fill="none" style="stroke:${fg}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* Undo */
const snap=()=>({r:JSON.stringify(S.r),need:S.need,edit:S.edit}),restore=sn=>{S.r=JSON.parse(sn.r);S.need=sn.need;S.edit=sn.edit};
const KEEP=['undo','lang','sig','dock','cfg','ovx','guide','gnext','gback','gskip','setlang','ts','hc','near','allt'];
function clrU(){if(S.undo){clearTimeout(S.undo.t);S.undo=null}}
function U(label,fn){clrU();S.undo={label,fn,scr:S.scr,t:setTimeout(()=>{S.undo=null;RU()},7000)}}
function doUndo(){const u=S.undo;if(!u)return;clrU();u.fn()}
function RU(){const u=$('#undo'),x=S.undo;if(x&&x.scr===S.scr){u.className='on';u.innerHTML=`<span class="ut">${esc(x.label)}</span><button data-a="undo">${ic('undo')}${T('Undo','Bawiin')}</button>`}else{u.className='';u.innerHTML=''}}

/* "Mali ba?" bago ipadala */
const FISH=['Tilapia','Bangus','Tuna','Other fish'];
const checks=()=>{const r=S.r,w=[];
 if(r.qty>=200)w.push({k:'qty',t:T('The weight is '+r.qty+' kg. That is very heavy. Is that right?','Ang bigat ay '+r.qty+' kg. Napakabigat nito. Tama ba?')});
 if(S.role&&r.crop&&(S.role==='fish')!==FISH.includes(r.crop))w.push({k:'crop',t:T(r.crop+' is not usually from the '+(S.role==='fish'?'sea':'land')+'. Is that right?',r.crop+' ay hindi karaniwang galing sa '+(S.role==='fish'?'dagat':'bukid')+'. Tama ba?')});
 return w};
function fin(){if(S.on)return go();S.saved=true;S.scr='saved';R_()}
const WARN=()=>`<div class="bk"></div><div class="sheet" tabindex="-1" role="alertdialog" aria-modal="true" aria-labelledby="wt"><div class="wi">${ic('warn')}</div><h2 class="hd gh" id="wt">${T('Is something wrong?','Mali ba?')}</h2>${S.warn.map(w=>`<p class="lead">${w.t}</p>`).join('')}<button class="go" data-a="wfix">${T('Change it','Baguhin')}</button><button class="go o" data-a="wgo">${S.on?T('It is right. Send','Tama. Ipadala'):T('It is right. Save','Tama. I-save')}</button></div>`;

/* Settings */
const sopt=(a,v,l,on)=>`<button class="opt" data-a="${a}" data-v="${v}" aria-pressed="${on}"><span class="bx">${on?'✓':''}</span>${l}</button>`;
const CFG=()=>`<div class="bk" data-a="ovx"></div><div class="sheet" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="ct"><div class="shd"><b class="hd" id="ct">${T('Settings','Mga setting')}</b><button class="mini" data-a="ovx">${T('Close','Isara')}</button></div>
<div class="grp"><div class="gl">${ic('globe')}${T('Language','Wika')}</div><div class="g2">${sopt('setlang','fil','Filipino',S.tl)}${sopt('setlang','en','English',!S.tl)}</div></div>
<div class="grp"><div class="gl"><b aria-hidden="true">Aa</b>${T('Text size','Laki ng teksto')}</div><div class="g2">${sopt('ts','n','Normal',S.ts==='n')}${sopt('ts','l',T('Large','Malaki'),S.ts==='l')}</div></div>
<div class="grp"><div class="gl">${ic('help')}${T('Help','Tulong')}</div><button class="opt" data-a="guide">${ic('help')}${T('How do I use this?','Paano ito gamitin?')}</button></div>
<button class="go" data-a="ovx">${T('Done','Tapos na')}</button></div>`;

/* Unang-beses na gabay: Pumili → Sabihin → Hintayin ang sagot */
const GI=[
`<svg viewBox="0 0 320 190" aria-hidden="true"><rect x="30" y="10" width="260" height="80" rx="14" fill="#0E4F7A"/><path d="M30 40q22-10 44 0t44 0t44 0t44 0t44 0M30 64q22-10 44 0t44 0t44 0t44 0t44 0" fill="none" stroke="#7DBBD6" stroke-width="4" opacity=".7"/><rect x="30" y="100" width="260" height="80" rx="14" fill="#2F6B2B"/><path d="M30 128q65-14 130 0t130 0M30 154q65-14 130 0t130 0" fill="none" stroke="#B7DB6A" stroke-width="3" stroke-dasharray="2 8"/><circle class="gtap" cx="215" cy="52" r="30" fill="none" stroke="#F7C948" stroke-width="4"/><circle cx="215" cy="52" r="15" fill="#F7C948"/></svg>`,
`<svg viewBox="0 0 320 190" aria-hidden="true"><circle cx="160" cy="95" r="58" fill="#F7C948"/><rect x="146" y="58" width="28" height="48" rx="14" fill="#08202D"/><path d="M132 94a28 28 0 0 0 56 0M160 122v18M146 140h28" fill="none" stroke="#08202D" stroke-width="7" stroke-linecap="round"/><path d="M92 70q-16 25 0 50M70 54q-30 41 0 82M228 70q16 25 0 50M250 54q30 41 0 82" fill="none" stroke="#0E4F7A" stroke-width="6" stroke-linecap="round"/></svg>`,
`<svg viewBox="0 0 320 190" aria-hidden="true"><rect x="30" y="10" width="260" height="50" rx="12" fill="#fff" stroke="#BCD3DD" stroke-width="3"/><circle cx="62" cy="35" r="16" fill="#8E9BA3"/><path d="M62 26v10l7 4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><rect x="92" y="24" width="150" height="10" rx="5" fill="#BCD3DD"/><rect x="92" y="40" width="100" height="8" rx="4" fill="#BCD3DD"/>
<rect x="30" y="70" width="260" height="50" rx="12" fill="#fff" stroke="#BCD3DD" stroke-width="3"/><circle cx="62" cy="95" r="16" fill="#F7C948"/><path d="M54 89h16v10h-8l-4 4v-4h-4z" fill="none" stroke="#08202D" stroke-width="2.5" stroke-linejoin="round"/><rect x="92" y="84" width="150" height="10" rx="5" fill="#BCD3DD"/><rect x="92" y="100" width="100" height="8" rx="4" fill="#BCD3DD"/>
<rect x="30" y="130" width="260" height="50" rx="12" fill="#fff" stroke="#2F6B2B" stroke-width="3"/><circle cx="62" cy="155" r="16" fill="#2F6B2B"/><path d="M54 156l6 6 11-12" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="92" y="144" width="150" height="10" rx="5" fill="#BCD3DD"/><rect x="92" y="160" width="100" height="8" rx="4" fill="#BCD3DD"/></svg>`];
const GUIDE=()=>{const i=S.gs,st=[[T('Choose','Pumili'),T('Tap Sea if you fish, or Land if you farm.','Pindutin ang Dagat kung mangingisda ka, o Bukid kung magsasaka ka.')],[T('Say it','Sabihin'),T('Tap the big mic and say what you have. You can also use buttons.','Pindutin ang malaking mic at sabihin kung ano ang hawak mo. Puwede ring gamitin ang buttons.')],[T('Wait for replies','Hintayin ang sagot'),T('Your request goes to providers. When one replies, tap Accept.','Ipapadala ang request mo sa mga provider. Kapag may sumagot, pindutin ang Tanggapin.')]];
 return `<div class="sheet gd" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="gt"><div class="gtop"><span class="step">${i+1}/3</span><button class="ghost" data-a="gskip">${T('Skip','Laktawan')}</button></div><div class="gimg">${GI[i]}</div><div class="gn" aria-hidden="true">${[0,1,2].map(k=>`<i class="${k===i?'on':k<i?'dn':''}">${k<i?'✓':k+1}</i>`).join('')}</div><h2 class="hd gh" id="gt">${st[i][0]}</h2><p class="lead">${st[i][1]}</p><div class="gbtn">${i?`<button class="go o" data-a="gback">${ic('back')}<span class="lb">${T('Back','Bumalik')}</span></button>`:''}<button class="go" data-a="gnext">${i<2?T('Next','Susunod'):T('Start','Simulan')}</button></div></div>`};
function ROV(){const o=$('#ov'),on=!!S.ov;o.className=on?'on'+(S.ov==='guide'?' full':''):'';
 ['#top','#hatch','#m','#dock','#undo','#act','#nav'].forEach(s=>{$(s).inert=on});
 if(!on){o.innerHTML='';const pv=S.ovPrev;S.ovPrev='';S.ovKey='';if(pv==='cfg'||pv==='guide'){const g=$('[data-a="'+pv+'"]');g&&g.focus()}return}
 const key=S.ov+':'+S.gs,fa=document.activeElement,f=fa&&o.contains(fa)?[fa.dataset.a,fa.dataset.v]:null;
 o.innerHTML=S.ov==='guide'?GUIDE():S.ov==='cfg'?CFG():WARN();
 let t=null;if(S.ovKey!==key){S.ovKey=key;t=o.querySelector('.sheet')}else if(f&&f[0])t=o.querySelector('[data-a="'+f[0]+'"]'+(f[1]!==undefined?'[data-v="'+f[1]+'"]':''));
 t&&t.focus();S.ovPrev=S.ov}

/* Boses: ipakita ang narinig */
const heardUI=()=>`<div class="bub b">${T('I heard: “','Narinig ko: “')}${esc(S.heard.t)}${T('”. Is that right?','”. Tama ba?')}</div><div class="g2"><button class="opt" data-a="hyes"><span class="bx">✓</span>${T('Yes','Oo')}</button><button class="opt" data-a="hno"><span class="bx">✕</span>${T('No','Hindi')}</button></div>`;
function heard(a){const t=(a.transcript||'').trim();if(!t)return verr({error:'no-speech'});
 const sr=JSON.stringify(S.r),sn=S.need,se=S.edit;interpret(t);const ch=sr!==JSON.stringify(S.r);S.r=JSON.parse(sr);S.need=sn;S.edit=se;
 if(ch&&!(a.confidence>0&&a.confidence<.75))return say(t,true);
 S.heard={t,ch};R_()}
function verr(e){const er=e&&e.error;S.listening=false;if(er==='aborted')return R_();
 const m={'no-speech':T('I heard nothing. Move closer to the phone and try again.','Wala akong narinig. Lumapit sa phone at subukan muli.'),'not-allowed':T('The microphone is blocked. Allow it in your phone settings, or type.','Naka-block ang mic. Payagan ito sa settings ng phone, o mag-type.'),'service-not-allowed':T('The microphone is blocked. Allow it in your phone settings, or type.','Naka-block ang mic. Payagan ito sa settings ng phone, o mag-type.'),'network':T('Voice needs signal. Type or use buttons.','Kailangan ng signal ang boses. Mag-type o gamitin ang buttons.'),'audio-capture':T('No microphone found. Type or use buttons.','Walang mic na nakita. Mag-type o gamitin ang buttons.')}[er]||T('Could not hear you. Try again.','Hindi marinig. Subukan muli.');
 S.chat.push({r:'bot',t:m});R_()}