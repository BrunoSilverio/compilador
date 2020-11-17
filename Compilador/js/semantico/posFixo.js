// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

//lista para guardar a expressao infixa na forma pos fixa
let posFixo = [];

//pilha para gerenciar os operadores
let posFixoOperadores = [];

//Precedencia Operadores:
const prioridade0 = ["Sou"];

const prioridade1 = ["Se"];

const prioridade2 = ["Sig", "Sdif"];

const prioridade3 = ["Smaior", "Smaiorig", "Smenor", "Smenorig"];

const prioridade4 = ["Smais", "Smenos"];

const prioridade5 = ["Smult", "Sdiv"];

const prioridade6 = ["Snao"];


function insereOperando(token) {

    posFixo.push({
        lexema: token.lexema,
        tipo: "nomePrograma",
        nivel: nivel
    });
}

function insereOperador(token) {
    
}



function precedenciaOperador(operador) {

    switch (operador) {
        case "-":

            break;

        default:
            break;
    }
}


function posFixoGerador(expressao) {

    //recebe a expressao infixa por parametro
    //separa a expressao nos espaços (split(" "))
    //valida termo por termo, utlizando 'for'


    for (let index = 0; index < array.length; index++) {
        const element = array[index];

        //identifica operando(var) ou operador(+,-,*,div...)

        //caso seja operando (variavel)


        //caso seja um operador

    }
}

function limpaPosFixo() {
    posFixo = [];
}

function limpaPosFixoTemp() {
    posFixoOperadores = [];
}