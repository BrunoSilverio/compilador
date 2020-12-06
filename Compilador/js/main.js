//Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

//Variaveis globais
let programa;
var inicio = "";
var fim = "";
var tempo = "";
let nomeProg = "";

//Funcao que, ao ter o botao play no front-end clicado, executa a main
function start() {
    document.getElementById('compilar').addEventListener('click', function () {
        var fileInput = document.getElementById('file-input');
        var filename = fileInput.files[0].name;
        nomeProg = filename.split(".", 1);
        main();
    });
}

function main() {
    inicio = performance.now();
    clearAll();
    sintatico();
}

//Funcao para limpar variaveis globais antes de cada execucao
function clearAll() {
    //zerando da main
    programa = (editor.getValue() + " ");               
    document.getElementById('terminal').value = null;

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