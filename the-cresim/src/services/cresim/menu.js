import { useQuestion } from '../question/use-question.js';
import { useLocalStorage } from '../local-storage/use-local-storage.js';
import { createCresim, adicionarAspiracao, dormir } from './cresim.js';
import { tomarBanho } from './higiene.js';
import { trabalhar } from './trabalho.js';
import { comprarItemHabilidade, treinarHabilidade } from './habilidade.js';
import { interagir, checaPrimeiraInteracao } from './interacao.js';
import { aplicarCheat } from './cheats.js';
import chalk from 'chalk'


const localStorage = useLocalStorage();


export const telaDeCarregameto = async (test = false) => {
    console.clear();

    const ascii = `
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
|          PLANETA                                                                                                                            |  
┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────-────────┼  
│ MMMM MMM MM EEMMEMMMM M MMM MM M  MM  M   MMMMMMMMMMMMMMM   M     MM M  M   M     M             M MM   M  MM  M MM MMMMMMMMMM         MMM  M│  
│M M MMMMMMMM MMMMMMM MM MMMMMMM MMM MM MMMM M  M  MMMMMMMMMM                M   M MMM M M MMMMMMMMMMMMM MM  MM MM MMM     .   M.MMMMMMM  MM .│  
│MMM  M MM  M M   M  MMM   MM  MMMM MMM M   M M  M  M  MM M    M MMMM MM MMM MMMM MMMMM MM MM MM   M       M  M MMMM   MMMM   MM MM MMMMMMMM  │  
│MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM  M M  MMMMMMM     MMMMMMMMMMW ||| MMMMMMM     M       MM MMM.  MMMMM____   .  .    │  
│MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM M MM MMMM MMMMM MMMMMMMMMMMM  | |  MMMMMM   M M MMMM  MMMM   . |.____.  |Y        .│  
│MMMMMMMM|   M MM  M  MMM MMMMMM  M MMMMMMMMMMMMMMMMMMMMMMMM MM MM MMMM MMMMMMMMMMMMM    | |    -MMM   MMMM   MM MMMM   .//      -/  |Y      /│  
│MMMMMMMMM MMMAMMMMMMMMM MMrMMiMiMMMMMMMMMMoMMMMMMMMMMMMMM MMMM MMMMMMM MMMMM MMMWOM     | |      MMMMMMMMMMMMM MMMM  .//          Y |  Y // /│  
│MMMMMMMMM M    MMMMMMM MMMMM  MMM M MMM    MMMMM|MMMMMMMMMMMMMMMM MMM   MMMM MMMW   Desenvolvido   XMMMMMMMM MMMMM M        .    .| |  //// /│  
│MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM----------por---------MMMMMMMMMMM MMMMM||           | |//**// /│  
│MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      Érick | | Bauer     MMMMMMMMMMM MMMM Y        ./ //  /  /  │  
│M  MMMMMMMM  MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM     Vinicius | | Freiry      MMMM MM M   MMM  Y.___./ //Y* *   , L│  
│MM MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNd.    Manuela | | Dal Corso  MMMM MMM M M  M MMM   Y //////Y , /   │  
│MM MM M MMMMMMMMMMMMMMM|          |m|  |MMMMMN|  |MMM|        |:0MMMMMMMMMMMMX¨¨¨¨¨¨¨¨¨ | |¨¨¨¨¨¨¨¨¨¨MMMMMM  M M   MMMMMMM    ///////// Y    │  
│MMMMMMMMMMM MMMMMMMMMWNNNNo|  |lXNXN|  |KMMMMN|  |MMM|   XNXXNWMMMMMMMMMMMMMMXMM        | |        MMMMMMMMMMMM  MMMM      ///////// .   L   │  
│   MMMMMMMMMMMMMMMMMMMMMMMM|  |WMMM0|  |MMMMMM|  |MMM|   |MMMMMMMMMMMMMMMMMMMMMMMM      | |      MMMMMMMMMMMMMM   M      /////////  MMMM     │  
│MMMMMMMMMMMM MMMMMMMMMMMMMd|  |MMMMm|  |         |MMM|        |XMMMMMMMMMMMMMMMMMMMM    | |    MMMMMMMMMMMMM M MMMMM  ./////////   M MM MMM  │  
│ MMM  MMMMMMMMMMMMMMMMMMMMd|  |WMMM0|  |MMMMMM|  |MMM|   MMMMMWMMMMMMMMMMMMMMMMMMMMXMM  | |  MWMMMMMMMMMMMM MMMMM MM  --------   MMMMM  MMM M│  
│MMMMMMMMMMMMMMMMMMMMMMMMMMd|  |WMMMM|  |KMMMMN|  |MMM|   KKKKKNMMMMMMMMMMMMMMMMMMMMMMXMM| |MWMMMMMMMMMMMMMMMM MMMMMM        . MMM  M MM  MM M│  
│ MMMMMMMMMMMMMMMMMMMMMMMMMd|  |oWMMM|  |KMMMMN|  |MMM|         |dWMMMMMMMMMMMMMMMMMMMMMN|||MMWMMMMMMMMMMMMMM MM MMM MM MMMMMMMMMM MM MMM    M│  
│  MMMMMMMMMMMMMMMMMMMMMMMMKdoo0WMMMMXxookNMMMMWOooxXMMKdoooooood0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM MMMMMMMMMMMMMMM M MMMMMMMMM    │  
│MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM MMMM  M      M  M M  MM   M MMM M│  
│MMMMMMMMMMMMMMMWWMMMMMMMMMMWWWWWWWWWMMMMMMMMMMMWWWWWWWWWWWWWWMMMMMMMMMMWWWWMMMMMMMMMWWWWWWMMMMWWNNWWMMMMMMMMMMMNNWWWMMMMMMMMMWWWMMMMMMMMMMM M│  
│M MMMMMMMMN;MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM M│  
│MMMMMMMMXd,.          |kWMW|            ,xNMMMX|            |MMMMM            MMMMMMM|    |MMMM|    |WMMMMMMWk.    |MMKMMMK            MW M M│  
│ MMMMMWk,    .........|xNMW|    |lcc,.    lNMMX|    |MMMMMMMMMMMM|   ..;llc,. |MMMMMM|    |MMMM|     ,0MMMMMWO|    |MMMMMM|    ...,...dMMMM M│  
│MMMMMWk.   .l0NWMWNKdxXMMMW|    |xMMMNx.   .OMM|    |MMMMMMMMMMMM|    |MMMMMMMMMMMMMM|    |MMMM|      ;0MMMMO|     |MMKMMO.   .OMMMW0MMMMMM M│  
│ MMMMX:   .dWMMMMMMMMMMMMMW|    |kMMWNx.   |0MM|    |MMMMMMMMMMMM|    .MMMMMMMMMMMMMM|    |MMMM|       ;KMM0,      |MKMMK;     |lKNWMMMMMMM M│
│  MM0|    ,0MMMMMMMMMMMMMMW|    |c:;|.   .xWMMX|            |NNNN|,           MMMMMMN|    |MMMM|        :XK;       |MMKMMWO,       MMMMMMMMMM|  
│M MM0|    |0MMMMMMMMMMMMMMW|           .c0WMMMX|            |MMMMMMMM,...       KMMMM|    |MMMM|   c.    |    c    |MMMMWXkl;..       MMMMM M│  
│  MMMX:   .oNMMMMMMMMMMMMMW|     M      lXMMMMX|    |dKKXXXKXWMMMMMWWMWWNKOo.    lNMN|    |MMMM|   |k|       |K|   |MKMMMMWWMWNKO.      MMM M│  
│M MMMMO.   .:MMMMMMMMMMMMMN|    |MMM      XMMMM|    |MMMMMMMMMMMMMMMMMMNWWWNl     NMN|    |MMMM|   |MM|     |WO|   |MD|MMWMMMMMMMM     |MMM M│  
│  MMMMWO;     ¨¨ ¨¨¨¨¨¨|MMM|    |MMMM|     MMMM|    |MMMMMMMMMMMMM ¨¨¨¨¨¨¨¨¨¨    MMMM|    |MMMM|   |MM0|   |0MM|   |MKMMMM|¨¨¨¨¨¨¨     MMMM M│  
│M MMMMMMXx;.           |MMM|    |MMMNd.    dNMX|            |mmmmm|___________.0WMMMX|    |WMM0|   |MMMKcoNMMMx|   |MMMMMM|___________MMMMM M│  
│M MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM M│  
│M MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM M│  
│MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM MMMM MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM  │  
│ MMMMM MMMM MMM   MMMMMMM MMM MMMM MMMMMMMMMMMMMMMMMMMMMMMM MMMMMMMMMMMMMMMMMMM  MMMMMM M MMMMM MMMMMMMMMMM MMMMMMMMM MMMMMMMMMMMM   MMMMM  M│  
│  MM MMMMMM MMM MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM MMM MMMM M MMMMMMM MMMMM  MM M  MMMMMMMMMMMMMMMMMMMM M MMM MMMMMMMMMM MMM MMM M MMM MMM M│  
│MM  MMM  MMMMMMMMMM MMMMMM MMM  MMMMMMM  MM  MM  MM MM MMMMM  MMM  M  M MM  MMMMMMMMMMMMMMM   MMM MMMMM MMMMMMMMMM  M   MMMM  MMMMMMMMM MMM M│  
│   M MM    M MMMMMMMMMMMMM M MM M M MMMM  M   MMM   M  M   M  MM  M  M           MM MM    M  MM       M MMMMMMMMMM M M MMM    MMM            │  
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘     
`;

    const keywords = [
        'Desenvolvido',
        'por',
        'Érick',
        'Bauer',
        'Vinicius',
        'Freiry',
        'Manuela',
        'Dal Corso'
    ];

    const coloredAscii = ascii
        .split('\n')
        .map(line => {
            let novaLinha = line;
            for (const palavra of keywords) {
                const regex = new RegExp(palavra, 'g');
                novaLinha = novaLinha.replace(regex, chalk.cyan(palavra));
            }
            return novaLinha;
        })
        .join('\n');

    console.log(coloredAscii);


    let iniciar;

    if (!test) {
        do {
            iniciar = await useQuestion("Pressione 'X' para continuar: ");
        } while (iniciar.trim().toLowerCase() !== "x");
    }

    return true;
};

