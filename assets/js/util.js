import { pessoas } from "./pessoas.js";

const hoje = moment();

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
  return Math.floor(hoje.diff(inicio, 'days') / 543);
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

const carregarMensagem = (indice) => {
  const mensagens = retornarListaMensagens();
  let retorno = null;
  
  if(!isEmpty(mensagens[indice])){
    retorno = mensagens[indice];
  }
  
  if(indice >= 0 && indice < mensagens.length){
    if(!isEmpty(retorno)){
      document.querySelector('.mensagens__texto').innerHTML = retorno;
      atualizarUltimaMensagem(indice);
      atualizarContadorMensagem(indice, mensagens.length);
    }else{
      console.log('O índice informado para a mensagem retornou vazio.');
    }
  }else{
    reiniciarMensagens();
  }
}

const reiniciarMensagens = () => {
  const armazenado = JSON.parse(localStorage.getItem('informacoes'));
  armazenado.ultima_mensagem = 0;
  localStorage.setItem('informacoes', JSON.stringify(armazenado));
  carregarMensagem((retornarUltimaMensagem()))
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

const atualizarNome = (nome) => {
  document.querySelector('[data-nome]').textContent = `${nome},`;
}

const retornarUltimaMensagem = () => {
  const armazenado = JSON.parse(localStorage.getItem('informacoes'));
  if(!isEmpty(armazenado.ultima_mensagem) && Number.isInteger(armazenado.ultima_mensagem)){
    return parseInt(armazenado.ultima_mensagem);
  }else{
    return 0;
  }
}

const retornarListaMensagens = () => {
  const armazenado = JSON.parse(localStorage.getItem('informacoes'));
  
  if(!isEmpty(armazenado.ordem_mensagens)){
    return armazenado.ordem_mensagens;
  }else{
    return null;
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
  document.addEventListener('keypress', (evento) => {
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

export{
  atualizarDatas,
  shuffle,
  calcularPeriodos,
  calcularVoltasATerra,
  isEmpty,
  carregarMensagem,
  escutaClicks,
  escutaPress,
  atualizarNome,
  retornarIDPessoa
}