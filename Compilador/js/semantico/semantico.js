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
