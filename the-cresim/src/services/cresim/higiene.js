const podeExecutarAcao = (cresim, custoHigiene) => cresim.higiene >= custoHigiene;

const alterarHigiene = (cresim, ajusteHigiene) => {
    return {
        ...cresim,
        higiene: Math.max(0, Math.min(28, cresim.higiene + ajusteHigiene))
    };
};

export const reduzirHigieneTrabalho = (cresim, tempoTrabalhado) => {
    const perdaBase = 4;
    const perdaProporcional = Math.ceil((tempoTrabalhado / 20000) * perdaBase);

    if (!podeExecutarAcao(cresim, perdaProporcional)) return cresim;

    return alterarHigiene(cresim, -perdaProporcional);
};

export const reduzirHigieneTreino = (cresim) => {
    const PERDA_DO_TREINO = 2;

    if (!podeExecutarAcao(cresim, PERDA_DO_TREINO)) return null;

    return alterarHigiene(cresim, -PERDA_DO_TREINO);
};

export const tomarBanho = (cresim) => {
    if (cresim.cresceleons < 10) {
        return { ...cresim, mensagem: "Cresceleons insuficientes para tomar banho!" };
    }

    return {
        ...cresim,
        higiene: 28,
        cresceleons: cresim.cresceleons - 10,
        tarefa: 'Tomando Banho'
    };
};