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
  calcularPeriodos,
  calcularVoltasATerra,
  isEmpty
}