const S={
  level:'fresher',prof:'developer',tpl:'modern',atsMode:false,zoom:1,
  exps:[],projs:[],edus:[],certs:[],achs:[],langs:[],skCats:{},
  photoData:null
};
const C={ex:0,pr:0,ed:0,ce:0,ac:0,la:0};

function gv(id){const e=document.getElementById(id);return e?e.value.trim():'';}
function sv(id,v){const e=document.getElementById(id);if(e)e.value=v;}

function saveState(){
  try{
    const snap={level:S.level,prof:S.prof,tpl:S.tpl,atsMode:S.atsMode,
      fields:{name:gv('f-name'),title:gv('f-title'),email:gv('f-email'),phone:gv('f-phone'),
        loc:gv('f-loc'),web:gv('f-web'),li:gv('f-li'),gh:gv('f-gh'),
        refs:gv('f-refs'),summary:gv('f-summary')},
      skCats:Object.entries(S.skCats).map(([id,c])=>({id,label:c.label,tags:[...c.tags]})),
      exps:S.exps.map(id=>({co:gv('ec_'+id),role:gv('er_'+id),dur:gv('ed_'+id),loc:gv('el_'+id),desc:gv('eb_'+id)})),
      projs:S.projs.map(id=>({name:gv('pn_'+id),stack:gv('ps_'+id),url:gv('pu_'+id),desc:gv('pd_'+id)})),
      edus:S.edus.map(id=>({school:gv('es_'+id),deg:gv('eg_'+id),yr:gv('ey_'+id),grade:gv('egd_'+id),course:gv('eco_'+id)})),
      certs:S.certs.map(id=>({name:gv('cn_'+id),issuer:gv('ci_'+id),date:gv('cd_'+id),cid:gv('cid_'+id)})),
      achs:S.achs.map(id=>({title:gv('at_'+id),date:gv('ad_'+id),desc:gv('ab_'+id)})),
      langs:S.langs.map(id=>({name:gv('ln_'+id),level:gv('ll_'+id)})),
      photoData:S.photoData,showPhoto:document.getElementById('showPhoto')?.checked};
    localStorage.setItem(STATE_KEY,JSON.stringify(snap));
  }catch(e){}
}

function loadState(){
  try{
    const raw=localStorage.getItem(STATE_KEY);
    if(!raw)return;
    const sn=JSON.parse(raw);
    S.level=sn.level||'fresher';S.prof=sn.prof||'developer';
    S.tpl=sn.tpl||'modern';S.atsMode=!!sn.atsMode;
    document.querySelectorAll('.level-tab').forEach(b=>b.classList.toggle('active',b.dataset.lv===S.level));
    document.getElementById('profSel').value=S.prof;
    if(S.atsMode){const p=document.getElementById('atsModePill');if(p)p.classList.add('ats-on');}
    setTpl(S.tpl,true);
    const f=sn.fields||{};
    Object.entries(f).forEach(([k,v])=>sv('f-'+k,v));
    if(sn.photoData){S.photoData=sn.photoData;const av=document.getElementById('photoAvatar');if(av){av.innerHTML=`<img class="photo-av-img" src="${sn.photoData}"/>`;}}
    if(sn.showPhoto){const chk=document.getElementById('showPhoto');if(chk)chk.checked=true;}
    ['expList','projList','eduList','certList','achList','langList'].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML='';});
    S.exps=[];S.projs=[];S.edus=[];S.certs=[];S.achs=[];S.langs=[];
    document.getElementById('skillWrap').innerHTML='';S.skCats={};
    (sn.skCats||[]).forEach(c=>{S.skCats[c.id]={label:c.label,tags:[...c.tags]};document.getElementById('skillWrap').appendChild(buildSkCatEl(c.id,c.label,c.tags));});
    (sn.exps||[]).forEach(e=>{addExp();const id=C.ex;sv('ec_'+id,e.co);sv('er_'+id,e.role);sv('ed_'+id,e.dur);sv('el_'+id,e.loc||'');sv('eb_'+id,e.desc);});
    (sn.projs||[]).forEach(p=>{addProj();const id=C.pr;sv('pn_'+id,p.name);sv('ps_'+id,p.stack);sv('pu_'+id,p.url);sv('pd_'+id,p.desc);});
    (sn.edus||[]).forEach(e=>{addEdu();const id=C.ed;sv('es_'+id,e.school);sv('eg_'+id,e.deg);sv('ey_'+id,e.yr);sv('egd_'+id,e.grade);sv('eco_'+id,e.course||'');});
    (sn.certs||[]).forEach(c=>{addCert();const id=C.ce;sv('cn_'+id,c.name);sv('ci_'+id,c.issuer);sv('cd_'+id,c.date);sv('cid_'+id,c.cid||'');});
    (sn.achs||[]).forEach(a=>{addAch();const id=C.ac;sv('at_'+id,a.title);sv('ad_'+id,a.date);sv('ab_'+id,a.desc||'');});
    (sn.langs||[]).forEach(l=>{addLang();const id=C.la;sv('ln_'+id,l.name);sv('ll_'+id,l.level);});
    updateCounts();render();
  }catch(e){console.warn('State load error',e);}
}

function resetAll(){
  if(!confirm('Reset everything? Unsaved changes will be lost.'))return;
  localStorage.removeItem(STATE_KEY);location.reload();
}
