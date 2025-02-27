import { reduzirHigieneTrabalho } from "./higiene.js";

export const trabalhar = (cresim, empregos, selecionado) => {
    const TEMPO_GASTO_POR_ENERGIA = 2000;
    const ENERGIA_MAXIMA_GASTA = 10;
    const ENERGIA_PARADA_OBRIGATORIA = 2;
    const DESCONTO_TRABALHO_CANSADO = 3;

    const energiaDisponivel = (cresim.energia >= ENERGIA_MAXIMA_GASTA + ENERGIA_PARADA_OBRIGATORIA ? ENERGIA_MAXIMA_GASTA : cresim.energia - ENERGIA_PARADA_OBRIGATORIA)
    const multiplicadorHigiene = (cresim.higiene < 4 ? 0.9 : 1);
    let salario = 0;
    let categoria = '';

    // Não trabalha se a energia está menor ou igual a 4
    if(cresim.energia <= 4) return { novoCresim: { ...cresim }, tempoGasto: 0 };

    // Não trabalha se não possui higiene o suficiente
    if(!reduzirHigieneTrabalho(cresim, energiaDisponivel * TEMPO_GASTO_POR_ENERGIA)) return { novoCresim: { ...cresim }, tempoGasto: 0 };
    else cresim = reduzirHigieneTrabalho(cresim, energiaDisponivel * TEMPO_GASTO_POR_ENERGIA);

    // Pega o valor do salário
    for(let i = 0; i < empregos.length; i++) {
        if(selecionado == empregos[i].cargo) {
            categoria = empregos[i].categoria;
            const salarios = empregos[i].salario;

            for(let r = 0; r < salarios.length; r++) {
                if(salarios[r].nivel == cresim.habilidades[categoria.toLowerCase()].nivel) {
                    salario = salarios[r].valor;
                    break;
                }
            }

            break;
        }
    }

    const salarioPorEnergia = salario / 10;
    let novoSaldo = 0;
    const novaEnergia = cresim.energia - energiaDisponivel;
    const tempoGasto = (energiaDisponivel * TEMPO_GASTO_POR_ENERGIA);

    // Ganha salário e diminui energia
    if(energiaDisponivel > 8) {
        const acrecimo = (salarioPorEnergia * energiaDisponivel) * multiplicadorHigiene;
        novoSaldo = cresim.cresceleons + (acrecimo * cresim.salario);
    } else {
        const acrecimo = ((salarioPorEnergia * (energiaDisponivel - DESCONTO_TRABALHO_CANSADO)) + ((salarioPorEnergia * 0.9) * DESCONTO_TRABALHO_CANSADO)) * multiplicadorHigiene;
        novoSaldo = cresim.cresceleons + (acrecimo * cresim.salario);
    }

    // Retorna o novo Cresim
    return { ...cresim, cresceleons: novoSaldo, energia: novaEnergia, tempoDeVida: Math.max(cresim.tempoDeVida - tempoGasto, 0), tarefa: 'Trabalhando' };
}