export const telaCrescimInicial = async () => {
    let opcao;

    do {
        console.clear();
        console.log(chalk.blue('┌' + '─'.repeat(141) + '┐'));
        console.log(chalk.blue('| ') + chalk.green.bold('PLANETA  '.padEnd(138, ' ')) + chalk.blue('  |'));
        console.log(chalk.blue('├' + '─'.repeat(141) + '┤'));
        
        console.log(chalk.cyan('│          ___---___                        ______________________________________________________________________________________ -          │'));
        console.log(chalk.cyan('│       .--         --.                   / )                                                                                     |.  .       │'));
        console.log(chalk.cyan('│     ./   ()      .-.  Y                |   |                                                                                    |..         │'));
        console.log(chalk.cyan('│    /   o    .   (   )  Y                #_ |                                                                                 .  |.          │'));
        console.log(chalk.cyan('│   / .            *-*    Y                  |                                                                                    |.          │'));
        console.log(chalk.cyan('│  | ()    .  O         .  |                 |     ') + chalk.red.bold('REGRAS BÁSICAS:') + chalk.cyan('                                                                |.          │'));
        console.log(chalk.cyan('│ |                         |                |       - Crie e gerencie a vida do seu Cresim por 60 dias (1 hora).                 |.          │'));
        console.log(chalk.cyan('│ |    o           ()       |                |       - Ele precisa trabalhar, treinar habilidades e manter energia e higiene.     |.          │'));
        console.log(chalk.cyan('│ |       .--.          O   |                |       - O tempo passa e o Cresim pode morrer!                                      |.          │'));
        console.log(chalk.cyan('│  | .   |    |            |                 |                                                                                    |.          │'));
        console.log(chalk.cyan('│   |    ¨.__.¨    o   .  /                  |          ') + chalk.green.bold('O QUE FAZER?') + chalk.cyan('                                                              |.          │'));
        console.log(chalk.cyan('│    Y                   /                   |       - Escolha um Cresim e ajude-o a crescer!                                     |.          │'));
        console.log(chalk.cyan('│     ( o    ()       /                      |       - Trabalhe para ganhar Cresceleons                                           |.          │'));
        console.log(chalk.cyan('│       ¨___   ___-  -                       |       - Treine habilidades para melhorar seu nível!                                |.          │'));
        console.log(chalk.cyan('│                                            |       - Cuidado com a energia e a higiene para não sofrer penalidades!             |.          │'));
        console.log(chalk.cyan('│                            _..._           |                                                                               .    |.          │'));
        console.log(chalk.cyan('│                          .¨       ¨   _  |          ') + chalk.red.bold('VIDA E MORTE') + chalk.cyan('                                                                |.          │'));
        console.log(chalk.cyan('│                         /    .-""-)   _/ | |       - O tempo de vida do Cresim é limitado, então aproveite ao máximo!           |.          │'));
        console.log(chalk.cyan('│                       .-|   /:.   |  |   | |                                                                                    |.          │'));
        console.log(chalk.cyan('│                       |  ()  |:.   /.-Y¨-./ |          ') + chalk.blue.bold('CHEATS DISPONÍVEIS!') + chalk.cyan('                                                      |.          │'));
        console.log(chalk.cyan('│                       | .-Y¨-;:__.Y¨    =/   |        Sim, existem trapaças! Digite códigos secretos para vantagens.            |.          │'));
        console.log(chalk.cyan('│                       .=  *=|     _.=Y¨    |                                                                                    |.          │'));
        console.log(
          chalk.cyan('│                      /   _.  | ') +
          chalk.hex('#FFA500')('CWI') +
          chalk.cyan(';        |         Divirta-se e boa sorte!                                                    |.          │')
        );
        console.log(chalk.cyan('│                      ;--_--|    |   |      |                                                                                    |.          │'));
        console.log(chalk.cyan('│                    /   | |    _|  |        |                                                                                    |.          │'));
        console.log(chalk.cyan('│                    |__/Y¨.;.  ==Y¨ ==/     |   _________________________________________________________________________________|___        │'));
        console.log(chalk.cyan('│                             |    |   |     |  /                                                                                    /.       │'));
        console.log(chalk.cyan('│                             /    /   /     |_/______CWI___________________________________________________________________________/.        │'));
        console.log(chalk.cyan('│                             /-._/-._/                                                                                                       │'));
        console.log(chalk.cyan('│                  CRESCER    ,, § | § |                                                                                                      │'));
        console.log(chalk.cyan('│                          ,,,,._x.  ._x.                                                                                                     │'));
        console.log(chalk.cyan('│         @@@@            ,                                                                                                                   │'));
        console.log(chalk.cyan('│         @@@@ ,----.___  ,                                                                                                                   │'));
        console.log(chalk.cyan('│        __||_/___      Y¨J                                                                                                                   │'));
        console.log(chalk.cyan('│       /  ||    /|           ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐     │'));
        console.log(chalk.cyan('│      /   ""   / /           │     ') + chalk.green.bold('Digite o número da opção de como você deseja iniciar a jogar:') + chalk.cyan('                                       │     │'));
        console.log(chalk.cyan('│     /________/ /            │                                                                                                         │     │'));
        console.log(chalk.cyan('│     |________|/             │                      1- Criar novo Cresim.                         2- Jogar com Cresim existente.       │     │'));
        console.log(chalk.cyan('│                             └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘     │'));
        console.log(chalk.cyan('└' + '─'.repeat(141) + '┘'));



        opcao = await useQuestion("Digite a opção desejada (1 ou 2): ");
    } while (opcao !== "1" && opcao !== "2");

    if (opcao === "1") {
        return false;
    } else {
        const cresims = todosCresim();

        //Cria um Cresim novo se não existir nenhum
        if (cresims.length === 0) {
            console.log("Nenhum Cresim encontrado. Criando um novo...");
            return false;
        }

        return true;
    }
};

export const criacaoDeCresim = async () => {
    console.clear();
    const asciiArt = `
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
    │          PLANETA    The Cresim                                                                                                        │ 
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 
    │   ██████╗██████╗ ██╗ █████╗ ███╗   ██╗██████╗  ██████╗     ███████╗███████╗██╗   ██╗     ██████╗██████╗ ███████╗███████╗██╗███╗   ███╗│ 
    │  ██╔════╝██╔══██╗██║██╔══██╗████╗  ██║██╔══██╗██╔═══██╗    ██╔════╝██╔════╝██║   ██║    ██╔════╝██╔══██╗██╔════╝██╔════╝██║████╗ ████║│ 
    │  ██║     ██████╔╝██║███████║██╔██╗ ██║██║  ██║██║   ██║    ███████╗█████╗  ██║   ██║    ██║     ██████╔╝█████╗  ███████╗██║██╔████╔██║│  
    │  ██║     ██╔══██╗██║██╔══██║██║╚██╗██║██║  ██║██║   ██║    ╚════██║██╔══╝  ██║   ██║    ██║     ██╔══██╗██╔══╝  ╚════██║██║██║╚██╔╝██║│ 
    │  ╚██████╗██║  ██║██║██║  ██║██║ ╚████║██████╔╝╚██████╔╝    ███████║███████╗╚██████╔╝    ╚██████╗██║  ██║███████╗███████║██║██║ ╚═╝ ██║│  
    │   ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝     ╚══════╝╚══════╝ ╚═════╝      ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝     ╚═╝│ 
    │                                               *                      Y YY                                                             │ 
    │                                              ***                     / Y Y                                                            │ 
    │                                             *****                   / /YY                                                             │ 
    │                                            *******                  Y  V V                                                            │ 
    │                                            *******                   Y YY                                                             │ 
    │                                           *********                  /Y Y                                                             │ 
    │                                            *******                  / /Y Y                                                            │ 
    │                                             *****                   Y Y YY                                                            │ 
    │                                              ***                     Y YY                                                             │ 
    │                                               **                      Y Y                                                             │ 
    │                                                                      /./YV|                                                           │  
    │                                           .--::::::-:.               Y.V.|                                                            │ 
    │                                        .-:.          .-:.            /Y.V                                                             │ 
    │                                      .-.                -.          /./V|                                                             │ 
    │                                     .=.                 .=.         Y.V.|                                                             │
    │                                     :.                   .-       /Y.Y__/                                                             │ 
    │                                     :.                   .-     ././V|                                                                │ 
    │                                     :.                  .=.   ./Y.YY/.                                                                │
    │                                     .:.                 ::. .-/./V|_/                                                                 │ 
    │                                      -.                  .- -.Y.V.|                                                                   │ 
    │                                       :.                :..--.:Y__/                                                                   │ 
    │                                       .-               ::-:=.=.-.                                                                     │ 
    │                                        -        .....:-.:. .:.:-----:..      .:..                                                     │ 
    │                                        -.       :..   .::.  .=.       .:=...:- .:                                                     │ 
    │                                        -:        .:---:.    ::           ....  -.                                                     │ 
    │                                        .-.  :.              :.             .  :.                                                      │ 
    │                                         :.  :-.           .:=--.   .-:..    .:.                                                       │ 
    │                                         .-.   :-..     ..:- :. =.   ::                                                                │  
    │                                          .-.     ..-==:.    .=:+.   :.                                                                │ 
    │                                           .=.                      .-                                                                 │ 
    │                                             ::.                    .:                                                                 │ 
    │                                              .-:.                .::                                                                  │ 
    │                                                 -:..          ..:-.                                                                   │ 
    │                                                  ...==......-=:..                                                                     │ 
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
   `;
   
     // ASCII art das inspirações
     const inspirations = `
     ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
     |      INSPIRAÇÕES DISPONÍVEIS                                                                                                          |                                                                                                                                   
     ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ 
     │                                                                                                                                       │
     │                            2-PINTURA                           3-JOGOS                                  5JARDINAGEM                   │ 
     │                                                                                                                                       │ 
     │                       ┌────────────────┐                                                                                              |  
     │                       │ ┌────────────┐ │   +++                                                                                        │ 
     │                       │ │    -=-     │ │  +++                                                       @@@@                              │ 
     │                       │ │ (Y  _  /)  │ │  +++            ─▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄                      @@()@@ wWWWw      _               │ 
     │                       │ │ (+Y(0)/+)  │ │   =             █░░░█░░░░░░░░░░▄▄░██░█                     @@@@  (___)    _(_)               │ 
     │                       │ │ (+/Y┼/Y+)  │ │   =             █░▀▀█▀▀░▄▀░▄▀░░▀▀░▄▄░█                      /      Y     (_)@(               │ 
     │                       │ │  YY/ V/YY  │ │   =             █░░░▀░░░▄▄▄▄▄░░██░▀▀░█                      |     Y|/     /(_)               │ 
     │                       │ │   /   Y  hj│ │   =             ─▀▄▄▄▄▄▀─────▀▄▄▄▄▄▄▀                     YY|YY   YY|YY  |/                  │ 
     │                       │ │  /     Y   │ │   =                                                      YYY|YYYYY|///^Y|///                 │ 
     │                       │ │  ¨-._.-¨   │ │   =                                                                                          │ 
     │                       │ └────────────┘ │   =                                                                                          │ 
     │                       └────────────────┘   =                                                                                          │ 
     │                                                                                                                                       │  
     │               1-GASTRONOMIA                                      :                                5- MUSICA                           │
     │                                                              ¨.  _  .¨                                                                │ 
     │                                                             -=  (~)  =-                                                               │ 
     │               (c)___c____(c                                  .¨  #  ¨.                                                                │ 
     │               _T ..........                                                                                                           │ 
     │                 |.........|                                                                                                           │ 
     │                  |.......|                                    |||||||                                                                 │
     │                  |.......|                                    | o o |                                 ───▄▀▌─▄▄▄▄                     │ 
     │                  |=======|                                    |  >  |                                 ──▄█▀──▌─▌─▌─▄▄▄▄               │ 
     │                  |=======|                                    | (_/ |                                 ▄▀─█▄──▌─▌─▌─▌─▌─▌              │ 
     │                 __o)####::?                                    y___/                                  █─▀█─▌█▌█▌█▌─▌─▌─▌              │ 
     │           _    C__    c)::;                                   __| |__                                 ▀█▄█▀───────█▌█▌█▌              │ 
     │           o       >--   ::                                   /       Y                                                                │ 
     │           o       (____/                                    | |     | |                                                               │ 
     │            |##|                            _________________| |     | |_____________---__                                             │ 
     │          _/       (|V ^ ))                /                 | |_____| |         /  /  / /|                                            │ 
     │           | _____/ |#/ / |               /                  /_|  _  |_Y          /  /  / / |                                          │ 
     │          _|}|_____/|/ /  |              /                    / / / /          /  /__/ / /|                                            │ 
     │                                        /____________________/ / / /__________/___Y_/_/ / |                                            │ 
     │                                        |____________________| |_| |__________________|/  |                                            │ 
     │                                        |____________________| |_| |__________________|   /                                            │ 
     │                                       _|              |     | | | | ||               |  /                                             │ 
     │                                        | o          o | o         o || o           o | /                                              │ 
     │                                        |______________|_____________||_______________|/                                               │ 
     └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
   `;
   
     // Função para colorir as bordas com azul
     const colorBorders = (str, colorFn = chalk.cyan) => {
       const borderRegex = /[┌┐└┘├┤─│]/g;
       return str.replace(borderRegex, match => colorFn(match));
     };
   
     // Aplica branco ao conteúdo e bordas azuis
     const coloredHeader = colorBorders(chalk.white(asciiArt));
     const coloredInspirations = colorBorders(chalk.white(inspirations));
   
     console.log(coloredHeader);
   
     const nome = await useQuestion(`Qual será o nome do seu Cresim?`);
   
     let novoCresim = createCresim(nome);
     let aspiracao = '';
   
     do {
       // Se desejar limpar o console aqui, descomente:
       // console.clear();
       console.log(coloredInspirations);
   
       aspiracao = await useQuestion('Escolha uma aspiração para ' + nome + ':\n1. Gastronomia\n2. Pintura\n3. Jogos\n4. Jardinagem\n5. Música');
   
       switch (aspiracao) {
         case '1': aspiracao = 'GASTRONOMIA';
           break;
         case '2': aspiracao = 'PINTURA';
           break;
         case '3': aspiracao = 'JOGOS';
           break;
         case '4': aspiracao = 'JARDINAGEM';
           break;
         case '5': aspiracao = 'MUSICA';
           break;
         default: aspiracao = '';
           break;
       }
     } while (aspiracao === '');
   
     novoCresim = adicionarAspiracao(novoCresim, aspiracao);
   
     let id = 1;
     let novoID = 'Cresim';
   
     while (localStorage.getObject(novoID + id) != null) {
       id++;
     }
   
     novoCresim.id = novoID + id;
     localStorage.setObject(novoID + id, novoCresim);
   
     return novoID + id;
   };

