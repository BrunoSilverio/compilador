//Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import

// Main.js faz a conexao entre o front-end e o back-end

//Variaveis globais
var programa; 

function start() {
    document.getElementById('compilar').addEventListener('click', function () {
        main();
    });
}

function main() {
    var tokenslexico = lexico(editor.getValue());
    //var tokensintatico = sintatico(tokenslexico);
    var tokenslexico = JSON.stringify(tokenslexico);
    //Print no front-end / textarea id=terminal
    document.getElementById('terminal').value = tokenslexico.split(',{').join("\n");
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