   const box = document.querySelector('.box');
  let isDown = false;
  let startX;
  let scrollLeft;

  box.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - box.offsetLeft;
    scrollLeft = box.scrollLeft;
  });
  box.addEventListener('mouseleave', () => { isDown = false; });
  box.addEventListener('mouseup', () => { isDown = false; });
  box.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - box.offsetLeft;
    const walk = (x - startX) * 2;
    box.scrollLeft = scrollLeft - walk;
  });
    
 
  box.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = box.scrollLeft;
  }, {passive:true});
  box.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    box.scrollLeft = scrollLeft - walk;
  }, {passive:true});