export const paginaInicial = async (cresim, tempoGasto = 0, cheats) => {
    desenhaTelaInicial({ ...cresim, tempoDeVida: cresim.tempoDeVida + tempoGasto });

    if (tempoGasto) {
        const passaTempo = setInterval(() => {
            tempoGasto -= 1000;

            desenhaTelaInicial({ ...cresim, tempoDeVida: cresim.tempoDeVida + tempoGasto });

            if (tempoGasto <= 0) clearInterval(passaTempo);
        }, 1000);
    }

    await new Promise(resolve => setTimeout(resolve, tempoGasto + 1000));
    cresim.tarefa = (cresim.tempoDeVida > 0 ? 'Livre' : 'Morto');

    localStorage.setObject(cresim.id, cresim);

    let pagina = '';

    do {
        desenhaTelaInicial({ ...cresim, tempoDeVida: cresim.tempoDeVida + tempoGasto });

        pagina = await useQuestion('O que fazer à seguir?');
        cresim = aplicarCheat(cresim, pagina, cheats);
        localStorage.setObject(cresim.id, cresim);
        if (cresim.tempoDeVida <= 0 && pagina != 'SINUSITE' && pagina != '7') pagina = '8';

        switch (pagina) {
            case '1': return 1;
            case '2': return 2;
            case '3': return 3;
            case '4': return 4;
            case '5': return 5;
            case '6': return 6;
            case '7': return 7;
            case '8': return 8;
            case 'B':
            case 'b': process.exit(0);
            default: pagina = '';
        }
    } while (pagina == '');
}

function desenhaTelaInicial(cresim) {
    console.clear();

    const TEMPO_DIA_CRESIM = 60000;
    const TEMPO_HORA_CRESIM = 2500;

    const diasDeVida = Math.floor(cresim.tempoDeVida / TEMPO_DIA_CRESIM);
    const horasDeVida = Math.floor((cresim.tempoDeVida % TEMPO_DIA_CRESIM) / TEMPO_HORA_CRESIM);

    console.log(`
                                                                                                                                                                                                  
                                                                                                                                           
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
  |         Menu Principal                                                                                                               | 
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
  │                                                                                                                                      │ 
  │                                                                                                                                      │ 
  │                                                                                                                                      │ 
  │               :                                                                                                                      │ 
  │              .-:                                                                                                                     │ 
  │             :---:                                                                                                                    │ 
  │             =---=:    Nome: ${cresim.nome}                                                                                            
  │            ------=     Energia: ${cresim.energia}                                                                                     
  │           -=-----=-     Higiene: ${cresim.higiene}                                                                                    
  │          -==------=-     Cresceleons: ${cresim.cresceleons}                                                                           
  │         -==-------==-     Tarefa: ${cresim.tarefa}                                                                                    
  │        -===-------===-     Tempo de Vida: ${diasDeVida + (diasDeVida == 1 ? ' dia' : ' dias') + ' e ' + horasDeVida + (horasDeVida == 1 ? ' hora' : ' horas')}                                        
  │       :====-------====-                                                                                                              |
  │      :=====--==========-                                                                                                             │ 
  │     :+++++==========++++:                                                                                                            │ 
  │    :+++++=--------==+++++:                                                                                                           │ 
  │   .++++++--------===++++++:                                                                                                          │ 
  │  .++++++=------======*****+      O que voce deseja fazer?                                                                            │ 
  │   +*****+++++++++++++******.                                                                                                         │ 
  │   :******+++++++++++******:                                                                                                          │ 
  │    :*****+++++++++++*****-.                                                                                                          │ 
  │     -*****+****+++******-.                                                                                                           │ 
  │      =####**+++****####=.     1. Treinar                                                                                             │ 
  │       +###*********###+.     2. Comprar Item                                                                                         │ 
  │        *###*******###*.     3. Dormir                                           x                                                    │ 
  │         *##******####.     4. Tomar Banho                                      xxx                                                   │ 
  │          *##**#**##*.     5. Trabalhar                                          x          ^                                         │ 
  │           ###***###.     6. Interagir                                         _______     ^^^                                        │ 
  │           :##***##:     7. Trocar Cresim                                     |xxxxxxx|  _^^^^^_                                      │ 
  │            -##**#:     8. Criar Novo Cresim                                  |xxxxxxx| | [][]  |                                     │ 
  │             -#*#-     B. Fechar Programa                                  ______xxxxx| |[][][] |                                     │ 
  │              =*:                                                         |++++++|xxxx| | [][][]|       The Cresim                    │ 
  │               -                                                          |++++++|xxxx| |[][][] |                                     │ 
  │                                                                          |++++++|_________ [][]|                         _           │ 
  │                                                                          |++++++|=|=|=|=|=| [] |                                     │ 
  │                                                                          |++++++|=|=|=|=|=|[][]|                                     │ 
  │                                                               ___________|++HH++|  _HHHH__|   _________   _________  _________       │ 
  │                                                                        _______________   ______________      ______________          │ 
  │                                                               __________________  ___________    __________________    ___________   │ 
  │                                                                                                                                      │ 
  └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                          
    `);
}

export const paginaTrabalho = async (cresim, empregos, cheats) => {
    const tempoDeVidaInicial = cresim.tempoDeVida;
    let selecionado = '';

    do {
        desenhaPaginaTrabalho(cresim);

        selecionado = await useQuestion('Selecione um Trabalho:');
        cresim = aplicarCheat(cresim, selecionado, cheats);

        switch (selecionado) {
            case '1': cresim = trabalhar(cresim, empregos, 'Jogador de Dota');
                break;

            case '2': cresim = trabalhar(cresim, empregos, 'Assistente do Jacquin');
                break;

            case '3': cresim = trabalhar(cresim, empregos, 'Segurador de pincéis');
                break;

            case '4': cresim = trabalhar(cresim, empregos, 'Desafinador');
                break;

            case '5': cresim = trabalhar(cresim, empregos, 'Ladrão de planta');
                break;

            default: selecionado = '';
                break;
        }
    } while (selecionado == '');

    localStorage.setObject(cresim.id, cresim);

    return tempoDeVidaInicial - cresim.tempoDeVida;
}

function desenhaPaginaTrabalho(cresim) {
    console.clear();
    console.log(`                   
        
 ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐                                              
 |          Qual area voce deseja trabalhar?      
 ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐                                              
 │                                                                                                                                       │                                              
 │   ┌─────────────────────┐                                 ┌───────────────────────┐                                                   │                                              
 │   │                     │                                 │                       │                                                   │                                              
 │   │    Jogador de Dota  │                                 │.Segurador de Pincéis  │     1. Jogador de Dota =>                         |                                              
 │   │   _           _(_)  │                                 │                       │    Você é ${cresim.habilidades.jogos.nivel} em JOGOS                                             
 │   │___))         [  | |_│                                 │.......## --.#....|    │                                                                                                  
 │   │) //o          | |   │                                 │|.................|    │           Salários => Junior: 160                 │                                              
 │   │_    >         | |   │                                 │|......     * ....|  ++│                       Pleno: 250                  │                                              
 │   │ (__<          | | __│       ┌─────────────────────┐   │|.....     -^.....| +++│                       Senior: 280                 │                                              
 │   │/   )        [__|/_  │       │                     │   │|..##(        .....| +++                                                   │                                              
 │   │  ( /         __/____│       │Assistente do Jacquin│   │...#####     /#...|  = │                                                   |                                              
 │   │   / /__  ___|       │       │                     │   │||###########)....|  = │       2. Assistente do Jacquin =                  |                                            
 │   │    /___E/%%/|_______│       │       (c)___c____(c)│   │|.##.   ))/ ##....|  = │      Você é ${cresim.habilidades.gastronomia.nivel} em GASTRONOMIA                              
 │   │=====__   (__________│       │       _T ........../│   │|.###      .##....|  = │                                                                                                  
 │   │/_____ |    |        │       │         |.........| │   │|.###/____/###....|  = │            Salários => Junior: 130                │                                              
 │   │======| |   |        │       │          |.......|  │   │|..####  #####....|  = │                        Pleno: 220                 │                                              
 │   │    []| |   |        │       │          |=======|  │   │|.________________|  = │                        Senior: 280                │                                              
 │   │    []| |_  |        │       │          |=======|  │   │|_ H||_______H||     = │                                                   |                                              
 │   │    []|___) |        │       │        __o)####::?  │   │   H||________||       │       3. Segurador de Pincéis =>                  │                                              
 │   │                     │      ─┤      C__    c)::;   │   │   H||       H||       │       Você é ${cresim.habilidades.pintura.nivel} em PINTURA                                      
 │   └─────────────────────┘       │          >--   ::   │   └───────────────────────┘                                                                                                  
 │                                 ││   |##|   (____/    │   ┌───────────────────────┐             Salários => Junior: 110               │                                              
 │    ┌────────────────────┐       │ __/       (|V ^ ))  │   │   . Ladrão de Planta  │                         Pleno: 230                │                                              
 │    │                    │       │ o | _____/ |#/ / |  │   │                       │                         Senior: 270               │                                              
 │    │   . Desafinador    │       │ o_|}|_____/|/ /  |  │   │─▄██████▄──            │                                                   │                                              
 │    │                    │       │       _____/ /   |  │   │▐▀▀▀▀▀▀▀▀▌─            │        4. Desafinador =>                          |                                              
 │    │                    │       │==oo}{|______)#   |  │   │▌▌▀▀▌▐▀▀▐▐─ 0P         │        Você é ${cresim.habilidades.musica.nivel} em MÚSICA                                       
 │    │                    │       └─────────────────────┘   │▐──▄▄▄▄──▌─ P          │                                                                                                  
 │    │ ───▄▀▌─▄▄▄▄        │                                 │─▌▐▌──▐▌▐── .       wWW│             Salários => Junior: 210               │                                              
 │    │ ──▄█▀──▌─▌─▌─▄▄▄▄  │                                 │    V    Mo_ )     (___│                         Pleno: 300                |                                              
 │    │ ▄▀─█▄  ▌─▌─▌─▌─▌─▌ │                                 │  |___. |:).Ll)     ~Y~│                         Senior: 410               │                                              
 │    │ █─▀█─▌█▌█▌█▌─▌─▌─▌ │                                 │._____.|:|           ||│                                                   │                                              
 │    │ ▀█▄█▀───────█▌█▌█▌ │                                 │/     .M))           | │         5. Ladrão de Planta =>                    │                                              
 │    │                    │                                 │      "" ))        //||│         Você é ${cresim.habilidades.jardinagem.nivel} em JARDINAGEM                              
 │    │                    │                                 │    /))   ))       ────│                                                   │                                   
 │    │                    │                                 │   /  ))   ))    vVVVv │                                                                                                  
 │    │                    │                                 │  /    ))   ))   (___) │             Salários => Junior: 160               │                                              
 │    │                    │                                 │_/ /    ))__/     ~Y~  │                         Pleno: 250                |                                              
 │    └────────────────────┘                                 ├───────────────────────┤                         Senior: 340               │                                              
 │                                                                                                                                       │                                              
 └────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘                                              
                                                                                                                                                                                                                                                                                                                                                                                                                                
  `);
}

