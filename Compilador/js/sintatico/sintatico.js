// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*  •Principal função: analisar a sequência de apresentação dos tokens, efetuando a síntese da análise sintática, com base na gramática da linguagem fonte.
    •Principais funções:
    –Identificação de sentenças
    –Detecção de erros de sintaxe
    –Recuperação de erros
    –Montagem de árvore abstrata da sentença
    –Ativação do analisador léxico
    –Ativação de rotinas da análise semântica
    –Ativação de rotinas da síntese do código objeto */


let index = -1;
let tokensintatico = []; //Salva aqui os tokens gerados pelo sintatico
let token;

//Inicio da analise sintatico
function sintatico(listatokens) {
    console.log("***** start SINTATICO *****");
    //Zera os valores a cada Compilacao
    index = -1;
    tokensintatico = []; //Salva aqui os tokens gerados pelo sintatico

    let tokenslexico = listatokens; //tokenslexico recebe listatokens vindo do lexico
    //tokenslexico = JSON.stringify(tokenslexico);  //Para transformar em String


    //Inicio do Sintatico
    getToken(tokenslexico);
    console.log("inicio");
    console.log(tokensintatico);
    if (token.simbolo == "Sprograma") {
        geraToken();
        getToken(tokenslexico);
        console.log("entrou programa: ");
        console.log(tokensintatico);

        if (token.simbolo == "Sidentificador") {
            geraToken();
            getToken(tokenslexico);
            console.log("entrou identificador: ");
            console.log(tokensintatico);

            if (token.simbolo == "Sponto_virgula") {
                geraToken();
                //Analisa_Bloco();
                console.log("entrou ponto virgul: ");
                console.log(tokensintatico);

                if (token.simbolo == "Sponto") {
                    geraToken();
                    getToken(tokenslexico);
                    console.log("entrou ponto: ");
                    console.log(tokensintatico);

                    if (token.simbolo == undefined) {
                        console.log("Sintatico finalizado");
                        //tratar se o codigo de fato acabou (depois do ponto)
                    } else {
                        if (token.simbolo == "ERRO LEXICO") {
                            geraErroLexico();
                        } else {
                            geraErroSintatico();
                        }
                        return tokensintatico;
                    }
                    return tokensintatico;
                } else {
                    if (token.simbolo == "ERRO LEXICO") {
                        geraErroLexico();
                    } else {
                        geraErroSintatico();
                    }
                    return tokensintatico;
                }
            } else {
                if (token.simbolo == "ERRO LEXICO") {
                    geraErroLexico();
                } else {
                    geraErroSintatico();
                }
                return tokensintatico;
            }
        } else {
            if (token.simbolo == "ERRO LEXICO") {
                geraErroLexico();
            } else {
                geraErroSintatico();
            }
            return tokensintatico;
        }
    } else {
        if (token.simbolo == "ERRO LEXICO") {
            geraErroLexico();
        } else {
            geraErroSintatico();
        }
        return tokensintatico;
    }

    console.log(tokensintatico);
    console.log("***** end SINTATICO *****");
}

// --- FUNCOES ---

function getToken(tokenslexico) {
    index++;
    token = tokenslexico[index];

}

function geraToken() {
    tokensintatico.push({
        lexema: token.lexema,
        simbolo: token.simbolo,
        linha: token.linha
    });
}


function geraErroSintatico() {
    tokensintatico.push({
        lexema: token.lexema,
        simbolo: "ERRO SINTATICO",
        linha: token.linha
    });
}

function geraErroLexico() {
    tokensintatico.push({
        lexema: token.lexema,
        simbolo: "ERRO LEXICO",
        linha: token.linha
    });
}

function Analisa_Bloco(bloco) {
    /*
        início
            Léxico(token)
            Analisa_et_variáveis
            Analisa_subrotinas
            Analisa_comandos
        fim
    */
}

function Analisa_et_variaveis(etapa_de_declaracao_de_variaveis) {
    /* 
        início
            se token.simbolo = svar
            então início
                Léxico(token)
                se token.símbolo = sidentificador
                então enquanto(token.símbolo = sidentificador)
                    faça início
                        Analisa_Variáveis
                        se token.símbolo = spontvirg
                        então Léxico (token)
                        senão ERRO
                    fim
                senão ERRO
        fim
    */
}

