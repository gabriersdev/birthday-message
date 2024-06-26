import { pessoas } from "./pessoas.js";

const hoje = moment();
let mensagensV = null;

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

//Embaralhar array
function shuffle(array) {
  // Loop em todos os elementos
  array.forEach((valor, indice) => {
    const elementoSorteado = Math.floor(Math.random() * (indice)); // Escolhendo elemento aleatório
    [array[indice], array[elementoSorteado]] = [array[elementoSorteado], array[indice]]; // Reposicionando elemento
  })
  // Retornando array com aleatoriedade
  return array;
}

const calcularPeriodos = (data) => {
  const inicio = moment(data);
  
  const diffMinutos = hoje.diff(inicio, 'minutes').toLocaleString('pt-BR')
  const diffHoras = hoje.diff(inicio, 'hours').toLocaleString('pt-BR');
  const diffDias = hoje.diff(inicio, 'days').toLocaleString('pt-BR');
  const diffMeses = hoje.diff(inicio, 'months').toLocaleString('pt-BR');
  const diffAnos = hoje.diff(inicio, 'years').toLocaleString('pt-BR');
  
  return {
    minutos: diffMinutos, horas: diffHoras, dias: diffDias, meses: diffMeses, anos: diffAnos
  };
}

const calcularVoltasATerra = (data) => {
  const inicio = moment(data);
  return Math.floor(hoje.diff(inicio, 'days') / 543) || 'algumas';
}

const isEmpty = (valor) => {
  if(typeof valor == 'string'){
    return valor == undefined || valor == null || valor.length <= 0;
  }else if(Array.isArray(valor)){
    return valor.length <= 0;
  }else{
    return valor == undefined || valor == null
  }
}

const atualizarContadorMensagem = (indice, length) => {
  document.querySelector('.mensagens__contador').textContent = `Mensagem ${indice + 1} de ${length}`;
}

const mensagensProduzidas = (mensagens) => {
  mensagensV = mensagens;
}

const mensagemEhValida = (original) => {  
  const mensagens = mensagensV;
  if(!isEmpty(mensagens)){
    const valido = mensagens.some(mensagem => mensagem.toLowerCase().trim() == original.toLowerCase().trim());

    if(!valido){
      const verificaMensagemViveuAprox = (str) => str.match(/<p>Você viveu aproximadamente <span class="informacao-destaque">.+ dias,<\/span> <span class="informacao-destaque">.+ horas<\/span> e <span class="informacao-destaque">.+ minutos.<\/span> Com certeza você tem muitas histórias pra contar <i class="bi bi-emoji-sunglasses-fill amarelo"><\/i><\/p>.*/g);

      const verificaMensagemUVT = (str) => str.match(/<p>.+, com o seu tempo de vida, medido em UVT \(Unidade de voltas à Terra\), daria pra percorrer o mundo .+ vezes <i class="bi bi-fire laranja"><\/i> <i class="bi bi-emoji-dizzy-fill amarelo"><\/i><\/p>/g);

      return verificaMensagemViveuAprox || verificaMensagemUVT || false;
    }
    return valido;
  }else{
    return false;
  }
}

const errorFatal = (mensagem) =>{
  Swal.fire({
    icon: 'error',
    title: 'Ocorreu um erro!',
    text: `Por favor, contate o desenvolvedor.`,
    footer: `Erro: ${mensagem.name}`
  })
}

const carregarMensagem = (indice) => {
  // console.log(JSON.parse(localStorage.getItem('informacoes')))
  const mensagens = retornarListaMensagens();
  let retorno = null;
  
  try{
    if(!isEmpty(mensagens[indice])){
      retorno = mensagens[indice];
    }
  }catch(error){
    // console.log('Erro Linha 100');
    errorFatal(error);
  }
  
  if(indice >= 0 && indice < mensagens.length){
    if(!isEmpty(retorno)){
      
      // console.log(mensagemEhValida(retorno), retorno)
      // console.log(retorno);

      if(mensagemEhValida(retorno)){
        const textoMSG = document.querySelector('.mensagens__texto');
        textoMSG.innerHTML = retorno;

        atualizarUltimaMensagem(indice);
        atualizarContadorMensagem(indice, mensagens.length);
      }else{
        let timerInterval
        Swal.fire({
          title: 'Ocorreu um erro ao carregar as mensagens.',
          html: 'A página será recarregada e as mensagens devem ser recuperadas em <b></b> milisegundos.',
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            localStorage.clear();
            window.location.reload();
          }
        })
      }
      
    }else{
      console.log('O índice informado para a mensagem retornou vazio.');
    }
  }else{
    reiniciarMensagens();
  }
}

