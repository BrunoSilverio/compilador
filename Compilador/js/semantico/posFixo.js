// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

//lista para guardar a expressao infixa na forma pos fixa
let posFixo = [];

//pilha para gerenciar os operadores
let posFixoOperadores = [];

//Precedencia do Operadores (7,6,5,...,1)
let precOperadores = [
    {
        operacao: ["-$","+$","not"],
        camada: 7
    },
    {
        operacao: ["*","div"],
        camada: 6
    },
    {
        operacao: ["-","+"],
        camada: 5
    },
    {
        operacao: ["<","<=",">",">="],
        camada: 4
    },
    {
        operacao: ["=","!="],
        camada: 3
    },
    {
        operacao: ["and"],
        camada: 2
    },
    {
        operacao: ["or"],
        camada: 1
    },
];

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