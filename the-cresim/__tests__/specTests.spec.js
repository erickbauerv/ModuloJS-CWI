import axios from 'axios';
import { createCresim, adicionarAspiracao, atualizarEnergia, dormir } from '../src/services/cresim/cresim';
import { tomarBanho } from '../src/services/cresim/higiene';
import { comprarItemHabilidade, treinarHabilidade } from '../src/services/cresim/habilidade.js';
import { trabalhar } from '../src/services/cresim/trabalho.js';
import { interagir, checaPrimeiraInteracao } from '../src/services/cresim/interacao.js';
import { aplicarCheat } from "../src/services/cresim/cheats.js";

let empregos = {};
let itensHabilidades = {};
let interacoes = {};
let cheats = {};

beforeAll(async () => {
    empregos = (await axios.get('https://emilyspecht.github.io/the-cresim/empregos.json')).data;
    itensHabilidades = (await axios.get('https://emilyspecht.github.io/the-cresim/itens-habilidades.json')).data;
    interacoes = (await axios.get('https://emilyspecht.github.io/the-cresim/interacoes.json')).data;
    cheats = (await axios.get('https://emilyspecht.github.io/the-cresim/cheats.json')).data; 
});

describe('Testes Esperados', () => {
    it('Deve conseguir criar um novo Cresim com nome, pontos de higiene e energia carregados e 1500 Cresceleons',() =>  {
        const ID = 'Cresim Teste';
        const NOME = "Vinícius Freiry";
        const PONTOS_DE_HIGIENE = 28;
        const PONTOS_DE_ENERGIA = 32;
        const CRESCELEONS = 1500;
        
        const cresimTeste = createCresim(NOME);

        expect(cresimTeste.nome).toBe(NOME);
        expect(cresimTeste.higiene).toBe(PONTOS_DE_HIGIENE);
        expect(cresimTeste.energia).toBe(PONTOS_DE_ENERGIA);
        expect(cresimTeste.cresceleons).toBe(CRESCELEONS);
    })

    it('Deve conseguir atribuir uma aspiração ao Cresim',() =>  {
        const ID = 'Cresim Teste';
        const NOME = 'Vinícius Freiry';
        const ASPIRACAO = 'JOGOS';
        
        let cresimTeste = createCresim(NOME);
        cresimTeste = adicionarAspiracao(cresimTeste, ASPIRACAO);

        expect(cresimTeste.aspiracao).toBe(ASPIRACAO);
    })

    it('Deve validar os pontos de energia do personagem para que não passem de 32 pontos',() =>  {
        const cresim = createCresim('Vinícius Freiry');

        expect(atualizarEnergia(cresim, 100).energia).toBe(32);
    })

    it('Deve validar os pontos de energia do personagem para que não fiquem negativados',() =>  {
        const cresim = createCresim('Vinícius Freiry');

        expect(atualizarEnergia(cresim, -100).energia).toBe(0);
    })

    it('Deve conseguir dormir e receber seus pontos de energia',() =>  {
        const cresim = createCresim('Vinícius Freiry');
        cresim.energia = 10;

        expect(dormir(cresim, 10000).energia).toBe(20);
    })

    it('Deve perder os pontos de energia ao trabalhar uma jornada padrão',() =>  {
        let cresimTeste = createCresim('Vinícius Freiry');
        cresimTeste = trabalhar(cresimTeste, empregos, 'Jogador de Dota');

        const valorObtido = cresimTeste.energia;
        const valorEsperado = 32 - 10;

        expect(valorObtido).toBe(valorEsperado);
    })

    it('Deve receber o salario do dia ao trabalhar uma jornda padrão',() =>  {
        let cresimTeste = createCresim('Vinícius Freiry');
        cresimTeste = trabalhar(cresimTeste, empregos, 'Jogador de Dota');

        const valorObtido = cresimTeste.cresceleons;
        const valorEsperado = 1500 + 160;

        expect(valorObtido).toBe(valorEsperado);
    })

    it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10',() =>  {
        let cresimTeste = createCresim('Vinícius Freiry');
        cresimTeste = { ...cresimTeste, energia: 8 };
        cresimTeste = trabalhar(cresimTeste, empregos, 'Jogador de Dota');

        const valorObtido = cresimTeste.cresceleons;
        const valorEsperado = 1500 + 48 + 43.2;

        expect(valorObtido).toBe(valorEsperado);
    })

    it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 e pontos de higiene menores que 4',() =>  {
        let cresimTeste = createCresim('Vinícius Freiry');
        cresimTeste = { ...cresimTeste, energia: 7, higiene: 3 };
        cresimTeste = trabalhar(cresimTeste, empregos, 'Jogador de Dota');

        const valorObtido1 = cresimTeste.cresceleons;
        const valorEsperado1 = 1500 + 28.8 + 38.88;

        const valorObtido2 = cresimTeste.higiene;
        const valorEsperado2 = 3 - 2;

        expect(valorObtido1).toBe(valorEsperado1);
        expect(valorObtido2).toBe(valorEsperado2);
    })

    it('Deve validar para que o Cresim não consiga começar a trabalhar com os pontos de energia menores que 4',() =>  {
        let cresimTeste = createCresim('Vinícius Freiry');
        cresimTeste = { ...cresimTeste, energia: 4 }
        
        const valorObtido = trabalhar(cresimTeste, empregos, 'Jogador de Dota').tempoGasto;
        const valorEsperado = 0;

        expect(valorObtido).toBe(valorEsperado);
    })

    it('Deve descontar 10 Cresceleons ao tomar banho',() =>  {
        const cresim = createCresim('Manuela Sims');
        cresim.higiene = 15;
        cresim.cresceleons = 500;
    
        const resultado = tomarBanho(cresim);
    
        expect(resultado.higiene).toBe(28); 
        expect(resultado.cresceleons).toBe(490); 
    })

    it('Deve conseguir aplicar o cheat SORTENAVIDA e receber as recompensas',() =>  {
        const cresim = {
            id: "1",
            nome: "Vinicius",
            salario: 1,
            energia: 20,
            tempoDeVida: 2000000,
            cresceleons: 500,
            habilidades: { gastronomia: { nivel: "JUNIOR", pontos: 5 } },
            aspiracao: "GASTRONOMIA"
        };

        const resultado = aplicarCheat(cresim, "SORTENAVIDA", cheats);

        expect(resultado.salario).toBe(1.1);
    })

    it('Deve conseguir aplicar o cheat DEITADONAREDE e receber as recompensas',() =>  {
        const cresim = {
            id: "2",
            nome: "Antonela",
            salario: 1200,
            energia: 15,
            tempoDeVida: 1500000,
            cresceleons: 600,
            habilidades: { pintura: { nivel: "PLENO", pontos: 10 } },
            aspiracao: "PINTURA"
        };

        const resultado = aplicarCheat(cresim, "DEITADONAREDE", cheats);

        expect(resultado.energia).toBe(20);
    })

    it('Deve conseguir aplicar o cheat JUNIM e receber as recompensas para a habilidade escolhida',() =>  {
        const cresim = {
            id: "3",
            nome: "Manuela",
            salario: 900,
            energia: 18,
            tempoDeVida: 1800000,
            cresceleons: 450,
            habilidades: { jogos: { nivel: "JUNIOR", pontos: 8 } },
            aspiracao: "JOGOS"
        };

        const resultado = aplicarCheat(cresim, "JUNIM", cheats, "jogos");

        expect(resultado.habilidades.jogos.pontos).toBe(13);
    })

    it('Deve conseguir aplicar o cheat CAROLINAS e receber as recompensas',() =>  {
        const cresim = {
            id: "",
            nome: "Vicenzo",
            salario: 1100,
            energia: 22,
            tempoDeVida: 2500000,
            cresceleons: 550,
            habilidades: { jardinagem: { nivel: "SENIOR", pontos: 30 } },
            aspiracao: "JARDINAGEM"
        };

        const resultado = aplicarCheat(cresim, "CAROLINAS", cheats);

        expect(resultado.tempoDeVida).toBe(2600000);
    })

    it('Deve conseguir aplicar o cheat SINUSITE ter a vida zerada',() =>  {
        const cresim = {
            id: "5",
            nome: "Marcos",
            salario: 1300,
            energia: 10,
            tempoDeVida: 3000000,
            cresceleons: 700,
            habilidades: { musica: { nivel: "PLENO", pontos: 20 } },
            aspiracao: "MUSICA"
        };

        const resultado = aplicarCheat(cresim, "SINUSITE", cheats);

        expect(resultado.tempoDeVida).toBe(0);
    })

    it('Deve garantir que um cheat inexistente não altera o Cresim', () => {
        const cresim = {
            id: '6',
            nome: 'Carlos',
            salario: 1400,
            energia: 15,
            tempoDeVida: 3500000,
            cresceleons: 800,
            habilidades: { pintura: { nivel: 'PLENO', pontos: 25 } },
            aspiracao: 'PINTURA'
        };
        const resultado = aplicarCheat(cresim, 'CHEATINVALIDO', cheats);
        expect(resultado).toEqual(cresim)
    });

    it('Não deve permitir banho se cresceleons for menor que 10 e deve retornar uma mensagem', () => {
        const cresim = { nome: "Érick Bauer", higiene: 5, cresceleons: 5 };

        const resultado = tomarBanho(cresim);

        // O resultado deve ser um novo objeto com a mensagem de erro
        expect(resultado).toEqual({
            ...cresim,
            mensagem: "Cresceleons insuficientes para tomar banho!"
        });
    });
})

