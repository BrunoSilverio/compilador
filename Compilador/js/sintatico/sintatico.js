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
let nivel = 0;

//Funcao principal do Sintatico
function sintatico() {
    console.log("***** start SINTATICO *****");
    //tokenslexico = JSON.stringify(tokenslexico);  //Para transformar em String
    //Def rotulo inteiro
    nivel = 0;
    tabelasimbolos = [];

    //COMECA AQUI
    getToken();
    if (token.simbolo == "Sprograma") {
        getToken();
        if (token.simbolo == "Sidentificador") {
            tabelasimbolos.push({
                lexema: token.lexema,
                tipo: "nomePrograma",
                nivel: nivel
            });
            geraSTART();
            getToken();
            if (token.simbolo == "Sponto_virgula") {
                Analisa_Bloco();
                if (token.simbolo == "Sponto") {
                    getToken();
                    if (token.simbolo == undefined) {
                        geraHLT();
                        //geraCodigo(); //Apos geracao de codigo concluida, baixa arquivo
                        console.log(tabelasimbolos);
                        console.log("***** end SINTATICO *****");
                        document.getElementById('terminal').value = "Realizado com sucesso!";
                        alert("Executado com sucesso!");
                        //Valida se programa realmente acabou depois do ultimo ponto
                    } else {
                        //Erro pois tem coisa depois do ponto final
                        geraErroSintatico();
                    }
                } else {
                    //Faltou sponto
                    //geraErroSintatico();
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


function getToken() {
    token = lexico();
    console.log("TOKEN: " + token.lexema + " LINHA: " + token.linha);
}

//Funcao para erros sintaticos
function geraErroSintatico() {
    alert("ERRO SINTATICO\nLexema: " + token.lexema + "\nLinha: " + token.linha);
    document.getElementById('terminal').value = "Erro SINTATICO:\n" + "Lexema: " + token.lexema + "\nLinha: " + token.linha;
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
            if (!pesquisa_duplicvar_tabela(token.lexema, nivel)) { //validar em funcoes, proc e nomeprograma?
                tabelasimbolos.push({
                    lexema: token.lexema,
                    tipo: "var",
                    nivel: nivel,
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
    let tokenantigo = token;
    getToken();   //talvez esse gettoken nao fique aqui ???
    if (token.simbolo == "Satribuicao") {
        Analisa_atribuicao(tokenantigo);
    } else {
        Chamada_procedimento(tokenantigo);
    }
}

//Comando leitura
function Analisa_leia() {
    getToken();
    if (token.simbolo == "Sabre_parenteses") {
        getToken();
        if (token.simbolo == "Sidentificador") {
            if (pesquisa_declvar_tabela(token.lexema)) { //mesmo nivel? Outros niveis?
                getToken();
                if (token.simbolo == "Sfecha_parenteses") {
                    getToken();
                } else {
                    geraErroSintatico();
                }
            } else {
                geraErroSemantico();
            }
        }
        else {
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
            if (pesquisa_declvarfunc_tabela(token.lexema) || pesquisa_declfunc_tabela(token.lexema)) {
                getToken();
                if (token.simbolo == "Sfecha_parenteses") {
                    getToken();
                } else {
                    geraErroSintatico();
                }
            } else {
                geraErroSemantico();
            }
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
    limpaPosFixo();
    getToken();
    Analisa_expressao();
    let retornoPosFixo = analisaPosFixo();
    if (retornoPosFixo === "Sbooleano" || retornoPosFixo === "Sverdadeiro" || retornoPosFixo === "Sfalso") {
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
    } else {
        geraErroSemantico();
    }
}

//Comando condicional
function Analisa_se() {
    getToken();
    limpaPosFixo();
    Analisa_expressao();
    let retornoPosFixo = analisaPosFixo();
    if (retornoPosFixo === "Sbooleano" || retornoPosFixo === "Sverdadeiro" || retornoPosFixo === "Sfalso") {
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
    } else {
        geraErroSemantico();
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
    if (token.simbolo == "Sidentificador") {
        if (!pesquisa_declproc_tabela(token.lexema)) { //procura tmbm var, fun ou programa?
            nivel++;
            tabelasimbolos.push({
                lexema: token.lexema,
                tipo: "proc",
                nivel: nivel
            });
            //{guarda na TabSimb}
            //Gera(rotulo,NULL,´ ´,´ ´)
            //{CALL irá buscar este rótulo na TabSimb}
            getToken();
            if (token.simbolo == "Sponto_virgula") {
                Analisa_Bloco();
            } else {
                geraErroSintatico();
            }
        } else {
            geraErroSemantico();
        }
    } else {
        geraErroSintatico();
    }
    finalizaProcFunc(nivel);
    nivel--;
}

//Declaração de função
function Analisa_declaracao_funcao() {
    getToken();
    let tokenantigo = token; //NAO TA USANDO
    if (token.simbolo == "Sidentificador") {
        if (!pesquisa_declfunc_tabela(token.lexema)) {
            nivel++;
            tabelasimbolos.push({
                lexema: token.lexema,
                tipo: "func",
                nivel: nivel
            });
            getToken();
            if (token.simbolo == "Sdoispontos") {
                getToken();
                if ((token.simbolo == "Sinteiro") || (token.simbolo == "Sbooleano")) {

                    if (token.simbolo == "Sinteiro") {
                        tabelasimbolos[tabelasimbolos.length - 1].tipo = "func inteiro";
                    } else {
                        tabelasimbolos[tabelasimbolos.length - 1].tipo = "func booleano";
                    }
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
        } else {
            geraErroSemantico();
        }
    } else {
        geraErroSintatico();
    }
    finalizaProcFunc(nivel);
    nivel--;
}

//Expressão
function Analisa_expressao() {
    Analisa_expressao_simples();
    if ((token.simbolo == "Smaior") || (token.simbolo == "Smaiorig") || (token.simbolo == "Sig") || (token.simbolo == "Smenor") || (token.simbolo == "Smenorig") || (token.simbolo == "Sdif")) {
        //POSFIXO
        posFixoGerador();
        getToken();
        Analisa_expressao_simples();
    }
}

//Expressao simples
function Analisa_expressao_simples() {
    //dividir mais e menos para gerar menos unitario do posfixo?
    if ((token.simbolo == "Smais") || (token.simbolo == "Smenos")) {
        //POSFIXO EM UNITARIO
        getToken();
    }
    Analisa_termo();
    while ((token.simbolo == "Smais") || (token.simbolo == "Smenos") || (token.simbolo == "Sou")) {
        posFixoGerador();
        getToken();
        Analisa_termo();
    }
}

//Termo
function Analisa_termo() {
    Analisa_fator();
    while ((token.simbolo == "Smult") || (token.simbolo == "Sdiv") || (token.simbolo == "Se")) {
        posFixoGerador();
        getToken();
        Analisa_fator();
    }
}

//Fator
function Analisa_fator() {
    posFixoGerador();
    if (token.simbolo == "Sidentificador") {
        if (!pesquisa_declvar_tabela(token.lexema)) { //o que faz pesquisa tabela?
            if (pesquisa_declfunc_tabela(token.lexema)) {
                //POSFIXO
                Analisa_chamada_funcao();
            } else {
                //getToken(); //SEMANTICO
                geraErroSemantico();
            }
        } else {
            //POSFIXO
            getToken()
        }
    } else if (token.simbolo == "Snumero") {
        //POSFIXO
        getToken();
    } else if (token.simbolo == "Snao") {
        //POSFIXO
        getToken();
        Analisa_fator();
    } else if (token.simbolo == "Sabre_parenteses") {
        //POSFIXO
        getToken();
        Analisa_expressao();
        if (token.simbolo == "Sfecha_parenteses") {
            posFixoGerador();
            getToken();
        } else {
            geraErroSintatico();
        }
    } else if (token.simbolo == "Sverdadeiro" || token.simbolo == "Sfalso") {
        //POSFIXO
        getToken();
    } else {
        geraErroSintatico();
    }
}

function Analisa_chamada_funcao() {
    if (token.simbolo == "Sidentificador") {
        if (pesquisa_declfunc_tabela(token.lexema)) {
            getToken();
        } else {
            geraErroSemantico();
        }
    } else {
        geraErroSintatico();
    }
}

function Chamada_procedimento(tokenantigo) {
    if (pesquisa_declproc_tabela(tokenantigo.lexema)) {
        //getToken();
    } else {
        geraErroSemantico();
    }

}

function Analisa_atribuicao(tokenantigo) {
    getToken();
    limpaPosFixo();
    Analisa_expressao();
    let retornoPosFixo = analisaPosFixo();
    let tipoVar = buscaTipo(tokenantigo.lexema);

    if (tipoVar === "var inteiro") {
        if (retornoPosFixo != "Sinteiro" && retornoPosFixo != "Snumero") {
            geraErroSemantico();
        }

    } else {
        if (tipoVar === "var booleano") {
            if (retornoPosFixo != "Sbooleano" && retornoPosFixo != "Sverdadeiro" && retornoPosFixo != "Sfalso") {
                geraErroSemantico();
            }
        } else {
            geraErroSemantico();
        }
    }

}