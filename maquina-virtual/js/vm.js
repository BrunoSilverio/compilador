// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

// Variavel que contem todo contudo do arquivo.obj
let arquivo = "";
let comando = "";

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
function main() {
    console.log("Executando...");
    //let auxNum = 0;     //auxiliar para pegar primeiro/unico numero na linha
    //let auxNum2 = 0;    //auxiliar para pegar o segundo numero na linha 
    //let auxStr = "";    //auxiliar para desvios na linha
    var teste = arquivo.split("\n"); // define que linhas devem ser consultadas
    
    console.log(teste);
    
    for (i; i < teste.length; i++) { //percorre por quantidade de linhas
        comando = teste[j]; //contem a linha atual
        let testeFinal = comando.substring(comando.lastIndexOf(" ")+1); // Pega os valores depois do comando da linha atual
        console.log(testeFinal);

        switch (comando) {
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
    fileReader.onload = function (fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var texto = textFromFileLoaded; // Variavel com o conteudo do arquivo
        //console.log(texto);
        arquivo = texto;
        tabelaInstrucoes(texto);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

    //Iniciar execucao do codigo button compilar
    document.getElementById('compilar').addEventListener('click', function () {
        main();
    });
}

//Função para printar na tabela o conteudo do arquivo .obj
function tabelaInstrucoes(texto) {
    let comentario = "";
    let linha = "";

    var quantidade = document.getElementById("tabelaInstrucoes").rows.length;// está pré definido que será usado o tamanho total do arquivo
    if (quantidade > 1) { // quantidade representa o número indefinido de linhas que pode haver
        for (var cont = 1; cont <= quantidade; cont++) {
            document.getElementById("tabelaInstrucoes").deleteRow(cont);
        }
    }

    var itens = texto.split("\n"); // define que linhas devem ser consultadas
    console.log(itens);
    document.getElementById("tabelaInstrucoes").innerHTML += '<tr><td style="border: 2px solid; font-weight: bold">' + "Breakpoint" + '</td>' +
        '<td style="border: 2px solid; font-weight: bold">' + " L " + '</td>' +
        '<td style="border: 2px solid; font-weight: bold">' + "Instruçao" + '</td>' +
        '<td style="border: 2px solid; font-weight: bold">' + "Comentario" + '</td></tr>';

    for (i; i<itens.length; i++) {
        linha = itens[i];// espaços TAB definem colunas que serão consultadas
        console.log("Linha: "+linha);

        if (linha.includes("START")) {
            comentario = "(Iniciar programa principal): S:= -1";
        } else if (linha.includes("NULL")) {
            comentario = "Nada";
        } else if (linha.includes("LDC")) {
            comentario = "(Carregar constante): S:= s+1 ; M[s]:= k";
        } else if (linha.includes("LDV")) {
            comentario = "(Carregar valor): S:= s+1 ; M[s]:= M[n]";
        } else if (linha.includes("ADD")) {
            comentario = "(Somar): M[s-1]:= M[s-1] + M[s]; s:= s-1";
        } else if (linha.includes("SUB")) {
            comentario = "(Subtrair): M[s-1]:= M[s-1] - M[s]; s:= s-1";
        } else if (linha.includes("MULT")) {
            comentario = "(Multiplicar): M[s-1]:= M[s-1] * M[s]; s:= s-1";
        } else if (linha.includes("DIVI")) {
            comentario = "(Dividir): M[s-1]:= M[s-1] div M[s]; s:= s-1";
        } else if (linha.includes("INV")) {
            comentario = "(Inverter sinal): M[s]:= -M[s]";
        } else if (linha.includes("AND")) {
            comentario = "(Conjunção): se M[s-1]:= 1 e M[s] = 1 \n então M[s-1]:= 1 \n senão M[s-1]:= 0; s:= s-1";
        } else if (linha.includes("OR")) {
            comentario = "(Disjunção): se M[s-1]:= 1 ou M[s] = 1 \n então M[s-1]:= 1 \n senão M[s-1]:= 0; s:= s-1";
        } else if (linha.includes("NEG")) {
            comentario = "(Negação): M[s]:= 1 - M[s]";
        } else if (linha.includes("CME")) {
            comentario = "(Comparar menor): se M[s-1] < M[s] \n então M[s-1]:= 1 \n senão M[s-1]:= 0; s:= s-1";
        } else if (linha.includes("CMA")) {
            comentario = "(Comparar maior): se M[s-1] > M[s] \n então M[s-1]:= 1 \n senão M[s-1]:= 0; s:= s-1";
        } else if (linha.includes("CEQ")) {
            comentario = "(Comparar igual): se M[s-1] = M[s] \n então M[s-1]:= 1 \n senão M[s-1]:= 0; s:= s-1";
        } else if (linha.includes("CDIF")) {
            comentario = "(Comparar desigual): se M[s-1] ≠ M[s] \n então M[s-1]:= 1 \n senão M[s-1]:= 0; s:= s-1";
        } else if (linha.includes("CMEQ")) {
            comentario = "(Comparar menor ou igual) se M[s-1] ≤ M[s] \n então M[s-1]:= 1 \n senão M[s-1]:= 0; s:= s-1";
        } else if (linha.includes("CMAQ")) {
            comentario = "(Comparar maior ou igual): se M[s-1] ≥ M[s] \n então M[s-1]:= 1 \n senão M[s-1]:= 0; s:= s-1";
        } else if (linha.includes("HLT")) {
            comentario = "(Parar): “Para a execução da MVD”";
        } else if (linha.includes("STR")) {
            comentario = "(Armazenar valor): M[n]:= M[s]; s:= s-1";
        } else if (linha.includes("JMP")) {
            comentario = "(Desviar sempre): i:= t";
        } else if (linha.includes("JMPF")) {
            comentario = "(Desviar se falso): se M[s]:= 0 \n então i:= t \n senão i:= i+1; \n s:= s-1";
        } else if (linha.includes("RD")) {
            comentario = "(Leitura): S:=s+1; M[s]:= “próximo valor de entrada”";
        } else if (linha.includes("PRN")) {
            comentario = "(Impressão): “Imprimir M[s]”; s:=s-1";
        } else if (linha.includes("ALLOC")) {
            comentario = "(Alocar memória): Para k:= 0 até n-1\n faça {s:= s+1; M[s]:= M[m+k]}";
        } else if (linha.includes("DALLOC")) {
            comentario = "(Desalocar memória): Para k:= n-1 até 0\n faça {M[m+k]:= M[s]; s:= s-1}";
        } else if (linha.includes("CALL")) {
            comentario = "(Chamar procedimento ou função): S:= s+1; M[s]:= i+1; i:= t";
        } else if (linha.includes("RETURN")) {
            comentario = "(Retornar de procedimento): i:= M[s]; s:= s-1";
        }

        document.getElementById("tabelaInstrucoes").innerHTML += '<tr><td style="text-align: center; vertical-align: middle;"><input type="checkbox" id="breakpoint" name="line" value="breakpoint"></td>'+
                                                                '<td>' + (i + 1) + '</td><td>' + linha + '</td><td>' + comentario + '</td></tr>';
        comentario = "";
    }
}

//=============================
//===== Função basicas VM =====
//=============================
function start() {
    s = -1;
    document.getElementById("formDados").innerHTML = "Iniciando...";    
}
//Parar - “Para a execução da MVD”
function hlt() {
    exec = false;
}
//Operação RD - Ultimo valor entrado pelo usuario.
function rd() {
    let valor = document.getElementById("formEntrada").innerHTML += "Digite um valor: ";
    s = (s + 1);
    memory[s] = valor;
}
//Saida - Impressão
function prn() {
    // printValue(memory[s]);
    if (memory[s] == undefined) {
        document.getElementById("formSaida").innerHTML += "memoria undefined";
    } else {
        document.getElementById("formSaida").innerHTML += memory[s];
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

    document.getElementById("formDados").innerHTML += k+"\n";
}
//Carregar valor
function ldv() {
    s = (s + 1);
    memory[s] = memory[n];

    document.getElementById("formDados").innerHTML += memory[n]+"\n";
}
//Atribuição - Armazenar valor
function str() {
    memory[n] = memory[s];
    s = (s - 1);

    document.getElementById("formDados").innerHTML += memory[s]+"\n";
}
//Alocação de Variáveis
function alloc() {
    for (let j = 0; j < instructions[i].parameters.p2; j++) {
        s = (s + 1);
        memory[s] = memory[instructions[i].parameters.p1 + j];
    }
    document.getElementById("formDados").innerHTML += "teste\n";
}
//Desalocação de Variáveis
function dalloc() {
    for (let j = instructions[i].parameters.p2 - 1; j >= 0; j--) {

        memory[instructions[i].parameters.p1 + j] = memory[s];
        s = (s - 1);
    }
    document.getElementById("formDados").innerHTML += "teste\n";
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
function neg() {
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

    document.getElementById("formDados").innerHTML += "\n";
}

//===============================
//===== Funções de Chamadas =====
//===============================

//Chamar procedimento ou função
function call() {
    s = (s + 1);
    memory[s] = (i + 1);
    i = findLabel(instructions[i].parameters.p1).index;

    document.getElementById("formDados").innerHTML += "teste\n";
}

//Retornar de procedimento
function retn() {
    i = memory[s];
    s = (s - 1);
}