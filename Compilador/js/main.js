//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import

import * as lexico from 'js/lexico/lexico.js';
import * as token from 'js/lexico/token.js';

//Variavel com o codigo fonte completo
let programa;
//Variavel para guardar os tokens do codigo
export let tokens = [];

function main() {
    try {
        lexico.lexico(programa);

        document.getElementById("form=saida").innerHTML = "teste";
        
    } catch (error)
    {
        //Responsavel por exibir a mensagem de erro para o usuario
    }
}


function myFunction() {
    document.getElementById("teste").innerHTML=alert("Iniciando. . .");
}