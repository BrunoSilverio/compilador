// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

// Variavel que contem todo contudo do arquivo.obj
let arquivo;

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

//Iniciar programa principal
function start() {
    s = -1;
    //document.getElementById("formDados").innerHTML = "> ";
    document.getElementById('compilar').addEventListener('click', function () {
        main();
    });
}

// Função main controla um loop para as operações das instruções
function main() {
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
                i = i - 1;
                break;
            default:
                break;
        }

    }
}

//Função para leitura de arquivo .obj para manipualcao no JS
function readFile() {
    var fileToLoad = document.getElementById("file-input").files[0];  //a intenção é não precisar de botões pra escolher arquivo e nem para
    var fileReader = new FileReader();                                //executar o script, tudo deve acontecer quando cricar para abrir a aplicação
    fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var texto = textFromFileLoaded; // Variavel com o conteudo do arquivo
        //console.log(texto);
        arquivo = texto;
        tabelaInstrucoes(texto);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

//Função para printar na tabela o conteudo do arquivo .obj
function tabelaInstrucoes(texto){
    let comentario = "";
    let linha = "";
    let atual = "";     //carater atual
    let prox = "";      //caracter proximo
    let indexmais = 0;  //proximo valor do index
    let auxNum = 0;     //auxiliar para pegar primeiro/unico numero na linha
    let auxNum2 = 0;    //auxiliar para pegar o segundo numero na linha 
    let auxStr = "";    //auxiliar para desvios na linha
    let palavra = "";

    var quantidade = document.getElementById("tabelaInstrucoes").rows.length;// está pré definido que será usado o tamanho total do arquivo
    if (quantidade>1){ // quantidade representa o número indefinido de linhas que pode haver
        for(var cont=1;cont<=quantidade;cont++){
            document.getElementById("tabelaInstrucoes").deleteRow(cont);
        }
    }

    var itens = texto.split("\n"); // define que linhas devem ser consultadas
    document.getElementById("tabelaInstrucoes").innerHTML +='<tr><td style="border: 2px solid; font-weight: bold">'+"Breakpoint"+'</td>'+
                                                                '<td style="border: 2px solid; font-weight: bold">'+" L "+'</td>'+
                                                                '<td style="border: 2px solid; font-weight: bold">'+"Instruçao"+'</td>'+
                                                                '<td style="border: 2px solid; font-weight: bold">'+"Comentario"+'</td></tr>';
    
    indexmais = i + 1;      //posicao do prox caracter
    prox = itens[indexmais]; //recebe prox caracter (depois de atual)
    atual = itens[i];    //recebe caracter atual

    for(i;i<itens.length;i++){
        linha = itens[i];// espaços TAB definem colunas que serão consultadas
        
        console.log(linha);//conteudo linha
        console.log(linha.length);//tamanho conteudo linha

        for (let j = 0; j < linha.length ; j++) { //percorre na linha, para pegar apenas a palavra
            if (linha[j] == " ") {
                break;
            }
            palavra += linha[j];           
        }
        
        if (palavra == "START") {
            console.log("entrouSTART");
            comentario = "(Iniciar programa principal): S:=-1 ";
        } else if (palavra === "NULL") {
            console.log("entrouNULL");
            comentario = "Nada";
        } else if (palavra === "LDC") {
            comentario = "(Carregar constante): S:= s + 1 ; M [s]: = "+auxNum;
        } else if (palavra === "LDV") {
            comentario = "(Carregar valor): S:=s + 1 ; M[s]:=M["+auxNum+"]";
        } else if (palavra === "ADD") {
            comentario = "(Somar): M[s-1]:=M[s-1] + M[s]; s:=s - 1";
        } else if (palavra === "SUB") {
            comentario = "(Subtrair): M[s-1]:=M[s-1] - M[s]; s:=s - 1";
        } else if (palavra === "MULT") {
            comentario = "(Multiplicar): M[s-1]:=M[s-1] * M[s]; s:=s - 1";
        } else if (palavra === "DIVI") {
            comentario = "(Dividir): M[s-1]:=M[s-1] div M[s]; s:=s - 1";
        } else if (palavra === "INV") {
            comentario = "(Inverter sinal): M[s]:= -M[s]";
        } else if (palavra === "AND") {
            comentario = "(Conjunção): se M [s-1] = 1 e M[s] = 1\n então M[s-1]:=1\n senão M[s-1]:=0; s:=s - 1";
        } else if (palavra === "OR") {
            comentario = "(Disjunção): se M[s-1] = 1 ou M[s] = 1\n então M[s-1]:=1\n senão M[s-1]:=0; s:=s - 1";
        } else if (palavra === "NEG") {
            comentario = "(Negação): M[s]:=1 - M[s]";
        } else if (palavra === "CME") {
            comentario = "(Comparar menor): se M[s-1] < M[s]\n então M[s-1]:=1\nsenão M[s-1]:=0; s:=s - 1";
        } else if (palavra === "CMA") {
            comentario = "(Comparar maior): se M[s-1] > M[s]\n então M[s-1]:=1\nsenão M[s-1]:=0; s:=s - 1";
        } else if (palavra === "CEQ") {
            comentario = "(Comparar igual): se M[s-1] = M[s]\n então M[s-1]:=1\nsenão M[s-1]:=0; s:=s - 1";
        } else if (palavra === "CDIF") {
            comentario = "(Comparar desigual): se M[s-1] ≠ M[s]\n então M[s-1]:=1\nsenão M[s-1]:=0; s:=s - 1";
        } else if (palavra === "CMEQ") {
            comentario = "(Comparar menor ou igual) se M[s-1] ≤ M[s]\n então M[s-1]:=1\nsenão M[s-1]:=0; s:=s - 1";
        } else if (palavra === "CMAQ") {
            comentario = "(Comparar maior ou igual): se M[s-1] ≥ M[s]\n então M[s-1]:=1\nsenão M[s-1]:=0; s:=s - 1";
        } else if (palavra === "HLT") {
            comentario = "(Parar): “Para a execução da MVD”";
        } else if (palavra === "STR") {
            comentario = "(Armazenar valor): M["+auxNum+"]:=M[s]; s:=s-1";
        } else if (palavra === "JMP") {
            comentario = "(Desviar sempre): i:= "+auxStr;
        } else if (palavra === "JMPF") {
            comentario = "(Desviar se falso): se M[s] = 0\nentão i:="+auxStr+"\n senão i:=i + 1;\ns:=s-1";
        } else if (palavra === "RD") {
            comentario = "(Leitura): S:=s + 1; M[s]:= “próximo valor de entrada”.";
        } else if (palavra === "PRN") {
            comentario = "(Impressão): “Imprimir M[s]”; s:=s-1 ";
        } else if (palavra === "ALLOC") {
            comentario = "(Alocar memória): Para k:=0 até "+auxNum2+"-1\n faça {s:=s + 1; M[s]:=M["+auxNum+"+k]}";
        } else if (palavra === "DALLOC") {
            comentario = "(Desalocar memória): Para k:="+auxNum2+"-1 até 0\n faça {M["+auxNum+"+k]:=M[s]; s:=s - 1}";
        } else if (palavra === "CALL") {
            comentario = "(Chamar procedimento ou função): S:=s + 1; M[s]:=i + 1; i:= "+auxStr;
        } else if (palavra === "RETURN") {
            comentario = "(Retornar de procedimento): i:=M[s]; s:=s - 1";
        } 

        palavra = "";

        document.getElementById("tabelaInstrucoes").innerHTML +='<tr><td style="text-align: center; vertical-align: middle;"><input type="checkbox" id="breakpoint" name="line" value="breakpoint"></td>'+
                                                                    '<td>'+(i+1)+'</td><td>'+linha+'</td><td>'+comentario+'</td></tr>';
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
    s = (s + 1);
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
    s = (s - 1);
}

//==============================
//===== Funções de Memoria =====
//==============================

//Carregar constante
//k = instruction[i].parameters.p1
function ldc() {
    s = (s + 1);
    memory[s] = k;
}
//Carregar valor
function ldv() {
    s = (s + 1);
    memory[s] = memory[n];
}
//Atribuição - Armazenar valor
function str() {
    memory[n] = memory[s];
    s = (s - 1);
}
//Alocação de Variáveis
function alloc() {
    for (let j = 0; j < instructions[i].parameters.p2; j++) {
        s = (s + 1);
        memory[s] = memory[instructions[i].parameters.p1 + j];
    }
}
//Desalocação de Variáveis
function dalloc() {
    for (let j = instructions[i].parameters.p2 - 1; j >= 0; j--) {

        memory[instructions[i].parameters.p1 + j] = memory[s];
        s = (s - 1);
    }
}

//==========================
//=== Função aritmeticas ===
//==========================

//Operacao adição
function add() {
    memory[s - 1] = parseInt(memory[s - 1] + memory[s]);
    s = (s - 1);
}
//Operacao subtração
function sub() {
    memory[s - 1] = parseInt(memory[s - 1] - memory[s]);
    s = (s - 1);
}
//Operacao multiplicação
function mult() {
    memory[s - 1] = parseInt(memory[s - 1] * memory[s]);
    s = (s - 1);
}
//Operacao divisão
function divi() {
    memory[s - 1] = parseInt(memory[s - 1] / memory[s]);
    s = (s - 1);
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
    if (memory[s - 1] == 1 && memory[s] == 1) {
        memory[s - 1] = 1;
    } else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}
//Operacao OR
function or() {
    if (memory[s - 1] == 1 || memory[s] == 1) {
        memory[s - 1] = 1;
    } else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}
//Operacao NEG
function neg(params) {
    memory[s] = 1 - memory[s];
}

//=============================
//== Funções para Comparação ==
//=============================

//Comparar menor
function cme() {
    if (memory[s - 1] < memory[s]) {
        memory[s - 1] = 1;
    }
    else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}
//Comparar maior
function cma() {
    if (memory[s - 1] > memory[s]) {
        memory[s - 1] = 1;
    }
    else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}
//Comparar igual
function ceq() {
    if (memory[s - 1] == memory[s]) {
        memory[s - 1] = 1;
    }
    else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}
//Comparar desigual
function cdif() {
    if (memory[s - 1] != memory[s]) {
        memory[s - 1] = 1;
    }
    else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}
//Comparar menor ou igual
function cmeq() {
    if (memory[s - 1] <= memory[s]) {
        memory[s - 1] = 1;
    }
    else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}
//Comparar maior ou igual
function cmaq() {
    if (memory[s - 1] >= memory[s]) {
        memory[s - 1] = 1;
    }
    else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
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
        i = (i - 1);
        //i = i + 1;
    }
    else {
        // Não faz nada pois será incrementado na main
        // i = i - 1;
    }
    s = (s - 1);
}

//===============================
//===== Funções de Chamadas =====
//===============================

//Chamar procedimento ou função
function call() {
    s = (s + 1);
    memory[s] = (i + 1);
    i = findLabel(instructions[i].parameters.p1).index;
}

//Retornar de procedimento
function retn() {
    i = memory[s];
    s = (s - 1);
}