describe('Testes sobre treinar habilidades e comprar itens de habilidades', () => {
    it('Deve conseguir comprar um item de habilidade', () => {
        const cresim = createCresim('Érick Bauer');
        const habilidade = 'PINTURA';
        const idItem = 1;
        
        const cresimAtualizado = comprarItemHabilidade(cresim, habilidade, idItem, itensHabilidades);
    
        expect(cresimAtualizado.cresceleons).toBe(300);
        expect(cresimAtualizado.itens[habilidade][0].id).toBe(idItem);
    })

    it('Deve validar ao tentar comprar um item de habilidade sem Cresceleons suficientes',() =>  {
        const cresim = createCresim('Érick Bauer');
        cresim.cresceleons = 1000;
        const nomeHabilidade = "PINTURA";
        const idItem = 1;

        const cresimAtualizado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);

        expect(cresimAtualizado).toBeNull();
    })

    it('Deve conseguir concluir um ciclo de treino com habilidade que não é aspiração e receber os pontos corretamente',() =>  {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const cresim = createCresim('Érick Bauer');
        const cresimItemComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);

        const cresimAtualizado = treinarHabilidade(cresimItemComprado, nomeHabilidade);

        expect(cresimAtualizado.habilidades[nomeHabilidade.toLowerCase()].pontos).toBe(3);
    })

    it('Deve conseguir concluir um ciclo de treino com habilidade que é sua aspiração e receber os pontos corretamente',() =>  {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const cresim = createCresim('Érick Bauer');
        const cresimAspiracao = adicionarAspiracao(cresim, nomeHabilidade);
        const cresimItemComprado = comprarItemHabilidade(cresimAspiracao, nomeHabilidade, idItem, itensHabilidades);

        const cresimAtualizado = treinarHabilidade(cresimItemComprado, nomeHabilidade);

        expect(cresimAtualizado.habilidades[nomeHabilidade.toLowerCase()].pontos).toBe(4);
    })

    it('Deve perder pontos de energia ao terminar um ciclo de treino',() =>  {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const cresim = createCresim('Érick Bauer');
        const cresimItemComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);

        const cresimAtualizado = treinarHabilidade(cresimItemComprado, nomeHabilidade);

        expect(cresimAtualizado.energia).toBe(28);
    })

    it('Deve perder pontos de higiene ao terminar um ciclo de treino',() =>  {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const cresim = createCresim('Érick Bauer');
        const cresimItemComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);

        const cresimAtualizado = treinarHabilidade(cresimItemComprado, nomeHabilidade);

        expect(cresimAtualizado.higiene).toBe(26);
    })

    it('Deve avançar o nivel de habilidade quando completar os pontos necessarios',() =>  {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const cresim = createCresim('Érick Bauer');
        const cresimItemComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);

        cresimItemComprado.habilidades[nomeHabilidade.toLowerCase()].pontos = 14
        const cresimAtualizado = treinarHabilidade(cresimItemComprado, nomeHabilidade);

        expect(cresimAtualizado.habilidades[nomeHabilidade.toLowerCase()].pontos).toBe(17);
        expect(cresimAtualizado.habilidades[nomeHabilidade.toLowerCase()].nivel).toBe('PLENO');
    })

    it('Deve validar ao tentar treinar sem pontos de energia suficientes', () => {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const cresim = createCresim('Érick Bauer');
        cresim.energia = 0;

        const cresimItemComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);
        const cresimAtualizado = treinarHabilidade(cresimItemComprado, nomeHabilidade);

        expect(cresimAtualizado).toBeNull();
    })

    it('Deve validar ao tentar treinar sem possuir itens da habilidade selecionada', () => {
        const nomeHabilidade = 'PINTURA';
        const cresim = createCresim('Érick Bauer');

        const cresimAtualizado = treinarHabilidade(cresim, nomeHabilidade);

        expect(cresimAtualizado).toBeNull();
    })

    it('Deve validar ao tentar treinar sem pontos de energia suficientes', () => {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const cresim = createCresim('Érick Bauer');
        cresim.higiene = 0;

        const cresimItemComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);
        const cresimAtualizado = treinarHabilidade(cresimItemComprado, nomeHabilidade);

        expect(cresimAtualizado).toBeNull();
    })

    it('Deve avançar o nivel de habilidade para SENIOR quando completar os pontos necessarios',() =>  {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const cresim = createCresim('Érick Bauer');
        const cresimItemComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);

        cresimItemComprado.habilidades[nomeHabilidade.toLowerCase()].pontos = 24
        const cresimAtualizado = treinarHabilidade(cresimItemComprado, nomeHabilidade);

        expect(cresimAtualizado.habilidades[nomeHabilidade.toLowerCase()].pontos).toBe(27);
        expect(cresimAtualizado.habilidades[nomeHabilidade.toLowerCase()].nivel).toBe('SENIOR');
    })

    it('Deve utilizar o melhor item da categoria da habilidade selecionada ao treinar',() =>  {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const idItemMelhor = 2;

        const cresim = createCresim('Érick Bauer');
        cresim.cresceleons = 10000;

        const cresimItemComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensHabilidades);
        const cresimItemMelhorComprado = comprarItemHabilidade(cresimItemComprado, nomeHabilidade, idItemMelhor, itensHabilidades);
        
        const cresimAtualizado = treinarHabilidade(cresimItemMelhorComprado, nomeHabilidade);

        expect(cresimAtualizado.habilidades[nomeHabilidade.toLowerCase()].pontos).toBe(5);
    })

    it('Deve utilizar o melhor item da categoria da habilidade selecionada ao treinar mesmo quando comprados fora de ordem',() =>  {
        const nomeHabilidade = 'PINTURA';
        const idItem = 1;
        const idItemMelhor = 2;

        const cresim = createCresim('Érick Bauer');
        cresim.cresceleons = 10000;

        const cresimItemMelhorComprado = comprarItemHabilidade(cresim, nomeHabilidade, idItemMelhor, itensHabilidades);
        const cresimItensComprados = comprarItemHabilidade(cresimItemMelhorComprado, nomeHabilidade, idItem, itensHabilidades);

        const cresimAtualizado = treinarHabilidade(cresimItensComprados, nomeHabilidade);

        expect(cresimAtualizado.habilidades[nomeHabilidade.toLowerCase()].pontos).toBe(5);
    })
})

