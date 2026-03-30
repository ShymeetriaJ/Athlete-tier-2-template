// ================================
// DECLARATIONS — Always at top
// ================================
const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('.nav-links');

// ================================
// 1. NAVBAR SCROLL EFFECT
// ================================
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ================================
// 2. ACTIVE NAV LINK
// ================================
window.addEventListener('scroll', function() {
  let currentSection = '';

  sections.forEach(function(section) {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});

// ================================
// 3. SMOOTH SCROLL
// ================================
navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(
      this.getAttribute('href')
    );
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

const recruitBtn = document.querySelector(
  '#hero .btn-primary'
);
recruitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#contact')
    .scrollIntoView({ behavior: 'smooth' });
});

// ================================
// 4. SCROLL FADE IN
// ================================
sections.forEach(function(section) {
  section.style.opacity = '0';
  section.style.transform = 'translateY(60px)';
  section.style.transition =
    'opacity 0.8s ease, transform 0.8s ease';
});

const observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(function(section) {
  observer.observe(section);
});

// ================================
// 5. COUNT UP ANIMATION
// ================================
const countUpElements =
  document.querySelectorAll('.count-up');

const countObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {

        const target = parseInt(
          entry.target.getAttribute('data-target')
        );
        const duration = 2000;
        const startTime = performance.now();
        const isFortyYard =
          entry.target.closest('.stat-box')
          .querySelector('.stat-label')
          .textContent === '40 Yard Dash';

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(
            elapsed / duration, 1
          );
          const eased =
            1 - Math.pow(1 - progress, 3);
          const current = Math.floor(
            eased * target
          );

          if (isFortyYard) {
            entry.target.textContent =
              (current / 10).toFixed(1);
          } else {
            entry.target.textContent = current;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            if (isFortyYard) {
              entry.target.textContent =
                (target / 10).toFixed(1);
            } else {
              entry.target.textContent = target;
            }
          }
        }

        requestAnimationFrame(updateCount);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

countUpElements.forEach(function(el) {
  countObserver.observe(el);
});

// ================================
// 6. STAT BOX HOVER GLOW
// ================================
const statBoxes = document.querySelectorAll('.stat-box');

statBoxes.forEach(function(box) {
  box.addEventListener('mouseenter', function() {
    box.style.boxShadow =
      '0 0 25px 6px rgba(0, 212, 255, 0.3)';
  });
  box.addEventListener('mouseleave', function() {
    box.style.boxShadow = 'none';
  });
});

// ================================
// 7. LIGHTBOX
// ================================
const lightbox = document.querySelector('#lightbox');
const lightboxImg =
  document.querySelector('#lightbox-img');
const galleryItems =
  document.querySelectorAll('.gallery-item img');

let currentIndex = 0;
const images = [];

galleryItems.forEach(function(img) {
  images.push(img.src);
});

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[index];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeLightbox(direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  lightboxImg.src = images[currentIndex];
}

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function(e) {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowRight') changeLightbox(1);
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'Escape') closeLightbox();
  }
});

// ================================
// 8. HAMBURGER MENU
// ================================
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});