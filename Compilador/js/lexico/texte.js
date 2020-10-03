//import * as token from './token.js';

let tabelaTokens = require('./token.js');
let prox = "a";
palavra = "se";
palavra1 = "se";

//console.log(tabelaTokens);
//console.log(isReserved("programa"));

//console.log((prox.toUpperCase() != prox.toLowerCase()));

console.log(isAlpha1("\N"));

//if (palavra.localeCompare("se") == 0) {
//    console.log("palavra igual");
//}

function isAlpha(palavra) {
    if (palavra.toUpperCase() != palavra.toLowerCase()) {
        return true;
    } else {
        return false;
    }
}


function isAlpha1(ch) {
    return /^[A-Z]$/i.test(ch);
}


function reservado(lexema) {
    if (lexema in tabelaTokens) {
        return tabelaTokens[lexema];
    }
    console.log(tabelaTokens[lexema]);
    return false;
}


function isReserved(lexema) {
    if (tabelaTokens.hasOwnProperty(lexema)) {
        return tabelaTokens[lexema];
    }
    console.log(tabelaTokens[lexema]);
    return false;
}

//funciona com um caracter por vez
function isNumber(palavra) {
    if (palavra == "0" || palavra == "1" || palavra == "2" || palavra == "3" || palavra == "4" || palavra == "5" || palavra == "6" || palavra == "7" || palavra == "8" || palavra == "9") {
        return true;
    } else {
        return false;
    }
}