export const paginaTreinarHabilidade = async (cresim, cheats) => {
    console.clear();
    const tempoDeVidaAntigo = cresim.tempoDeVida;
    let habilidade = '';

    do {
        desenhaPaginaTreinarHabilidade(cresim);
        habilidade = await useQuestion('Qual habilidade gostaria de treinar?');
        cresim = aplicarCheat(cresim, habilidade, cheats);
        localStorage.setObject(cresim.id, cresim);

        switch (habilidade) {
            case '1':
                cresim = treinarHabilidade(cresim, 'GASTRONOMIA');
                break;
            case '2':
                cresim = treinarHabilidade(cresim, 'PINTURA');
                break;
            case '3':
                cresim = treinarHabilidade(cresim, 'JOGOS');
                break;
            case '4':
                cresim = treinarHabilidade(cresim, 'JARDINAGEM');
                break;
            case '5':
                cresim = treinarHabilidade(cresim, 'MUSICA');
                break;
            default:
                habilidade = '';
                break;
        }
    } while (habilidade == '');

    await new Promise(resolve => setTimeout(resolve, 4000));

    if (!cresim) {
        return 0;
    } else {
        localStorage.setObject(cresim.id, cresim);

        const tempoGasto = tempoDeVidaAntigo - cresim.tempoDeVida;
        return tempoGasto;
    }
}

function desenhaPaginaTreinarHabilidade(cresim) {
    console.log(`                                    
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
    |      Em qual categoria de item você gostaria de comprar?'
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐    
    │                                                                                                                                       |
    │           1 - Gastronomia                      2 - Pintura                                         3-JOGOS                            │     
    │                                       ||.........## --.#.......|                                                  YYYYYYYYYYYYYYY     │     
    │                                       ||.........   #  # ......|            @@@@           ----------,-|           |C>   // )YYYY|    │     
    │             *****                     ||.........     *  ......|          @@@@@@                   ,','|          /    || ,'/////|    │     
    │  ||||      *******       |||          ||........     -^........|   ,      - @@@@           ------,','  |         (,    ||   /////     │     
    │  ||||      *******       |||          ||.....##Y        .......|   |     ¨_ @@@                  ||    |          YY  ||||//''''|     │     
    │  |||| (**************))  |||          ||....#####     /###.....|   |     __Y@ Y@                 ||    |           |||||||     _|     │     
    │  │||  ****************)    |          ||....########Y Y#.......|  _YY  (/ ) @Y_/)_                 ||    |______      ¨¨¨¨¨Y____/ Y   │     
    │  │||  ****************)    |          ||..####,   ))/ ##.......|   |(__/ /     /                 ||    |     ,|         _/_____/ Y    │     
    │  │||  (**************))    |          ||..#####      ¨###......|    Y___/ ----/_|%                ||  ,¨   ,¨|        /          |    │     
    │  │||     │********│        |          ||..#####Y____/#####.....|       ,:   ¨( -           ______|| ¨ ,¨¨|    |  |   /     Y  |  |    │     
    │          │********│                   ||...######..######......|       |:     Y            __________,¨      ,¨,____|      |    |     │     
    │          │********│                   ||.....¨¨¨¨  ¨¨¨¨...¨CWI.|    |:      )                        |     ,¨,¨     |      |    |     │     
    │          ┴┴┴┴┴┴┴┴┴┴                   [|_______________________|       |:      |                     |   ,¨,¨    ____|_____/    /     │     
    │                                            H||_______H||             |_____,_|                       | ,¨,¨  __/ |             /      │     
    │                                          H|________________|                                                                          |     
    │                4-Jardinagem                                                                              5 - Musica                   │     
    │                  _(_)_                         wWWWw   _                                                                              |     
    │    @@@@         (_)@(_)   vVVVv    _    @@@@  (___) _(_)_                               |Y                 ♪    ♫    ♬   ♩            │     
    │   @@()@@ wWWWw    (_)    (___)   _(_)_ @@()@@   Y  (_)@(_)                           --|/----------------,┌────┬────┬────┬─           │     
    │    @@@@  (___)    ¨|/      Y    (_)@(_) @@@@   Y|/   (_)                             |--|---4-------------│    │    │    │            │     
    │     /      Y       Y|     Y|/    /(_)   Y|      |/     |                             /|.-------|~~~~|--/|-|          (_)----          │     
    │   YY|YY   YY|YY YYY|YYYYY|/// Y|///  YYY|//  YY|//  YYY|                             -¨|¨-----(_)--(_)-------(_)--(_)--               │     
    │   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                                                                           │     
    | Nivel de suas habilidades:             Gastronomia 
                                                Nivel atual: ${cresim.habilidades.gastronomia.nivel}
                                                Pontos: ${cresim.habilidades.gastronomia.pontos}
                                             Pintura
                                                Nivel atual: ${cresim.habilidades.pintura.nivel}
                                                Pontos: ${cresim.habilidades.pintura.pontos}
                                            Jogos
                                                Nivel atual: ${cresim.habilidades.jogos.nivel}
                                               ontos: ${cresim.habilidades.jogos.pontos}
                                            Jardinagem
                                                Nivel atual: ${cresim.habilidades.jardinagem.nivel}
                                                Pontos: ${cresim.habilidades.jardinagem.pontos}
                                            Música
                                                Nivel atual: ${cresim.habilidades.musica.nivel}
                                                Pontos: ${cresim.habilidades.musica.pontos}                                                                                 
    └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  
    `);
}

export const paginaComprarItem = async (cresim, itensDisponiveis, cheats) => {
    console.clear();
    let habilidade = '';
    let idItem = '';

    do {
        desenhaPaginaComprarItem();

        habilidade = await useQuestion('Em qual categoria de item você gostaria de comprar?');
        cresim = aplicarCheat(cresim, habilidade, cheats);

        let nomeHabilidade = ''
        switch (habilidade) {
            case '1': nomeHabilidade = 'GASTRONOMIA';
                break;
            case '2': nomeHabilidade = 'PINTURA';
                break;
            case '3': nomeHabilidade = 'JOGOS';
                break;
            case '4': nomeHabilidade = 'JARDINAGEM';
                break;
            case '5': nomeHabilidade = 'MUSICA';
                break;
            default: habilidade = '';
                break;
        }

        if (habilidade != '') {
            console.clear();
            desenhaPaginaComprarItem(nomeHabilidade);
            idItem = await useQuestion(`\nQual item da categoria ${nomeHabilidade.toLowerCase()} você gostaria de comprar?`);
            cresim = aplicarCheat(cresim, idItem, cheats);
        }

        localStorage.setObject(cresim.id, cresim);

        if (!['1', '2', '3'].includes(idItem)) {
            console.log('Item não encontrado');
        } else {
            cresim = comprarItemHabilidade(cresim, nomeHabilidade, idItem, itensDisponiveis);

            if (cresim) {
                localStorage.setObject(cresim.id, cresim);
            }
        }
    } while (habilidade == '');

    await new Promise(resolve => setTimeout(resolve, 4000));
    return 0;
}

