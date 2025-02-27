export function filtarPorAnoERetornarNome(series, ano) {
  return series
    .filter(serie => serie.anoEstreia >= ano)
    .map(serie => serie.titulo)
}

export function verificarSeAtorEstaEmSeriado(series, nomeAtor) {
  return series.some(serie => serie.elenco.includes(nomeAtor))
}

export function calcularMediaTotalDeEpisodios(series) {
  const totalEpisodios = series.reduce((total, serie) => total + serie.numeroEpisodios, 0)
  return totalEpisodios / series.length
}

export function agruparTituloDasSeriesPorPropriedade(series, propriedade) {
  return series.reduce((seriesAgrupadas, serie) => {
    const grupo = serie[propriedade]  

    if (!(grupo in seriesAgrupadas)) {
      seriesAgrupadas[grupo] = []
    }

    seriesAgrupadas[grupo].push(serie.titulo)
    return seriesAgrupadas
  }, {})
}