"use strict";

import { pessoas } from './pessoas.js';
import {   
  atualizarDatas,
  shuffle,
  calcularPeriodos,
  calcularVoltasATerra,
  isEmpty,
  mensagensProduzidas,
  carregarMensagem,
  escutaClicks,
  escutaPress,
  carregarConteudos,
  atualizarNome,
  posicionar,
  carregarBaloes
} from './util.js';

(() => {
  
  let id = 0;
  let armazenado = JSON.parse(localStorage.getItem('informacoes'));
  
  if(isEmpty(armazenado) || isEmpty(armazenado.id) || !Number.isInteger(armazenado.id)){
    const informacoes = {id: 0}
    localStorage.setItem('informacoes', JSON.stringify(informacoes))
  }else{
    id = armazenado.id;
  }
  
  const dadosPessoa = {
    nome: null,
    dataNasc: null,
    periodos: null,
    
    getNome(){return this.nome},
    setNome(nome){this.nome = nome},
    
    getDataNasc(){return this.dataNasc},
    setDataNasc(dataNasc){this.dataNasc = dataNasc},
    
    getPeriodos(){return this.periodos},
    setPeriodos(periodos){this.periodos = periodos}
  }
  
  const atualizarDadosPessoa = (id) => {
    dadosPessoa.setNome(pessoas.dados[id].nome);
    dadosPessoa.setDataNasc(pessoas.dados[id].dataNasc);
    dadosPessoa.setPeriodos(calcularPeriodos(pessoas.dados[id].dataNasc));
  }
  
  atualizarDadosPessoa(id);

  const mensagens = {
    texto: [
      `<p>${dadosPessoa.getNome()}, parabéns! Tudo de bom, felicidades e energia lá em cima! Aproveita que o dia é todo seu! <i class="bi bi-emoji-laughing-fill amarelo"></i></p>`,
      '<p>Que seu dia tenha muitas alegrias e, claro, que você possa escrever muitas histórias ainda! Parabéns <i class="bi bi-gift roxo"></i> <i class="bi bi-balloon-fill rubi"></i></p>',
      `<p>${dadosPessoa.getNome()}, com o seu tempo de vida, medido em UVT (Unidade de voltas à Terra), daria pra percorrer o mundo ${calcularVoltasATerra(dadosPessoa.getDataNasc())} vezes <i class="bi bi-fire laranja"></i> <i class="bi bi-emoji-dizzy-fill amarelo"></i></p>`,
      `<p>Você viveu aproximadamente ${dadosPessoa.getPeriodos().dias} dias, ${dadosPessoa.getPeriodos().horas} horas e ${dadosPessoa.getPeriodos().minutos} minutos. Com certeza você tem muitas histórias pra contar <i class="bi bi-emoji-sunglasses-fill amarelo"></i></p>`,
      `<small>Você achou que eu ia esquecer do seu aniversário ${dadosPessoa.getNome()}? 🥳 <br> Hoje é sim, dia de comemorar. E vim aqui pra te falar uma coisa: #OQueFazDiferencaAgora é manter o astral lá em cima. <br> Nessa hora, o melhor presente que a gente pode te dar é ficar em 🏠. <br> Mas nada de deixar essa data em branco, viu? <br> Então, capricha no look do dia. Prepara um ambiente bacana e se conecta com quem mais importa pra cantar parabéns e apagar a velinha 🎂 <br> Vale ligar, chamar no grupo do zap, por tele-chamada... E até arriscar um abraço virtual 🤗 coletivo. <br> Muita saúde e pensamento positivo.💙 <br>`,
      `${dadosPessoa.getNome()}, tenha um dia bem poggers 😅 e big chilling 🔥`,
      `<img src='../assets/images/feels-birthday-man-birthday.gif' class='midia'></img>`,
      `<img src='../assets/images/parabéns-valbeth-happy-birthday.gif' class='midia'></img>`,
      `<img src='../assets/images/família-val-beth.gif' class='midia'></img>`,
      `Parabéns! Que Deus te abençoe sempre! 🥳`,
      `Feche os seus olhos e imagine que estamos juntos, pois sei que nós estaremos quando for a hora certa. Afinal, abrimos mão de muitas coisas para podermos estar juntos, nos limitando a amar por meio de mensagens enquanto uma tela separa a gente, mas tudo valerá a pena e viveremos muitos dias felizes e bem pertinho um do outro.`
    ],
    get(indice) { 
      return !isEmpty(indice) && indice >= 0 && indice < this.texto.length ? this.texto[indice] : null 
    }
  };
  
  if(armazenado == null || armazenado.ordem_mensagens == null || armazenado.ultima_mensagem == null){
    armazenado = JSON.parse(localStorage.getItem('informacoes'));
    armazenado = {... armazenado, ordem_mensagens: shuffle(mensagens.texto), ultima_mensagem: 0}
    localStorage.setItem('informacoes', JSON.stringify(armazenado));
  }

  mensagensProduzidas(mensagens.texto);
  
  carregarConteudos().then(() => {
    carregarBaloes(dadosPessoa.getNome());
  });

  carregarMensagem(armazenado.ultima_mensagem);
  atualizarNome(dadosPessoa.getNome());
  escutaClicks();
  escutaPress();
  atualizarDatas();
  posicionar();
  
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload;
    })
  })
})();