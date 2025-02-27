export function obterPista(idPista, pistas) {
  const pistaEncontrada = pistas.find((pista) => {
    return pista.id === idPista
  })

  if (!pistaEncontrada) {
    return null
  }

  const rastreadorPosicoesBuffs = {};
  pistaEncontrada.posicoesBuffs.forEach((posicao) => {
    rastreadorPosicoesBuffs[posicao] = 0
  })

  return {
    id: pistaEncontrada.id,
    nome: pistaEncontrada.nome,
    tipo: pistaEncontrada.tipo,
    descricao: pistaEncontrada.descricao,
    tamanho: pistaEncontrada.tamanho,
    debuff: pistaEncontrada.debuff,
    posicoesBuffs: pistaEncontrada.posicoesBuffs,
    rastreadorPosicoesBuffs: rastreadorPosicoesBuffs
  }
}

export function obterCorredor(idCorredor, corredores, aliado = null, inimigo = null) {
  const corredorEncontrado = corredores.find((corredor) => {
    return corredor.id === idCorredor
  })

  if (!corredorEncontrado) {
    return null
  }

  const posicaoInicial = 0

  return {
    id: corredorEncontrado.id,
    nome: corredorEncontrado.nome,
    velocidade: corredorEncontrado.velocidade,
    drift: corredorEncontrado.drift,
    aceleracao: corredorEncontrado.aceleracao,
    vantagem: corredorEncontrado.vantagem,
    aliado: aliado,
    inimigo: inimigo,
    posicao: posicaoInicial,
    posicaoAnterior: posicaoInicial
  }
}

export function calcularVelocidadeRodada(corredor, pista, rodada) {
  let velocidadeRodada = 0

  // Verifica qual atributo deve ser utilizado para calcular a velocidade nessa rodada
  if (rodada <= 3) {
    velocidadeRodada += corredor.aceleracao
  } else if (rodada % 4 === 0) {
    velocidadeRodada += corredor.drift
  } else {
    velocidadeRodada += corredor.velocidade
  }

  // Adiciona mais velocidade caso o corredor tenha vantagem na pista
  if (pista.tipo === corredor.vantagem) {
    const valorVantagem = 2
    velocidadeRodada += valorVantagem
  }

  // Adiciona debuff da pista na velocidade
  velocidadeRodada += pista.debuff

  // Adiciona buff da posição de acordo com quantidade de corredores que já passaram pela posição
  if (pista.posicoesBuffs.some(posicaoBuff => posicaoBuff >= corredor.posicaoAnterior && posicaoBuff < corredor.posicao)) {
    const posicoesBuff = pista.posicoesBuffs.filter(posicaoBuff => posicaoBuff >= corredor.posicaoAnterior && posicaoBuff < corredor.posicao)

    posicoesBuff.forEach(posicaoBuff => {
      const contagem = pista.rastreadorPosicoesBuffs[posicaoBuff] || 0

      if (contagem > 0) {
        velocidadeRodada += contagem
      }

      pista.rastreadorPosicoesBuffs[posicaoBuff] = contagem + 1
    })
  }

  // Aplica buffs e debuffs de aliados e inimigos
  if (corredor.aliado && Math.abs(corredor.posicao - corredor.aliado.posicao) <= 2) {
    velocidadeRodada += 1
  }
  if (corredor.inimigo && Math.abs(corredor.posicao - corredor.inimigo.posicao) <= 2) {
    velocidadeRodada -= 1
  }

  // Impede velocidade negativa
  return Math.max(velocidadeRodada, 0)
}

export function atualizarPosicao(corredor, pista, rodada) {
  const velocidade = calcularVelocidadeRodada(corredor, pista, rodada)
  const penultimaPosicaoDaPista = pista.tamanho - 1
  let novaPosicao = corredor.posicao + velocidade

  // Impede que o Dick Vigarista vença se estiver a uma rodada de ganhar
  novaPosicao = corredor.nome === "Dick Vigarista" && novaPosicao >= penultimaPosicaoDaPista
  ? penultimaPosicaoDaPista
  : novaPosicao

  return { ...corredor, posicao: novaPosicao, posicaoAnterior: corredor.posicao }
}

export function simularRodada(pista, corredores, rodada) {
  return corredores.map((corredor) => {
    return atualizarPosicao(corredor, pista, rodada)
  })
}

export function simularCorrida(pista, corredores) {
  let rodada = 1
  while (!verificarVencedor(pista, corredores)) {
    corredores = simularRodada(pista, corredores, rodada)
    rodada++
  }

  return verificarVencedor(pista, corredores)
}

function verificarVencedor(pista, corredores) {
  return corredores.find((corredor) => {
    return corredor.posicao >= pista.tamanho
  }) || null
}