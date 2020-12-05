// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

// Variavel que contem todo contudo do arquivo.obj
let arquivo = "";
let comando = "";

//Variavel de controle para percorrer a pilha de memoria, indicando elemento do topo da pilha: M[s]
let s = -1;

// Variavel de controle para percorrer a lista de instruções a serem executadas, 
//contem o endereço da proxima instrução a ser executada: P[i]
let i = 0;
let indiceDebug = 0;

// Vetor responsavel por simular a pilha de memoria
let memory = [];

// Vetor responsavel por simular a lista de instruções a serem executadas
let intrucoes = [];

// Variavel de controle para identificar qual operação deve ser executada
let operation = " ";

// Variavel de controle para identificar quando o breakpoint esta selecionado
let breakpoint = false;

// Contador para lista de instruções
let comandoBuscaLinha = [];

//PRIMEIRA FUNCAO A SER EXECUTADA -> IMPORT NA INTERFACE
//Função para leitura de arquivo .obj para manipualcao no JS

function readFile() {
    var fileToLoad = document.getElementById("file-input").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var texto = textFromFileLoaded; // Variavel com o conteudo do arquivo
        arquivo = texto;
        tabelaInstrucoes(texto);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");

    document.getElementById("tabelaMemoria").innerHTML +=
        '<tr><td style="border: 2px solid; font-weight: bold">' + " Endereço " + '</td>' +
        '<td style="border: 2px solid; font-weight: bold">' + " Valor " + '</td></tr>';

    //Iniciar execucao do codigo button compilar (PLAY)
    document.getElementById('compilar').addEventListener('click', function () {
        main();
    });

    //Espera pelo botao de debug
    document.getElementById('debug').addEventListener('click', function () {
        debug();
    });
}

//SEGUNDA FUNCAO A SER EXECUTADA -> EXIBE CODIGO
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

    for (let k = 0; k < itens.length; k++) {
        linha = itens[k];// espaços TAB definem colunas que serão consultadas
        console.log("Linha: " + linha);

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
        } else if (linha.includes("JMPF")) {
            comentario = "(Desviar se falso): se M[s]:= 0 \n então i:= t \n senão i:= i+1; \n s:= s-1";
        } else if (linha.includes("JMP")) {
            comentario = "(Desviar sempre): i:= t";
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

        document.getElementById("tabelaInstrucoes").innerHTML += '<tr id=' + k + '><td style="text-align: center; vertical-align: middle;"><input type="checkbox" id= breakpoint-' + k + ' name="line" value="breakpoint"></td>' +
            '<td>' + (k + 1) + '</td><td>' + linha + '</td><td>' + comentario + '</td></tr>';
        comentario = "";
    }
}

//Função para executar arquivo.obj comando por comando
function debug() {
    document.getElementById(i).style.color = "#06fc06";
    var teste = arquivo.split("\n");
    console.log("indice" + i);
    comando = teste[i];
    executa(comando);
    document.getElementById(i + 1).style.color = "red";
    i++;
}

//Função para executar o comando atual
function executa(comando) {
    //Pega a intrucao da linha
    console.log("Comando atual: " + comando);
    operation = comando.split(" ", 1);
    console.log("Operation: " + operation);

    if ((operation == "LDC") || (operation == "LDV") || (operation == "STR") || (operation == "JMP") || (operation == "JMPF") || (operation == "ALLOC") || (operation == "DALLOC") || (operation == "CALL")) {
        // Pega os valores da instrucao

        parametros = comando.substring(comando.lastIndexOf(" ") + 1);
        console.log("parametro: " + parametros);
    }

    switch (String(operation)) {
        case "START":
            start();
            break;
        case "LDC":
            ldc(parametros);
            break;
        case "LDV":
            ldv(parametros);
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
        case "HLT":
            hlt();
            break;
        case "STR":
            str(parametros);
            break;
        case "JMP":
            jmp(parametros);
            break;
        case "JMPF":
            jmpf(parametros);
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
            alloc(parametros);
            break;
        case "DALLOC":
            dalloc(parametros);
            break;
        case "CALL":
            call(parametros);
            break;
        case "RETURN":
            retn();
            break;
        default:
            break;
    }
    exibeMemoria();
}

// Função main controla um loop para as operações das instruções
function main() {
    console.log("Executando...");

    var teste = arquivo.split("\n"); //separa o arquivo por linha

    for (i = i; i < teste.length; i++) { //percorrer por quantidade de linhas no arquivo
        comando = teste[i]; //contem a linha atual
        executa(comando);

        //funcao para validar se existe um checkbox selecionado na linha
        let checkbox = document.getElementById('breakpoint-'+i);
        if (checkbox.checked) {
            document.getElementById(i).style.color = "red";
            i++;
            break;
        } else {
            console.log("O cliente não marcou o checkbox");
        }
        
    }
}

//Iniciar execução
function start() {
    console.log("*entrou func start*");
    s = -1;
}

//Parar - “Para a execução da MVD”
function hlt() {
    console.log("*entrou funcao HLT*");
}

//Operação RD - Ultimo valor entrado pelo usuario.
function rd() {
    console.log("*entrou funcao RD*");
    let entrada = prompt("Digite o valor de entrada: ");
    document.getElementById("formEntrada").innerHTML += entrada + "\n";
    s = (s + 1);
    memory[s] = entrada;
}

//Saida - Impressão
function prn() {
    console.log("*entrou funcao PRN*");
    document.getElementById("formSaida").innerHTML += memory[s] + "\n";
    s = (s - 1);
}

