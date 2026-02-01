document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
      // Alterna a classe 'active' no item clicado
      item.classList.toggle('active');

      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.accordion-icon');

      // Anima a abertura/fechamento e troca o ícone
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '−'; // Sinal de menos
      } else {
        content.style.maxHeight = '0px';
        icon.textContent = '+'; // Sinal de mais
      }
    });
  });
});
