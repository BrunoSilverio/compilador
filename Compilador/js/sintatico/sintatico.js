// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*  •Principal função: analisar a sequência de apresentação dos tokens, efetuando a síntese da análise sintática, com base na gramática da linguagem fonte.
    •Principais funções:
    –Identificação de sentenças
    –Detecção de erros de sintaxe
    –Recuperação de erros
    –Montagem de árvore abstrata da sentença
    –Ativação do analisador léxico
    –Ativação de rotinas da análise semântica
    –Ativação de rotinas da síntese do código objeto 
*/

let tabelasimbolos = [];

//Funcao principal do Sintatico
function sintatico() {
    console.log("***** start SINTATICO *****");

    //tokenslexico = JSON.stringify(tokenslexico);  //Para transformar em String
    //Def rotulo inteiro
    //rotulo:= 1 
    tabelasimbolos = [];
    let nivel = 0;

    tabelasimbolos.push({
        lexema: "teste",
        simbolo: "simbolo",
        nivel: 1
    });

    tabelasimbolos.push({
        lexema: "teste",
        simbolo: "simbolo",
        nivel: 1
    });

    pesquisa_duplicvar_tabela("coisa", 1);
    pesquisa_duplicvar_tabela("teste", 1);


    return 0;



    //COMECA AQUI
    getToken();
    console.log("inicio");

    if (token.simbolo == "Sprograma") {
        console.log("entrou programa: ");
        getToken();

        if (token.simbolo == "Sidentificador") {
            console.log("entrou identificador: ");
            tabelasimbolos.push({
                lexema: token.lexema,
                id: "nomePrograma",
                nivel: nivel
            });
            getToken();

            if (token.simbolo == "Sponto_virgula") {
                console.log("entrou ponto_virgula");
                Analisa_Bloco();

                if (token.simbolo == "Sponto") {
                    console.log("entrou ponto: ");
                    getToken();

                    if (token.simbolo == undefined) {
                        //Caso chegue aqui, programa termina e retira ultimo token do final
                        tabelasimbolos.pop();
                        console.log("***** end SINTATICO *****");
                        alert("Executado com sucesso!");
                        document.getElementById('terminal').value = "Realizado com sucesso!";
                        //Valida se programa realmente acabou depois do ultimo ponto
                    } else {
                        //Erro pois tem coisa depois do ponto final
                        geraErroSintatico();
                    }
                } else {
                    //Faltou sponto
                    alert("ERRO SINTATICO:\n" + "Lexema: fim " + "\nEsperado '.' ");
                    document.getElementById('terminal').value = "Erro SINTATICO:\n" + "Lexema: fim " + "\nEsperado '.' ";
                    //var listatokens = JSON.stringify(listatokens);
                    //document.getElementById('terminal').value = listatokens.split(',{').join("\n");
                    console.log("***** end SINTATICO *****");
                    throw new Error("ERRO SINTATICO");
                }
            } else {
                //Faltou sponto_virgula
                geraErroSintatico();
            }
        } else {
            //Faltou sidentificador
            geraErroSintatico();
        }
    } else {
        //Faltou sprograma
        geraErroSintatico();
    }
}

//Funcao para fazer pedido de Token no lexico, aproveita para colocar tokens na lista, para exibir no terminal (front-end)
function getToken() {
    token = lexico();
    console.log("ENTROU GETTOKEN " + token.simbolo);
    console.log(tabelasimbolos);
    console.log(token.lexema + " " + token.simbolo + " " + token.linha);
}

//Funcao para erros sintaticos
function geraErroSintatico() {
    alert("ERRO SINTATICO\nLexema: " + token.lexema + "\nLinha: " + token.linha);
    document.getElementById('terminal').value = "Erro SINTATICO:\n" + "Lexema: " + token.lexema + "\nLinha: " + token.linha;
    //var listatokens = JSON.stringify(listatokens);
    //document.getElementById('terminal').value = listatokens.split(',{').join("\n");
    console.log("***** end SINTATICO *****");
    throw new Error("ERRO SINTATICO");
}

function Analisa_Bloco() {
    getToken();
    Analisa_et_variaveis();
    Analisa_Subrotinas();
    Analisa_comandos();
}

//Etapa de declaração de variáveis
function Analisa_et_variaveis() {
    if (token.simbolo == "Svar") {
        getToken();
        if (token.simbolo == "Sidentificador") {
            while (token.simbolo == "Sidentificador") {
                Analisa_Variaveis();
                if (token.simbolo == "Sponto_virgula") {
                    getToken();
                } else {
                    geraErroSintatico();
                }
            }
        } else {
            geraErroSintatico();
        }
    }
}

