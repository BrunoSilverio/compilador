//import * as token from './token.js';
//import * as main from '../main.js';
//let tabelaTokens = require ('./token.js');    //Esse funciona

// Tabela de Tokens
//"Lexema":"Simbolo"
let tabelaTokens = {
    "programa": "Sprograma",
    "inicio": "Sinicio",
    "fim": "Sfim",
    "procedimento": "Sprocedimento",
    "funcao": "Sfuncao",
    "se": "Sse",
    "entao": "Sentao",
    "senao": "Ssenao",
    "enquanto": "Senquanto",
    "faca": "Sfaca",
    ":=": "Satribuicao",
    "escreva": "Sescreva",
    "leia": "Sleia",
    "var": "Svar",
    "inteiro": "Sinteiro",
    "booleano": "Sbooleano",
    "identificador": "Sidentificador",
    "numero": "Snumero",
    ".": "Sponto",
    ";": "Sponto_virgula",
    ",": "Svirgula",
    "(": "Sabre_parenteses",
    ")": "Sfecha_parenteses",
    ">": "Smaior",
    ">=": "Smaiorig",
    "=": "Sig",
    "<": "Smenor",
    "<=": "Smenorig",
    "!=": "Sdif",
    "+": "Smais",
    "-": "Smenos",
    "*": "Smult",
    "div": "Sdiv",
    "e": "Se",
    "ou": "Sou",
    "nao": "Snao",
    ":": "Sdoispontos",
}

var programa = "se contador > 13 /*teste comentario*/\n" +
    "entao escreva (contador)\n" +
    "senao escreva (x)";
//para testar, chama a funcao do lexico e envia o programa
lexico(programa);


