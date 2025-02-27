import axios from 'axios'
import { obterPista, obterCorredor, calcularVelocidadeRodada, atualizarPosicao, simularRodada, simularCorrida } from '../src/corridaMaluca.js'

let pistas
let personagens
beforeAll(async () => {
  const responsePistas = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json')
  pistas = responsePistas.data

  const responsePersonagens = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/personagens.json')
  personagens = responsePersonagens.data
})


describe('Exemplo de testes', () => {
  it('true deve ser true', () => {
    expect(true).toBeTruthy()
  })
})

describe('Testes corrida maluca', () => {
  it('Deve conseguir obter a pista corretamente', () => {
    const idPista = 1
    const pista = obterPista(idPista, pistas)

    expect(pista.nome).toBe("Himalaia")
    expect(pista.tipo).toBe("MONTANHA")
    expect(pista.tamanho).toBe(30)
  })

  it('Deve conseguir obter o corredor corretamente', () => {
    const idCorredor = 1
    const corredor = obterCorredor(idCorredor, personagens)

    expect(corredor.nome).toBe("Dick Vigarista")
    expect(corredor.velocidade).toBe(5)
    expect(corredor.vantagem).toBe("CIRCUITO")
  })

  it('Deve conseguir calcular a vantagem de tipo pista corretamente', () => {
    const idPista = 1
    const idCorredor = 2
    const rodadaCorrida = 1
    const buffTipoPista = 2

    const pista = obterPista(idPista, pistas)
    const corredor = obterCorredor(idCorredor, personagens)

    const resultadoEsperado = corredor.aceleracao + buffTipoPista + pista.debuff
    const resultado = calcularVelocidadeRodada(corredor, pista, rodadaCorrida)

    expect(resultado).toBe(resultadoEsperado)
  })

  it('Deve conseguir calcular o debuff de pista corretamente', () => {
    const idPista = 1
    const idCorredor = 1
    const rodadaCorrida = 1

    const pista = obterPista(idPista, pistas)
    const corredor = obterCorredor(idCorredor, personagens)

    const resultadoEsperado = corredor.aceleracao + pista.debuff
    const resultado = calcularVelocidadeRodada(corredor, pista, rodadaCorrida)

    expect(resultado).toBe(resultadoEsperado)
  })

  it('Deve conseguir calcular o buff de posição de pista para 3 corredores', () => {
    const pista = obterPista(1, pistas)

    const corredores = [
      obterCorredor(1, personagens),
      obterCorredor(2, personagens),
      obterCorredor(3, personagens)
    ]
    
    let corredoresAtualizados = simularRodada(pista, corredores, 1)
    corredoresAtualizados = simularRodada(pista, corredoresAtualizados, 2)
    corredoresAtualizados = simularRodada(pista, corredoresAtualizados, 3)
    corredoresAtualizados = simularRodada(pista, corredoresAtualizados, 4)
    corredoresAtualizados = simularRodada(pista, corredoresAtualizados, 5)
    corredoresAtualizados = simularRodada(pista, corredoresAtualizados, 6)
    corredoresAtualizados = simularRodada(pista, corredoresAtualizados, 7)

    const posicaoEsperadaCorredor1 = 16
    const posicaoEsperadaCorredor2 = 26
    const posicaoEsperadaCorredor3 = 11

    expect(corredoresAtualizados[0].posicao).toBe(posicaoEsperadaCorredor1)
    expect(corredoresAtualizados[1].posicao).toBe(posicaoEsperadaCorredor2)
    expect(corredoresAtualizados[2].posicao).toBe(posicaoEsperadaCorredor3)
  })

  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o buff de um aliado', () => {
    const idPista = 1
    const idAliado = 2
    const idCorredor = 1
    
  
    const pista = obterPista(idPista, pistas)
    const aliado = obterCorredor(idAliado, personagens)
    const corredor = obterCorredor(idCorredor, personagens, aliado)
    
    aliado.posicao = 7
    corredor.posicao = 5
    
    const velocidadeCorredor = calcularVelocidadeRodada(corredor, pista, 1)
    const valorBuffAliado = 1
    const velocidadeEsperada = corredor.aceleracao + pista.debuff + valorBuffAliado
    expect(velocidadeCorredor).toBe(velocidadeEsperada)
  
    const posicaoEsperada = corredor.posicao + velocidadeEsperada
    const corredorAtualizado = atualizarPosicao(corredor, pista, 1)
    expect(corredorAtualizado.posicao).toBe(posicaoEsperada)
  })

  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o debuff de um inimigo', () => {
    const idPista = 1
    const idInimigo = 2
    const idCorredor = 1
    
  
    const pista = obterPista(idPista, pistas)
    const inimigo = obterCorredor(idInimigo, personagens)
    const corredor = obterCorredor(idCorredor, personagens, null, inimigo)
    
    inimigo.posicao = 7
    corredor.posicao = 5
    
    const velocidadeCorredor = calcularVelocidadeRodada(corredor, pista, 1)
    const valorDebuffInimigo = -1
    const velocidadeEsperada = corredor.aceleracao + pista.debuff + valorDebuffInimigo
    expect(velocidadeCorredor).toBe(velocidadeEsperada)
  
    const posicaoEsperada = corredor.posicao + velocidadeEsperada
    const corredorAtualizado = atualizarPosicao(corredor, pista, 1)
    expect(corredorAtualizado.posicao).toBe(posicaoEsperada)
  })

  it('Deve conseguir completar uma corrida com um vencedor', () => {
    const pista = obterPista(1, pistas)
    
    const corredores = [
      obterCorredor(1, personagens),
      obterCorredor(2, personagens)
    ]

    const vencedor = simularCorrida(pista, corredores)

    expect(vencedor.posicao).toBeGreaterThanOrEqual(pista.tamanho)
  })

  it('Deve conseguir criar corredor corretamente somente com aliado', () => {
    const corredorAliado = obterCorredor(1, personagens)
    const corredor = obterCorredor(2, personagens, corredorAliado)

    expect(corredor.aliado).toEqual(corredorAliado)
    expect(corredor.inimigo).toBeNull()
  })

  
  it('Deve conseguir criar corredor corretamente somente com inimigo', () => {
    const corredorInimigo = obterCorredor(1, personagens)
    const corredor = obterCorredor(2, personagens, null, corredorInimigo)

    expect(corredor.inimigo).toEqual(corredorInimigo)
    expect(corredor.aliado).toBeNull()
  })

  it('Deve conseguir criar corredor corretamente com aliado e inimigo', () => {
    const corredorAliado = obterCorredor(1, personagens)
    const corredorInimigo = obterCorredor(2, personagens)
    const corredor = obterCorredor(3, personagens, corredorAliado, corredorInimigo)

    expect(corredor.aliado).toEqual(corredorAliado)
    expect(corredor.inimigo).toEqual(corredorInimigo)
  })

  it('Deve conseguir calcular as novas posições corretamente de uma rodada para a próxima', () => {
    const pista = obterPista(1, pistas)

    const corredores = [
      obterCorredor(1, personagens),
      obterCorredor(2, personagens),
      obterCorredor(3, personagens)
    ]
    
    let corredoresAtualizados = simularRodada(pista, corredores, 1)
    corredoresAtualizados = simularRodada(pista, corredoresAtualizados, 2)

    const posicaoEsperadaCorredor1 = 4
    const posicaoEsperadaCorredor2 = 6
    const posicaoEsperadaCorredor3 = 2
    expect(corredoresAtualizados[0].posicao).toBe(posicaoEsperadaCorredor1)
    expect(corredoresAtualizados[1].posicao).toBe(posicaoEsperadaCorredor2)
    expect(corredoresAtualizados[2].posicao).toBe(posicaoEsperadaCorredor3)


    const posicaoAnteriorEsperadaCorredor1 = 2
    const posicaoAnteriorEsperadaCorredor2 = 3
    const posicaoAnteriorEsperadaCorredor3 = 1
    expect(corredoresAtualizados[0].posicaoAnterior).toBe(posicaoAnteriorEsperadaCorredor1)
    expect(corredoresAtualizados[1].posicaoAnterior).toBe(posicaoAnteriorEsperadaCorredor2)
    expect(corredoresAtualizados[2].posicaoAnterior).toBe(posicaoAnteriorEsperadaCorredor3)
  })


  it('Deve impedir que corredor se mova negativamente mesmo se o calculo de velocidade seja negativo', () => {
    const idPista = 1
    const idCorredor = 1
    
    const pista = obterPista(idPista, pistas)
    const corredor = obterCorredor(idCorredor, personagens)
    corredor.aceleracao = 0

    const corredorAtualizado = atualizarPosicao(corredor, pista, 1)
    expect(corredorAtualizado.posicao).toBe(0)
  })

  it('Deve impedir que o Dick Vigarista vença a corrida se estiver a uma rodada de ganhar', () => {
    const idPista = 1
    const idDickVigarista = 1
    
    const pista = obterPista(idPista, pistas)
    const dickVigarista = obterCorredor(idDickVigarista, personagens)
    
    const penultimaPosicaoDaPista = pista.tamanho - 1
    dickVigarista.posicao = penultimaPosicaoDaPista

    const dickVigaristaAtualizado = atualizarPosicao(dickVigarista, pista, 1)

    expect(dickVigaristaAtualizado.posicao).toBe(penultimaPosicaoDaPista)
  })
})
