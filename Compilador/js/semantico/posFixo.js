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


//Funcao para inserir na lista do posFixo
function insereOperando(token) {
    posFixo.push(token);
}

//Funcao para manipular os operados na pilha
function insereOperador(token) {

    let ultimoElemento = posFixoOperadores.length - 1;
    let prioridadeAntigo = precedenciaOperador(posFixoOperadores[(posFixoOperadores.length-1)].simbolo);
    let prioridadeNovo = precedenciaOperador(token.simbolo);

    //Se a prioridade do operador atual for >= , tira o operador antigo da pilha e coloca na lista, e o operador atual vai para a pilha
    if (prioridadeNovo >= prioridadeAntigo) {
        let ultimoToken = posFixoOperadores.pop();
        posFixo.push(ultimoToken);
        posFixoOperadores.push(token);
    } else {
        posFixoOperadores.push(token);
    }

}

//Funcao para retornar qual a prioridade do operador recebido
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

//Funcao principal para
function posFixoGerador(expressao) {

   
}

//Funcao para limpar a lista do posFixo
function limpaPosFixo() {
    posFixo = [];
}

//Funcao para limpas a pilha de operadores
function limpaPosFixoTemp() {
    posFixoOperadores = [];
}