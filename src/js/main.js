// VÁRIAVEIS GLOBAIS (Elementos da navegação principal)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mainNavLinks = document.querySelectorAll('.nav-link'); // Renomeado para maior clareza

// 1. TOGGLE DO MENU MOBILE
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// 2. SCROLL SPY E FADE-IN (Tudo inicializado após o DOM carregar)
document.addEventListener("DOMContentLoaded", function() {
  
  // Variáveis para o SCROLL SPY da BARRA LATERAL (Sumário)
  const sumarioLinks = document.querySelectorAll('.sumario-lateral a');
  // Seções (H2s) da lateral. Eles PRECISAM ter um ID para que o scroll spy funcione
  const articleSections = document.querySelectorAll('.artigo-content h2[id]');

  // Inicialização do Fade-in com IntersectionObserver
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // Inicia a animação 50px antes do final da tela
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
  
  // 3. LISTENERS DE SCROLL - UNIFICADOS
  window.addEventListener('scroll', () => {
    // Offset para a navbar fixa (LÓGICA 1)
    const scrollPos = window.scrollY + 100; 

    // --- LÓGICA 1: SCROLL SPY do Menu Principal (.nav-link) ---
    mainNavLinks.forEach(link => {
      const sectionId = link.getAttribute('href');
      // Garante que a seção existe e é um elemento de nível superior (Section, Div principal)
      const section = document.querySelector(sectionId);
      
      if (section) {
        if(section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos){
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });

    // --- LÓGICA 2: SCROLL SPY do Sumário Lateral (.sumario-lateral a) ---
    // Ajuste da tolerância para 70px para ser mais sensível à posição do header fixo.
    let currentId = '';
    const tolerance = 70; 

    // Itera ao contrário (do fim para o começo) para garantir que o último elemento visível seja pego primeiro.
    for (let i = articleSections.length - 1; i >= 0; i--) {
        const section = articleSections[i];
        const rect = section.getBoundingClientRect(); 

        // Se o topo da seção estiver ACIMA ou NA linha de tolerância (70px), este é o elemento atual.
        if (rect.top <= tolerance) {
            currentId = section.getAttribute('id');
            break; // Sai do loop assim que encontrar o elemento mais alto que satisfez a condição
        }
    }

    sumarioLinks.forEach(link => {
      link.classList.remove('ativo'); // Remove a classe de todos
      
      // Checa se o href do link lateral corresponde ao ID atual
      if (link.getAttribute('href') === `#${currentId}` && currentId !== '') {
        link.classList.add('ativo'); // Adiciona a classe ao link da seção atual
      }
    });
  });

  // Fecha o menu mobile ao clicar em um link, útil para UX
  mainNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });
  });

});