//Caregar constante
function ldc(parametros) {
    console.log("*entrou funcao LDC*");
    let valor = parseInt(parametros);
    s = (s + 1);
    memory[s] = valor;
}

//Carregar valor
function ldv(parametros) {
    console.log("*entrou funcao LDV*");
    let valor = parseInt(parametros);
    s = (s + 1);
    memory[s] = memory[valor];
}

//Atribuição - Armazenar valor
function str(parametros) {
    console.log("*entrou funcao STR*");
    let valor = parseInt(parametros);
    memory[valor] = memory[s];
    s = (s - 1);
}

//Alocação de Variáveis
function alloc(parametros) {
    console.log("*entrou funcao ALLOC*");
    let p = parametros.split(",");
    let m = parseInt(p[0]);
    let n = parseInt(p[1]);

    for (let k = 0; k < n; k++) {
        s = (s + 1);
        memory[s] = memory[(m + k)];
        memory[(m + k)] = (m + k);
    }
}

//Desalocação de Variáveis
function dalloc(parametros) {
    console.log("*entrou funcao DALLOC*");
    let p = parametros.split(",");
    let m = parseInt(p[0]);
    let n = parseInt(p[1]);

    for (let k = (n - 1); k >= 0; k--) {
        memory[m + k] = memory[s];
        s = (s - 1);
    }
}

//Operacao adição
function add() {
    console.log("*entrou funcao ADD*");
    memory[s - 1] = (memory[s - 1] + memory[s]);
    s = (s - 1);
}

//Operacao subtração
function sub() {
    console.log("*entrou funcao SUB*");
    memory[s - 1] = (memory[s - 1] - memory[s]);
    s = (s - 1);
}

//Operacao multiplicação
function mult() {
    console.log("*entrou funcao MULT*");
    memory[s - 1] = (memory[s - 1] * memory[s]);
    s = (s - 1);
}

//Operacao divisão
function divi() {
    console.log("*entrou funcao DIVI*");
    memory[s - 1] = (memory[s - 1] / memory[s]);
    s = (s - 1);
}

//Operacao inversão
function inv() {
    console.log("*entrou funcao INV*");
    memory[s] = (memory[s] * (-1));
}

//Operacao AND
function and() {
    console.log("*entrou funcao AND*");
    if (memory[s - 1] == 1 && memory[s] == 1) {
        memory[s - 1] = 1;
    } else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}

//Operacao OR
function or() {
    console.log("*entrou funcao OR*");
    if (memory[s - 1] == 1 || memory[s] == 1) {
        memory[s - 1] = 1;
    } else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}

//Operacao NEG
function neg() {
    console.log("*entrou funcao NEG*");
    memory[s] = (1 - memory[s]);
}

//Comparar menor
function cme() {
    console.log("*entrou funcao CME*");
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
    console.log("*entrou funcao CMA*");
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
    console.log("*entrou funcao CEQ*");
    if (memory[s - 1] === memory[s]) {
        memory[s - 1] = 1;
    }
    else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}

//Comparar desigual
function cdif() {
    console.log("*entrou funcao CDIF*");
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
    console.log("*entrou funcao CMEQ*");
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
    console.log("*entrou funcao CMAQ*");
    if (memory[s - 1] >= memory[s]) {
        memory[s - 1] = 1;
    }
    else {
        memory[s - 1] = 0;
    }
    s = (s - 1);
}

//Desviar sempre
function jmp(parametros) { //arrumar parametro da linha ->como pular e indicar
    console.log("*entrou funcao JMP*");
    i = buscaLinha(parametros);
}

//Desviar se falso
function jmpf(parametros) {

    console.log(memory[s]);
    if (memory[s] == 0) {
        i = buscaLinha(parametros);
    }
    else {
        //O proprio for incrementa isso, nao ha necessidade
    }
    s = (s - 1);
}

//Chamar procedimento ou função
function call(parametros) {
    console.log("*entrou funcao CALL*");
    s = (s + 1);
    memory[s] = (i + 1);
    i = buscaLinha(parametros);
}

//Retornar de procedimento
function retn() {
    console.log("*entrou funcao RETURN*");
    i = memory[s];
    //i = i - 1;
    s = (s - 1);
}

//Funcao para buscar rotulo
function buscaLinha(parametros) {
    console.log("#### ESTOU BUSCANDO: " + parametros);

    var buscaComando = arquivo.split("\n");
    for (let k = 0; k <= buscaComando.length; k++) {
        comando = buscaComando[k];
        operation = comando.split(" ");

        if (operation[0] === parametros) {
            console.log("#### ENCONTREI A LINHA: " + parametros);
            console.log("Na linha: " + k);
            return k - 1;
        }
    }
}

//Funcao para exibir pilha de dados
function exibeMemoria() {
    document.getElementById("tabelaMemoria").innerHTML =
        '<tr><td style="border: 2px solid; font-weight: bold">' + " Endereço " + '</td>' +
        '<td style="border: 2px solid; font-weight: bold">' + " Valor " + '</td></tr>';

    for (let k = 0; k <= s; k++) {

        document.getElementById("tabelaMemoria").innerHTML +=
            '<tr><td style="text-align: center; vertical-align: middle;">' + "[" + k + "] " + '</td>' +
            '<td style="text-align: center; vertical-align: middle;">' + memory[k] + '</td></tr>';
    }
}
