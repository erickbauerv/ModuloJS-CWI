import axios from 'axios';
import { useLocalStorage } from './src/services/local-storage/use-local-storage.js';
import { telaDeCarregameto, telaCrescimInicial, criacaoDeCresim, paginaInicial, paginaTrabalho, paginaTreinarHabilidade, paginaComprarItem, paginaInteracao, telaDormir, telaDeTomarBanho, paginaTrocarCresim } from './src/services/cresim/menu.js';

const localStorage = useLocalStorage();

const main = async () => {
  // Tela de carregamento inicial
  await telaDeCarregameto();

  // Inclui algumas variáveis necessárias
  const empregos = (await axios.get('https://emilyspecht.github.io/the-cresim/empregos.json')).data;
  const itensHabilidades = (await axios.get('https://emilyspecht.github.io/the-cresim/itens-habilidades.json')).data;
  const interacoes = (await axios.get('https://emilyspecht.github.io/the-cresim/interacoes.json')).data;
  const cheats = (await axios.get('https://emilyspecht.github.io/the-cresim/cheats.json')).data;
  
  const naoCriarNovo = await telaCrescimInicial();
  let idCresimAtual = '';
  let proximaPagina = '';

  if(!naoCriarNovo) {
    idCresimAtual = await criacaoDeCresim();
    proximaPagina = await paginaInicial(localStorage.getObject(idCresimAtual), 0, cheats);
  }
  else proximaPagina = 7;

  // Loop do Programa
  while(true) {
    let tempoGasto = 0;

    switch(proximaPagina) {
      case 1:
        tempoGasto = await paginaTreinarHabilidade(localStorage.getObject(idCresimAtual), cheats);
      break;
      case 2:
        tempoGasto = await paginaComprarItem(localStorage.getObject(idCresimAtual), itensHabilidades, cheats);
      break;
      case 3:
        tempoGasto = await telaDormir(localStorage.getObject(idCresimAtual), cheats);
      break;
      case 4:
        tempoGasto = await telaDeTomarBanho(localStorage.getObject(idCresimAtual), cheats);
      break;
      case 5:
        tempoGasto = await paginaTrabalho(localStorage.getObject(idCresimAtual), empregos, cheats);
      break;
      case 6:
        tempoGasto = await paginaInteracao(localStorage.getObject(idCresimAtual), interacoes, cheats);
      break;
      case 7:
        idCresimAtual = await paginaTrocarCresim();
      break;
      case 8:
        idCresimAtual = await criacaoDeCresim();
      break;
    }

    proximaPagina = await paginaInicial(localStorage.getObject(idCresimAtual), tempoGasto, cheats);
  }
}

main()