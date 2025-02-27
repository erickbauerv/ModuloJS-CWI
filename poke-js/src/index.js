export const pokemons = [
    { id: 1, nome: "Squirtle", poderAtaque: 1, levelInicial: 1, evolucao: { level: 5, id: 2 } },
    { id: 2, nome: "Wartortle", poderAtaque: 10, levelInicial: 5, evolucao: { level: 10, id: 3 } },
    { id: 3, nome: "Blastoise", poderAtaque: 100, levelInicial: 10, evolucao: null },
    { id: 4, nome: "Cyndaquil", poderAtaque: 1, levelInicial: 1, evolucao: { level: 5, id: 5 } },
    { id: 5, nome: "Quilava", poderAtaque: 10, levelInicial: 5, evolucao: { level: 10, id: 6 } },
    { id: 6, nome: "Thyphlosion", poderAtaque: 100, levelInicial: 10, evolucao: null },
    { id: 7, nome: "Bulbasaur", poderAtaque: 1, levelInicial: 1, evolucao: { level: 5, id: 8 } },
    { id: 8, nome: "Ivysaur", poderAtaque: 10, levelInicial: 5, evolucao: { level: 10, id: 9 } },
    { id: 9, nome: "Venusaur", poderAtaque: 100, levelInicial: 10, evolucao: null }
];

export function criarTreinador(nome, idade, idPokemonInicial) {
    const pokemonInicial = { ...pokemons.find(p => p.id === idPokemonInicial) }
    return {
        nome,
        idade,
        pokemons: [pokemonInicial]
    }
}

export function aumentarLevelPokemons(treinador) {
    const treinadorAtualizado = { ...treinador }
    treinadorAtualizado.pokemons.forEach(pokemon => {
        pokemon.levelInicial += 1

        if(evoluirPokemon(pokemon).id !== pokemon.id){
            const novaEvolucao = { ...pokemons.find(p => p.id === pokemon.evolucao.id) }
            treinadorAtualizado.pokemons.push(novaEvolucao);
        }
    })

    return treinadorAtualizado
}

export function evoluirPokemon(pokemon) {
    if (pokemon.evolucao && pokemon.levelInicial >= pokemon.evolucao.level) {
      const novaEvolucao = { ...pokemons.find(p => p.id === pokemon.evolucao.id) }
      return novaEvolucao
    }

    return pokemon;
}

export function capturarPokemon(treinador, pokemonId) {
    const novoPokemon = { ...pokemons.find(p => p.id === pokemonId) }
    const treinadorAtualizado = aumentarLevelPokemons(treinador)
    
    treinadorAtualizado.pokemons.push(novoPokemon)
    
    return treinadorAtualizado
}