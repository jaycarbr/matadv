document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DO CARROSSEL SUPERIOR (sem alterações) ---
  const carouselItems = document.querySelectorAll('.carousel-item');
  const navButtons = document.querySelectorAll('.nav-button');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    currentSlide = index >= carouselItems.length ? 0 : index < 0 ? carouselItems.length - 1 : index;
    carouselItems.forEach(item => item.classList.remove('active'));
    navButtons.forEach(button => button.classList.remove('active'));
    if (carouselItems[currentSlide]) {
      carouselItems[currentSlide].classList.add('active');
    }
    if (navButtons[currentSlide]) {
      navButtons[currentSlide].classList.add('active');
    }
  }

  function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const slideIndex = parseInt(button.dataset.slide, 10);
      showSlide(slideIndex);
      startSlideShow();
    });
  });

  if (carouselItems.length > 0) {
    showSlide(currentSlide);
    startSlideShow();
  }

  // --- LÓGICA DO CARROSSEL DE ÁREAS DE ATUAÇÃO (LOOP INFINITO) ---
  const slider = document.querySelector('.atuacao-slider');
  const prevBtn = document.getElementById('prev-atuacao');
  const nextBtn = document.getElementById('next-atuacao');
  
  if (slider && prevBtn && nextBtn) {
    let cards = Array.from(slider.children);
    let currentIndex = 0;
    let itemsPerPage = 3;
    let isMoving = false;

    const setupSlider = () => {
      // Determina quantos itens mostrar
      if (window.innerWidth <= 768) {
        itemsPerPage = 1;
      } else {
        itemsPerPage = 3;
      }

      // Clona os itens para o efeito de loop
      const cardsToClone = itemsPerPage;
      const firstClones = cards.slice(0, cardsToClone).map(card => card.cloneNode(true));
      const lastClones = cards.slice(-cardsToClone).map(card => card.cloneNode(true));

      // Limpa o slider e adiciona os clones
      slider.innerHTML = '';
      lastClones.forEach(clone => slider.appendChild(clone));
      cards.forEach(card => slider.appendChild(card));
      firstClones.forEach(clone => slider.appendChild(clone));
      
      // Atualiza a lista de cards para incluir os clones
      cards = Array.from(slider.children);
      
      // Define a posição inicial para mostrar os primeiros itens reais
      currentIndex = cardsToClone;
      updateSliderPosition(false); // false = sem animação
    };

    const updateSliderPosition = (animate = true) => {
      if (!animate) {
        slider.classList.add('no-transition');
      }

      const cardWidth = cards[0].offsetWidth;
      const gap = 20;
      const moveDistance = currentIndex * (cardWidth + gap);
      slider.style.transform = `translateX(-${moveDistance}px)`;

      if (!animate) {
        // Força o navegador a aplicar o estilo antes de remover a classe
        setTimeout(() => slider.classList.remove('no-transition'), 50);
      }
    };

    const moveSlider = (direction) => {
      if (isMoving) return;
      isMoving = true;

      currentIndex += direction;
      updateSliderPosition();

      // Listener para o final da transição
      slider.addEventListener('transitionend', () => {
        isMoving = false;

        // Lógica para o "salto" do loop
        if (currentIndex <= itemsPerPage - 1) {
          currentIndex = cards.length - itemsPerPage * 2;
          updateSliderPosition(false);
        }
        if (currentIndex >= cards.length - itemsPerPage) {
          currentIndex = itemsPerPage;
          updateSliderPosition(false);
        }
      }, { once: true }); // O listener é removido após ser disparado uma vez
    };

    nextBtn.addEventListener('click', () => moveSlider(1));
    prevBtn.addEventListener('click', () => moveSlider(-1));

    // Configuração inicial e reconfiguração ao redimensionar
    setupSlider();
    window.addEventListener('resize', setupSlider);
  }
});
