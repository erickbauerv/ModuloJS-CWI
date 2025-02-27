export const createCresim = (nome) => {
    // Retorna o Cresim
    return {
        nome,
        id: '',
        tempoDeVida: 3600000,
        cresceleons: 1500,
        tarefa: 'Livre',
        aspiracao: null,
        habilidades: {
            gastronomia: {
                nivel: 'JUNIOR',
                pontos: 0
            },
            pintura: {
                nivel: 'JUNIOR',
                pontos: 0
            },
            jogos: {
                nivel: 'JUNIOR',
                pontos: 0
            },
            jardinagem: {
                nivel: 'JUNIOR',
                pontos: 0
            },
            musica: {
                nivel: 'JUNIOR',
                pontos: 0
            }
        },
        energia: 32,
        higiene: 28,
        relacionamentos: [],
        itens: {},
        salario: 1
    };
}

export const adicionarAspiracao = (cresim, aspiracao) => {
    return { ...cresim, aspiracao };
}

export const atualizarEnergia = (cresim, ajuste) => {
    const novaEnergia = Math.max(0, Math.min(32, cresim.energia + ajuste));
    return { ...cresim, energia: novaEnergia };
};

export const atualizarTempoDeVida = (cresim, tempoGasto) => {
    const tempoDeVidaAtualizado = Math.max(cresim.tempoDeVida - tempoGasto, 0);
    return { ...cresim, tempoDeVida: tempoDeVidaAtualizado, tarefa: tempoDeVidaAtualizado ? cresim.tarefa : 'Morto'};
};

export const dormir = (cresim, tempoDormindo = 5000) => {
    const ciclosDormindo = Math.floor(tempoDormindo / 5000);
    const energiaGanha = ciclosDormindo * 4;
    const bonus = Math.floor(ciclosDormindo / 2) * 2; 

    return {
        ...cresim,
        energia: Math.min(32, cresim.energia + energiaGanha + bonus),
        tempoDeVida: Math.max(cresim.tempoDeVida - tempoDormindo, 0),
        tarefa: 'Dormindo'
    };
};