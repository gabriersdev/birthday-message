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
  // console.log(diffHoras, diffDias, diffMeses, diffAnos);
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

export{
  atualizarDatas,
  shuffle,
  calcularPeriodos,
  calcularVoltasATerra,
  isEmpty
}