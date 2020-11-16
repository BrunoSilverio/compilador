// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*
    • Objetivo: conter um registro para cada identificador
    – distinguir o escopo de validade de cada símbolo
    – Reconhecer o escopo para o qual um símbolo é ativado  
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
        if (item.lexema == lexema && (item.tipo == "var inteiro" || item.tipo == "var booleano")) { //adicionar OU FUNCAO?
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

function pesquisa_tabela(token_lexema, nivel) {
    for (simbolo in tabelasimbolos) {
        if (simbolo.lexema === token_lexema) {
            if (simbolo.nivel >= nivel) {
                return true;
            } else {
                if (simbolo.nivel === 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

function finalizaProcFunc(nivel) {
    //exlui vars
    for (let i = 0; i < tabelasimbolos.length; i++) {
        if (tabelasimbolos[i].nivel == nivel) {
            if (tabelasimbolos[i].tipo === "func inteiro" || tabelasimbolos[i].tipo === "func booleano" || tabelasimbolos[i].tipo === "proc") {
            } else {
                tabelasimbolos.splice(i);
                i = 0;
            }
        }
    }
    //exclui funcoes e proc
    for (let i = 0; i < tabelasimbolos.length; i++) {
        if (tabelasimbolos[i].nivel == nivel + 1) {
            if (tabelasimbolos[i].tipo === "func inteiro" || tabelasimbolos[i].tipo === "func booleano" || tabelasimbolos[i].tipo === "proc") {
                tabelasimbolos.splice(i);
                i = 0;
            }
        }
    }
}