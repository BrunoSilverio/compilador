//Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import

//Variaveis globais
let programa;
var inicio = "";
var fim = "";
var tempo = "";
let nomeProg = "";

//Funcao para chamar a Main.js, quando o botao compilar no front-end for executado. 
function start() {
    document.getElementById('compilar').addEventListener('click', function () {
        var fileInput = document.getElementById('file-input');
        var filename = fileInput.files[0].name;
        nomeProg = filename.split(".", 1);
        main();
    });
}

// Main.js faz a conexao entre o front-end e o back-end (lexico, sintatico)
function main() {
    inicio = performance.now();
    clearAll();
    //var tokenslexico = lexico();
    sintatico();
    //var tokensintatico = sintatico(tokenslexico);
    //var tokenslexico = JSON.stringify(tokenslexico);
    //Print no front-end / textarea id=terminal
    //document.getElementById('terminal').value = tokenslexico.split(',{').join("\n");
}

//A cada nova execucao (play/compilar), limpa todas as variaveis globais (de controle)
function clearAll() {
    //zerando da main
    programa = (editor.getValue() + " ");               //programa recebe codigo do codemirror
    document.getElementById('terminal').value = null;   //zerando terminal (onde exibe)

    //zerando do lexico
    index = 0;
    nlinha = 1;
    //zerando posfixo
    posFixo = [];
    posFixoOperadores = [];
    //zerando geracao de codigo
    arquivo = "";
    rotulo = 0;
    //zerando tempo de execucao
    fim = "";
    tempo = "";
}

function readText(that) {
    if (that.files && that.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let output = e.target.result;
            program = output;
            // readProgramFile();
            writeOnTerminal();
        };
        reader.readAsText(that.files[0]);
    }

}

function writeOnTerminal() {
    myCodeMirror.setValue(program.toString());
}

function readProgramFile() {
    programa = myCodeMirror.getValue();
    //programa = programa.split("\n");
    return;
}

function writeOnTerminal() {
    myCodeMirror.setValue(program.toString());
}