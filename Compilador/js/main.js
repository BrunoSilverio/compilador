//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import

import * as lexico from './lexico/lexico.js';
import * as token from './lexico/token.js';

//Variavel com o codigo fonte completo
let programa;
//Variavel para guardar os tokens do codigo
export let tokens = [];
export let tabelaSimbolos = [];

function main() {
    try {
        lexico.lexico(programa);
        
    } catch (error)
    {
        //Responsavel por exibir a mensagem de erro para o usuario

    }
}