describe('Testes de interações entre os Cresims', () => {
    it('Deve evoluir o relacionamento de dois Cresims para AMIZADE',() =>  {
        let meuCresim = createCresim('Vinícius Freiry');
        let cresimInteracao = createCresim('Alice Sanda');

        const primeiraInteracao = checaPrimeiraInteracao(meuCresim, cresimInteracao);
        meuCresim = primeiraInteracao.meuCresim;
        cresimInteracao = primeiraInteracao.cresimInteracao;

        for(let i = 0; i < 3; i++) {
            const interacao = interagir(meuCresim, cresimInteracao, 'Neutro', 3, interacoes);
            meuCresim = interacao.meuCresim;
            cresimInteracao = interacao.cresimInteracao;
        }

        const resultadoRecebido = meuCresim.relacionamentos[0].nivel;
        const resultadoEsperado = 'Amizade';

        expect(resultadoRecebido).toBe(resultadoEsperado);
    })

    it('Deve recuar o relacionamento de dois Cresims para INIMIZADE',() =>  {
        let meuCresim = createCresim('Vinícius Freiry');
        let cresimInteracao = createCresim('Alice Sanda');

        const primeiraInteracao = checaPrimeiraInteracao(meuCresim, cresimInteracao);
        meuCresim = primeiraInteracao.meuCresim;
        cresimInteracao = primeiraInteracao.cresimInteracao;

        const interacao = interagir(meuCresim, cresimInteracao, 'Neutro', 6, interacoes);
        meuCresim = interacao.meuCresim;
        cresimInteracao = interacao.cresimInteracao;

        const resultadoRecebido = meuCresim.relacionamentos[0].nivel;
        const resultadoEsperado = 'Inimizade';

        expect(resultadoRecebido).toBe(resultadoEsperado);
    })

    it('Deve descontar os pontos de energia em uma interação entre dois Cresims',() =>  {
        let meuCresim = createCresim('Vinícius Freiry');
        let cresimInteracao = createCresim('Alice Sanda');

        const primeiraInteracao = checaPrimeiraInteracao(meuCresim, cresimInteracao);
        meuCresim = primeiraInteracao.meuCresim;
        cresimInteracao = primeiraInteracao.cresimInteracao;

        const interacao = interagir(meuCresim, cresimInteracao, 'Neutro', 4, interacoes);
        meuCresim = interacao.meuCresim;
        cresimInteracao = interacao.cresimInteracao;

        const resultadoRecebido1 = meuCresim.energia;
        const resultadoEsperado1 = 32 - 2;

        const resultadoRecebido2 = cresimInteracao.energia;
        const resultadoEsperado2 = 32 - 1;

        expect(resultadoRecebido1).toBe(resultadoEsperado1);
        expect(resultadoRecebido2).toBe(resultadoEsperado2);
    })

    it('Deve validar ao tentar interagir sem pontos de energia suficientes',() =>  {
        let meuCresim = createCresim('Vinícius Freiry');
        meuCresim.energia = 0;

        let cresimInteracao = createCresim('Alice Sanda');
        cresimInteracao.energia = 0;

        const primeiraInteracao = checaPrimeiraInteracao(meuCresim, cresimInteracao);
        meuCresim = primeiraInteracao.meuCresim;
        cresimInteracao = primeiraInteracao.cresimInteracao;

        const interacao = interagir(meuCresim, cresimInteracao, 'Neutro', 3, interacoes);

        expect(interacao.meuCresim.relacionamentos).toEqual(meuCresim.relacionamentos);
        expect(interacao.cresimInteracao.relacionamentos).toEqual(cresimInteracao.relacionamentos);
    })

    it('Deve validar corretamente caso não seja a primeira interacao entre os Cresims',() =>  {
        let meuCresim = createCresim('Vinícius Freiry');
        let cresimInteracao = createCresim('Alice Sanda');

        const primeiraInteracao = checaPrimeiraInteracao(meuCresim, cresimInteracao);
        meuCresim = primeiraInteracao.meuCresim;
        cresimInteracao = primeiraInteracao.cresimInteracao;

        const primeiraInteracaoValidar = checaPrimeiraInteracao(meuCresim, cresimInteracao);

        expect(primeiraInteracaoValidar).toBeNull();
    })

    it('Deve atualizar apenas o relacionamento com o Cresim que participou da interação', () => {
        let meuCresim = createCresim('Vinícius Freiry');
        meuCresim.id = '3'

        let cresimInteracao1 = createCresim('Alice Sanda');
        cresimInteracao1.id = '1';

        let cresimInteracao2 = createCresim('Érick Buaer');
        cresimInteracao2.id = '2';
    
        meuCresim.relacionamentos = [
            { id: cresimInteracao1.id, nivel: 'Neutro', pontos: 0 },
            { id: cresimInteracao2.id, nivel: 'Neutro', pontos: 0 }
        ];
    
        cresimInteracao1.relacionamentos = [{ id: meuCresim.id, nivel: 'Neutro', pontos: 0 }];
        cresimInteracao2.relacionamentos = [{ id: meuCresim.id, nivel: 'Neutro', pontos: 0 }];
    
        const interacao = interagir(meuCresim, cresimInteracao1, 'Neutro', 3, interacoes);
        meuCresim = interacao.meuCresim;

        expect(meuCresim.relacionamentos.find(r => r.id == cresimInteracao1.id).pontos).toBe(4);
        expect(meuCresim.relacionamentos.find(r => r.id == cresimInteracao2.id).pontos).toBe(0);
    })
})

