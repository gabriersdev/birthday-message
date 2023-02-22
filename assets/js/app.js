"use strict";

import {   
  atualizarDatas,
  calcularPeriodos,
  calcularVoltasATerra,
  isEmpty
} from './util.js';

(() => {

  const mensagens = {
    texto: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
    ],
    get(indice) { 
      return !isEmpty(indice) && indice >= 0 && indice < this.texto.length ? this.texto[indice] : null 
    }
  };

  //console.log(mensagens.get(5));
  
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  })

  document.querySelectorAll('[data-click]').forEach(botao => {
    const apresentacao = document.querySelector('section.apresentacao');
    const posApresentacao = apresentacao.offsetTop;
    window.scrollTo({top: posApresentacao, behavior: 'smooth'});

    const nao_ver = document.querySelector('section.nao-ver');
    const secMensagens = document.querySelector('section.mensagens');

    botao.addEventListener('click', () => {
      switch(botao.dataset.click){
        case "agora-nao":
        apresentacao.classList.toggle('none');
        nao_ver.classList.toggle('none')
        break;

        case "voltar":
        apresentacao.classList.toggle('none');
        nao_ver.classList.toggle('none');
        break;

        case "bora-la":
        secMensagens.classList.toggle('none');
        const posMensagem = secMensagens.offsetTop;
        window.scrollTo({top: posMensagem, behavior: 'smooth'});
      }
    })
  })
  
  atualizarDatas();
  calcularPeriodos('2004-01-27');
  //console.log(calcularVoltasATerra('2003-07-03'));
})();