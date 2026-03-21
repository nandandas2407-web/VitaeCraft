document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.getElementById('nav');
  const onScroll=()=>nav.classList.toggle('scrolled',window.scrollY>30);
  window.addEventListener('scroll',onScroll,{passive:true});

  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.fade-up').forEach(c=>io.observe(c));

  document.querySelectorAll('.tpl-preview').forEach(t=>{
    t.addEventListener('click',()=>{
      document.querySelectorAll('.tpl-preview').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      const el=document.querySelector(id);
      if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });

  const scoreEl=document.querySelector('.pr-score-fill');
  if(scoreEl){
    let scored=false;
    const scoreObs=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting&&!scored){
        scored=true;
        scoreEl.style.width='0';
        setTimeout(()=>{
          scoreEl.style.transition='width 1.2s cubic-bezier(.4,0,.2,1)';
          scoreEl.style.width='87%';
        },300);
      }
    });
    scoreObs.observe(scoreEl);
  }
});
