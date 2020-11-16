// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*
    • Objetivo: captar significado das ações do código fonte
    • É uma fase de difícil formalização →  especificações informais.
    • Utiliza a tabela de símbolos construída pelos outros analisadores.
    • Principais funções:
        – Manter informações sobre o escopo dos identificadores
        – Representar tipos de dados
*/

function geraErroSemantico() {
    alert("ERRO SEMANTICO\nLexema: " + token.lexema + "\nLinha: " + token.linha);
    document.getElementById('terminal').value = "Erro SEMANTICO:\n" + "Lexema: " + token.lexema + "\nLinha: " + token.linha;
    //var listatokens = JSON.stringify(listatokens);
    //document.getElementById('terminal').value = listatokens.split(',{').join("\n");
    throw new Error("ERRO SEMANTICO");
}

function insere_tabela(token_lexema, String, nivel) {

}



/*
1) Verificação da ocorrência da duplicidade na declaração de um identificador (nome
do programa, procedimento, função ou variável). Sempre que for detectado um novo
identificador, deve ser feita uma busca para verificar as seguintes possibilidades:
a) se ele for uma variável verificar se já não existe outra variável visível1
 de mesmo nome no mesmo nível de declaração e verificar se já não existe outro identificador
de mesmo nome (que não seja uma variável) em qualquer nível inferior ou igual ao
da variável agora analisada.
b) Se for o nome de um procedimento ou função verificar se já não existe um outro
identificador visível de qualquer tipo em nível igual ao inferior ao agora analisado. 
*/
function Pesquisa_duplicvar_tabela(token_lexema) {
    let duplicidade;


}

/*
2) Verificação de uso de identificadores não declarados. Sempre que for detectado um
identificador, verificar se ele foi declarado (está visível na tabela de símbolos) e é
compatível com o uso (exemplo: variável usada que existe como nome de programa ou
de procedimento na tabela de símbolos deve dar erro). 
*/
function pesquisa_declvar_tabela(token_lexema) {

}

function pesquisa_declvarfunc_tabela(token_lexema) {

}

//5) Verificação de chamadas de procedimento 
function pesquisa_declproc_tabela(token_lexema) {

}

//5) Verificação de chamadas de função
function pesquisa_declfunc_tabela(token_lexema) {

}

/*
3) Verificação de compatibilidade de tipos. Sempre que ocorrer um comando de
atribuição, verificar se a expressão tem o mesmo tipo da variável ou função que a
recebe. 
*/
function coloca_tipo_tabela(token_lexema) {

}

function pesquisa_tabela(token_lexema, nivel, ind) {

}

//4) Verificação dos comandos escreva e leia. 

//6) Verificação dos operadores unários – , + , nao