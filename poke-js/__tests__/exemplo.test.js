import { criarTreinador, aumentarLevelPokemons, evoluirPokemon, capturarPokemon, pokemons } from '../src/index.js'

describe('Exemplo de testes', () => {
  it('Valor importado deve ser true', () => {
    expect(true).toBeTruthy()
  })

  it('Deve subir o nível do pokemon corretamente', () => {
    const treinador = criarTreinador("Red", 10, 1)

    const treinadorAtualizado = aumentarLevelPokemons(treinador)

    expect(treinadorAtualizado.pokemons[0].levelInicial).toBe(2)
  })

  it('Deve evoluir pokemon ao atingir o nível necessário', () => {
    const squirtle = { ...pokemons.find(p => p.id === 1) }
    squirtle.levelInicial = 5

    const wartortle = evoluirPokemon(squirtle)

    expect(wartortle.id).toBe(squirtle.evolucao.id)
  })

  it('Não deve evoluir pokemon caso não possua o level necessário', () => {
    const squirtle = { ...pokemons.find(p => p.id === 1) }
    squirtle.levelInicial = 4

    const squirtleNaoEvoluido = evoluirPokemon(squirtle)
    
    expect(squirtleNaoEvoluido.id).toBe(squirtle.id)
  })

  it('Treinador será criado com nome correto', () => {
    const nomeTreinador = "Red"

    const treinador = criarTreinador(nomeTreinador, 10, 1)

    expect(treinador.nome).toBe(nomeTreinador)
  })

  it('Treinador será criado com a idade correta', () => {
    const idadeTreinador = 10

    const treinador = criarTreinador("Red", idadeTreinador, 1)

    expect(treinador.idade).toBe(idadeTreinador)
  })

  it('Treinador será criado com o pokemon inicial correto', () => {
    const idSquirtle = 1

    const treinador = criarTreinador("Red", 10, idSquirtle)

    expect(treinador.pokemons[0].id).toBe(idSquirtle)
  })

  it('Treinador terá seus pokemons atualizados após nova captura', () => {
    const idCyndaquil = 4
    
    const treinador = capturarPokemon(criarTreinador("Red", 10, 1), idCyndaquil)

    expect(treinador.pokemons.length).toBe(2)
    expect(treinador.pokemons[0].levelInicial).toBe(2)
    expect(treinador.pokemons[1].id).toBe(idCyndaquil)
  })
})