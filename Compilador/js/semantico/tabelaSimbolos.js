// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*
    • Objetivo: captar significado das ações do código fonte
    • É uma fase de difícil formalização →  especificações informais.
    • Utiliza a tabela de símbolos construída pelos outros analisadores.
    • Principais funções:
        – Manter informações sobre o escopo dos identificadores
        – Representar tipos de dados
*/

//Valores duplicados na tabela de simbolos (lexema e nivel)
function pesquisa_duplicvar_tabela(lexema, nivel) {
    console.log(tabelasimbolos);
    const item = tabelasimbolos.find(function (item) {
        if (item.lexema == lexema && item.nivel == nivel) {
            return item;
        }
    });

    if (item == undefined) {
        return false;
    } else {
        return true;
    }
}

function coloca_tipo_tabela(tipo) {

    for (let i = tabelasimbolos.length - 1; i >= 0; i--) {

        if (tabelasimbolos[i] == undefined) {
            break;
        }
        if (tabelasimbolos[i].tipo == "var") {
            tabelasimbolos[i].tipo = "var " + tipo;
        }
    }

}

//Valores duplicados na tabela de simbolos (lexema e id)
function pesquisa_declvar_tabela(lexema) {
    const item = tabelasimbolos.find(function (item) {
        if (item.lexema == lexema && (item.tipo == "var" || item.tipo == "var inteiro" || item.tipo == "var booleano")) { //talvez sem o tipo var, pois ainda nao tem tipo
            return item;
        }
    });
    if (item == undefined) {
        return false;
    } else {
        return true;
    }
}

function pesquisa_declvarfunc_tabela(lexema) {
    const item = tabelasimbolos.find(function (item) {
        if (item.lexema == lexema && (item.tipo == "var inteiro" || item.id == "var booleano")) { //adicionar OU FUNCAO?

            return item;
        }
    });
    if (item == undefined) {
        return false;
    } else {
        return true;
    }
}

function pesquisa_declproc_tabela(lexema) {
    const item = tabelasimbolos.find(function (item) {
        if (item.lexema == lexema && item.tipo == "proc") {
            return item;
        }
    });
    if (item == undefined) {
        return false;
    } else {
        return true;
    }
}

function pesquisa_declfunc_tabela(lexema) {
    const item = tabelasimbolos.find(function (item) {
        if (item.lexema == lexema && (item.tipo == "func inteiro" || item.tipo == "func booleano")) {
            return item;
        }
    });
    if (item == undefined) {
        return false;
    } else {
        return true;
    }
}

function pesquisa_tabela(token_lexema, nivel, ind) {

}