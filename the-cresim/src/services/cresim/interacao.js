import { atualizarTempoDeVida } from './cresim.js';

function checaNivel(pontos) {
    if(pontos < 0) return 'Inimizade';
    else if(pontos <= 10) return 'Neutro';
    else if(pontos <= 25) return 'Amizade';
    else return 'Amor';
}

export const interagir = (meuCresim, cresimInteracao, tipoInteracao, id, interacoes) => {
    const TEMPO_POR_ENERGIA = 2000;

    const interacao = interacoes[tipoInteracao.toUpperCase()][id - 1];

    if(meuCresim.energia < interacao.energia && cresimInteracao.energia < Math.ceil(interacao.energia / 2)) {
        return { meuCresim, cresimInteracao };
    }

    // Remoção de energia
    meuCresim.energia -= interacao.energia;
    cresimInteracao.energia -= Math.ceil(interacao.energia / 2);
    const tempoGasto = interacao.energia * TEMPO_POR_ENERGIA;
    
    // Adiciona pontos de interação ao Cresim principal
    meuCresim.relacionamentos.forEach(relacao => {
        if(cresimInteracao.id == relacao.id) {
            relacao.pontos += interacao.pontos;

            relacao.nivel = checaNivel(relacao.pontos);
        }
    });

    // Adiciona pontos de interação ao Crecim secundário
    cresimInteracao.relacionamentos.forEach(relacao => {
        if(meuCresim.id == relacao.id) {
            relacao.pontos += interacao.pontos;
        
            relacao.nivel = checaNivel(relacao.pontos);
        }
    });

    // Remove tempo de vida do Cresim secundário
    meuCresim = atualizarTempoDeVida(meuCresim, tempoGasto);
    cresimInteracao = atualizarTempoDeVida(cresimInteracao, tempoGasto);

    return { meuCresim, cresimInteracao };
}

export const checaPrimeiraInteracao = (meuCresim, cresimInteracao) => {
    let criarInteracao = true;
    
    // Verifica se é preciso criar um relacionamento
    meuCresim.relacionamentos.forEach(relacao => {
        if(relacao.id == cresimInteracao.id) criarInteracao = false;
    });

    // Cria o relacionamento se necessário
    if(criarInteracao) {
        meuCresim = { ...meuCresim, relacionamentos: [ ...meuCresim.relacionamentos, { id: cresimInteracao.id, pontos: 0, nivel: 'Neutro' }]}
        cresimInteracao = { ...cresimInteracao, relacionamentos: [ ...cresimInteracao.relacionamentos, { id: meuCresim.id, pontos: 0, nivel: 'Neutro' }]}
    } else {
        return null;
    }

    return { meuCresim: { ...meuCresim, tarefa: 'Interagindo' }, cresimInteracao };
}