const wrapper = document.getElementById('scroll-wrapper');
const content = wrapper.querySelector('.scroll-contentq');

// Detect if it's a touch device (iPhone)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  // DESKTOP: Move images based on mouse pointer position
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse position inside wrapper
    const width = rect.width;
    
    const contentWidth = content.offsetWidth;
    const maxScroll = contentWidth - width;
    
    // Calculate percentage and movement
    const percentage = x / width;
    const moveX = percentage * maxScroll;
    
    content.style.transform = `translateX(-${moveX}px)`;
  });
} else {
  // IPHONE: The CSS 'overflow-x: auto' handles the movement naturally.
  // We don't need JS to move it; fingers work better with native scrolling.
  console.log("iPhone/Touch detected: Using native scroll.");
}