const reiniciarMensagens = () => {
  try{
    const armazenado = JSON.parse(localStorage.getItem('informacoes'));
    armazenado.ultima_mensagem = 0;
    localStorage.setItem('informacoes', JSON.stringify(armazenado));
    carregarMensagem((retornarUltimaMensagem()))
  }catch(error){
    // console.log('Erro Linha 151');
    errorFatal(error);
  }
}

const atualizarUltimaMensagem = (indice) => {
  const armazenado = JSON.parse(localStorage.getItem('informacoes'));
  if(!isEmpty(indice) && Number.isInteger(indice)){
    armazenado.ultima_mensagem = indice;
    localStorage.setItem('informacoes', JSON.stringify(armazenado));
  }else{
    console.log('O índice informado para atualizar a última mensagem exibida não é válido.');
  }
}

const retornarUltimaMensagem = () => {
  const armazenado = JSON.parse(localStorage.getItem('informacoes'));
  try{
    if(!isEmpty(armazenado.ultima_mensagem) && Number.isInteger(armazenado.ultima_mensagem)){
      return parseInt(armazenado.ultima_mensagem);
    }else{
      return 0;
    }
  }catch(error){
    // console.log('Erro Linha 175');
    errorFatal(error);
  }
}

const retornarListaMensagens = () => {
  const armazenado = JSON.parse(localStorage.getItem('informacoes'));
  
  try{
    if(!isEmpty(armazenado.ordem_mensagens)){
      return armazenado.ordem_mensagens;
    }else{
      return null;
    }
  }catch(error){
    // console.log('Erro Linha 190');
    errorFatal(error);
  }
}

const escutaClicks = () => {
  document.querySelectorAll('[data-click]').forEach(botao => {    
    botao.addEventListener('click', () => {
      switch(botao.dataset.click){
        case "agora-nao":
        ocultarApresentacao();
        break;
        
        case "voltar":
        exibirApresentacao();
        break;
        
        case "bora-la":
        exibirMensagens();
        break;
        
        case "proxima-mensagem":
        carregarMensagem((retornarUltimaMensagem() + 1));
        break;
      }
    })
  })
}

const exibirApresentacao = () => {
  const apresentacao = document.querySelector('section.apresentacao');
  const nao_ver = document.querySelector('section.nao-ver');
  apresentacao.classList.toggle('none');
  nao_ver.classList.toggle('none');
}

const ocultarApresentacao = () => {
  const apresentacao = document.querySelector('section.apresentacao');
  const nao_ver = document.querySelector('section.nao-ver');
  apresentacao.classList.toggle('none');
  nao_ver.classList.toggle('none');
  
  ocultarMensagens();
}

const exibirMensagens = () => {
  const secMensagens = document.querySelector('section.mensagens');
  secMensagens.classList.toggle('none');
  const posMensagem = secMensagens.offsetTop;
  window.scrollTo({top: posMensagem, behavior: 'smooth'});
}

const ocultarMensagens = () => {
  const secMensagens = document.querySelector('section.mensagens');
  secMensagens.classList.add('none');
}

const escutaPress = () => {
  document.addEventListener('keyup', (evento) => {
    switch(evento.key.toLowerCase()){
      case 's':
      if(!document.querySelector('section.apresentacao').classList.contains('none')){
        exibirMensagens();
      }
      break;
      
      case 'n':
      if(!document.querySelector('section.apresentacao').classList.contains('none')){
        ocultarApresentacao();
      }
      break;
      
      case 'v':
      if(!document.querySelector('section.nao-ver').classList.contains('none')){
        exibirApresentacao();
      }
      break;
      
      case 'p':
      case 'arrowright':
      if(!document.querySelector('section.mensagens').classList.contains('none')){
        carregarMensagem((retornarUltimaMensagem() + 1));
      }
      break; 
    }
  })
}

const retornarIDPessoa = (nome) => {
  if(typeof nome == 'string' && !isEmpty(nome)){
    return pessoas.dados.findIndex(pessoa => pessoa.nome.toLowerCase() == nome.toLowerCase());
  }
}

