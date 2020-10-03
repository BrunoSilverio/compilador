//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import

//Imports
//import * as front from '/index.html';
//var codigo = require('./index.html'); 
//let lexico = require('./js/lexico/lexico.js');


//Eventos


//Variaveis globais
var programa; //arrumar
//var token = [];

function start() {
    console.log("teste?");

    // document.getElementById('import_file').addEventListener('change', function () {
    //     readText(this);
    // });

    // document.getElementById('compilador').addEventListener('click', main);

    document.getElementById('compilar').addEventListener('click', function () {
        main();
    });
}


function main() {
    //programa = codigo do codemirror
    //resposta = lista de tokens
    var listatokens = lexico(editor.getValue());
    console.log(listatokens);
    var teste = JSON.stringify(listatokens);
    //printa no lado direito da tela (terminal)
    document.getElementById('terminal').value = teste.split(',').join("\n");

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