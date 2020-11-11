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

//Valores duplicados na tabela de simbolos (lexema e nivel)
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

//Valores duplicados na tabela de simbolos (lexema e id)
function pesquisa_declvar_tabela(lexema) {
    const item = main.simbolTable.find(function (item) {
        if (item.lexema == lexema && item.id == "var") {
            //Existe igual (lexema e tipo)
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

function pesquisa_declvarfunc_tabela(lexema) {
    const item = main.simbolTable.find(function (item) {
        if (item.lexema == lexema && (item.id = "var" && item.id == "func")) {
            //Existe igual (lexema e tipo)
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

function pesquisa_declproc_tabela(lexema) {
    const item = main.simbolTable.find(function (item) {
        if (item.lexema == lexema && item.id == "proc") {
            //Existe igual (lexema e tipo)
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

function pesquisa_declfunc_tabela(lexema) {
    const item = main.simbolTable.find(function (item) {
        if (item.lexema == lexema && item.id == "func") {
            //Existe igual (lexema e tipo)
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

function pesquisa_tabela(token_lexema, nivel, ind) {

}