export const OPERACAO_INVALIDA = 'OPERACAO_INVALIDA'

export const calculadora = (operacao, valores) => {
  let resultado = null

  switch(operacao){
    case 'soma':
      for(let i = 0; i < valores.length; i++){
        resultado += valores[i] 
      }
      break
    case 'subtracao':
      resultado = valores[0]
      for(let i = 1; i < valores.length; i++){
        resultado -= valores[i] 
      }
      break
    case 'multiplicacao':
      resultado = valores[0]
      for(let i = 1; i < valores.length; i++){
        resultado *= valores[i] 
      }
      break
    case 'divisao':
      resultado = valores[0]
      for(let i = 1; i < valores.length; i++){
        resultado /= valores[i] 
      }
      break
    default:
      return OPERACAO_INVALIDA
  }

  return resultado;
}