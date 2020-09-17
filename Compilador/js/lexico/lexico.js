//import * as token from './lexico/token.js';
//import * as main from '../main.js';

var programa = "se contador > 10 /*teste comentario*/\n" +
    "entao escreva (contador)\n" +
    "senao escreva (x)";
//para testar, chama a funcao do lexico e envia o programa
lexico(programa);

function lexico(programa) {

    let comentario = false;
    let posicao = 0;
    let index = 0;
    let linha = 0;
    let atual = "";
    let prox = " ";
    let indexmais = 0;
    let lexema = "";
    let simbol = "";

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

                case (atual === " " || atual === "\t" || atual === "\n"):
                    console.log("espaco ou \\t");
                    //caso seja espaco ou \t, sai
                    break;

                case (comentario == true):
                    if (linha[posicao] === "}") {
                        //final de comentario 1
                        comentario = false;
                        console.log("fecha comentario");
                    }
                    if (atual === "*" && prox === "/") {
                        //TALVEZ AQUI: posicao atualiza pois ja validou a posicao seguinte
                        //posicao = posicao + 1;
                        //final de comentario 2
                        console.log("fecha comentario especial");
                        comentario = false;
                    }
                    break;

                case (atual === "{"):
                    //inicio de comentario 1
                    comentario = true;
                    console.log("abre comentario");
                    break;

                case (atual === "/" && prox === "*"):
                    //inicio de comentario 2
                    comentario = true;
                    console.log("abre comentario especial");
                    //TALVEZ AQUI: posicao atualiza pois ja validou a posicao seguinte
                    //posicao = posicao + 1;
                    break;

                case (isAlpha(linha[posicao])):
                    lexema += linha[posicao];
                    simbol = "Sidentificador";
                    console.log(lexema + " " + simbol);
                    break;




                default: //aqui acontece a excecao, ou seja, erro lexico
                    console.log("default")
                    break;
            }

        }
    }
}

function isAlpha(ch) {
    return /^[A-Z]$/i.test(ch);
}