//Declaração de variáveis
function Analisa_Variaveis() {
    do {
        if (token.simbolo == "Sidentificador") {
            if (!pesquisa_duplicvar_tabela(token.lexema, nivel) && !pesquisa_declvarfunc_tabela(token.lexema) && !pesquisa_declproc_tabela(token.lexema)) {
                tabelasimbolos.push({
                    lexema: token.lexema,
                    id: "var",
                    level: level,
                    tipo: "",
                });

                getToken();
                if ((token.simbolo == "Svirgula") || (token.simbolo == "Sdoispontos")) {
                    if (token.simbolo == "Svirgula") {
                        getToken();
                        if (token.simbolo == "Sdoispontos") {
                            geraErroSintatico();
                        }
                    }
                } else {
                    geraErroSintatico();
                }
            } else {
                geraErroSemantico();
            }
        } else {
            geraErroSintatico();
        }
    } while (token.simbolo != "Sdoispontos");
    getToken();
    Analisa_Tipo();
}

//Tipo
function Analisa_Tipo() {
    if ((token.simbolo != "Sinteiro") && (token.simbolo != "Sbooleano")) {
        geraErroSintatico();
    } else {
        coloca_tipo_tabela(token.lexema);
    }
    getToken();
}

//Comandos
function Analisa_comandos() {
    if (token.simbolo == "Sinicio") {
        getToken();
        Analisa_comando_simples();
        while (token.simbolo != "Sfim") {
            if (token.simbolo == "Sponto_virgula") {
                getToken();
                if (token.simbolo != "Sfim") {
                    Analisa_comando_simples();
                }
            } else {
                geraErroSintatico();
            }
        }
        getToken();
    } else {
        geraErroSintatico();
    }
}

//Comando
function Analisa_comando_simples() {
    if (token.simbolo == "Sidentificador") {
        Analisa_atrib_chprocedimento();
    } else {
        if (token.simbolo == "Sse") {
            Analisa_se();
        } else {
            if (token.simbolo == "Senquanto") {
                Analisa_enquanto();
            } else {
                if (token.simbolo == "Sleia") {
                    Analisa_leia();
                } else {
                    if (token.simbolo == "Sescreva") {
                        Analisa_escreva();
                    } else {
                        Analisa_comandos();
                    }
                }
            }
        }
    }
}

//atribuição_chamada_procedimento
function Analisa_atrib_chprocedimento() {
    getToken();
    if (token.simbolo == "Satribuicao") {
        Analisa_atribuicao();
    } else {
        Chamada_procedimento();
    }
}

//Comando leitura
function Analisa_leia() {
    getToken();
    if (token.simbolo == "Sabre_parenteses") {
        getToken();
        if (token.simbolo == "Sidentificador") {
            //if (condition) {  //então se pesquisa_declvar_tabela(token.lexema)
            //if (condition) {//então início (pesquisa em toda a tabela)
            getToken();
            if (token.simbolo == "Sfecha_parenteses") {
                getToken();
            } else {
                geraErroSintatico();
            }
            //}
            //} else {
            //geraErroSintatico(); //AQUI É ERRO SEMANTICO
            //}
        } else {
            geraErroSintatico();
        }
    } else {
        geraErroSintatico();
    }
}

//Comando escrita
function Analisa_escreva() {
    getToken();
    if (token.simbolo == "Sabre_parenteses") {
        getToken();
        if (token.simbolo == "Sidentificador") {
            //if (pesquisa_declvarfunc_tabela(token.lexema)) { //então se pesquisa_ declvarfunc_tabela(token.lexema)
            //então início
            getToken();
            if (token.simbolo == "Sfecha_parenteses") {
                getToken();
            } else {
                geraErroSintatico();
            }
            //} else {
            //geraErroSintatico(); //AQUI É ERRO SEMANTICO
            //}
        } else {
            geraErroSintatico();
        }
    } else {
        geraErroSintatico();
    }
}

//Comando repetição
function Analisa_enquanto() {
    //Def auxrot1,auxrot2 inteiro 
    //auxrot1:= rotulo
    //Gera(rotulo,NULL,´ ´,´ ´) {início do while}
    //rotulo:= rotulo+1 
    getToken();
    Analisa_expressao();
    if (token.simbolo == "Sfaca") {
        //auxrot2:= rotulo
        //Gera(´ ´,JMPF,rotulo,´ ´) {salta se falso}
        //rotulo:= rotulo+1 
        getToken();
        Analisa_comando_simples();
        //Gera(´ ´,JMP,auxrot1,´ ´) {retorna início loop}
        //Gera(auxrot2,NULL,´ ´,´ ´) {fim do while} 
    } else {
        geraErroSintatico();
    }
}

//Comando condicional
function Analisa_se() {
    getToken();
    Analisa_expressao();
    if (token.simbolo == "Sentao") {
        getToken();
        Analisa_comando_simples();
        if (token.simbolo == "Ssenao") {
            getToken();
            Analisa_comando_simples();
        }
    } else {
        geraErroSintatico();
    }
}

//Etapa de declaração de sub-rotinas
function Analisa_Subrotinas() {
    //Def. auxrot, flag inteiro
    //flag = 0; 
    if ((token.simbolo == "Sprocedimento") || (token.simbolo == "Sfuncao")) {
        //auxrot:= rotulo
        //GERA(´ ´,JMP,rotulo,´ ´) {Salta sub-rotinas}
        //rotulo:= rotulo + 1;
        //flag = 1;

        while ((token.simbolo == "Sprocedimento") || (token.simbolo == "Sfuncao")) {
            if (token.simbolo == "Sprocedimento") {
                Analisa_declaracao_procedimento();
            } else {
                Analisa_declaracao_funcao();
            }
            if (token.simbolo == "Sponto_virgula") {
                getToken();
            } else {
                geraErroSintatico();
            }
        }
    }
    /*
    if (flag == 1) {
        //então Gera(auxrot,NULL,´ ´,´ ´) {início do principal}
    }
    */
}

