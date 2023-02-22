"use strict";

(() => {
  const hoje = moment();

  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  })
  
  const atualizarDatas = () => {
    document.querySelectorAll("[data-ano-atual]").forEach(area => {
      area.textContent = `${hoje.year()}`;
    })
    
    document.querySelectorAll("[data-cumprimento-atual]").forEach(cumprimento => {
      const hora = hoje.hour();
      if(hora >= 0 && hora < 12){
        cumprimento.textContent = 'bom dia';
      }else if(hora >= 12 && hora < 18){
        cumprimento.textContent = 'boa tarde';
      }else{
        cumprimento.textContent = 'boa noite'
      }
    })
  } 

  const calcularPeriodos = (data) => {
    const inicio = moment(data);
    
    const diffHoras = hoje.diff(inicio, 'hours');
    const diffDias = hoje.diff(inicio, 'days');
    const diffMeses = hoje.diff(inicio, 'months');
    const diffAnos = hoje.diff(inicio, 'years');
    // console.log(diffHoras, diffDias, diffMeses, diffAnos);
  }
  
  const calcularVoltasATerra = (data) => {
    const inicio = moment(data);
    return Math.floor(hoje.diff(inicio, 'days') / 543);
  }

  document.querySelectorAll('[data-click]').forEach(botao => {
    const apresentacao = document.querySelector('section.apresentacao');
    const posApresentacao = apresentacao.offsetTop;
    window.scrollTo({top: posApresentacao, behavior: 'smooth'});

    const nao_ver = document.querySelector('section.nao-ver');
    const mensagens = document.querySelector('section.mensagens');

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
        mensagens.classList.toggle('none');
        const posMensagem = mensagens.offsetTop;
        window.scrollTo({top: posMensagem, behavior: 'smooth'});
      }
    })
  })
  
  atualizarDatas();
  calcularPeriodos('2004-01-27');
  //console.log(calcularVoltasATerra('2003-07-03'));
})();