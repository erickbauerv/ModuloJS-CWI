export const aplicarCheat = (cresim, codigoCheat, cheats) => {
    const cheat = cheats.find(c => c.codigo === codigoCheat.toUpperCase());

    if (!cheat) return cresim; 

    switch (cheat.codigo) { 
        
        case "SORTENAVIDA": 
            return {
                ...cresim,
                salario: Math.round((cresim.salario * (1 + cheat.valor / 100)) * 100) / 100
            };

        case "DEITADONAREDE": 
            return {
                ...cresim,
                energia: Math.min(32, cresim.energia + cheat.valor)
            };

        case "JUNIM": 
            const novosPontos = cresim.habilidades[cresim.aspiracao.toLowerCase()].pontos + cheat.valor;
            const nivel = (novosPontos < 17 ? 'JUNIOR' : (novosPontos < 26 ? 'PLENO' : 'SENIOR'));

            return {
                ...cresim,
                habilidades: {
                    ...cresim.habilidades,
                    [cresim.aspiracao.toLowerCase()]: {
                        ...cresim.habilidades[cresim.aspiracao.toLowerCase()],
                        pontos: novosPontos,
                        nivel
                    }
                }
            };

        case "CAROLINAS": 
            return {
                ...cresim,
                tempoDeVida: cresim.tempoDeVida + cheat.valor
            };

        case "SINUSITE": 
            return {
                ...cresim,
                tempoDeVida: 0
            };
    }
    
};
