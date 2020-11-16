// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

let posFixo = [];

//Topo maior prioridade
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