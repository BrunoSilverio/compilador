// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

// Variavel que contem todo contudo do arquivo.obj
let fileObj;

//Variavel de controle para percorrer a pilha de memoria, indicando elemento do topo da pilha: M[s]
let s = -1;

// Variavel de controle para percorrer a lista de instruções a serem executadas, 
//contem o endereço da proxima instrução a ser executada: P[i]
let i = 0;

// Vetor responsavel por simular a pilha de memoria
let memory = [];

// Vetor responsavel por simular a lista de instruções a serem executadas
let instructions = [];

// Variavel de controle para identificar qual operação deve ser executada
let operation = '';

// Variavel de controle para identificar quando o programa deve finalizar a execução
let exec = true;

// Contador para lista de instruções
let numInst = 1;

//Função para leitura de arquivo .obj para manipualcao no JS
function readFile(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var output = e.target.result;
            fileContent = output;
            readObjectFile(fileContent);
        };
        reader.readAsText(that.files[0]);
    }
}


//Iniciar programa principal
function start() {
    s = -1;
    //document.getElementById("formDados").innerHTML = "> ";
    document.getElementById('compilar').addEventListener('click', function () {
        main();
    });
}

// Função main controla um loop para as operações das instruções
function main(){
    while (condition) {
        operation = instructions[i].operation;

        switch (operation) {
            case "LDC":
                ldc();
                break;
            case "LDV":
                ldv();
                break;
            case "ADD":
                add();
                break;
            case "SUB":
                sub();
                break;
            case "MULT":
                mult();
                break;
            case "DIVI":
                divi();
                break;
            case "INV":
                inv();
                break;
            case "AND":
                and();
                break;
            case "OR":
                or();
                break;
            case "NEG":
                neg();
                break;
            case "CME":
                cme();
                break;
            case "CMA":
                cma();
                break;    
            case "CEQ":
                ceq();
                break;
            case "CDIF":
                cdif();
                break;
            case "CMEQ":
                cmeq();
                break;
            case "CMAQ":
                cmaq();
                break;
            case "START":
                start();
                break;
            case "HLT":
                hlt();
                break;
            case "STR":
                str();
                break;
            case "JMP":
                jmp();
                break;
            case "JMPF":
                jmpf();
                break;
            case "NULL":
                break;
            case "RD":
                rd();
                break;
            case "PRN":
                prn();
                break;
            case "ALLOC":
                alloc();
                break;
            case "DALLOC":
                dalloc();
                break;
            case "CALL":
                call();
                break;
            case "RETURN":
                retn();
                i = i-1;
                break;
            default:
                break;
        }
        
    }
}

//=============================
//===== Função basicas VM =====
//=============================

//Parar - “Para a execução da MVD”
function hlt(params) {
    exec = false;
}
//Operação RD - Ultimo valor entrado pelo usuario.
function rd() {
    entryValue = readEntry();
    s = (s+1);
    memory[s] = entryValue;
}
//Saida - Impressão
function prn() {
    // printValue(memory[s]);
    if (memory[s] == undefined) {
        document.getElementById("formSaida").innerHTML += templateTerminal("");
    } else {
        document.getElementById("formSaida").innerHTML += templateTerminal(memory[s]);
    }
    s = (s-1);
}

//==============================
//===== Funções de Memoria =====
//==============================

//Carregar constante
//k = instruction[i].parameters.p1
function ldc(){
    s = (s+1); 
    memory[s] = k;
}
//Carregar valor
function ldv(){
    s = (s+1);
    memory[s] = memory[n];
}
//Atribuição - Armazenar valor
function str(){
    memory[n] = memory[s]; 
    s = (s-1); 
}
//Alocação de Variáveis
function alloc() {
    for (let j = 0; j < instructions[i].parameters.p2; j++) {
        s = (s+1);
        memory[s] = memory[instructions[i].parameters.p1 + j];
    }
}
//Desalocação de Variáveis
function dalloc() {
    for (let j = instructions[i].parameters.p2 - 1; j >= 0; j--) {

        memory[instructions[i].parameters.p1 + j] = memory[s];
        s = (s-1);
    }
}

//==========================
//=== Função aritmeticas ===
//==========================

//Operacao adição
function add() {
    memory[s-1] = parseInt(memory[s-1] + memory[s]);
    s = (s-1);
}
//Operacao subtração
function sub() {
    memory[s-1] = parseInt(memory[s-1] - memory[s]);
    s = (s-1);
}
//Operacao multiplicação
function mult() {
    memory[s-1] = parseInt(memory[s-1] * memory[s]);
    s = (s-1);
}
//Operacao divisão
function divi() {
    memory[s-1] = parseInt(memory[s-1] / memory[s]); 
    s = (s-1);
}
//Operacao inversão
function inv() {
    memory[s] = memory[s] * (-1);
}

//==========================
//==== Funções Logicas =====
//==========================

//Operacao AND
function and() {
    if (memory[s-1] == 1 && memory[s] == 1) {
        memory[s-1] = 1;
    } else {
        memory[s-1] = 0;
    }
    s = (s-1);
}
//Operacao OR
function or() {
    if (memory[s-1] == 1 || memory[s] == 1) {
        memory[s-1] = 1;
    } else {
        memory[s-1] = 0;
    }
    s = (s-1);
}
//Operacao NEG
function neg(params) {
    memory[s] = 1 - memory[s];
}

//=============================
//== Funções para Comparação ==
//=============================

//Comparar menor
function cme(){
    if(memory[s-1] < memory[s]){
        memory[s-1] = 1;
    }
    else{
        memory[s-1] = 0; 
    }
    s = (s-1);
}
//Comparar maior
function cma(){
    if (memory[s-1] > memory[s]){
        memory[s-1] = 1;
    }
    else{
        memory[s-1] = 0; 
    } 
    s = (s-1);
}
//Comparar igual
function ceq(){
    if (memory[s-1] == memory[s]){
        memory[s-1] = 1;
    }  
    else{
        memory[s-1] = 0; 
    }
    s = (s-1);
}
//Comparar desigual
function cdif(){
    if (memory[s-1] != memory[s]){
        memory[s-1] = 1;
    }
    else{
        memory[s-1] = 0;
    }
    s = (s-1);
}
//Comparar menor ou igual
function cmeq(){
    if (memory[s-1] <= memory[s]){
        memory[s-1] = 1;
    }
    else{
        memory[s-1] = 0;
    }
    s = (s-1);
}
//Comparar maior ou igual
function cmaq(){
    if (memory[s-1] >= memory[s]) {
        memory[s-1] = 1;
    }
    else{
        memory[s-1] = 0;
    }
    s = (s-1);
}

//============================
//===== Funções de Jumps =====
//============================

//Desviar sempre
function jmp() {
    i = findLabel(instructions[i].parameters.p1).index;
}

//Desviar se falso
function jmpf() {
    if (memory[s] == 0) {
        i = findLabel(instructions[i].parameters.p1).index;
        // Decrementa pois será incrementado na main.
        i = (i-1);
        //i = i + 1;
    }
    else {
        // Não faz nada pois será incrementado na main
        // i = i - 1;
    }
    s = (s-1);
}

//===============================
//===== Funções de Chamadas =====
//===============================

//Chamar procedimento ou função
function call() {
    s = (s+1);
    memory[s] = (i+1);
    i = findLabel(instructions[i].parameters.p1).index;
}

//Retornar de procedimento
function retn() {
    i = memory[s];
    s = (s-1);
}