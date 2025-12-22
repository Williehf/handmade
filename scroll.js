const wrapper = document.getElementById('scroll-wrapperq');
const content = wrapper.querySelector('.scroll-contentq');

wrapper.addEventListener('mousemove', (e) => {
  const wrapperWidth = wrapper.offsetWidth;
  const contentWidth = content.scrollWidth;
  
  // The total distance the content can move left
  const maxMove = contentWidth - wrapperWidth;
  
  // Mouse position as a percentage of the wrapper width (0 to 1)
  const mouseX = e.clientX - wrapper.offsetLeft;
  const percentage = mouseX / wrapperWidth;
  
  // Calculate movement (clamped between 0 and maxMove)
  const moveX = Math.max(0, Math.min(percentage * maxMove, maxMove));
  
  // Move the content using transform for the smoothest performance
  content.style.transform = `translateX(-${moveX}px)`;
});
