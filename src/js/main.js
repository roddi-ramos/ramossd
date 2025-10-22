const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Scroll spy
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  links.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Fade-in on scroll
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));
});




document.addEventListener('DOMContentLoaded', () => {
        const sumarioLinks = document.querySelectorAll('.sumario-lateral a');
        const sections = document.querySelectorAll('.artigo-content h2');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150; // Ajuste para navbar fixa
                if (scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            sumarioLinks.forEach(link => {
                link.classList.remove('ativo'); // Remove a classe de todos
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('ativo'); // Adiciona a classe ao link da seção atual
                }
            });
        });
    });

    