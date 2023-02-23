"use strict";

import { pessoas } from './pessoas.js';
import {   
  atualizarDatas,
  calcularPeriodos,
  calcularVoltasATerra,
  isEmpty
} from './util.js';

(() => {

  const nome = 'Gabriel';
  const dataNasc = '2004-01-27';
  const periodos = calcularPeriodos(dataNasc);
  
  const mensagens = {
    texto: [
      `<p>${nome}, parabéns! Tudo de bom, felicidades e energia lá em cima! Aproveita que o dia é todo seu! <i class="bi bi-emoji-laughing-fill amarelo"></i></p>`,
      '<p>Que seu dia tenha muitas alegrias e, claro, que você possa escrever muitas histórias ainda! Parabéns <i class="bi bi-gift roxo"></i> <i class="bi bi-balloon-fill rubi"></i></p>',
      `<p>${nome}, com o seu tempo de vida, medido em UVT (Unidade de voltas à Terra), daria pra percorrer o mundo ${calcularVoltasATerra(dataNasc)} vezes <i class="bi bi-fire laranja"></i> <i class="bi bi-emoji-dizzy-fill amarelo"></i></p>`,
      `<p>Você viveu aproximadamente ${periodos.dias} dias, ${periodos.horas} horas e ${periodos.minutos} minutos. Com certeza você tem muitas histórias pra contar <i class="bi bi-emoji-sunglasses-fill amarelo"></i></p>`,
      `<small>Você achou que eu ia esquecer do seu aniversário ${nome}? 🥳 <br> Hoje é sim, dia de comemorar. E vim aqui pra te falar uma coisa: #OQueFazDiferencaAgora é manter o astral lá em cima. <br> Nessa hora, o melhor presente que a gente pode te dar é ficar em 🏠. <br> Mas nada de deixar essa data em branco, viu? <br> Então, capricha no look do dia. Prepara um ambiente bacana e se conecta com quem mais importa pra cantar parabéns e apagar a velinha 🎂 <br> Vale ligar, chamar no grupo do zap, por tele-chamada... E até arriscar um abraço virtual 🤗 coletivo. <br> Muita saúde e pensamento positivo.💙 <br>`,
      `${nome}, tenha um dia bem poggers 😅 e big chilling 🔥`,
      `<img src='./assets/images/feels-birthday-man-birthday.gif' class='midia'></img>`,
      `<img src='./assets/images/parabéns-valbeth-happy-birthday.gif' class='midia'></img>`,
      `<img src='./assets/images/família-val-beth.gif' class='midia'></img>`,
      `Parabéns! Que Deus te abençoe sempre! 🥳`
    ],
    get(indice) { 
      return !isEmpty(indice) && indice >= 0 && indice < this.texto.length ? this.texto[indice] : null 
    }
  };
  
  console.log(mensagens.texto.length);
  document.querySelector('.mensagens__texto').innerHTML = mensagens.get(9);
  
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
  //calcularPeriodos('2004-01-27');
  //console.log(calcularVoltasATerra('2003-07-03'));
})();