function desenhaPaginaComprarItem(nomeHabilidade = '') {
    switch (nomeHabilidade) {
        case 'GASTRONOMIA':
            console.log(`                                                                                                                                  
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
    |             
    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐        
    │                                                           ___________________________________________________________________        |       
    │                                                         / Y                                                                  Y.      │       
    │    ________________________                            |   |                                                                 |.      │       
    │    |.----------------------.|                           Y_ |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||     .-"¨¨¨¨"-.       ||                              |    Qual item de gastronomia você gostaria de comprar?           |.      │       
    │    ||    /  _.._    ¨Y     ||                              |                                                                 |.      │       
    │    ||   / /¨    ¨-.   ; . .||                              |        1. Makita cortadora de cebola                            |.      │       
    │    ||   | |__  __  Y   |   ||                              |            Pontos de treino: 3                                  |.      │       
    │    ||.-.| | e Y e  |   |   ||                              |            Preço: C$1800                                        |.      │       
    │    ||   | |  |     |   | --||                              |                                                                 |.      │       
    │    ||   | |  ¨-    |   |   ||                              |        2. Frigideira da Polishop                                |.      │       
    │    ||   |  Y --¨  /|   |   ||                              |            Pontos de treino: 5                                  |.      │       
    │    ||   |   ¨;---¨Y|   |   ||                              |            Preço: C$3200                                        |.      │       
    │    ||   |    |     |   |   ||                              |                                                                 |.      │       
    │    ||   |  .-¨     |   |   ||                              |        3. Panela elétrica mágica                                |.      │      
    │    ||¨--|Y¨        |   |--.||                              |            Pontos de treino: 7                                  |.      │       
    │    ||   ;    .     ;  _.Y  ||                              |            Preço: C$4500                                        |.      │       
    │    ||    ¨-.;_    Y.-¨     ||                              |                                                                 |.      │       
    │    ||         ¨¨¨¨         ||           /¨~~~~~~~YY/       |                                                                 |.      │       
    │    ||jgs___________________||          ¨/¨     ____ ¨Y     |                                                                 |.      │       
    │    '------------------------'         |   ,,__/    ¨| Y    |                                                                 |.      │       
    │                                      ,|_./___   ___ |  |   |                                                                 |.      │       
    │                                        |-(  .)-(.  )¨|,¨   |                                                                 |.      │       
    │                                       (|  ~~~   ~~~   |)   |                                                                 |.      │       
    │                                        |     ¨-'      |'   |                                                                 |.      │       
    │                                         Y   ,____,   /     |     ____________________________________________________________|___    │       
    │                                          Y   ¨--¨   /      |   /                                                                /.   │       
    │                                           |Y______/|       Y__Ydc_____________________________________________________________ Y.    │       
    │                                          |Y________/|                                                                                │       
    │                                          Y----------/~)                 ( ((                                                         │       
    │                                          /~~~~~~~~~~~Y                     )) )                                                      │       
    │                                        ///////|||YYYYYY                 (( ((                                                        │       
    │                                      //                 Y                )  ))                                                       │       
    │                                ______|~~~|____________|~~~|______________(((__                                                       │       
    │                              []#=====¨^^¨============¨^^¨========#       |||  []                                                     │       
    │                            __[]_________________________________________(___)_[]_                                                    │       
    │                           [____________________________________________________]|                                                    │        
    │                           |    ===========================================      |                                                    │       
    │                           |Y  Y¨~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~¨ Y  Y|                                                    │       
    │                           |_┌───────────────────────────────────────────────────┐                                                    │       
    └─────────────────────────────└───────────────────────────────────────────────────┘────────────────────────────────────────────────────┘                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            `);
            break;
        case 'PINTURA':
            console.log(`                                                                                                                                  
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
    |             
    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐        
    │                                                           ___________________________________________________________________        |       
    │                                                         / Y                                                                  Y.      │       
    │    ________________________                            |   |                                                                 |.      │       
    │    |.----------------------.|                           Y_ |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||     .-"¨¨¨¨"-.       ||                              |    Qual item de pintura você gostaria de comprar?               |.      │       
    │    ||    /  _.._    ¨Y     ||                              |                                                                 |.      │       
    │    ||   / /¨    ¨-.   ; . .||                              |        1. Lápis mordido                                         |.      │       
    │    ||   | |__  __  Y   |   ||                              |            Pontos de treino: 3                                  |.      │       
    │    ||.-.| | e Y e  |   |   ||                              |            Preço: C$1200                                        |.      │       
    │    ||   | |  |     |   | --||                              |                                                                 |.      │       
    │    ||   | |  ¨-    |   |   ||                              |        2. Aquarela esfarelenta                                  |.      │       
    │    ||   |  Y --¨  /|   |   ||                              |            Pontos de treino: 5                                  |.      │       
    │    ||   |   ¨;---¨Y|   |   ||                              |            Preço: C$2800                                        |.      │       
    │    ||   |    |     |   |   ||                              |                                                                 |.      │       
    │    ||   |  .-¨     |   |   ||                              |        3. Tinta a óleo dos Alpes suiços                         |.      │      
    │    ||¨--|Y¨        |   |--.||                              |            Pontos de treino: 8                                  |.      │       
    │    ||   ;    .     ;  _.Y  ||                              |            Preço: C$3800                                        |.      │       
    │    ||    ¨-.;_    Y.-¨     ||                              |                                                                 |.      │       
    │    ||         ¨¨¨¨         ||           /¨~~~~~~~YY/       |                                                                 |.      │       
    │    ||jgs___________________||          ¨/¨     ____ ¨Y     |                                                                 |.      │       
    │    '------------------------'         |   ,,__/    ¨| Y    |                                                                 |.      │       
    │                                      ,|_./___   ___ |  |   |                                                                 |.      │       
    │                                        |-(  .)-(.  )¨|,¨   |                                                                 |.      │       
    │                                       (|  ~~~   ~~~   |)   |                                                                 |.      │       
    │                                        |     ¨-'      |'   |                                                                 |.      │       
    │                                         Y   ,____,   /     |     ____________________________________________________________|___    │       
    │                                          Y   ¨--¨   /      |   /                                                                /.   │       
    │                                           |Y______/|       Y__Ydc_____________________________________________________________ Y.    │       
    │                                          |Y________/|                                                                                │       
    │                                          Y----------/~)                 ( ((                                                         │       
    │                                          /~~~~~~~~~~~Y                     )) )                                                      │       
    │                                        ///////|||YYYYYY                 (( ((                                                        │       
    │                                      //                 Y                )  ))                                                       │       
    │                                ______|~~~|____________|~~~|______________(((__                                                       │       
    │                              []#=====¨^^¨============¨^^¨========#       |||  []                                                     │       
    │                            __[]_________________________________________(___)_[]_                                                    │       
    │                           [____________________________________________________]|                                                    │        
    │                           |    ===========================================      |                                                    │       
    │                           |Y  Y¨~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~¨ Y  Y|                                                    │       
    │                           |_┌───────────────────────────────────────────────────┐                                                    │       
    └─────────────────────────────└───────────────────────────────────────────────────┘────────────────────────────────────────────────────┘                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            `);
            break;
        case 'JOGOS':
            console.log(`                                                                                                                                  
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
    |             
    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐        
    │                                                           ___________________________________________________________________        |       
    │                                                         / Y                                                                  Y.      │       
    │    ________________________                            |   |                                                                 |.      │       
    │    |.----------------------.|                           Y_ |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||     .-"¨¨¨¨"-.       ||                              |    Qual item de jogos você gostaria de comprar?                 |.      │       
    │    ||    /  _.._    ¨Y     ||                              |                                                                 |.      │       
    │    ||   / /¨    ¨-.   ; . .||                              |        1. Mouse com led                                         |.      │       
    │    ||   | |__  __  Y   |   ||                              |            Pontos de treino: 3                                  |.      │       
    │    ||.-.| | e Y e  |   |   ||                              |            Preço: C$2000                                         |.      │       
    │    ||   | |  |     |   | --||                              |                                                                 |.      │       
    │    ||   | |  ¨-    |   |   ||                              |        2. Ventuinha barulhenta                                  |.      │       
    │    ||   |  Y --¨  /|   |   ||                              |            Pontos de treino: 5                                  |.      │       
    │    ||   |   ¨;---¨Y|   |   ||                              |            Preço: C$3600                                        |.      │       
    │    ||   |    |     |   |   ||                              |                                                                 |.      │       
    │    ||   |  .-¨     |   |   ||                              |        3. Teclado torneiro mecânico                             |.      │      
    │    ||¨--|Y¨        |   |--.||                              |            Pontos de treino: 7                                  |.      │       
    │    ||   ;    .     ;  _.Y  ||                              |            Preço: C$5200                                        |.      │       
    │    ||    ¨-.;_    Y.-¨     ||                              |                                                                 |.      │       
    │    ||         ¨¨¨¨         ||           /¨~~~~~~~YY/       |                                                                 |.      │       
    │    ||jgs___________________||          ¨/¨     ____ ¨Y     |                                                                 |.      │       
    │    '------------------------'         |   ,,__/    ¨| Y    |                                                                 |.      │       
    │                                      ,|_./___   ___ |  |   |                                                                 |.      │       
    │                                        |-(  .)-(.  )¨|,¨   |                                                                 |.      │       
    │                                       (|  ~~~   ~~~   |)   |                                                                 |.      │       
    │                                        |     ¨-'      |'   |                                                                 |.      │       
    │                                         Y   ,____,   /     |     ____________________________________________________________|___    │       
    │                                          Y   ¨--¨   /      |   /                                                                /.   │       
    │                                           |Y______/|       Y__Ydc_____________________________________________________________ Y.    │       
    │                                          |Y________/|                                                                                │       
    │                                          Y----------/~)                 ( ((                                                         │       
    │                                          /~~~~~~~~~~~Y                     )) )                                                      │       
    │                                        ///////|||YYYYYY                 (( ((                                                        │       
    │                                      //                 Y                )  ))                                                       │       
    │                                ______|~~~|____________|~~~|______________(((__                                                       │       
    │                              []#=====¨^^¨============¨^^¨========#       |||  []                                                     │       
    │                            __[]_________________________________________(___)_[]_                                                    │       
    │                           [____________________________________________________]|                                                    │        
    │                           |    ===========================================      |                                                    │       
    │                           |Y  Y¨~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~¨ Y  Y|                                                    │       
    │                           |_┌───────────────────────────────────────────────────┐                                                    │       
    └─────────────────────────────└───────────────────────────────────────────────────┘────────────────────────────────────────────────────┘                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            `);
            break;
        case 'JARDINAGEM':
            console.log(`                                                                                                                                  
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
    |             
    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐        
    │                                                           ___________________________________________________________________        |       
    │                                                         / Y                                                                  Y.      │       
    │    ________________________                            |   |                                                                 |.      │       
    │    |.----------------------.|                           Y_ |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||     .-"¨¨¨¨"-.       ||                              |    Qual item de jardinagem você gostaria de comprar?            |.      │       
    │    ||    /  _.._    ¨Y     ||                              |                                                                 |.      │       
    │    ||   / /¨    ¨-.   ; . .||                              |        1. Adubo de lixo orgânico                                |.      │       
    │    ||   | |__  __  Y   |   ||                              |            Pontos de treino: 2                                  |.      │       
    │    ||.-.| | e Y e  |   |   ||                              |            Preço: C$1800                                        |.      │       
    │    ||   | |  |     |   | --||                              |                                                                 |.      │       
    │    ||   | |  ¨-    |   |   ||                              |        2. Minhoca sapeca                                        |.      │       
    │    ||   |  Y --¨  /|   |   ||                              |            Pontos de treino: 5                                  |.      │       
    │    ||   |   ¨;---¨Y|   |   ||                              |            Preço: C$2600                                        |.      │       
    │    ||   |    |     |   |   ||                              |                                                                 |.      │       
    │    ||   |  .-¨     |   |   ||                              |        3. Composteira vegana                                    |.      │      
    │    ||¨--|Y¨        |   |--.||                              |            Pontos de treino: 9                                  |.      │       
    │    ||   ;    .     ;  _.Y  ||                              |            Preço: C$3200                                        |.      │       
    │    ||    ¨-.;_    Y.-¨     ||                              |                                                                 |.      │       
    │    ||         ¨¨¨¨         ||           /¨~~~~~~~YY/       |                                                                 |.      │       
    │    ||jgs___________________||          ¨/¨     ____ ¨Y     |                                                                 |.      │       
    │    '------------------------'         |   ,,__/    ¨| Y    |                                                                 |.      │       
    │                                      ,|_./___   ___ |  |   |                                                                 |.      │       
    │                                        |-(  .)-(.  )¨|,¨   |                                                                 |.      │       
    │                                       (|  ~~~   ~~~   |)   |                                                                 |.      │       
    │                                        |     ¨-'      |'   |                                                                 |.      │       
    │                                         Y   ,____,   /     |     ____________________________________________________________|___    │       
    │                                          Y   ¨--¨   /      |   /                                                                /.   │       
    │                                           |Y______/|       Y__Ydc_____________________________________________________________ Y.    │       
    │                                          |Y________/|                                                                                │       
    │                                          Y----------/~)                 ( ((                                                         │       
    │                                          /~~~~~~~~~~~Y                     )) )                                                      │       
    │                                        ///////|||YYYYYY                 (( ((                                                        │       
    │                                      //                 Y                )  ))                                                       │       
    │                                ______|~~~|____________|~~~|______________(((__                                                       │       
    │                              []#=====¨^^¨============¨^^¨========#       |||  []                                                     │       
    │                            __[]_________________________________________(___)_[]_                                                    │       
    │                           [____________________________________________________]|                                                    │        
    │                           |    ===========================================      |                                                    │       
    │                           |Y  Y¨~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~¨ Y  Y|                                                    │       
    │                           |_┌───────────────────────────────────────────────────┐                                                    │       
    └─────────────────────────────└───────────────────────────────────────────────────┘────────────────────────────────────────────────────┘                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            `);
            break;
        case 'MUSICA':
            console.log(`                                                                                                                                  
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
    |             
    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐        
    │                                                           ___________________________________________________________________        |       
    │                                                         / Y                                                                  Y.      │       
    │    ________________________                            |   |                                                                 |.      │       
    │    |.----------------------.|                           Y_ |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||     .-"¨¨¨¨"-.       ||                              |    Qual item de música você gostaria de comprar?                |.      │       
    │    ||    /  _.._    ¨Y     ||                              |                                                                 |.      │       
    │    ||   / /¨    ¨-.   ; . .||                              |        1. Saxofone decorativo                                   |.      │       
    │    ||   | |__  __  Y   |   ||                              |            Pontos de treino: 3                                  |.      │       
    │    ||.-.| | e Y e  |   |   ||                              |            Preço: C$2000                                        |.      │       
    │    ||   | |  |     |   | --||                              |                                                                 |.      │       
    │    ||   | |  ¨-    |   |   ||                              |        2. Gaita desafinada                                      |.      │       
    │    ||   |  Y --¨  /|   |   ||                              |            Pontos de treino: 6                                  |.      │       
    │    ||   |   ¨;---¨Y|   |   ||                              |            Preço: C$3000                                        |.      │       
    │    ||   |    |     |   |   ||                              |                                                                 |.      │       
    │    ||   |  .-¨     |   |   ||                              |        3. Piano burguês                                         |.      │      
    │    ||¨--|Y¨        |   |--.||                              |            Pontos de treino: 12                                 |.      │       
    │    ||   ;    .     ;  _.Y  ||                              |            Preço: C$6000                                        |.      │       
    │    ||    ¨-.;_    Y.-¨     ||                              |                                                                 |.      │       
    │    ||         ¨¨¨¨         ||           /¨~~~~~~~YY/       |                                                                 |.      │       
    │    ||jgs___________________||          ¨/¨     ____ ¨Y     |                                                                 |.      │       
    │    '------------------------'         |   ,,__/    ¨| Y    |                                                                 |.      │       
    │                                      ,|_./___   ___ |  |   |                                                                 |.      │       
    │                                        |-(  .)-(.  )¨|,¨   |                                                                 |.      │       
    │                                       (|  ~~~   ~~~   |)   |                                                                 |.      │       
    │                                        |     ¨-'      |'   |                                                                 |.      │       
    │                                         Y   ,____,   /     |     ____________________________________________________________|___    │       
    │                                          Y   ¨--¨   /      |   /                                                                /.   │       
    │                                           |Y______/|       Y__Ydc_____________________________________________________________ Y.    │       
    │                                          |Y________/|                                                                                │       
    │                                          Y----------/~)                 ( ((                                                         │       
    │                                          /~~~~~~~~~~~Y                     )) )                                                      │       
    │                                        ///////|||YYYYYY                 (( ((                                                        │       
    │                                      //                 Y                )  ))                                                       │       
    │                                ______|~~~|____________|~~~|______________(((__                                                       │       
    │                              []#=====¨^^¨============¨^^¨========#       |||  []                                                     │       
    │                            __[]_________________________________________(___)_[]_                                                    │       
    │                           [____________________________________________________]|                                                    │        
    │                           |    ===========================================      |                                                    │       
    │                           |Y  Y¨~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~¨ Y  Y|                                                    │       
    │                           |_┌───────────────────────────────────────────────────┐                                                    │       
    └─────────────────────────────└───────────────────────────────────────────────────┘────────────────────────────────────────────────────┘                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            `);
            break;
        default:
            console.log(`                                                                                                                                  
    ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
    |             
    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐        
    │                                                           ___________________________________________________________________        |       
    │                                                         / Y                                                                  Y.      │       
    │    ________________________                            |   |                                                                 |.      │       
    │    |.----------------------.|                           Y_ |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||                      ||                              |                                                                 |.      │       
    │    ||     .-"¨¨¨¨"-.       ||                              |    Em qual categoria de item você gostaria de comprar?          |.      │       
    │    ||    /  _.._    ¨Y     ||                              |                                                                 |.      │       
    │    ||   / /¨    ¨-.   ; . .||                              |        1. Gastronomia                                           |.      │       
    │    ||   | |__  __  Y   |   ||                              |        2. Pintura                                               |.      │       
    │    ||.-.| | e Y e  |   |   ||                              |        3. Jogos                                                 |.      │       
    │    ||   | |  |     |   | --||                              |        4. Jardinagem                                            |.      │       
    │    ||   | |  ¨-    |   |   ||                              |        5. Música                                                |.      │       
    │    ||   |  Y --¨  /|   |   ||                              |                                                                 |.      │       
    │    ||   |   ¨;---¨Y|   |   ||                              |                                                                 |.      │       
    │    ||   |    |     |   |   ||                              |                                                                 |.      │       
    │    ||   |  .-¨     |   |   ||                              |                                                                 |.      │      
    │    ||¨--|Y¨        |   |--.||                              |                                                                 |.      │       
    │    ||   ;    .     ;  _.Y  ||                              |                                                                 |.      │       
    │    ||    ¨-.;_    Y.-¨     ||                              |                                                                 |.      │       
    │    ||         ¨¨¨¨         ||           /¨~~~~~~~YY/       |                                                                 |.      │       
    │    ||jgs___________________||          ¨/¨     ____ ¨Y     |                                                                 |.      │       
    │    '------------------------'         |   ,,__/    ¨| Y    |                                                                 |.      │       
    │                                      ,|_./___   ___ |  |   |                                                                 |.      │       
    │                                        |-(  .)-(.  )¨|,¨   |                                                                 |.      │       
    │                                       (|  ~~~   ~~~   |)   |                                                                 |.      │       
    │                                        |     ¨-'      |'   |                                                                 |.      │       
    │                                         Y   ,____,   /     |     ____________________________________________________________|___    │       
    │                                          Y   ¨--¨   /      |   /                                                                /.   │       
    │                                           |Y______/|       Y__Ydc_____________________________________________________________ Y.    │       
    │                                          |Y________/|                                                                                │       
    │                                          Y----------/~)                 ( ((                                                         │       
    │                                          /~~~~~~~~~~~Y                     )) )                                                      │       
    │                                        ///////|||YYYYYY                 (( ((                                                        │       
    │                                      //                 Y                )  ))                                                       │       
    │                                ______|~~~|____________|~~~|______________(((__                                                       │       
    │                              []#=====¨^^¨============¨^^¨========#       |||  []                                                     │       
    │                            __[]_________________________________________(___)_[]_                                                    │       
    │                           [____________________________________________________]|                                                    │        
    │                           |    ===========================================      |                                                    │       
    │                           |Y  Y¨~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~¨ Y  Y|                                                    │       
    │                           |_┌───────────────────────────────────────────────────┐                                                    │       
    └─────────────────────────────└───────────────────────────────────────────────────┘────────────────────────────────────────────────────┘                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            `);
            break;
    }
}
export const paginaInteracao = async (cresim, interacoes, cheats) => {
    const cresims = todosCresim();
    let cresimSelecionado = {};
    const tempoDeVidaInicial = cresim.tempoDeVida;
    let inimizade = false;
    let neutro = false;
    let amizade = false;
    let amor = false;
    let selecionado = '';

    do {
        console.clear();

        let i = 0;

        for (i = 0; i < cresims.length; i++) {
            if (cresims[i].id != cresim.id) {
                const novosCresims = checaPrimeiraInteracao(cresim, cresims[i]);

                if (novosCresims) {
                    cresim = novosCresims.meuCresim;
                    cresims[i] = novosCresims.cresimInteracao;

                    localStorage.setObject(cresims[i].id, cresims[i]);
                }

                let nivelInteracao = '';
                let pontos = 0;

                for (let r = 0; r < cresims[i].relacionamentos.length; r++) {
                    if (cresims[i].relacionamentos[r].id == cresim.id) {
                        nivelInteracao = cresims[i].relacionamentos[r].nivel;
                        pontos = cresims[i].relacionamentos[r].pontos;
                    }
                }

                const TEMPO_DIA_CRESIM = 60000;
                const TEMPO_HORA_CRESIM = 2500;
                const diasDeVida = Math.floor(cresims[i].tempoDeVida / TEMPO_DIA_CRESIM);
                const horasDeVida = Math.floor((cresims[i].tempoDeVida % TEMPO_DIA_CRESIM) / TEMPO_HORA_CRESIM);

                console.log(`${i + 1}. ${cresims[i].nome}: ${nivelInteracao}     Pontos: ${pontos}   Tempo de Vida: ${diasDeVida + (diasDeVida == 1 ? ' dia' : ' dias') + ' e ' + horasDeVida + (horasDeVida == 1 ? ' hora' : ' horas')}`);
            }
        }

        if (cresims.length > 1) {
            selecionado = await useQuestion('Selecione um Cresim para interagir:');
            cresim = aplicarCheat(cresim, selecionado, cheats);
        }

        if (selecionado <= i && selecionado > 0 && cresims[selecionado - 1].id != cresim.id) {
            cresimSelecionado = cresims[selecionado - 1];
            if (cresim.tempoDeVida <= 0 && pagina != 'SINUSITE' && pagina != '7') pagina = '8';


            cresimSelecionado.relacionamentos.forEach(relacionamento => {
                if (relacionamento.id = cresim.id) {
                    inimizade = (relacionamento.nivel == 'Inimizade' ? true : false);
                    neutro = true;
                    amizade = (relacionamento.nivel == 'Amizade' || relacionamento.nivel == 'Amor' ? true : false);
                    amor = (relacionamento.nivel == 'Amor' ? true : false);
                }
            });
        } else {
            selecionado = '';
        }

        if (cresims.length <= 1) return 0;
    } while (selecionado == '');

    let tipoInteracao = '';

    do {
        desenhaPaginaInteracao(inimizade, neutro, amizade, amor);

        tipoInteracao = await useQuestion('Selecione o tipo de interação:');
        cresim = aplicarCheat(cresim, tipoInteracao, cheats);

        switch (tipoInteracao) {
            case '1': tipoInteracao = (inimizade ? 'INIMIZADE' : '');
                break;

            case '2': tipoInteracao = (neutro ? 'NEUTRO' : '');
                break;

            case '3': tipoInteracao = (amizade ? 'AMIZADE' : '');
                break;

            case '4': tipoInteracao = (amor ? 'AMOR' : '');
                break;

            default: tipoInteracao = '';
                break;
        }
    } while (tipoInteracao == '');

    let idInteracao = 0;

    do {
        let i = 0;

        for (i = 0; i < interacoes[tipoInteracao].length; i++) {
            const interacao = interacoes[tipoInteracao][i];
            console.log(`${i + 1}. ${interacao.interacao}`);
        }

        idInteracao = await useQuestion('Selecione a interação desejada:');
        cresim = aplicarCheat(cresim, idInteracao, cheats);
        idInteracao = parseInt(idInteracao);

        if (!(idInteracao <= i && idInteracao > 0)) idInteracao = 0;
    } while (idInteracao == 0);

    const novosCresims = interagir(cresim, cresimSelecionado, tipoInteracao, idInteracao, interacoes);

    cresim = novosCresims.meuCresim;
    cresimSelecionado = novosCresims.cresimInteracao;

    localStorage.setObject(cresim.id, cresim);
    localStorage.setObject(cresimSelecionado.id, cresimSelecionado);

    return tempoDeVidaInicial - cresim.tempoDeVida;
}

