
// ── NAV SCROLL BEHAVIOR ──
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  const navObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { threshold: 0.1 });

  navObserver.observe(hero);

  // ── REVEAL ON SCROLL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── LIGHTBOX ──
  let currentGallery = [];
  let currentIndex = 0;

  const portfolioItems = [
    { name: 'Série Fantasia', tag: 'Ilustração Digital', gallery: 'portfolio' },
    { name: 'Retrato Etéreo', tag: 'Character Art', gallery: 'portfolio' },
    { name: 'Paisagem Mística', tag: 'Background Art', gallery: 'portfolio' },
    { name: 'Criatura da Névoa', tag: 'Creature Design', gallery: 'portfolio' },
    { name: 'O Jardim Secreto', tag: 'Cena Completa', gallery: 'portfolio' },
  ];

  const sketchItems = [
    { name: 'Esboço de Personagem', tag: 'Pencil Study', gallery: 'sketch' },
    { name: 'Estudo de Pose', tag: 'Figure Study', gallery: 'sketch' },
    { name: 'Exploração de Rosto', tag: 'Portrait Study', gallery: 'sketch' },
    { name: 'Mãos em Movimento', tag: 'Gesture Study', gallery: 'sketch' },
  ];

  const galleries = { portfolio: portfolioItems, sketch: sketchItems };

  const lightbox = document.getElementById('lightbox');
  const lbDisplay = document.getElementById('lb-display');
  const lbPlaceholder = document.getElementById('lbPlaceholder');
  const lbName = document.getElementById('lbName');
  const lbInfoName = document.getElementById('lbInfoName');
  const lbInfoTag = document.getElementById('lbInfoTag');
  const lbCounter = document.getElementById('lbCounter');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbClose = document.getElementById('lbClose');

  function openLightbox(galleryKey, index) {
    currentGallery = galleries[galleryKey];
    currentIndex = index;
    showLbItem();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showLbItem() {
    const item = currentGallery[currentIndex];
    lbName.textContent = item.name;
    lbInfoName.textContent = item.name;
    lbInfoTag.textContent = item.tag;
    lbCounter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lbPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showLbItem();
  });

  lbNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showLbItem();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
    if (e.key === 'Escape') closeLightbox();
  });

  // click on items
  document.querySelectorAll('[data-gallery]').forEach(item => {
    item.addEventListener('click', () => {
      const gallery = item.dataset.gallery;
      const index = parseInt(item.dataset.index);
      openLightbox(gallery, index);
    });
  });

  // ── SMOOTH SCROLL NAV ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = 60;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });