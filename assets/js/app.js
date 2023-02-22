"use strict";

(() => {

  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  })

  const atualizarDatas = () => {
    const dataAtual = new Date();
    document.querySelectorAll("[data-ano-atual]").forEach(area => {
      area.textContent = `${dataAtual.getFullYear()}`;
    })
  } 

  atualizarDatas()
  

})();