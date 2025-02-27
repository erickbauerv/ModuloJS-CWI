import axios from 'axios'

import {
  verificarSeAtorEstaEmSeriado,
  filtarPorAnoERetornarNome,
  calcularMediaTotalDeEpisodios,
  agruparTituloDasSeriesPorPropriedade,
} from '../src/metodos'

let series
beforeAll(async () => {
  const response = await axios.get('https://gustavobuttenbender.github.io/film-array/data/films.json')
  series = response.data
})

describe('Exemplo de testes', () => {
  it('Valor importado deve ser true', () => {
    expect(true).toBeTruthy()
  })

  it('Deve filtrar as series com ano de estreia maior ou igual a 2010 e retornar uma listagem com os nomes', () => {
    const ano = 2010
    const resultado = filtarPorAnoERetornarNome(series, ano)

    expect(resultado).toEqual(["Stranger Things", "Game Of Thrones", "The Walking Dead", "Band of Brothers", "Gus and Will The Masters of the Wizards", "10 Days Why", "Mr. Robot", "Narcos", "Westworld"])
  })

  it('Deve retornar true ao procurar ator que está em elenco', () => {
    const nomeAtor = "Rami Malek"
    const resultado = verificarSeAtorEstaEmSeriado(series, nomeAtor)

    expect(resultado).toBeTruthy()
  })


  

  it('Deve retornar false ao procurar ator que não participa de elenco', () => {
    const nomeDeAtorInexistente = "Ator Inexistente"
    const resultado = verificarSeAtorEstaEmSeriado(series, nomeDeAtorInexistente)

    expect(resultado).toBeFalsy()
  })

  it('Deve calcular corretamente a media total de episódios de todas as series', () => {
    const resultado = calcularMediaTotalDeEpisodios(series)
    expect(resultado).toEqual(35.8)
  })

  it('Deve agrupar corretamente em um objeto os titulos das series baseado na Distribuidora', () => {
    const propriedadeDeAgrupamento = "distribuidora"
    const resultado = agruparTituloDasSeriesPorPropriedade(series, propriedadeDeAgrupamento)

    expect(resultado).toEqual({
      "AMC": ["The Walking Dead", "Breaking Bad"],
      "CWI": ["Gus and Will The Masters of the Wizards"],
      "HBO": ["Game Of Thrones", "Band of Brothers", "Westworld"],
      "JS": ["10 Days Why"],
      "Netflix": ["Stranger Things", "Narcos"],
      "USA Network": ["Mr. Robot"]
    })
  })
})