function Analisa_Variaveis(declaração_de_variaveis) {
    /*
        início
            repita
                se token.símbolo = sidentificador
                então início
                    //Pesquisa_duplicvar_ tabela(token.lexema)
                    //se não encontrou duplicidade
                    //então início
                        //insere_tabela(token.lexema, “variável”)
                        Léxico(token)
                        se (token.símbolo = Svírgula) ou
                            (token.símbolo = Sdoispontos)
                        então início
                            se token.símbolo = Svírgula
                            então início
                                léxico(token)
                                se token.simbolo = Sdoispontos
                                então ERRO
                            fim
                        fim
                        senão ERRO
                    //fim
                    //senão ERRO
                senão ERRO
            até que (token.símbolo = sdoispontos)
            Léxico(token)
            Analisa_Tipo
        fim
    */
}

function Analisa_Tipo(tipo) {
    /*
        início
            se (token.símbolo != sinteiro e token.símbolo != sbooleano))
            então ERRO
            //senão coloca_tipo_tabela(token.lexema)
            Léxico(token)
        fim
    */
}

function Analisa_comandos(comandos) {
    /*
        início
            se token.simbolo = sinicio
            então início
                Léxico(token)
                Analisa_comando_simples
                enquanto (token.simbolo != sfim)
                faça início
                    se token.simbolo = spontovirgula
                    então início
                        Léxico(token)
                        se token.simbolo != sfim
                        então Analisa_comando_simples
                        fim
                        senão ERRO
                    fim
                    Léxico(token)
                fim
            senão ERRO
        fim
    */
}

function Analisa_comando_simples(comando) {
    /*
    início
        se token.simbolo = sidentificador
        então Analisa_atrib_chprocedimento
        senão
        se token.simbolo = sse
        então Analisa_se
        senão
        se token.simbolo = senquanto
        então Analisa_enquanto
        senão
        se token.simbolo = sleia
        então Analisa_leia
        senão
        se token.simbolo = sescreva
        então Analisa_ escreva
        senão
        Analisa_comandos
    fim
    */
}

function Analisa_atrib_chprocedimento(atribuição_chprocedimento) {
    /* 
    início
        Léxico(token)
        se token.simbolo = satribuição
        então Analisa_atribuicao 
        senão Chamada_procedimento
    fim
    */
}

function Analisa_leia(comando_leitura) {
    /*
        início
            Léxico(token)
            se token.simbolo = sabre_parenteses
            então início
                Léxico(token)
                se token.simbolo = sidentificador
                //então se pesquisa_declvar_tabela(token.lexema)
                    //então início (pesquisa em toda a tabela)
                        Léxico(token)
                        se token.simbolo = sfecha_parenteses
                        então Léxico(token)
                        senão ERRO
                    fim
                //senão ERRO
                senão ERRO
                fim
            senão ERRO
        fim
    */
}

function Analisa_escreva(comando_escrita) {
    /*
    início
        Léxico(token)
        se token.simbolo = sabre_parenteses
        então início
            Léxico(token)
            se token.simbolo = sidentificador
            //então se pesquisa_ declvarfunc_tabela(token.lexema)
                //então início
                    Léxico(token)
                    se token.simbolo = sfecha_parenteses
                    então Léxico(token)
                    senão ERRO
                fim
            //senão ERRO
            senão ERRO
        fim
        senão ERRO
    fim
    */
}

function Analisa_enquanto(comando_repeticao) {
    /*
        //Def auxrot1,auxrot2 inteiro
        início
            //auxrot1:= rotulo
            //Gera(rotulo,NULL,´ ´,´ ´) {início do while}
            //rotulo:= rotulo+1
            Léxico(token)
            Analisa_expressão
            se token.simbolo = sfaça
            então início
                //auxrot2:= rotulo
                //Gera(´ ´,JMPF,rotulo,´ ´) {salta se falso}
                //rotulo:= rotulo+1
                Léxico(token)
                Analisa_comando_simples
                //Gera(´ ´,JMP,auxrot1,´ ´) {retorna início loop}
                //Gera(auxrot2,NULL,´ ´,´ ´) {fim do while}
            fim
            senão ERRO
        fim
    */
}

function Analisa_se(comando_condicional) {
    /*
        início
            Léxico(token)
            Analisa_expressão
            se token.símbolo = sentão
            então início
                Léxico(token)
                Analisa_comando_simples
                se token.símbolo = Ssenão
                então início
                    Léxico(token)
                    Analisa_comando_simples
                fim
            fim
            senão ERRO
        fim
    */
}

