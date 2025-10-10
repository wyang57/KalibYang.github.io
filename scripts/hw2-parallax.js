// hw2-parallax.js
// Small, unobtrusive parallax for decorative layers (canopy, leafs, fireflies, vignette)
(function(){
  const layers = {
    canopy: document.querySelector('.canopy'),
    leafs: document.querySelector('.leafs'),
    fireflies: document.querySelector('.fireflies'),
    vignette: document.querySelector('.vignette')
  };
  if(!layers.canopy) return; // no-op if not present

  let lX = 0, lY = 0;
  function onMove(e){
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    lX += (x - lX) * 0.06;
    lY += (y - lY) * 0.06;
    const tx = lX * 12; // smaller values for subtlety
    const ty = lY * 8;
    if(layers.canopy) layers.canopy.style.transform = `translate(${tx}px, ${-ty}px)`;
    if(layers.leafs) layers.leafs.style.transform = `translate(${tx*0.6}px, ${-ty*0.8}px)`;
    if(layers.fireflies) {
      // move fireflies layer slightly; individual large fireflies will appear steadier
      layers.fireflies.style.transform = `translate(${tx*0.7}px, ${-ty*0.6}px)`;
      // reduce motion for extra-large fireflies for depth
      const xls = layers.fireflies.querySelectorAll('.xl');
      xls.forEach(el=> el.style.transform = `translate(${tx*0.15}px, ${-ty*0.12}px)`);
    }
    if(layers.vignette) layers.vignette.style.transform = `translate(${tx*0.2}px, ${-ty*0.2}px)`;
  }
  window.addEventListener('mousemove', onMove);
  
  // Twilight theme toggle (persists via localStorage)
  const body = document.body;
  function applyTwilight(val){
    if(val) body.classList.add('twilight'); else body.classList.remove('twilight');
  }
  const stored = localStorage.getItem('mantai-twilight');
  applyTwilight(stored === '1');
  // expose a small helper for the toggle button
  window.mantai = window.mantai || {};
  window.mantai.toggleTwilight = function(){
    const now = body.classList.toggle('twilight');
    localStorage.setItem('mantai-twilight', now ? '1' : '0');
    return now;
  };
})();
