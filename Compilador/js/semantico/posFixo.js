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

precedenciaOperador("teste");

function insereOperando(token) {

    posFixo.push({
        lexema: token.lexema,
        tipo: "nomePrograma", //verificar o que dar push
        nivel: nivel
    });
}

function insereOperador(token) {

    let ultimoElemento = posFixoOperadores.length - 1;
    let prioridadeAntigo = precedenciaOperador(posFixoGerador[ultimoElemento.simbolo]);
    let prioridadeNovo = precedenciaOperador(token.simbolo);

    if (prioridadeNovo >= prioridadeAntigo) {

        let ultimoToken = posFixoOperadores.pop();
        posFixo.push(ultimoToken);

    } else {
        posFixoOperadores.push(token);
    }

}



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