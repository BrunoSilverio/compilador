// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

//lista para guardar a expressao infixa na forma pos fixa
let posFixo = [];

//pilha para gerenciar os operadores
let posFixoOperadores = [];

//Precedencia Operadores
const prioridade0 = ["Sou"];
const prioridade1 = ["Se"];
const prioridade2 = ["Sig", "Sdif"];
const prioridade3 = ["Smaior", "Smaiorig", "Smenor", "Smenorig"];
const prioridade4 = ["Smais", "Smenos"];
const prioridade5 = ["Smult", "Sdiv"];
const prioridade6 = ["Snao"];

//Funcao para retornar qual a prioridade do operador
function precedenciaOperador(operador) {
    switch (true) {
        case prioridade0.includes(operador):
            return 0;
            break;

        case prioridade1.includes(operador):
            return 1;
            break;

        case prioridade2.includes(operador):
            return 2;
            break;

        case prioridade3.includes(operador):
            return 3;
            break;

        case prioridade4.includes(operador):
            return 4;
            break;

        case prioridade5.includes(operador):
            return 5;
            break;

        case prioridade6.includes(operador):
            return 6;
            break;

        default:
            console.log("Erro semantico");
            //geraErroSemantico("Pos fixo");
            break;
    }
}

//Funcao para inserir na lista do posFixo os operandos
function posFixoGerador(token) {
    switch (token.simbolo) {
        case "Sidentificador":
            posFixo.push(token);
            break;

        case "Snumero":
            posFixo.push(token);
            break;

        case "Sverdadeiro":
            posFixo.push(token);
            break;

        case "Sfalso":
            posFixo.push(token);
            break;

        default:
            insereOperador(token);
            break;
    }
}

//Funcao para manipular os operadores na pilha
function insereOperador(token) {

    if (token.simbolo === "Sfecha_parenteses") {

        while (posFixoOperadores[(posFixoOperadores.length - 1)].simbolo != "Sabre_parenteses") {
            posFixo.push(posFixoOperadores.pop());
        }
        posFixoOperadores.pop();
    }

    for (let i = posFixoOperadores.length - 1; i >= 0; i--) {

        let prioridadeAntigo = precedenciaOperador(posFixoOperadores[i].simbolo);
        let prioridadeNovo = precedenciaOperador(token.simbolo);

        //Se a prioridade do operador atual for >= , tira o operador antigo da pilha e coloca na lista, e o operador atual vai para a pilha
        if (prioridadeNovo >= prioridadeAntigo) {
            posFixo.push(posFixoOperadores.pop());
            //posFixoOperadores.push(token);
        } else {
            posFixoOperadores.push(token);
            break;
        }

    }
}

//Funcao responsavel por validar a expressa posfixa pronta
function analisaPosFixo(operador) {
    for (let i = posFixo.length - 1; i >= 0; i--) {

        switch (operador) {
            //OR -> Sou
            case 0:
                if () {
                    //empilhar
                } else {
                    //ERRO
                }
                break;
            //AND -> Se
            case 1:
                if (condition) {
                    //empilhar
                } else {
                    //ERRO
                }
                break;
            // =, != -> Sig, Sdif
            case 2:
                if (((posicaoAnterior - 1).tipo === "booleano") && (posicaoAnterior.tipo === "booleano")) {
                    //empilhar
                    //returno booleano
                } else {
                    //ERRO
                }
                break;
            // >, >=, >, <= -> Smaior, Smaiorig, Smenor, Smenorig
            case 3:
                if (((posicaoAnterior - 1).tipo === "inteiro") && (posicaoAnterior.tipo === "inteiro")) {
                    //empilhar
                    //returno booleano
                } else {
                    //ERRO
                }
                break;
            // +, - -> Smais, Smenos
            case 4:
                if (((posicaoAnterior - 1).tipo === "inteiro") && (posicaoAnterior.tipo === "inteiro")) {
                    //empilhar
                    //returno int
                } else {
                    //ERRO
                }
                break;
            // *, div -> Smult, Sdiv
            case 5:
                if (((posicaoAnterior - 1).tipo === "inteiro") && (posicaoAnterior.tipo === "inteiro")) {
                    //empilhar
                    //returno int
                } else {
                    //ERRO
                }
                break;
            //unario -> -u, +u, Snao
            case 6:
                //para pegar o sinal do numero
                if ((posicaoAtual.tipo === "inteiro") && (posicaoAnterior !== "var" || "Snumero") && (posicaoAtual === "-u, +u") && (proximaPosicao === "var" || "Snumero")) {
                    //empilhar
                } else {
                    //ERRO
                }
                break;

            default:
                break;
        }
    }
}

//Funcao que tranfere todos os tokens de operadores para posfixo
function transferePosFixo() {

    while (posFixoOperadores.length !== 0) {
        posFixo.push(posFixoOperadores.pop());
    }

}

//Funcao para limpar o pos fixo
function zeraPosFixo() {
    posFixo = [];
    posFixoOperadores = [];
}