function Analisa_Subrotinas(etapa_de_declaracao_de_sub_rotinas) {
    /*
        //Def. auxrot, flag inteiro
        Início
            flag = 0
            if (token.simbolo = sprocedimento) ou (token.simbolo = sfunção)
            então início
                //auxrot:= rotulo
                //GERA(´ ´,JMP,rotulo,´ ´) {Salta sub-rotinas}
                //rotulo:= rotulo + 1
                //flag = 1
            fim
            enquanto (token.simbolo = sprocedimento) ou (token.simbolo = sfunção)
            faça início
                    se (token.simbolo = sprocedimento)
                    então analisa_declaração_procedimento
                    senão analisa_ declaração_função
                    se token.símbolo = sponto-vírgula
                    então Léxico(token)
                    senão ERRO
                fim
            if flag = 1
            //então Gera(auxrot,NULL,´ ´,´ ´) {início do principal}
        fim
    */
}

function Analisa_declaracao_procedimento(declaracao_de_procedimento) {
    /*
        início
            Léxico(token)
            //nível := “L” (marca ou novo galho)
            se token.símbolo = sidentificador
            então início
                //pesquisa_declproc_tabela(token.lexema)
                //se não encontrou
                //então início
                    //Insere_tabela(token.lexema,”procedimento”,nível, rótulo)
                    //{guarda na TabSimb}
                    //Gera(rotulo,NULL,´ ´,´ ´)
                    //{CALL irá buscar este rótulo na TabSimb}
                    //rotulo:= rotulo+1
                    Léxico(token)
                    se token.simbolo = sponto_vírgula
                    então Analisa_bloco
                    senão ERRO
                //fim
                //senão ERRO
                fim
            senão ERRO
            //DESEMPILHA OU VOLTA NÍVEL
        fim
    */
}

function Analisa_declaracao_funcao(declaracao_de_funcao) {
    /*
        início
            Léxico(token)
            //nível := “L” (marca ou novo galho)
            se token.símbolo = sidentificador
            então início
                //pesquisa_declfunc_tabela(token.lexema)
                //se não encontrou
                //então início
                    //Insere_tabela(token.lexema,””,nível,rótulo)
                    Léxico(token)
                    se token.símbolo = sdoispontos
                    então início
                        Léxico(token)
                        se (token.símbolo = Sinteiro) ou (token.símbolo = Sbooleano)
                        então início
                            //se (token.símbolo = Sinteger)
                            //então TABSIMB[pc].tipo:= “função inteiro”
                            //senão TABSIMB[pc].tipo:= “função boolean”
                            Léxico(token)
                            se token.símbolo = sponto_vírgula
                            então Analisa_bloco
                        fim
                        senão ERRO
                    fim
                    senão ERRO
                fim
                //senão ERRO
            fim
            senão ERRO
            //DESEMPILHA OU VOLTA NÍVEL
        fim
    */
}

function Analisa_expressao(xpressao) {
    /*
        início
            Analisa_expressão_simples
            se (token.simbolo = (smaior ou smaiorig ou sig ou smenor ou smenorig ou sdif))
            então inicio
                Léxico(token)
                Analisa_expressão_simples
            fim
        fim
    */
}

function Analisa_expressao_simples(expressao_simples) {
    /*
        início
            se (token.simbolo = smais) ou (token.simbolo = smenos)
            então Léxico(token)
            Analisa_termo
            enquanto ((token.simbolo = smais) ou (token.simbolo = smenos) ou (token.simbolo = sou))
            faça inicio
                Léxico(token)
                Analisa_termo
            fim
        fim
    */
}

function Analisa_termo(termo) {
    /*
        início
            Analisa_fator
            enquanto ((token.simbolo = smult) ou (token.simbolo = sdiv) ou (token.simbolo = se))
            então início
                Léxico(token)
                Analisa_fator
            fim
        fim
    */
}

function Analisa_fator(fator) {
    /*
        Início
        Se token.simbolo = sidentificador (* Variável ou Função*)
        Então inicio
            //Se pesquisa_tabela(token.lexema,nível,ind)
            //Então Se (TabSimb[ind].tipo = “função inteiro”) ou (TabSimb[ind].tipo = “função booleano”)
            //Então Analisa_chamada_função
            //Senão Léxico(token)
            //Senão ERRO
        Fim
        Senão Se (token.simbolo = snumero) (*Número*)
            Então Léxico(token)
            Senão Se token.símbolo = snao (*NAO*)
            Então início
                Léxico(token)
                Analisa_fator
            Fim
        Senão Se token.simbolo = sabre_parenteses(* expressão entre parenteses *)
            Então início
                Léxico(token)
                Analisa_expressão(token)
                Se token.simbolo = sfecha_parenteses
                Então Léxico(token)
                Senão ERRO
            Fim
        Senão Se (token.lexema = verdadeiro) ou (token.lexema = falso)
            Então Léxico(token)
        Senão ERRO
        Fim
    */
}




