// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*  Primeira fase da análise
    •Principal função: fragmentar fonte em trecho elementares completos e com identidade própria (tokens).
    •Funções
    –Extração de tokens
    –Eliminação de delimitadores e comentários
    –Identificação de palavras reservadas
    –Recuperação de erros*/

/*Requisitos mínimos para que os testes ocorram:

- O analisador deve disponibilizar uma entrada de arquivos em formato .txt, e realizar a leitura desse arquivo.  
Neste arquivo teremos o programa escrito em LPD. Não serão aceitos analisadores que não permitam a entrada direta do arquivo. 

- O analisador deve realizar o processamento léxico do arquivo de entrada. Não serão aceitos analisadores que não completem o processamento.

- O programa deve apresentar como saída : uma lista de tokens contendo, para cada token, pelo menos seu tipo e lexema. Se ocorrer um erro, 
o programa deve retornar a lista de tokens até o momento do erro, e a linha em que o erro ocorreu, 
e parar o processamento. Não serão aceitos analisadores que não apresentem uma lista de tokens, e a linha do erro, caso ele ocorra.*/

//Inicio da analise lexica
function lexico(programa) {
    console.log("***** start LEXICO *****");

    let comentario = false; //se comentario esta aberto
    let foierro = false;    //se foi capturado um erro -> em breve inutil
    let posicao = 0;
    let atual = "";         //carater atual
    let prox = "";          //caracter proximo
    let antes = " ";        //caracter anterios
    let indexmais = 0;      //proximo valor do index
    let indexmenos = 0;     //valor anterior do index
    let lexema = "";
    let simbolo = "";
    let palavra = "";       //Recebe numeros
    let numero = "";
    let token = [];         //Lista com todos os Lexemas,Simbolos e Linhas
    let nlinha = 1;         //numero da linha, para salvar na lista

    //Printa programa que vai ser analisado
    //console.log("\n" + programa);

    //Loop linha por linha
    for (let index = 0; index < programa.length; index++) {
        //Variavel auxiliar
        //console.log(programa + " " + programa.length);
        //Variaveis para saber caracter anterior e proximo
        indexmais = index + 1;          //posicao do prox caracter
        indexmenos = index - 1;         //posicao do caracter anterior
        prox = programa[indexmais];     //recebe prox caracter (depois de atual)
        antes = programa[indexmenos];   //recebe caracter anterior (antes de atual)
        atual = programa[index]; //recebe caracter atual



        //Conta o numero da linha
        if (atual == "\n") {
            nlinha++;
        }

        //Caso tenha erro, interrompe, retorna os tokens ate o momento, e a linha do erro
        if (foierro == true) {
            return token;
        }

        //Caso as validacoes dentro do switch sejam true -> entra nos case
        switch (true) {


            //Valida final de comentario (ignorando conteudo dentro)
            case (comentario == true):
                //Final de comentario tipo 1
                if (atual === "}") {
                    comentario = false;
                }

                //Final de comentario tipo 2
                if (atual === "*" && prox === "/") {
                    comentario = false;
                    //Caso seja o ultimo caracter da linha, pula validacao do final
                    index = index + 1;

                }

                //Erro de comentario nao finalizado
                if (index === (programa.length - 1)) {
                    foierro = true;
                    token.push({
                        lexema: atual,
                        simbolo: "ERRO LEXICO",
                        linha: nlinha
                    });
                }
                break;

            //Inicio de comentario tipo 1
            case (atual === "{"):
                comentario = true;
                break;

            //Inicio de comentario tipo 2
            case (atual === "/" && prox === "*"):
                comentario = true;
                break;

            //Agrupa NUMEROS em numero (ate chegar em espaco)
            case (isNumber(atual) && comentario === false && !isAlpha(antes) && !isAlpha(prox)):

                numero = numero + atual;

                if (prox != "0" && prox != "1" && prox != "2" && prox != "3" && prox != "4" && prox != "5" && prox != "6" && prox != "7" && prox != "8" && prox != "9" && comentario == false) {
                    token.push({
                        lexema: numero,
                        simbolo: "Snumero",
                        linha: nlinha
                    });
                    numero = "";
                }
                break;

            //Agrupa LETRAS em palavra e trata (ate chegar em espaco)
            case ((isAlpha(atual) || isNumber(atual)) && comentario === false):
                palavra += atual;

                //Identificou que a palavra terminou, empilha palavras reservadas
                if (!isAlpha(prox) && !isNumber(prox)) {

                    if (palavra === "programa") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sprograma",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "inicio") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sinicio",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "fim") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sfim",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "procedimento") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sprocedimento",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "funcao") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sfuncao",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "se") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sse",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "entao") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sentao",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "senao") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Ssenao",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "enquanto") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Senquanto",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "faca") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sfaca",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "escreva") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sescreva",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "leia") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sleia",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "var") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Svar",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "inteiro") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sinteiro",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "booleano") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sbooleano",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "div") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sdiv",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "e") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Se",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "ou") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sou",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra === "nao") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Snao",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    if (palavra != "") {
                        token.push({
                            lexema: palavra,
                            simbolo: "Sidentificador",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    palavra = "";
                }
                break;

            //Trata atribuicao (dois pontos e atribuicao)
            case (atual === ":" && comentario === false):
                if (prox != "=") {
                    token.push({
                        lexema: atual,
                        simbolo: "Sdoispontos",
                        linha: nlinha
                    });
                }
                if (prox === "=")
                    token.push({
                        lexema: atual + prox,
                        simbolo: "Satribuicao",
                        linha: nlinha
                    });
                break;

            //Trata Operador Aritmetico
            case ((atual === "+" || atual === "-" || atual === "*") && comentario === false):
                if (atual === "+" && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Smais",
                        linha: nlinha
                    });
                }
                if (atual === "-") {
                    token.push({
                        lexema: atual,
                        simbolo: "Smenos",
                        linha: nlinha
                    });
                }
                if (atual === "*") {
                    token.push({
                        lexema: atual,
                        simbolo: "Smult",
                        linha: nlinha
                    });
                }
                break;

            //Trata Operador Relacional
            case ((atual === ">" || atual === "<" || atual == "=" || atual === "!") && comentario == false):
                //Maior e Maior Igual
                if (atual === ">" && prox != "=" && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Smaior",
                        linha: nlinha
                    });
                } else if (atual === ">" && prox === "=" && comentario == false) {
                    token.push({
                        lexema: atual + prox,
                        simbolo: "Smaiorig",
                        linha: nlinha
                    });
                    atual = "";
                }

                //Menor e Menor Igual
                if (atual === "<" && prox != "=" && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Smenor",
                        linha: nlinha
                    });
                }
                if (atual === "<" && prox === "=" && comentario == false) {
                    token.push({
                        lexema: atual + prox,
                        simbolo: "Smenorig",
                        linha: nlinha
                    });
                    atual = "";
                }
                //Igual
                if (atual === "=" && antes != "<" && antes != ">" && antes != "!" && antes != ":" && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Sig",
                        linha: nlinha
                    });
                    atual = "";
                }
                //Diferente
                if (atual === "!" && prox === "=" && comentario == false) {
                    token.push({
                        lexema: atual + prox,
                        simbolo: "Sdif",
                        linha: nlinha
                    });
                    atual = "";
                }
                //Erro com caracter ! sozinho
                if (atual === "!" && prox != "=") {
                    foierro = true;
                    //console.log(posicao);
                    token.push({
                        lexema: atual,
                        simbolo: "ERRO LEXICO",
                        linha: nlinha
                    });
                }

                break;

            //Trata Pontuacao
            case ((atual === "(" || atual === ")" || atual === ";" || atual === "." || atual == ",") && comentario == false):
                //Abre Parenteses
                if (atual === "(" && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Sabre_parenteses",
                        linha: nlinha
                    });
                }
                //Fecha Parenteses
                if (atual === ")" && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Sfecha_parenteses",
                        linha: nlinha

                    });
                }
                //Ponto e virgula
                if (atual === ";" && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Sponto_virgula",
                        linha: nlinha
                    });
                }
                //Ponto
                if (atual === "." && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Sponto",
                        linha: nlinha
                    });
                }
                //Virgula
                if (atual === "," && comentario == false) {
                    token.push({
                        lexema: atual,
                        simbolo: "Svirgula",
                        linha: nlinha
                    });
                }

                break;

            //Valida caracteres a serem desconsiderados
            case (atual === " " || atual === "\t" || atual === "\n"):
                //caso seja espaco ou \t, sai
                break;

            //SE CHEGOU AQUI, HA ERRO
            default:
                foierro = true;
                token.push({
                    lexema: atual,
                    simbolo: "ERRO LEXICO",
                    linha: nlinha
                });
                break;
        }

    }
    //console.log("====================================================================");
    //console.log(token);
    //console.log("====================================================================");
    console.log("***** end LEXICO *****");
    return (token);
}

//Funcao para validar se caracter eh letra
function isAlpha(palavra) {
    if (palavra) {
        if (palavra.toUpperCase() != palavra.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }
}

//Funcao para validar se caracter eh numero
function isNumber(palavra) {
    if (palavra == "0" || palavra == "1" || palavra == "2" || palavra == "3" || palavra == "4" || palavra == "5" || palavra == "6" || palavra == "7" || palavra == "8" || palavra == "9") {
        return true;
    } else {
        return false;
    }
}
