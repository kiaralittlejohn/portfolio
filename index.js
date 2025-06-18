/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.image-grid img');
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  document.body.appendChild(lightbox);

  images.forEach(image => {
    image.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      const img = document.createElement('img');
      img.src = image.src;
      img.classList.add('lightbox-content');
      // Clear previous content
      lightbox.innerHTML = '';
      lightbox.appendChild(img);
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) { // Only close if clicked on the background
      lightbox.classList.remove('active');
    }
  });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelector('.lightbox').classList.remove('active');
    }
});