describe('Testes sobre trabalho do Cresim', () => {
    it('Deve receber os salários corretos como JUNIOR', () => {
        const cresim = createCresim("Vinícius Freiry");

        expect(trabalhar(cresim, empregos, 'Jogador de Dota').cresceleons).toBe(1500 + 160);
        expect(trabalhar(cresim, empregos, 'Assistente do Jacquin').cresceleons).toBe(1500 + 130);
        expect(trabalhar(cresim, empregos, 'Segurador de pincéis').cresceleons).toBe(1500 + 110);
        expect(trabalhar(cresim, empregos, 'Desafinador').cresceleons).toBe(1500 + 210);
        expect(trabalhar(cresim, empregos, 'Ladrão de planta').cresceleons).toBe(1500 + 160);
    });

    it('Deve receber os salários corretos como PLENO', () => {
        const cresim = createCresim("Vinícius Freiry");
        cresim.habilidades.gastronomia.nivel = 'PLENO';
        cresim.habilidades.jardinagem.nivel = 'PLENO';
        cresim.habilidades.jogos.nivel = 'PLENO';
        cresim.habilidades.musica.nivel = 'PLENO';
        cresim.habilidades.pintura.nivel = 'PLENO';

        expect(trabalhar(cresim, empregos, 'Jogador de Dota').cresceleons).toBe(1500 + 250);
        expect(trabalhar(cresim, empregos, 'Assistente do Jacquin').cresceleons).toBe(1500 + 220);
        expect(trabalhar(cresim, empregos, 'Segurador de pincéis').cresceleons).toBe(1500 + 230);
        expect(trabalhar(cresim, empregos, 'Desafinador').cresceleons).toBe(1500 + 300);
        expect(trabalhar(cresim, empregos, 'Ladrão de planta').cresceleons).toBe(1500 + 250);
    });

    it('Deve receber os salários corretos como SENIOR', () => {
        const cresim = createCresim("Vinícius Freiry");
        cresim.habilidades.gastronomia.nivel = 'SENIOR';
        cresim.habilidades.jardinagem.nivel = 'SENIOR';
        cresim.habilidades.jogos.nivel = 'SENIOR';
        cresim.habilidades.musica.nivel = 'SENIOR';
        cresim.habilidades.pintura.nivel = 'SENIOR';

        expect(trabalhar(cresim, empregos, 'Jogador de Dota').cresceleons).toBe(1500 + 340);
        expect(trabalhar(cresim, empregos, 'Assistente do Jacquin').cresceleons).toBe(1500 + 280);
        expect(trabalhar(cresim, empregos, 'Segurador de pincéis').cresceleons).toBe(1500 + 270);
        expect(trabalhar(cresim, empregos, 'Desafinador').cresceleons).toBe(1500 + 410);
        expect(trabalhar(cresim, empregos, 'Ladrão de planta').cresceleons).toBe(1500 + 340);
    });
})