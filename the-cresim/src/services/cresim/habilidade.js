import { reduzirHigieneTreino } from './higiene.js'
import { atualizarEnergia, atualizarTempoDeVida } from './cresim.js';

export const comprarItemHabilidade = (cresim, nomeHabilidade, idItem, itensDisponiveis) => {
  const item = itensDisponiveis[nomeHabilidade]?.find(produto => produto.id == idItem)

  if (cresim.cresceleons < item.preco) {
    console.log('\nSaldo insuficiente.');
    return null;
  }

  cresim.cresceleons -= item.preco;
  cresim.itens[nomeHabilidade] = [...(cresim.itens[nomeHabilidade] ?? []), item];
  
  console.log(`\nItem comprado: ${item.nome} por ${item.preco} Cresceleons!`);
  return { ...cresim };
};

export const treinarHabilidade = (cresim, nomeHabilidade) => {
  if (cresim.energia < 4) {
    console.log("\nEnergia insuficiente para treinar.");
    return null;
  }

  if (!cresim.itens[nomeHabilidade] || cresim.itens[nomeHabilidade].length === 0) {
    console.log(`\nO Cresim não possui itens para treinar ${nomeHabilidade.toLowerCase()}.`);
    return null;
  }

  const melhorItemHabilidade = cresim.itens[nomeHabilidade].reduce((melhorItem, item) => {
    if (!melhorItem || item.pontos > melhorItem.pontos) {
      return item;
    }

    return melhorItem;
  }, null);

  const cresimHigieneAtualizada = reduzirHigieneTreino(cresim);
  if(!cresimHigieneAtualizada){
    console.log('\nO Cresim não possui pontos de higiene o suficiente para realizar o treino.');
    return null;
  }

  const bonusAspiracao = (cresim.aspiracao === nomeHabilidade) ? 1 : 0;
  const pontos = melhorItemHabilidade.pontos + bonusAspiracao;
  const cresimNivelHabilidadeAtualizado = atualizarNivelHabilidade(cresimHigieneAtualizada, nomeHabilidade, pontos);

  const GASTO_ENERGIA_TREINO = -4
  const cresimEnergiaAtualizada = atualizarEnergia(cresimNivelHabilidadeAtualizado, GASTO_ENERGIA_TREINO);

  const TEMPO_TREINO = 8000;
  const cresimTempoDeVidaAtualizado = atualizarTempoDeVida(cresimEnergiaAtualizada, TEMPO_TREINO);

  return { ...cresimTempoDeVidaAtualizado, tarefa: 'Treinando' };
};

const atualizarNivelHabilidade = (cresim, nomeHabilidade, pontos) => {
  const nivelAnteior = cresim.habilidades[nomeHabilidade.toLowerCase()].nivel;
  const habilidadeCresim = cresim.habilidades[nomeHabilidade.toLowerCase()];
  habilidadeCresim.pontos += pontos;

  if (habilidadeCresim.pontos > 26) {
    habilidadeCresim.nivel = "SENIOR";
  } else if (habilidadeCresim.pontos >= 17) {
    habilidadeCresim.nivel = "PLENO";
  } else {
    habilidadeCresim.nivel = "JUNIOR";
  }

  if(nivelAnteior != habilidadeCresim.nivel){
    console.log(`\nO Cresim está treinando! serão adicionados +${pontos} pontos na habilidade de ${nomeHabilidade.toLowerCase()} e evoluirá para o nível ${habilidadeCresim.nivel}!`);
  } else {
    console.log(`\nO Cresim está treinando! serão adicionados +${pontos} pontos na habilidade de ${nomeHabilidade.toLowerCase()}!`);
  }

  cresim.habilidades[nomeHabilidade.toLowerCase()] = { ...habilidadeCresim };

  return { ...cresim };
}