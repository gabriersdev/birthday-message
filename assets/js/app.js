"use strict";

import { pessoas } from './pessoas.js';
import {   
  atualizarDatas,
  calcularPeriodos,
  calcularVoltasATerra,
  isEmpty,
  carregarMensagem,
  escutaClicks,
  escutaPress,
  shuffle
} from './util.js';

(() => {
  
  const carregarConteudos = () => {
    document.querySelector('main.principal').innerHTML = `<section class="nao-ver none"> <p class="nao-ver__texto"> Sem problemas! </p> <p class="nao-ver__texto"> Não se esqueça que você é muito importante pra mim e eu vou sempre estar aqui trazendo mensagens incríveis pra você. </p> <div class="botoes"> <button class="nao-ver__botao" data-click="voltar"> <div> <span class="nao-ver__botao__atalho">V</span> <span class="nao-ver__botao__texto">Voltar</span> </div> </button> </div> </section> <section class="apresentacao"> <!-- <div class="container"> <div class="balloon"> <div><span>G</span></div> <div><span>A</span></div> <div><span>B</span></div> <div><span>R</span></div> <div><span>I</span></div> <div><span>E</span></div> </div> </div> --> <p class="apresentacao__texto"> Fala <b data-nome>Eduardo,</b> <span data-cumprimento-atual>boa noite!</span> </p> <p class="apresentacao__texto"> Primeiramente, feliz aniversário! </p> <p class="apresentacao__texto"> Segundamente, eu preciso te falar que para esta data tão importante eu escrevi algumas mensagens pra você! </p> <p class="apresentacao__texto"> Bora ver? </p> <div class="botoes"> <button class="apresentacao__botao" data-click="bora-la"> <div> <span class="apresentacao__botao__atalho">S</span> <span class="apresentacao__botao__texto">Borá lá</span> </div> </button> <button class="apresentacao__botao" data-click="agora-nao"> <div> <span class="apresentacao__botao__atalho">N</span> <span class="apresentacao__botao__texto">Agora não</span> </div> </button> </div> </section> <section class="mensagens none"> <p class="mensagens__contador">Mensagem 1 de 20</p> <div class="mensagens__texto"> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste facere suscipit corporis rem nesciunt a. Itaque, impedit, ipsum officiis distinctio tenetur ducimus, maxime natus odio modi consequuntur ratione sequi? Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> </div> <div class="botoes"> <button class="mensagens__botao" data-click="proxima-mensagem"> <div> <span class="mensagens__botao__atalho">P</span> <span class="mensagens__botao__texto">Próxima Mensagem</span> </div> </button> </div> </section>`;
    
    document.querySelector('footer.rodape').innerHTML = `<p class="rodape__texto"> Criado e desenvolvido pelo Gabriel </p> <p class="rodape__texto"> <i class="bi bi-c-circle"></i>&nbsp;<time data-ano-atual>2023</time>, Gabriel Ribeiro </p> <div class="botoes"> <button class="rodape__botao"> <div> <span class="rodape__botao__atalho"><i class="bi bi-github"></i></span> <span class="rodape__botao__texto">GitHub</span> </div> </button> <button class="rodape__botao"> <div> <span class="rodape__botao__atalho"><i class="bi bi-rainbow"></i></span> <span class="rodape__botao__texto">Portfólio</span> </div> </button> </div>`;
  }

  carregarConteudos();
  
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
      `<img src='./assets/images/feels-birthday-man-birthday.gif' class='midia'></img>`,
      `<img src='./assets/images/parabéns-valbeth-happy-birthday.gif' class='midia'></img>`,
      `<img src='./assets/images/família-val-beth.gif' class='midia'></img>`,
      `Parabéns! Que Deus te abençoe sempre! 🥳`
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
  
  const atualizarNome = (nome) => {
    document.querySelector('[data-nome]').textContent = `${nome},`;
  }
  
  const posicionar = () => {
    const apresentacao = document.querySelector('section.apresentacao');
    const posApresentacao = apresentacao.offsetTop;
    window.scrollTo({top: posApresentacao, behavior: 'smooth'});
  }
  
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