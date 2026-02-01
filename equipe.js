document.addEventListener('DOMContentLoaded', () => {
  const membros = document.querySelectorAll('.membro');

  // Este código gerencia o clique/toque para dispositivos móveis
  // e também permite clicar para "fixar" a descrição no desktop.
  membros.forEach(membro => {
    membro.addEventListener('click', (event) => {
      // Impede que o clique em um link dentro do membro feche o card
      if (event.target.closest('a')) {
        return;
      }
      
      const isActive = membro.classList.contains('active');

      // Remove a classe 'active' de todos os membros
      membros.forEach(m => {
        m.classList.remove('active');
      });

      // Se o membro clicado não estava ativo, ativa-o.
      if (!isActive) {
        membro.classList.add('active');
      }
    });
  });

  // Opcional: Fecha o card ativo se o usuário clicar fora
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.membro')) {
      membros.forEach(m => {
        m.classList.remove('active');
      });
    }
  });
});