function todosCresim() {
    const cresims = [];
    const prefixo = 'Cresim';
    let id = 1;


    while (localStorage.getObject(prefixo + id) != null) {
        cresims[cresims.length] = localStorage.getObject(prefixo + id);
        id++;
    }

    return cresims;
}

function desenhaPaginaInteracao(inimizade, neutro, amizade, amor) {
    if (inimizade) {
        console.clear();
        console.log(`
  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
  |                                                                                                                
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐     
  │                                                                                                                                      |    
  │                                                                                                                                      │    
  │                                                                                                                                      │    
  │                    Qual das interações voce deseja ter?                                                                              │    
  │                                                                                                                                      │    
  │                                ......                                                                                                │    
  │                             .:||||||||:.                                                                                             │    
  │                            /            Y                                                                                            │    
  │                           (   o      o   )                                                                                           │    
  │       ┌─────────--@@@@----------:──:----------@@@@--───────┐                                                                         │    
  │       │ ________________________________¶1¶1111111¶_______ │                                                                         │    
  │       │ ________¶¶111¶_______________¶¶¶¶111111111¶¶¶1____ │                                                                         │    
  │       │ _____¶1¶¶¶¶¶111111¶_________¶¶¶1¶¶¶11111111¶1¶¶___ │                                                                         │    
  │       │ ___¶¶¶1¶1111111111¶¶1______¶¶1¶¶¶1111111111111¶¶¶_ │                                                                         │    
  │       │ __¶¶1¶¶1111111111111¶¶_____¶¶¶1¶¶¶¶1111111111111¶_ │         1. Inimizade   ${(inimizade ? '' : '(Bloqueado)')}                                                                     
  │       │ __¶¶_¶1111111111111111¶¶___¶¶¶¶¶¶11¶111111111111¶_ │           2. Neutro      ${(neutro ? '' : '(Bloqueado)')}                                                                     
  │       │ _11_¶11111111111111111¶¶_____¶¶¶¶__¶111111111111¶¶ │        3. Amizade     ${(amizade ? '' : '(Bloqueado)')}                                                                    
  │       │ ¶¶¶¶1111111111111111¶¶¶¶_____1¶¶__11111111111111¶¶ │            4. Amor        ${(amor ? '' : '(Bloqueado)')}                                                                   
  │       │ ¶¶¶¶11111111111¶¶¶¶¶¶¶______1¶1¶¶11111111111111¶1_ │                                                                         │    
  │       │ ¶¶1¶1111111111111¶¶¶¶¶¶_____¶¶¶¶¶¶1111111111111¶¶_ │                                                                         │    
  │       │ ¶¶11111111111111111111111¶¶___¶¶¶¶¶¶1111111111¶¶¶_ │                                                                         │    
  │       │ _1¶111111111111111111¶¶¶¶¶¶____¶¶¶¶11111111111¶1__ │                                                                         │    
  │       │ __¶¶11111111111111111¶¶¶_____¶¶¶1111111111111¶1___ │                                                                         │    
  │       │ ___¶¶¶111111111111¶1¶¶¶____1¶¶111¶1111111¶11¶1____ │                                                                         │    
  │       │ ____1¶¶¶11111111111¶¶¶¶111¶¶¶¶111111111¶11¶¶¶_____ │                                                                         │    
  │       │ ______¶¶¶¶1111111111111¶¶¶¶1¶¶¶¶¶¶¶¶11¶11¶¶_______ │                                                                         │    
  │       │ _______¶¶¶¶¶11111111111¶111¶___¶¶¶111¶1¶¶¶________ │                                                                         │    
  │       │ _________¶¶¶¶¶¶111111111111¶__¶¶¶111¶¶¶1__________ │                                                                         │    
  │       │ ____________1¶¶¶¶¶11111111¶¶_¶¶¶¶111¶¶____________ │                                                                         │    
  │       │ ______________¶¶¶¶¶¶¶1111111_¶¶¶11¶¶1_____________ │                                                                         │    
  │       │ _________________1¶¶¶¶¶¶1111¶¶¶1¶¶¶¶______________ │                                                                         │    
  │       │ ____________________¶¶¶¶¶¶1¶¶¶¶¶1¶________________ │                                                                         │    
  │       │ _______________________¶1¶¶¶1¶¶¶__________________ │                                                                         │    
  │       │ ___________________________11¶____________________ │                                                                         │    
  │       └────────────────────────────────────────────────────┘                                                                         │    
  │                                                                                                                                      │    
  │                                                                                                                                      |    
  │                                                                                                                                      │    
  │                                                                                                                                      │    
  │                                                                                                                                      │    
  └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
        `);
    } else if (amor) {
        console.clear();
        console.log(`
  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
  |                                                                                                                
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐     
  │                                                                                                                                      |    
  │                                                                                                                                      │    
  │                                                                                                                                      │    
  │                    Qual das interações voce deseja ter?                                                                              │    
  │                                                                                                                                      │    
  │                                ......                                                                                                │    
  │                             .:||||||||:.                                                                                             │    
  │                            /             Y                                                                                           │   
  │                           (   o      o   )                                                                                           │   
  │       ┌─────────--@@@@----------:──:----------@@@@--───────┐                                                                         │   
  │       │                                                    │                                                                         │   
  │       │         .:=+*****+-.        .:-+*****=-:.          │                                                                         │   
  │       │       .=***#########*-    .=**##########*=.        │                                                                         │   
  │       │      -**#*############+. .+*##############*:       │                                                                         │   
  │       │     -*###*#############+:+**################:      │            1. Inimizade   ${(inimizade ? '' : '(Bloqueado)')}                                                                              
  │       │    .*#######################################*.     │             2. Neutro      ${(neutro ? '' : '(Bloqueado)')}                                                                
  │       │    :*########################################.     │              3. Amizade     ${(amizade ? '' : '(Bloqueado)')}                                                            
  │       │    :*########################################.     │                4. Amor        ${(amor ? '' : '(Bloqueado)')}                                                             
  │       │    .*#######################################*      │                                                                          
  │       │    .+#######################################-      │                                                                         │   
  │       │     .*#####################################*.      │                                                                         │   
  │       │      -*####################################-       │                                                                         │   
  │       │       :*##################################:        │                                                                         │   
  │       │        .+*##############################*.         │                                                                         │   
  │       │          -**###########################=.          │                                                                         │   
  │       │           .+*########################*.            │                                                                         │   
  │       │             :+*####################*-.             │                                                                         │   
  │       │              .:**#################-.               │                                                                         │   
  │       │                .=*##############=.                 │                                                                         │   
  │       │                  .=*#########*=.                   │                                                                         │   
  │       │                    .-*######-.                     │                                                                         │   
  │       │                       :+#+:                        │                                                                         │   
  │       │                                                    │                                                                         │   
  │       │                                                    │                                                                         │   
  │       └────────────────────────────────────────────────────┘                                                                         │   
  │                                                                                                                                      │   
  │                                                                                                                                      |   
  │                                                                                                                                      │   
  │                                                                                                                                      │   
  │                                                                                                                                      │   
  └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
         ──                                                                                                                                  


        `);
    } else if (amizade) {
        console.clear();
        console.log(`
 ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
 |                                                                                                                 
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐     
 │                                                                                                                                      |    
 │                                                                                                                                      │    
 │                                                                                                                                      │    
 │                    Qual das interações voce deseja ter?                                                                              │    
 │                                                                                                                                      │    
 │                                ......                                                                                                │    
 │                             .:||||||||:.                                                                                             │    
 │                            /            Y                                                                                            │  
 │                           (   o      o   )                                                                                           │  
 │       ┌─────────--@@@@----------:──:----------@@@@--───────┐                                                                         │  
 │       │                                                    │                                                                         │  
 │       │ __,--¨¨¨¨--,_        _,--¨¨¨¨¨--,__                │                                                                         │  
 │       │     _-¨              ¨Y    /¨              ¨-_     │                                                                         │  
 │       │   ,¨                   ¨YY¨                   ¨,   │                                                                         │  
 │       │  /                       ¨Y                     Y  │         1. Inimizade   ${(inimizade ? '' : '(Bloqueado)')}                                                                 
 │       │ /                ¨Y        ¨Y                    Y │          2. Neutro      ${(neutro ? '' : '(Bloqueado)')}                                                                  
 │       │(                  /¨Y        ¨Y                   )|         3. Amizade     ${(amizade ? '' : '(Bloqueado)')}                                                                  
 │       │(                /¨   ¨Y        ¨,                 )|         4. Amor        ${(amor ? '' : '(Bloqueado)')}                                                                 
 │       │(              /¨       ¨.       |                 )|                                                                         │  
 │       │ Y           /¨           ¨-,__,-¨                Y │                                                                         │  
 │       │  Y        /¨                        ___         /  │                                                                         │  
 │       │   ¨¨    /¨                        ,'   ¨Y     .¨   │                                                                         │  
 │       │     Y /¨        /              ,--(      ¨Y  /     │                                                                         │  
 │       │     /¨        /¨             ,¨    Y       ¨<      │                                                                         │  
 │       │    (        /¨       /    ,--(      ¨Y       )     │                                                                         │  
 │       │    (      /¨       /¨   ,¨    Y       ¨Y    ,¨     │                                                                         │  
 │       │     ¨---,¨       /¨  ,--(      ¨Y       ¨Y-¨       │                                                                         │  
 │       │         (      /  ,¨     Y       ¨Y      )         │                                                                         │  
 │       │          ¨---,¨    (      ¨Y       ¨Y_,-¨          │                                                                         │  
 │       │              (      Y       ¨Y      )              │                                                                         │  
 │       │               ¨---,¨ ¨Y       ¨Y_,-¨               │                                                                         │  
 │       │                   (    ¨Y      )                   │                                                                         │  
 │       │                    ¨---¨ ¨Y_,                      │                                                                         │  
 │       │                                                    │                                                                         │  
 │       └────────────────────────────────────────────────────┘                                                                         │  
 │                                                                                                                                      │  
 │                                                                                                                                      ─  
 │                                                                                                                                      │  
 │                                                                                                                                      │  
 │                                                                                                                                      │  
 └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘──
        ──                                                                                                                                 

        `);
    } else {
        console.clear();
        console.log(`
 ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
 |                                                                                                                
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐     
 │                                                                                                                                      |    
 │                                                                                                                                      │    
 │                                                                                                                                      │    
 │                    Qual das interações voce deseja ter?                                                                              │    
 │                                                                                                                                      │    
 │                                ......                                                                                                │    
 │                             .:||||||||:.                                                                                             │    
 │                            /            Y                                                                                            │
 │                           (   o      o   )                                                                                           │
 │       ┌─────────--@@@@----------:──:----------@@@@--───────┐                                                                         │
 │       │                                                    │                                                                         │
 │       │                                                    │                                                                         │
 │       │      ─────────▀▀▀▀▀▀──────────▀▀▀▀▀▀▀              │                                                                         │
 │       │      ──────▀▀▀▀▀▀▀▀▀▀▀▀▀───▀▀▀▀▀▀▀▀▀▀▀▀▀           │                                                                         │
 │       │      ────▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀──────────▀▀▀         │        1. Inimizade   ${(inimizade ? '' : '(Bloqueado)')}                                                                  
 │       │      ───▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀──────────────▀▀        │         2. Neutro      ${(neutro ? '' : '(Bloqueado)')}                                                                 
 │       │      ──▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀──────────────▀▀       │         3. Amizade     ${(amizade ? '' : '(Bloqueado)')}                                                                 
 │       │      ─▀▀▀▀▀▀▀▀▀▀▀▀───▀▀▀▀▀▀▀───────────────▀▀      │          4. Amor        ${(amor ? '' : '(Bloqueado)')}                                                                
 │       │      ─▀▀▀▀▀▀▀▀▀▀▀─────▀▀▀▀▀▀▀──────────────▀▀      │                                                                         │
 │       │      ─▀▀▀▀▀▀▀▀▀▀▀▀───▀▀▀▀▀▀▀▀──────────────▀▀      │                                                                         │
 │       │      ─▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀───────────────▀▀      │                                                                         │
 │       │      ─▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀───────────────▀▀      │                                                                         │
 │       │      ─▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀───────────────▀▀       │                                                                         │
 │       │      ──▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀───────────────▀▀        │                                                                         │
 │       │      ───▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀───────────────▀▀▀         │                                                                         │
 │       │      ─────▀▀▀▀▀▀▀▀▀▀▀▀▀───────────────▀▀▀          │                                                                         │
 │       │      ──────▀▀▀▀▀▀▀▀▀▀▀───▀▀▀────────▀▀▀            │                                                                         │
 │       │      ────────▀▀▀▀▀▀▀▀▀──▀▀▀▀▀────▀▀▀▀              │                                                                         │
 │       │      ───────────▀▀▀▀▀▀───▀▀▀───▀▀▀▀                │                                                                         │
 │       │      ─────────────▀▀▀▀▀─────▀▀▀▀                   │                                                                         │
 │       │      ────────────────▀▀▀──▀▀▀▀                     │                                                                         │
 │       │      ──────────────────▀▀▀▀                        │                                                                         │
 │       │      ───────────────────▀▀                         │                                                                         │
 │       │                                                    │                                                                         │
 │       └────────────────────────────────────────────────────┘                                                                         │
 │                                                                                                                                      │
 │                                                                                                                                      ─
 │                                                                                                                                      │
 │                                                                                                                                      │
 │                                                                                                                                      │
 └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
        ──                                                                                                                               
        `);
    }
}

