//import * as token from './lexico/token.js';
//import * as main from '../main.js';

var programa = "se contador > 10 {teste comentario}\n" +
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

    console.log("\n" + programa);
    //Loop para andar pelo programa, linha por linha
    for (let index = 0; index < programa.length; index++) {
        //Variavel auxiliar
        let linha = programa[index];
        //console.log(linha);

        for (posicao = 0; posicao < linha.length; posicao++) {
            //console.log(linha[posicao]);
            atual = linha[posicao];
            //console.log("posicao atual: " + typeof atual);

            switch (atual) {

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
                    if (linha[posicao] === "*" && linha[posicao + 1] === "/") {
                        //TALVEZ AQUI: posicao atualiza pois ja validou a posicao seguinte
                        posicao = posicao + 1;
                        //final de comentario 2
                        comentario = false;
                    }
                    break;

                case (atual === "{"):
                    //inicio de comentario 1
                    comentario = true;
                    console.log("abre comentario");
                    break;

                case (linha[posicao] === "/" && linha[posicao + 1] === "*"):
                    //inicio de comentario 2
                    comentario = true;
                    //TALVEZ AQUI: posicao atualiza pois ja validou a posicao seguinte
                    posicao = posicao + 1;
                    break;


                default: //console.log("default")
                    break;
            }

        }
    }
}





