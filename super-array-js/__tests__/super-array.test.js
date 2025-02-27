import instrutores from './instrutores.json'
import { SuperArray } from '../src/super-array'

let superArrayInstrutores
beforeEach(() => {
  superArrayInstrutores = SuperArray(instrutores)
})

describe('Exemplo de testes', () => {
  it('Valor importado deve ser true', () => {
    expect(true).toBeTruthy();
  })

  it('push deve adicionar um novo instrutor ao meu super array', () => {
    let novoProfessor = { nome: "Péricles", dandoAula: false }
    let arrayEsperado = instrutores
    arrayEsperado.push(novoProfessor)

    superArrayInstrutores.push(novoProfessor)

    expect(superArrayInstrutores.itens).toEqual(arrayEsperado)
  })

  it('forEach deve passar por todos os instrutores e chamando o callback esperado', () => {
    let arrayPreenchidaComValoresIterados = []

    superArrayInstrutores.forEach(item => {
      arrayPreenchidaComValoresIterados.push(item)
    });

    expect(superArrayInstrutores.itens).toEqual(arrayPreenchidaComValoresIterados)
  })

  it('filter deve retornar um novo array apenas com os instrutores que estão dando aula', () => {
    let arrayEsperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true }
    ]

    let superArrayFiltrado = superArrayInstrutores.filter(item => item.dandoAula)

    expect(superArrayFiltrado.itens).toEqual(arrayEsperado)
  })

  it('map deve retornar um novo array com o numero de nomes que o instrutor tem', () => {
    let resultadoEsperado = [2, 2, 2, 3, 2, 2, 2, 3, 1]

    let superArrayQuantidadeDeNomes = superArrayInstrutores.map(item => item.nome.split(' ').length)

    expect(superArrayQuantidadeDeNomes.itens).toEqual(resultadoEsperado)
  })

  it('find deve retornar o primeiro instrutor que está dando aula', () => {
    let resultadoEsperado = { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true }

    let instrutor = superArrayInstrutores.find(item => item.dandoAula)

    expect(instrutor).toEqual(resultadoEsperado)
  })

  it('find deve retornar undefined se nenhum item satisfizer a condição', () => {
    let instrutorNaoEncontrado = superArrayInstrutores.find(item => item.nome == "Michal Jackson")

    expect(instrutorNaoEncontrado).toBeUndefined()
  })

  it('reduce deve retornar o total de letras no nome dos instrutores', () => {
    let resultadoEsperado = instrutores.reduce((total, instrutor) => {
      return total + instrutor.nome.replace(/\s/g, '').length
    }, 0);
  
    let totalLetras = superArrayInstrutores.reduce((total, instrutor) => {
      return total + instrutor.nome.replace(/\s/g, '').length
    }, 0);
  
    expect(totalLetras).toBe(resultadoEsperado);
  })

  it('reduce deve retornar um boolean se todos os instrutores estão dando aula', () => {
    let resultadoEsperado = instrutores.every(instrutor => instrutor.dandoAula)

    let todosDandoAula = superArrayInstrutores.reduce((acumulador, instrutor) => {
      return acumulador && instrutor.dandoAula
    }, true)
  
    expect(todosDandoAula).toBe(resultadoEsperado)
  })
})