export const telaDormir = async (cresim, cheats) => {
    console.clear();
    console.log(`
   
 ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
 |     
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐    
 │         //          │                                                                                                                │ 
 │        //       │   │                                                                                                                │ 
 │       //        │   │ ┌─────────────────────────────────────────────┐                                                                │ 
 │      //         │   │ │  *    .  *       .   ,          *           │                                                                │ 
 │     //          │   │ │            .       . .        *             │                              _ _                               │ 
 |    //           │   │ │  *   .   .*    * ,      .       .  ,     *  │                         .-. | | |                              │ 
 │   //            │   │ │    .     *     .*                           │                         |H|_|J|J|                              │ 
 |  //             │   │ │    *     .     .  *        *  .'.           │                       />|T|C|S|A|                              │ 
 | //              │   │ │        .   ' '        *    .    '   .       │                      // |M|S| |V|                              │ 
 |//               │   │ │ .  *        ,   *               '      *    │                     //  |L|S| |A|                              │ 
 │/                │   │ │                              .              │                  ┌────────────────────────────────────┐        │ 
 │                 │   │ │          *          .   *          X        │                  └─────────────────────────────┬──────┘        │ 
 │                 │   │ │                                   XX        │    XXXXXXXXX                                   │               │ 
 │                 │   │ │                                  XXXX       │         XXX                                    │               │ 
 │                 │   │ │                                 XXXXXX      │       XXX                             ________▲│_              │ 
 │                 │   │ └────────────────────────────────xxxxxxx──────┘     XXX                              |  .----. _o|             │ 
 │                 │   │                                 XXXXXXXXX           XXXXXXX                          | |      | o|            _│ 
 │                 │   │                                XXXXXXXXXXX                                           |_|______|_o|             │ 
 │                 │   │                                XXXXXXXXXX                                         |──|__+----+___|.      ______│ 
 │                 │   │             _                    XXXXXXX                            x             |  ¨._____________¨.   .-----│ 
 │                 │   │           /(_))                   XXXXX                            xxx            |   | .-----------.|   |     │ 
 │                 │   │         _/   /                     XXX            XXXXX           xxxxx           |   | |  .-------.||   |     │ 
 │                 │   │        //   /                       X              XXX             xxx            |   | |  |       |||  _|_____│ 
 │                 │   │     //   /                                       XXXXXX             x             |   | |¨.|  ==== |||   ------│ 
 │                 │   │     //__/                       ++│                                    TÓBI       |¨. | |¨.|_______|||  /______│
 │                 │           |O_/=                   +++|│                                .-.            |  ¨|_|===========||  _------│
 │                 │   │   _  / || /  ^o             +++  ││                                {}¨¨;          |   | |  .-------.||   ------│
 │                 │   │   /// ()_) /.             +++    ││                                / ('           |   | |  |       |||         │ 
 │                 │   │  ^^ <__> /()              +      ││____|~~|_____      _________(__/  |__________││_____________________││      │ 
 │                 │   │      //||/                │    _-~               /    |      ___/(_)_]]                               #┴┤──────┼
 │                 │   │     //_||_/  ds          ││    _-    | )     |    |__/                                              #####      │ 
 │                 │   │    //  ||/ /              │    _-         )   |   |  |                                              #####      │ 
 │                 │   │ ──//───||───/────────    ──    _-    | )     /    |--|      |  |           ───────────────────────────###      │ 
 │                 │      //    |/    /            │   __-_______________ /__/_______|  |______________________________________###      │ 
 │                 │  /   /     |      /           │  (                |----         |  |                                      ###      │ 
 │                 │ /   /      |       /          │ ###############---+--///      . --                                     ######      │ 
 │                 │/                              ####################┴#######┴┴###*||||┴┴#######################################      │ 
 │                 │                               ######################################################################### #####      │ 
 │                /                                │ ########################################################################### #      │ 
 │               /                                 │ │     │ │                                                               │ │ │      │ 
 └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘`);

    let tempoDeSono = -1;

    do {
        tempoDeSono = await useQuestion('Quantos clicos dormir?');
        cresim = aplicarCheat(cresim, tempoDeSono, cheats);
        tempoDeSono = parseInt(tempoDeSono);

        if (isNaN(tempoDeSono)) tempoDeSono = -1;
    } while (tempoDeSono < 0);

    tempoDeSono *= 5000;

    console.log("Seu Cresim está dormindo... ZZZZ");

    await new Promise(resolve => setTimeout(resolve, tempoDeSono));

    const cresimAtualizado = dormir(cresim, tempoDeSono);

    console.log(`Energia restaurada! ${cresimAtualizado.energia}/32`);

    localStorage.setObject(cresimAtualizado.id, cresimAtualizado);

    return 0;
};