const carregarConteudos = async () => {
  document.querySelector('main.principal').innerHTML = `<section class="nao-ver none"> <p class="nao-ver__texto"> Sem problemas! </p> <p class="nao-ver__texto"> Não se esqueça que você é muito importante pra mim e eu vou sempre estar aqui trazendo mensagens incríveis pra você. </p> <div class="botoes"> <button class="nao-ver__botao" data-click="voltar"> <div> <span class="nao-ver__botao__atalho">V</span> <span class="nao-ver__botao__texto">Voltar</span> </div> </button> </div> </section> <section class="apresentacao"> <!-- <div class="container"> <div class="balloon"> <div><span>G</span></div> <div><span>A</span></div> <div><span>B</span></div> <div><span>R</span></div> <div><span>I</span></div> <div><span>E</span></div> </div> </div> --> <div class="area-baloes"></div> <p class="apresentacao__texto"> Fala <b data-nome>Eduardo,</b> <span data-cumprimento-atual>boa noite!</span> </p> <p class="apresentacao__texto"> Primeiramente, feliz aniversário! </p> <p class="apresentacao__texto"> Segundamente, eu preciso te falar que para esta data tão importante eu escrevi algumas mensagens pra você! </p> <p class="apresentacao__texto"> Bora ver? </p> <div class="botoes"> <button class="apresentacao__botao" data-click="bora-la"> <div> <span class="apresentacao__botao__atalho">S</span> <span class="apresentacao__botao__texto">Borá lá</span> </div> </button> <button class="apresentacao__botao" data-click="agora-nao"> <div> <span class="apresentacao__botao__atalho">N</span> <span class="apresentacao__botao__texto">Agora não</span> </div> </button> </div> </section> <section class="mensagens none"> <p class="mensagens__contador">Mensagem 1 de 20</p> <div class="mensagens__texto"> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste facere suscipit corporis rem nesciunt a. Itaque, impedit, ipsum officiis distinctio tenetur ducimus, maxime natus odio modi consequuntur ratione sequi? Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> </div> <div class="botoes"> <button class="mensagens__botao" data-click="proxima-mensagem"> <div> <span class="mensagens__botao__atalho">P</span> <span class="mensagens__botao__texto">Próxima Mensagem</span> </div> </button> </div> </section>`;
  
  document.querySelector('footer.rodape').innerHTML = `<p class="rodape__texto"> Criado e desenvolvido pelo Gabriel </p> <p class="rodape__texto"> <i class="bi bi-c-circle"></i>&nbsp;<time data-ano-atual>2023</time> Gabriel Ribeiro </p> <div class="botoes"> <a href='https://github.com/gabriersdev/' class="rodape__botao"> <div> <span class="rodape__botao__atalho"><i class="bi bi-github"></i></span> <span class="rodape__botao__texto">GitHub</span> </div> </a> <!-- <a href='https://gabriersdev.github.io/portfolio/' class="rodape__botao"> <div> <span class="rodape__botao__atalho"><i class="bi bi-rainbow"></i></span> <span class="rodape__botao__texto">Portfólio</span> </div> </a> --> </div>`;
}

const atualizarNome = (nome) => {
  document.querySelector('[data-nome]').textContent = `${nome},`;
  document.title = `Feliz Aniversário ${nome.charAt(0) + nome.substr(1, nome.length)}!`
}

const posicionar = () => {
  const apresentacao = document.querySelector('section.apresentacao');
  const posApresentacao = apresentacao.offsetTop;
  window.scrollTo({top: posApresentacao, behavior: 'smooth'});
}

function alterarIDPaginaApoio(id){
  let armazenado = JSON.parse(localStorage.getItem('informacoes'));
  
  if(!isEmpty(armazenado)){
    if(!isEmpty(armazenado.id)){
      if(Number.isInteger(id)){
        armazenado.id = id;
        try{
          localStorage.setItem('informacoes', JSON.stringify(armazenado))
        }catch(error){
          errorFatal(error);
        }
      }
    }else{
      errorFatal({name: 'Storage is empty'});
    }
  }else{
    // errorFatal({name: 'Storage is empty. X5'});
    armazenado = {id: id}
    localStorage.setItem('informacoes', JSON.stringify(armazenado))
  }
}

function carregarBaloes(nome){  
  const imagens = [
    '../assets/images/balao-vermelho.svg',
    '../assets/images/balao-amarelo.svg',
    '../assets/images/balao-verde.svg',
    '../assets/images/balao-azul.svg'
  ]
  
  function criarBaloes(nome){
    const div = document.querySelector('.area-baloes');
    nome.split('').forEach(letra => {
      div.innerHTML += `<div class="balao"><img class="balao--icone"></img><span class="balao--letra">${letra.toLowerCase()}</span></div>`;
    })
    adicionarImagens();
  }

  criarBaloes(nome);
  
  function adicionarImagens(){
    const divs = document.querySelectorAll('.balao');
    let pos = 0;
    divs.forEach((div, index) => {
      
      if(pos >= imagens.length){
        pos = 0;
      }
      // console.log(pos);
      
      if(div.querySelector('img') !== null){
        div.querySelector('img').src = imagens[pos];
      }
      
      pos++;
    })
  }
  
  // adicionarImagens();
}

export{
  atualizarDatas,
  shuffle,
  calcularPeriodos,
  calcularVoltasATerra,
  isEmpty,
  mensagensProduzidas,
  carregarMensagem,
  escutaClicks,
  escutaPress,
  retornarIDPessoa,
  carregarConteudos,
  atualizarNome,
  posicionar,
  alterarIDPaginaApoio,
  carregarBaloes
}