//Declaração de procedimento
function Analisa_declaracao_procedimento() {
    getToken();
    //let nível = "L"; //(marca ou novo galho)
    if (token.simbolo == "Sidentificador") {
        //pesquisa_declproc_tabela(token.lexema) //SEMANTICO
        //if (returno == false) { //se não encontrou
        //então início
        //insere_tabela(token.lexema,"procedimento",nível) //SEMANTICO
        //{guarda na TabSimb}
        //Gera(rotulo,NULL,´ ´,´ ´)
        //{CALL irá buscar este rótulo na TabSimb}
        //rotulo:= rotulo+1;
        getToken();
        if (token.simbolo == "Sponto_virgula") {
            Analisa_Bloco();
        } else {
            geraErroSintatico();
        }
        //} else {
        //geraErroSintatico(); //AQUI É ERRO SEMANTICO
        //}
    } else {
        geraErroSintatico();
    }
    //DESEMPILHA OU VOLTA NÍVEL 
}

//Declaração de função
function Analisa_declaracao_funcao() {
    getToken();
    //let nível = "L" //(marca ou novo galho) SEMANTICO
    if (token.simbolo == "Sidentificador") {
        //pesquisa_declfunc_tabela(token.lexema) //SEMANTICO
        //if (retorno == false) { //se não encontrou
        //insere_tabela(token.lexema,"",nível)
        getToken();
        if (token.simbolo == "Sdoispontos") {
            getToken();
            if ((token.simbolo == "Sinteiro") || (token.simbolo == "Sbooleano")) {
                //if (token.símbolo = "Sinteger") { //SEMANTICO
                //TABSIMB[pc].tipo = "função inteiro"; //SEMANTICO
                //} else { //SEMANTICO
                //TABSIMB[pc].tipo = "função boolean";
                //}
                getToken();
                if (token.simbolo == "Sponto_virgula") {
                    Analisa_Bloco();
                }
            } else {
                geraErroSintatico();
            }
        } else {
            geraErroSintatico();
        }
        //} else { 
        //geraErroSintatico(); // AQUI É ERRO SEMANTICO
        //}
    } else {
        geraErroSintatico();
    }
    //DESEMPILHA OU VOLTA NÍVEL 
}

//Expressão
function Analisa_expressao() {
    Analisa_expressao_simples();
    if ((token.simbolo == "Smaior") || (token.simbolo == "Smaiorig") || (token.simbolo == "Sig") || (token.simbolo == "Smenor") || (token.simbolo == "Smenorig") || (token.simbolo == "Sdif")) {
        getToken();
        Analisa_expressao_simples();
    }
}

//Expressao simples
function Analisa_expressao_simples() {
    if ((token.simbolo == "Smais") || (token.simbolo == "Smenos")) {
        getToken();
    }
    Analisa_termo();
    while ((token.simbolo == "Smais") || (token.simbolo == "Smenos") || (token.simbolo == "Sou")) {
        getToken();
        Analisa_termo();
    }

}

//Termo
function Analisa_termo() {
    Analisa_fator();
    while ((token.simbolo == "Smult") || (token.simbolo == "Sdiv") || (token.simbolo == "Se")) {
        getToken();
        Analisa_fator();
    }
}

//Fator
function Analisa_fator() {
    if (token.simbolo == "Sidentificador") {
        //if (pesquisa_tabela(token.lexema,nível,ind)) { //SEMANTICO
        //if ((TabSimb[ind].tipo == "função inteiro") || (TabSimb[ind].tipo == "função booleano")) { //SEMANTICO
        Analisa_chamada_funcao();
        //} else {
        //getToken(); //SEMANTICO
        //}
        //} else {
        //geraErroSintatico(); //AQUI É ERRO SEMANTICO
        //}
    } else if (token.simbolo == "Snumero") {
        getToken();
    } else if (token.simbolo == "Snao") {
        getToken();
        Analisa_fator();
    } else if (token.simbolo == "Sabre_parenteses") {
        getToken();
        Analisa_expressao();
        if (token.simbolo == "Sfecha_parenteses") {
            getToken();
        } else {
            geraErroSintatico();
        }
    } else if (token.lexema == "verdadeiro" || token.lexema == "falso") {
        getToken();
    } else {
        geraErroSintatico();
    }
}

function Analisa_chamada_funcao() {
    getToken();
    // if (token.simbolo == "Sidentificador") {

    // } else {
    //     console.log("O erro esta aqui");
    //     geraErroSintatico();
    // }
}

function Chamada_procedimento() {

}

function Analisa_atribuicao() {
    getToken();
    Analisa_expressao();
}