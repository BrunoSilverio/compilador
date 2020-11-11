// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*
    • Objetivo: captar significado das ações do código fonte
    • É uma fase de difícil formalização →  especificações informais.
    • Utiliza a tabela de símbolos construída pelos outros analisadores.
    • Principais funções:
        – Manter informações sobre o escopo dos identificadores
        – Representar tipos de dados
*/

//Uso direto no sintatico
function insere_tabela(token_lexema, String, nivel) {

}

function pesquisa_duplicvar_tabela(lexema, nivel) {
    console.log(tabelasimbolos);
    const item = tabelasimbolos.find(function (item) {
        if (item.lexema == lexema && item.nivel == nivel) {
            //Existe igual (lexema e nivel)
            //console.log(item);
            return item;
        }
    });

    if (item == undefined) {
        //Retorna que nao encontrou igual
        return false;
    } else {
        //Retorna que encontrou igual
        return true;
    }
}

function coloca_tipo_tabela(token_lexema) {

}

function pesquisa_declvar_tabela(lexema) {

}

function pesquisa_declvarfunc_tabela(token_lexema) {

}

function pesquisa_declproc_tabela(token_lexema) {

}

function pesquisa_declfunc_tabela(token_lexema) {

}

function pesquisa_tabela(token_lexema, nivel, ind) {

}