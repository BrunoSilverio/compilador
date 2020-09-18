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

var programa = "se contador > 13 {teste comentario}\n" +
    "entao escreva, >= (contador)\n" +
    "senao + escreva <= (x)";
//para testar, chama a funcao do lexico e envia o programa
//teste = FileReader.readAsText();
lexico(programa);



//Inicio da analise lexica
function lexico(programa) {

    let comentario = false;
    let foierro = false;
    let posicao = 0;
    let index = 0;
    let linha = 0;
    let atual = "";
    let prox = " ";
    let antes = " ";
    let indexmais = 0;
    let indexmenos = 0;
    let lexema = "";
    let simbolo = "";
    let pilha = 0;
    let palavra = "";
    let numero = "";
    let token = [];
    let erro = 1;

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
        indexmenos = index - 1;
        prox = programa[indexmais]; //recebe prox caracter (depois de atual)
        antes = programa[indexmenos];
        //console.log(linha);

        for (posicao = 0; posicao < linha.length; posicao++) {

            atual = linha[posicao]; //recebe caracter atual
            //Conta a linha do erro
            if (atual == "\n") {
                erro++;
            }

            //Caso tenha erro, interrompe, retorna os tokens ate o momento, e a linha do erro
            // if(foierro == true){
            //     console.log("Foi erro: " + atual + "na linha: " + erro)
            //     console.log(token);
            //     return 0;
            // }

            //Caso as validacoes dentro do switch sejam true -> entra nos case
            switch (true) {



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

                //Agrupa LETRAS em palavra e trata (ate chegar em espaco)
                case (atual.toUpperCase() != atual.toLowerCase() && comentario == false):
                    palavra += atual;

                    //Identificou que a palavra terminou, empilha palavras reservadas
                    if ((prox.toUpperCase() != prox.toLowerCase()) == false) {

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

                //Trata atribuicao (dois pontos e atribuicao)
                case (atual === ":" && comentario == false):
                    if (prox != "=") {
                        token.push({
                            lexema: atual,
                            simbolo: "Sdoispontos"
                        });
                    }
                    if (prox === "=")
                        token.push({
                            lexema: atual + prox,
                            simbolo: "Satribuicao"
                        });
                    break;

                //Trata Operador Aritmetico
                case (atual === "+" || atual === "-" || atual === "*" && comentario == false):
                    if (atual === "+" && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Smais"
                        });
                    }
                    if (atual === "-") {
                        token.push({
                            lexema: atual,
                            simbolo: "Smenos"
                        });
                    }
                    if (atual === "*") {
                        token.push({
                            lexema: atual,
                            simbolo: "Smult"
                        });
                    }
                    break;

                //Trata Operador Relacional
                case (atual === ">" || atual === "<" || atual == "=" || atual === "!" && comentario == false):
                    //Maior e Maior Igual
                    if (atual === ">" && prox != "=" && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Smaior"
                        });
                    } else if (atual === ">" && prox === "=" && comentario == false) {
                        token.push({
                            lexema: atual + prox,
                            simbolo: "Smaiorig"
                        });
                        atual = "";
                        console.log("valor atual: " + atual);
                    }

                    //Menor e Menor Igual
                    if (atual === "<" && prox != "=" && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Smenor"
                        });
                    }
                    if (atual === "<" && prox === "=" && comentario == false) {
                        token.push({
                            lexema: atual + prox,
                            simbolo: "Smenorig"
                        });
                        atual = "";
                    }
                    //Igual
                    if (atual === "=" && antes != "<" && antes !=">" && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Sig"
                        });
                        atual = "";
                    }
                    //Diferente
                    if (atual === "!" && prox === "=" && comentario == false) {
                        token.push({
                            lexema: atual + prox,
                            simbolo: "Sdif"
                        });
                        atual = "";
                    }



                    break;

                //Trata Pontuacao
                case (atual === "(" || atual === ")" || atual === ";" || atual === "." || atual == "," && comentario == false):
                    //Abre Parenteses
                    if (atual === "(" && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Sabre_parenteses"
                        });
                    }
                    //Fecha Parenteses
                    if (atual === ")" && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Sfecha_parenteses"
                        });
                    }
                    //Ponto e virgula
                    if (atual === ";" && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Sponto_virgula"
                        });
                    }
                    //Ponto
                    if (atual === "." && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Sponto"
                        });
                    }
                    //Virgula
                    if (atual === "," && comentario == false) {
                        token.push({
                            lexema: atual,
                            simbolo: "Svirgula"
                        });
                    }

                    break;

                //Valida caracteres a serem desconsiderados
                case (atual === " " || atual === "\t" || atual === "\n"):
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
                        //console.log("fecha comentario especial");
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
                    //console.log("abre comentario especial");
                    //TALVEZ AQUI: posicao atualiza pois ja validou a posicao seguinte
                    //posicao = posicao + 1;
                    break;


                //SE CHEGOU AQUI, HA ERRO
                default:
                    console.log("Erro Lexico: " + atual + " na linha: " + erro);
                    foierro = true;
                    token.push({
                        lexema: atual,
                        simbolo: "ERRO"
                    });
                    break;
            }
        }
    }

    console.log(token);
    return (token);


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

//Exporta Analisador Lexico
//module.exports = lexico(programa);
//module.exports.lexico();
//export {lexico};
//export const lexic