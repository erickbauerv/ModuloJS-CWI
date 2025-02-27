export const SuperArray = (itens = []) => {

  const array = {
    /**
     * Propriedade para acessar os itens
     */

    itens: [...itens],
  }

  /**
   * Adicionar um novo item ao final dos items
   */

  array.push = item => {
    array.itens[array.itens.length] = item
  }

  /**
   * Itera sobre cada um dos elementos do SuperArray enviando o item e o index
   * como segundo parametro
   */

  array.forEach = callback => {
    for (let i = 0; i < array.itens.length; i++) {
      callback(array.itens[i])
    }
  }

  /**
   * Retorna um novo SuperArray com os itens mapeados
   */

  array.map = callback => {
    const itensMapeados = []

    for (let i = 0; i < array.itens.length; i++) {
      itensMapeados.push(callback(array.itens[i]))
    }

    return SuperArray(itensMapeados)
  }


  /**
   * Retorna um SuperArray novo com os itens filtrados
   */

  array.filter = callback => {
    let itensFiltrados = []

    for (let i = 0; i < array.itens.length; i++) {
      if (callback(array.itens[i])) {
        itensFiltrados.push(array.itens[i])
      }
    }

    return SuperArray(itensFiltrados)
  }


  /**
   * Retorna o primeiro elemento do SuperArray que satisfazer o callback recebido
   * se não encontrar, deve retornar undefined
   */

  array.find = callback => {
    for (let i = 0; i < array.itens.length; i++) {
      if (callback(array.itens[i])) {
        return array.itens[i]
      }
    }

    return undefined
  }

  /**
   * Reduz o SuperArray em um único valor
   */


  array.reduce = (callback, valorInicial) => {
    let acumulador = valorInicial
    let inicio = 0

    if (acumulador === undefined && array.itens.length > 0) {
      acumulador = array.itens[0]
      inicio = 1
    }

    for (let i = inicio; i < array.itens.length; i++) {
      acumulador = callback(acumulador, array.itens[i], i, array.itens)
    }

    return acumulador
  }

  return array
}
