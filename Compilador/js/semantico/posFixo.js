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

//Comparacoes operador/operacao  ENTRADA_SAIDA
const intint_int = ["Smais", "Smenos", "Smult", "Sdiv"];
const intint_bool = ["Smaior", "Smaiorig", "Smenor", "Smenorig", "Sig", "Sdif"];
const boolbool_bool = ["Sig", "Sdif"];
const int_int = [];
const bool_bool = ["Snao"];

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

function localizaParametros(operador) {

    //Operacao com dois inteiros de entrada, e um inteiro de saida
    if (intint_int.includes(operador)) {
        return 1;
    }

    //Operacao com dois inteiros de entrada, e um bool de saida
    if (intint_bool.includes(operador)) {
        return 2;
    }

    //Operacao com dois bool de entrada, e um bool de saida
    if (boolbool_bool.includes(operador)) {
        return 3;
    }

    //Operacao com um inteiro de entrada, e um inteiro de saida
    if (int_int.includes(operador)) {
        return 4;
    }

    //Operacao com um bool de entrada, e um bool de saida
    if (bool_bool.includes(operador)) {
        return 5;
    } else {
        return 99;
    }
}

//Funcao responsavel por validar a expressa posfixa pronta
function analisaPosFixo() {
    let operador;
    transferePosFixo();
    for (let i = 0; i >= (posFixo.length - 1); i++) { //Percorre do inicio ao final. Validar index
        operador = localizaParametros(posFixo[i]);

        switch (operador) {
            //Operacao com dois inteiros de entrada, e um inteiro de saida
            case 1:
                if (posFixo[i - 1].simbolo === "Sidentificador" || "Snumero") {
                    if ((!buscaTipo(posFixo[i - 1]) === "var inteiro" || "func inteiro") && posFixo[i - 1].simbolo != "Snumero") {
                        geraErroSemantico();
                    }
                }

                if (posFixo[i - 2].simbolo === "Sidentificador" || "Snumero") {
                    if ((!buscaTipo(posFixo[i - 2]) === "var inteiro" || "func inteiro") && posFixo[i - 1].simbolo != "Snumero") {
                        geraErroSemantico();
                    }
                }

                posFixo[i].simbolo = "Snumero";
                posFixo.splice(i - 1);
                posFixo.splice(i - 1);
                i = i - 2;
                break;
            //Operacao com dois inteiros de entrada, e um bool de saida
            case 2:

                break;
            //Operacao com dois bool de entrada, e um bool de saida
            case 3:

                break;
            //Operacao com um inteiro de entrada, e um inteiro de saida
            case 4:

                break;
            //Operacao com um bool de entrada, e um bool de saida
            case 5:

                break;
            //Caso identificador ou numero
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