export const telaDeTomarBanho = async (cresim, cheats) => {
    console.clear();
    console.log(`
 ┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
 |    Nome: ${cresim.nome} | Energia: ${cresim.energia} |   Higiene: ${cresim.higiene} |  Cresceleons: ${cresim.cresceleons} |  Tarefa: ${cresim.tarefa}   
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  
 │      │                                                                                                                               │  
 │      │                                                                                   ┌───────────────────────────────────────────┤  
 │      │                                                                                   └+++++++++++++++++++++++++++++++++++++++++++│  
 │      │                                                                                     ++++++++++++++++++++++++++++++++++++++++++│  
 │      │                                                                                       ┌───────────────────────────────────────┤  
 │      │                                                                                       │                                       │  
 │      │       ┌───────────────┐                                                               │ ┌─────────────────────────────────────┤  
 │      │       │               │                                              x                │ │                                     │  
 │      │       │               │        ┌────────┐                            xx               │ │                                     │  
 │      │       │               │        │        │                           xxxx              │ │  ──▒▒▒▒▒▒▒▒───▒▒▒▒▒▒▒▒              │  
 │      │       │               │        │        │                          xxx xx             │ │  ─▒▐▒▐▒▒▒▒▌▒─▒▒▌▒▒▐▒▒▌▒            .│  
 │      │       │               │        │        │  x                      xxxxxxxxx           │ │  ──▒▀▄█▒▄▀▒───▒▀▄▒▌▄▀▒            . │  
 │      │       │               │        │        xxxxx                    xxxxxxxxxxx          │ │  ─────██─────────██                 │  
 │      │       │               │        │        xxx                    xxxxxxxxxxxxxx         │ │  ░░░▄▄██▄░░░░░░░▄██▄░░░             │  
 │      │       │               │        │       xx  O      o             xxxxxxxxxxxx          │ │                                     │  
 │      │       │               │        │            o    O                xxxxxxxxx           │ │                       (__)          │  
 │      │       │               │        │              o     O              xxxxxxx            │ │                 ^~--▄--(oo)         │  
 │      │       │               │        │           O    o                   xxxxx             │ │                  ||▄ █ (__)         │  
 │      │       │               │        │                                     xxx              │ │                  ||w--||            │  
 │      │       │               │        │                                      +               │ │                                     │  
 │      │       │               │        │           O      o                                   │ │                                     │  
 │      │       │           ▼▼  │        │   _     .  o    O                  ||||||            │ └─────────────────────────────────────┤  
 │      │       │           ▼▼  │        │   _)         o     O               | o o |           │                                       │  
 │      │       │           ▼▼  │        │           O_   o   o               |  >  |           └─────────────────────────────██████────┤  
 │      │       │               │        │    .   o  (_)   .                  |  _/ |                                         ██████    │  
 │      │       │               │        │      O             _                L___/                                          ██████    │  
 │      │       │               │        │         _       _                  __| |__                                         ██████    │  
 │      │       │               │        │       >(.)__  >(.)__              /       |                                        ███████   │  
 │      │       │               │      xx│xxxxxxxx(___/xxx(___/x xx xxxxxxxx|x|xxxxx|x|xx                                     ███████   │  
 │      │       │               │       xx                                               xx                       █████████████████     │  
 │      │       │               │        x                                              xx                       █████████████████      │  
 │      │       │               │         xx                                           x                         █████████████████      │  
 │      │       │               │          xx                                        xx                             ████████████▀▀      │  
 │      │       │               │           xxxx                               xxxxxx                                   ─▀█████         ─  
 │     ─┴───────└───────────────┘─────────────xxxxxxxxxxxxx        xxxxxxxxxxxxx─xx────────────────        ───────────────▄████▄ ───────┤  
 │    /                                          xxxxxx xxxxxxxxxxx            xxx                                                      │  
 │   /                                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                                                       │  
 │  /                                          xxxxx                            xxx                                                     │  
 │ /                                         xxxxx                                xxxx                                                  │  
 └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘                                                                                           
    `);
    let resposta;
    do {
        resposta = await useQuestion("Pressione 'X' para tomar banho: ");

        cresim = aplicarCheat(cresim, resposta, cheats);
    } while (resposta.trim().toUpperCase() !== "X");

    console.log(" Seu Cresim está tomando banho... Aguarde 3 segundos... ");
    await new Promise(resolve => setTimeout(resolve, 3000));

    const cresimAtualizado = tomarBanho(cresim);

    console.log(`Seu Cresim está limpo! Higiene: ${cresimAtualizado.higiene}/28, Cresceleons restantes: ${cresimAtualizado.cresceleons}`);

    localStorage.setObject(cresimAtualizado.id, cresimAtualizado);

    return 0;
};

export const paginaTrocarCresim = async () => {
    const cresims = todosCresim();
    let cresimSelecionado = {};
    let selecionado = '';

    do {
        console.clear();
        console.log(`                                                                                                                                                                                       
                                                                                                                                            
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   
 |    PLANETA THE CRESIMS                                                                                                               3|
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐    
 │                              .------------------------------------------.                                                            │
 │                              |     20 de Julho de 1969 June,            |            .    -         .    .            .     ______   │
 │                              |      Homens do planeta Terra             |                    .             .               ////////  │
 │                              |    pisaram na Lua pela primeira vez      |                  .    .   ________   .  .      /////////   │
 ├                              |   Viemos em paz para toda a humanidade   |             .  .       . |.____.  |Y       ../////////    .│
 │                              .-------------------=CWI=-------------------.                       .//      -/  |Y     /////////       │
 │               ___---___                                                                   .    .//          Y |  Y /////////       . │
 │            .--         --.                                                                            .    .| |  ///////// .     .   │
 │          ./   ()      .-.  Y                                                         .         ||           | |//**/////             │
 │         /   o    .   (   )  Y                 ~+                                   .     .       Y        ./ //  /  /Y   .           │
 │        / .            *-*    Y                                                                     Y.___./ //Y* *   ,_L   - .     .  │
 │       | ()    .  O         .  |                        *       +                     .           .     Y //////Y , /   L             │
 │      |                         |                 *  '               |               .              .    ///////// Y  o  |    .       │
 │      |    o           ()       |             ()    .-.,=****=.    - o -                   .          ///////// .   L _ /          . .│
 │      |       .--.          O   |                    Y/_       |     |                              /////////                       . │
 │       | .   |    |            |                *   |  ¨._      |                            .   ./////////     .     .               │
 │        |    ¨.__.¨    o   .  /                      Y     ¨=./*,                    .           --------   .                  ..     │
 │         Y                   /                     .   *=.__.= *=*      *                     .        .         .                    │
 │          ( o    ()     . /                +                         +                                                                │
 │             ¨¨¨¨  ¨¨¨¨¨           x                                                 .-+++-.       ||::::::===========================│
 │                                                                                     /= ___  Y      ||     Fevereiro de 2025          │
 │                                           xxxxx                                    |- /~~~Y  |     || Humanos exploradores do espaço │
 │                                          xxxxxxx                                   |=( -.- ) |     || pisaram no planeta Cres        │
 │                                        xxxxxxxxxxx                                 Y__Y_=_/__/     ||     pela primeira vez          │
 │                                       xxxxxxxxxxxxx                                 {_______}      ||================================│
 │                                        xxxxxxxxxxx                                /- *       ---._||                                 │
 │                                          xxxxxxx                                 /= .     [] .     { >                               │
 │                                           xxxxx                                 /  /|ooo     |-'--'||                                │
 │                                             x                                  (   )Y_______/      ||                                │
 │                                                                                 Y¨Y /        |     ||                                │
 │           ***           @@@@@@@       #############                              Y-| ==    T_|     ||                                │
 │         *******         @@  @@@@      ##         ##              -                 /         |     ||                                │
 │        *********       @@    @@@      #  ~~   ~~  #            _=|_               |=   >Y  __/     ||                                │
 │     /Y* ### ### */Y    @ 0  0 @@@     #  ()   ()  #          _[_## ]_             Y   Y |- --|     ||                                │
 │     |    @ / @    V|   @@  I   @@@@    (     ^     )        +[_[_+_]P/    _    |_ _ Y __|_Y__/   _=|||-~                             │
 │     VY     ^    /v   @@      @@@@     |         |         --Y_I_I_[=Y-~ ~~--[ojgs==_{__}=_{__} ~~  ||H                               │
 │        Y  ===  /      @@  ==  @@@      |  {===}  |         /[_[_|_]_]YY  -_  [[=]](   |)(==] )__  !||H                               │
 │         Y_____/        @+     @@        Y       /         /    -|-    Y     ^U-U^  - |    - ~ .~    U/~                              │
 │          _|_|_         @+++  +@@       /  -----  Y        ~--__~~~--__~~-__ ─────────────────────────────────────────────────────────┼
 └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    ┘
    `);
        let i = 0;

        const TEMPO_DIA_CRESIM = 60000;
        const TEMPO_HORA_CRESIM = 2500;

        for(i = 0; i < cresims.length; i++) {
            const diasDeVida = Math.floor(cresims[i].tempoDeVida / TEMPO_DIA_CRESIM);
            const horasDeVida = Math.floor((cresims[i].tempoDeVida % TEMPO_DIA_CRESIM) / TEMPO_HORA_CRESIM);
            console.log(`${i + 1}. ${cresims[i].nome}     Tempo de Vida: ${diasDeVida + (diasDeVida == 1 ? ' dia' : ' dias') + ' e ' + horasDeVida + (horasDeVida == 1 ? ' hora' : ' horas')}`);
        }

        selecionado = await useQuestion('Selecione um Cresim:');

        if (selecionado <= i && selecionado > 0) {
            cresimSelecionado = cresims[selecionado - 1];
        } else {
            selecionado = '';
        }
    } while (selecionado == '');

    return cresimSelecionado.id;
};