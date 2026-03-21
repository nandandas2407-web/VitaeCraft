let _toastTimer=null;

function toast(msg,type='success'){
  const t=document.getElementById('toast');
  const icons={success:'✓',warn:'⚠',info:'ℹ',error:'✕'};
  document.getElementById('toastIco').textContent=icons[type]||'✓';
  document.getElementById('toastTxt').textContent=msg;
  const colors={success:'rgba(200,245,56,.35)',warn:'rgba(240,165,0,.3)',info:'rgba(34,211,238,.3)',error:'rgba(240,91,122,.3)'};
  t.style.borderColor=colors[type]||colors.success;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

function setLevel(lv){
  S.level=lv;
  document.querySelectorAll('.level-tab').forEach(b=>b.classList.toggle('active',b.dataset.lv===lv));
  render();
}

function setProf(p){S.prof=p;render();}

function togMob(){
  const p=document.getElementById('previewPanel');
  const b=document.querySelector('.mob-toggle');
  const o=p.classList.contains('m-open');
  p.classList.toggle('m-open',!o);
  if(b)b.textContent=o?'👁 Preview':'✕ Close';
}

function demoFill(){
  const key=`${S.level}_${S.prof}`;
  const demo=DEMOS[key]||DEMOS['fresher_developer'];
  sv('f-name',demo.name);sv('f-title',demo.title);sv('f-summary',demo.summary||'');
  sv('f-email',demo.email);sv('f-phone',demo.phone);sv('f-li',demo.li||'');
  sv('f-gh',demo.gh||'');sv('f-loc',demo.loc||'');sv('f-web',demo.web||'');sv('f-refs',demo.refs||'');
  document.getElementById('skillWrap').innerHTML='';S.skCats={};
  Object.entries(demo.skCats||{}).forEach(([id,c])=>{
    S.skCats[id]={label:c.label,tags:[...c.tags]};
    document.getElementById('skillWrap').appendChild(buildSkCatEl(id,c.label,c.tags));
  });
  ['expList','projList','eduList','certList','achList','langList'].forEach(lid=>{const e=document.getElementById(lid);if(e)e.innerHTML='';});
  S.exps=[];S.projs=[];S.edus=[];S.certs=[];S.achs=[];S.langs=[];
  (demo.exps||[]).forEach(e=>{addExp();const id=C.ex;sv('ec_'+id,e.co);sv('er_'+id,e.role);sv('ed_'+id,e.dur);sv('el_'+id,e.loc||'');sv('eb_'+id,e.desc);});
  (demo.projs||[]).forEach(p=>{addProj();const id=C.pr;sv('pn_'+id,p.name);sv('ps_'+id,p.stack);sv('pu_'+id,p.url||'');sv('pd_'+id,p.desc);});
  (demo.edus||[]).forEach(e=>{addEdu();const id=C.ed;sv('es_'+id,e.school);sv('eg_'+id,e.deg);sv('ey_'+id,e.yr);sv('egd_'+id,e.grade||'');sv('eco_'+id,e.course||'');});
  (demo.certs||[]).forEach(c=>{addCert();const id=C.ce;sv('cn_'+id,c.name);sv('ci_'+id,c.issuer);sv('cd_'+id,c.date);sv('cid_'+id,c.cid||'');});
  (demo.achs||[]).forEach(a=>{addAch();const id=C.ac;sv('at_'+id,a.title);sv('ad_'+id,a.date||'');sv('ab_'+id,a.desc||'');});
  (demo.langs||[]).forEach(l=>{addLang();const id=C.la;sv('ln_'+id,l.name);sv('ll_'+id,l.level);});
  updateCounts();render();
  toast(`⚡ Demo: ${S.level} · ${S.prof}`,'success');
}

document.addEventListener('DOMContentLoaded',()=>{
  const wrap=document.getElementById('skillWrap');
  if(!wrap.children.length){
    const defaults=[{id:'tech',label:'Technical Skills',tags:[]},{id:'tools',label:'Tools & Platforms',tags:[]}];
    defaults.forEach(d=>{wrap.appendChild(buildSkCatEl(d.id,d.label,d.tags));});
  }
  ['basics','exp','edu'].forEach(id=>{
    const hd=document.querySelector(`#acc-${id} .acc-hd`);
    const bd=document.getElementById(`acbd-${id}`);
    if(hd&&bd){hd.classList.add('open');bd.classList.add('open');}
  });
  loadState();
  toast('Welcome to VitaeCraft — click ⚡ Demo to get started','info');
});

window.addEventListener('beforeunload',saveState);
