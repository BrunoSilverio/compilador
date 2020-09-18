//import * as token from './token.js';
import * as main from '../main.js';

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

var programa = "se contador > 10 /*teste comentario*/\n" +
    "entao escreva (contador)\n" +
    "senao escreva (x)";
//para testar, chama a funcao do lexico e envia o programa
lexico(programa);



function lexico(programa) {

    let comentario = false;
    let tipopalavra = false;
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

                    lexema: palavra;
                    simbolo: "Sabre_parenteses";

                    console.log("( || Sabre_parenteses");
                    break;

                //Agrupa NUMEROS em numero (ate chegar em espaco)
                case (!isNaN(atual) && !isNaN(prox) && comentario == false):
                    numero += atual;

                    break;

                //Agrupa LETRAS em palavra (ate chegar em espaco)
                case (atual.toUpperCase() != atual.toLowerCase() && prox.toUpperCase() != prox.toLowerCase() && comentario == false):
                    palavra += atual;

                    break;

                //Valida caracteres a serem desconsiderados E identifica final de palavra
                case (atual === " " || atual === "\t" || atual === "\n"):
                    console.log("espaco ou \\t");
                    //Identifica que acabou a palavra
                    palavra = "";
                    numero = "";
                    //Chama função validar caso seja numero
                    lexema = isNumber(palavra);
                    if (lexema == true) {
                        main.tokens.push({
                            lexema: palavra,
                            simbolo: "Snumero"
                        });

                    
                        break;
                    }

                    //Chama função validar palavra reservada
                    simbolo = isReserved(lexema);

                    main.tokens.push({
                        lexema: palavra,
                        simbolo: simbolo
                    });

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

