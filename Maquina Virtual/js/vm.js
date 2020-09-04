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

//Função para leitura de arquivo
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

//Funções Registradores


//=== Função aritmeticas ===
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
    memory[s] = memory[s] * -1;
}

//Funções Logicas
//Operacao AND
function and() {
    if (memory[s-1] == 1 && memory[s] == 1) {
        memory[s-1] = 1;
    } else {
        memory[s-1] = 0;
    }
    s = (s-1);
}
//Operacao AND
function or() {
    if (memory[s-1] == 1 || memory[s] == 1) {
        memory[s-1] = 1;
    } else {
        memory[s-1] = 0;
    }
    s = (s-1);
}
//Operacao AND
function neg(params) {
    memory[s] = 1 - memory[s];
}

//Funções Comparativas



//Funções Desvio