//Inicio da analise lexica
function lexico(programa) {

    let comentario = false;
    let posicao = 0;
    let index = 0;
    let linha = 0;
    let atual = "";
    let prox = " ";
    let indexmais = 0;
    let lexema = "";
    let simbolo = "";
    let pilha = 0;
    let palavra = "";
    let numero = "";
    let token = [];

    console.log("\n" + programa);

    //metodos para calcular quantidade de linhas
    //const lines = (codigo.match(/\n/g) || '').length + 1;
    //const linhas = codigo.split(/\r\n|\r|\n/).length;

    //Loop linha por linha
    for (let index = 0; index < programa.length; index++) {
        //Variavel auxiliar
        let linha = programa[index];
        //variavel para saber proximo caracter
        indexmais = index + 1;
        prox = programa[indexmais]; //recebe prox caracter (depois de atual)
        //console.log(linha);

        for (posicao = 0; posicao < linha.length; posicao++) {

            atual = linha[posicao]; //recebe caracter atual

            //caso as validacoes dentro do switch sejam true -> entra nos case
            switch (true) {

                case (atual === "("):

                    console.log("( || Sabre_parenteses");
                    break;

                //Agrupa NUMEROS em numero (ate chegar em espaco)
                case (atual == "0" || atual == "1" || atual == "2" || atual == "3" || atual == "4" || atual == "5" || atual == "6" || atual == "7" || atual == "8" || atual == "9" && comentario == false && isNaN(prox)):
                    numero = numero + atual;

                    if (prox != "0" && prox && "1" && prox != "2" && prox != "3" && prox != "4" && prox != "5" && prox != "6" && prox != "7" && prox != "8" && prox != "9" && comentario == false) {
                        token.push({
                            lexema: numero,
                            simbolo: "Snumero"
                        });
                        numero = "";
                    }
                    break;

                //Agrupa LETRAS em palavra (ate chegar em espaco)
                case (atual.toUpperCase() != atual.toLowerCase() && comentario == false):
                    palavra += atual;
                    console.log("palavra: " + palavra);
                    console.log("atual: " + atual);
                    console.log("prox: " + prox);

                    //Identificou que a palavra terminou, empilha palavras reservadas
                    if ((prox.toUpperCase() != prox.toLowerCase()) == false) {
                        console.log("entrou na validacao de lexema");
                        if (palavra === "programa") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sprograma"
                            });
                            palavra = "";
                        }
                        if (palavra === "inicio") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sinicio"
                            });
                            palavra = "";
                        }
                        if (palavra === "fim") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sfim"
                            });
                            palavra = "";
                        }
                        if (palavra === "procedimento") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sprocedimento"
                            });
                            palavra = "";
                        }
                        if (palavra === "funcao") {
                            token.push({
                                lexema: palavra,
                                simbolo: "funcao"
                            });
                        }
                        if (palavra.localeCompare("se") == 0) {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sse"
                            });
                            palavra = "";
                        }
                        if (palavra.normalize() === "entao".normalize()) {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sentao"
                            });
                            palavra = "";
                        }
                        if (palavra.normalize() === "senao".normalize()) {
                            token.push({
                                lexema: palavra,
                                simbolo: "Ssenao"
                            });
                            palavra = "";
                        }
                        if (palavra.normalize() === "enquanto".normalize()) {
                            token.push({
                                lexema: palavra,
                                simbolo: "Senquanto"
                            });
                            palavra = "";
                        }
                        if (palavra.normalize() === "faca".normalize()) {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sfaca"
                            });
                            palavra = "";
                        }
                        if (palavra.normalize() === "escreva".normalize()) {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sescreva"
                            });
                            palavra = "";
                        }
                        if (palavra === "leia") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sleia"
                            });
                            palavra = "";
                        }
                        if (palavra === "var") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Svar"
                            });
                            palavra = "";
                        }
                        if (palavra === "inteiro") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sinteiro"
                            });
                            palavra = "";
                        }
                        if (palavra === "booleano") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sbooleano"
                            });
                            palavra = "";
                        }
                        if (palavra === "div") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sdiv"
                            });
                            palavra = "";
                        }
                        if (palavra === "e") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Se"
                            });
                            palavra = "";
                        }
                        if (palavra === "ou") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sou"
                            });
                            palavra = "";
                        }
                        if (palavra === "nao") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Snao"
                            });
                            palavra = "";
                        } 
                        if (palavra != "") {
                            token.push({
                                lexema: palavra,
                                simbolo: "Sidentificador"
                            });
                            palavra = "";
                        }
                        palavra = "";
                    }

                    break;

                //Valida caracteres a serem desconsiderados E identifica final de palavra
                case (atual === " " || atual === "\t" || atual === "\n"):
                    //console.log("espaco ou \\t");

                    //caso seja espaco ou \t, sai
                    break;

                //Valida final de comentario (ignorando conteudo dentro)
                case (comentario == true):
                    //Final de comentario tipo 1
                    if (linha[posicao] === "}") {
                        comentario = false;
                        console.log("fecha comentario");
                    }
                    //Final de comentario tipo 2
                    if (atual === "*" && prox === "/") {
                        //TALVEZ AQUI: posicao atualiza pois ja validou a posicao seguinte
                        //posicao = posicao + 1;
                        console.log("fecha comentario especial");
                        comentario = false;
                    }
                    break;

                //Inicio de comentario tipo 1
                case (atual === "{"):
                    comentario = true;
                    console.log("abre comentario");
                    break;

                //Inicio de comentario tipo 2
                case (atual === "/" && prox === "*"):
                    comentario = true;
                    console.log("abre comentario especial");
                    //TALVEZ AQUI: posicao atualiza pois ja validou a posicao seguinte
                    //posicao = posicao + 1;
                    break;


                //SE CHEGOU AQUI, HA ERRO
                default:
                    console.log("default")
                    break;
            }

        }
    }


    console.log(token);


}
// Valida caso seja letra
function isAlpha(ch) {
    return /^[A-Z]$/i.test(ch);
}
// Valida caso seja numero
function isNumber(palavra) {
    if (isNaN(palavra)) {
        return false;
    }
    return true;
}
// Valida se palavra eh reservada
function isReserved(lexema) {
    if (tabelaTokens.hasOwnProperty(lexema)) {
        return tabelaTokens[lexema];
    }
    return false;
}

