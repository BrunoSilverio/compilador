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

let index = 0;
let nlinha = 1;             //numero da linha, para salvar na lista
let token;


//Inicio da analise lexica
function lexico() {
    console.log("***** start LEXICO *****");

    let comentario = false; //se comentario esta aberto
    let foierro = false;    //se foi capturado um erro -> em breve inutil
    let atual = "";         //carater atual
    let prox = "";          //caracter proximo
    let antes = "";         //caracter anterios
    let indexmais = 0;      //proximo valor do index
    let indexmenos = 0;     //valor anterior do index
    let palavra = "";       //Recebe caracter
    let numero = "";
    token = "";         //Lista com todos os Lexemas,Simbolos e Linhas


    //Loop linha por linha
    for (index; index < programa.length; index++) {
        //Variavel auxiliar
        //Variaveis para saber caracter anterior e proximo
        indexmais = index + 1;          //posicao do prox caracter
        indexmenos = index - 1;         //posicao do caracter anterior
        prox = programa[indexmais];     //recebe prox caracter (depois de atual)
        antes = programa[indexmenos];   //recebe caracter anterior (antes de atual)
        atual = programa[index];    	//recebe caracter atual

        //Conta o numero da linha
        if (atual == "\n") {
            nlinha++;
        }

        //Caso tenha erro, interrompe, retorna os tokens ate o momento, e a linha do erro
        if (foierro == true) {
            //return token;
            console.log("Entrou if erro lexico");
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
                else if (atual === "*" && prox === "/") {
                    comentario = false;
                    //Caso seja o ultimo caracter da linha, pula validacao do final
                    index = index + 1;

                }

                //Erro de comentario nao finalizado
                if (index === (programa.length - 1)) {
                    // foierro = true;
                    // token.push({
                    //     lexema: atual,
                    //     simbolo: "ERRO LEXICO",
                    //     linha: nlinha
                    // });
                    alert("Erro Lexico\nComentario nao finalizado\nLinha: " + nlinha);
                }
                //return token;
                break;

            //Inicio de comentario tipo 1
            case (atual === "{"):
                comentario = true;
                //return token;
                break;

            //Inicio de comentario tipo 2
            case (atual === "/" && prox === "*"):
                comentario = true;
                //return token;
                break;

            //Agrupa NUMEROS em numero (ate chegar em espaco)
            case (isNumber(atual) && comentario === false && !isAlpha(antes) && !isAlpha(prox)):

                numero = numero + atual;

                if (prox != "0" && prox != "1" && prox != "2" && prox != "3" && prox != "4" && prox != "5" && prox != "6" && prox != "7" && prox != "8" && prox != "9" && comentario == false) {
                    token = {
                        lexema: numero,
                        simbolo: "Snumero",
                        linha: nlinha
                    };
                    console.log(token);
                    numero = "";
                    index++;
                    return token;
                }
                break;

            //Agrupa LETRAS em palavra e trata (ate chegar em espaco)
            case ((isAlpha(atual) || isNumber(atual)) && comentario === false):
                palavra += atual;

                //Identificou que a palavra terminou, empilha palavras reservadas
                if (!isAlpha(prox) && !isNumber(prox)) {

                    if (palavra === "programa") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sprograma",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "inicio") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sinicio",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "fim") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sfim",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "procedimento") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sprocedimento",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "funcao") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sfuncao",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "se") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sse",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "entao") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sentao",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "senao") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Ssenao",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "enquanto") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Senquanto",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "faca") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sfaca",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "escreva") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sescreva",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "leia") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sleia",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "var") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Svar",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "inteiro") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sinteiro",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "booleano") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sbooleano",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "div") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sdiv",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "e") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Se",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "ou") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sou",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra === "nao") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Snao",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    else if (palavra != "") {
                        token = ({
                            lexema: palavra,
                            simbolo: "Sidentificador",
                            linha: nlinha
                        });
                        palavra = "";
                    }
                    palavra = "";
                    console.log(token);
                    index++;
                    return token;
                }

                break;

            //Trata atribuicao (dois pontos e atribuicao)
            case (atual === ":" && comentario === false):
                if (prox != "=") {
                    token = ({
                        lexema: atual,
                        simbolo: "Sdoispontos",
                        linha: nlinha
                    });
                }
                else if (prox === "=") {
                    token = ({
                        lexema: atual + prox,
                        simbolo: "Satribuicao",
                        linha: nlinha
                    });
                }
                index++;
                return token;
                break;

            //Trata Operador Aritmetico
            case ((atual === "+" || atual === "-" || atual === "*") && comentario === false):
                if (atual === "+" && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Smais",
                        linha: nlinha
                    });
                }
                else if (atual === "-") {
                    token = ({
                        lexema: atual,
                        simbolo: "Smenos",
                        linha: nlinha
                    });
                }
                else if (atual === "*") {
                    token = ({
                        lexema: atual,
                        simbolo: "Smult",
                        linha: nlinha
                    });
                }
                index++;
                return token;
                break;

            //Trata Operador Relacional
            case ((atual === ">" || atual === "<" || atual == "=" || atual === "!") && comentario == false):
                //Maior e Maior Igual
                if (atual === ">" && prox != "=" && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Smaior",
                        linha: nlinha
                    });
                }
                else if (atual === ">" && prox === "=" && comentario == false) {
                    token = ({
                        lexema: atual + prox,
                        simbolo: "Smaiorig",
                        linha: nlinha
                    });
                    atual = "";
                }

                //Menor e Menor Igual
                if (atual === "<" && prox != "=" && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Smenor",
                        linha: nlinha
                    });
                }
                else if (atual === "<" && prox === "=" && comentario == false) {
                    token = ({
                        lexema: atual + prox,
                        simbolo: "Smenorig",
                        linha: nlinha
                    });
                    atual = "";
                }
                //Igual
                else if (atual === "=" && antes != "<" && antes != ">" && antes != "!" && antes != ":" && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Sig",
                        linha: nlinha
                    });
                    atual = "";
                }
                //Diferente
                else if (atual === "!" && prox === "=" && comentario == false) {
                    token = ({
                        lexema: atual + prox,
                        simbolo: "Sdif",
                        linha: nlinha
                    });
                    atual = "";
                }
                //Erro com caracter ! sozinho
                else if (atual === "!" && prox != "=") {
                    //foierro = true;
                    // token.push({
                    //     lexema: atual,
                    //     simbolo: "ERRO LEXICO",
                    //     linha: nlinha
                    // });
                    alert("Erro Lexico\nLexema: " + atual + "\nLinha: " + nlinha);
                }
                index++;
                return token;
                break;

            //Trata Pontuacao
            case ((atual === "(" || atual === ")" || atual === ";" || atual === "." || atual == ",") && comentario == false):
                //Abre Parenteses
                if (atual === "(" && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Sabre_parenteses",
                        linha: nlinha
                    });
                }
                //Fecha Parenteses
                else if (atual === ")" && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Sfecha_parenteses",
                        linha: nlinha

                    });
                }
                //Ponto e virgula
                else if (atual === ";" && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Sponto_virgula",
                        linha: nlinha
                    });
                }
                //Ponto
                else if (atual === "." && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Sponto",
                        linha: nlinha
                    });
                }
                //Virgula
                else if (atual === "," && comentario == false) {
                    token = ({
                        lexema: atual,
                        simbolo: "Svirgula",
                        linha: nlinha
                    });
                }
                index++;
                return token;
                break;

            //Valida caracteres a serem desconsiderados
            case (atual === " " || atual === "\t" || atual === "\n"):
                //caso seja espaco ou \t, sai
                break;

            //SE CHEGOU AQUI, HA ERRO
            default:
                // foierro = true;
                // token.push({
                //     lexema: atual,
                //     simbolo: "ERRO LEXICO",
                //     linha: nlinha
                // });
                alert("Erro Lexico\nLexema: " + atual + "\nLinha: " + nlinha);
                throw new Error("Erro lexico");
                //return token;
                break;
        }

    }
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
