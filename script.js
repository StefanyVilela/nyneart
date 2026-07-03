
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 80) { nav.classList.add('scrolled'); }
  else { nav.classList.remove('scrolled'); }
};
window.addEventListener('scroll', onScroll);
onScroll();

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ============ LIGHTBOX ============ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(container) {
  const img = container.querySelector('img');
  if (!img) return;
  const visible = window.getComputedStyle(img).display !== 'none';
  if (!visible) return; // ainda não há ilustração real carregada nesse quadro
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || 'Ilustração ampliada';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
