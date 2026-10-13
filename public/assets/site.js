(function(){
  var h=document.querySelector('.site-header'),b=h.querySelector('.menu-toggle');
  b.addEventListener('click',function(){
    var o=h.classList.toggle('is-open');
    b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&h.classList.contains('is-open')){h.classList.remove('is-open');b.setAttribute('aria-expanded','false');b.focus();}});
  /* card rail dots (phone / landscape modes) */
  var rail=document.querySelector('.cards'),dots=document.querySelector('.dots'),cards=[].slice.call(rail.querySelectorAll('.card'));
  cards.forEach(function(c,i){var d=document.createElement('button');d.type='button';d.setAttribute('aria-label','Show card '+(i+1));
    d.addEventListener('click',function(){rail.scrollTo({left:c.offsetLeft-rail.offsetLeft-parseFloat(getComputedStyle(rail).scrollPaddingLeft||0),behavior:'smooth'});});dots.appendChild(d);});
  function sync(){
    var over=rail.scrollWidth>rail.clientWidth+2;dots.hidden=!over;if(!over)return;
    var max=rail.scrollWidth-rail.clientWidth,idx=max>0?Math.round(rail.scrollLeft/max*(cards.length-1)):0;
    [].forEach.call(dots.children,function(d,i){d.setAttribute('aria-current',i===idx?'true':'false');});
  }
  rail.addEventListener('scroll',function(){requestAnimationFrame(sync);},{passive:true});
  addEventListener('resize',sync);sync();
  matchMedia('(min-width:768px)').addEventListener('change',function(e){if(e.matches){h.classList.remove('is-open');b.setAttribute('aria-expanded','false');}});
})();
