// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*
    • Fase final da compilação
    • Tradução do código intermediário em programa objeto
    • Programas objeto: Pode ser em linguagem de máquina absoluta, relocável, assembly, ou outra linguagem de programação qualquer.
*/

let arquivo = "";
let parametro1 = 0;
let parametro2 = 0;

//funcao para gerar o codigo final e exportar para o usuario
function geraCodigo() {
    var file = new Blob([arquivo], {type: Object});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "compilador.obj";  //NOME DO ARQUIVO A SER BAIXADO
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

//Carregar constante
//s:=s + 1 ; M [s]: = k
function geraLDC(parametro1) {
    arquivo += "LDC "+parametro1+"\n";
}

//Carrega valor
//s:=s+1 ; M[s]:=M[n]
function geraLDV(parametro1) {
    arquivo += "LDV "+parametro1+"\n";
}

//Somar
//M[s-1]:=M[s-1]+M[s]; s:=s-1
function geraADD() {
    arquivo += "ADD\n";
}

//Subtrair
//M[s-1]:=M[s-1]-M[s]; s:=s-1
function geraSUB() {
    arquivo += "SUB\n";
}

//Multiplicar
//M[s-1]:=M[s-1]*M[s]; s:=s-1
function geraMULT() {
    arquivo += "MULT\n";
}

//Dividir
//M[s-1]:=M[s-1]div M[s]; s:=s-1
function geraDIVI() {
    arquivo += "DIVI\n";
}

//Inverter sinal
//M[s]:=-M[s]
function geraINV() {
    arquivo += "INV\n";
}

//Conjuncao
//Se M [s-1]=1 e M[s]=1 
//então M[s-1]:=1
//senão M[s-1]:=0; 
//S:=s-1
function geraAND() {
    arquivo += "AND\n";
}

//Disjuncao
//Se M[s-1]=1 ou M[s]=1 
//então M[s-1]:=1 
//senão M[s-1]:=0; 
//s:=s-1
function geraOR() {
    arquivo += "OR\n";
}

//Negacao
//M[s]:=1-M[s]
function geraNEG() {
    arquivo += "NEG\n";
}

//Comparar menor
//Se M[s-1]<M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCME() {
    arquivo += "CME\n";
}

//Comparar maior
//Se M[s-1] >M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCMA() {
    arquivo += "CMA\n";
}

//Comparar igual
//Se M[s-1]=M[s]
//então M[s-1]:=1
//senão M[s-1]:=0;
//s:=s-1
function geraCEQ() {
    arquivo += "CEQ\n";
}

//Comparar desigual
//Se M[s-1] ≠ M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0; 
//s:=s-1
function geraCDIF() {
    arquivo += "CDIF\n";
}

//Comparar menor ou igual
//Se M[s-1] ≤ M[s]
//então M[s-1]:=1
//senão M[s-1]:=0;
//s:=s-1
function geraCMEQ() {
    arquivo += "CMEQ\n";
}

//Comparara maior ou igual
//Se M[s-1]≥  M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCMAQ() {
    arquivo += "CMAQ\n";
}

//Armazenar valor
//M[n]:=M[s]; s:=s-1
function geraSTR(parametro1) {
    arquivo += "STR "+parametro1+"\n";
}

//Desviar sempre
function geraJMP(parametro1) {
    arquivo += "JMP "+parametro1+"\n";
}

//Desviar se falso
//Se M[s]=0 então 
//i:=p senão
//i:=i+1;
//S:=s-1 
function geraJMPF(parametro1) {
    arquivo += "JMPF "+parametro1+"\n";
}

function geraNULL() {
    arquivo += "NULL\n";
}

//Leitura
//S:=s+1; M[s]:= “próximo valor de entrada”
function geraRD() {
    arquivo += "RD\n";
}

//Impressao
//“Imprimir M[s]”; s:=s-1 
function geraPRN() {
    arquivo += "PRN\n";
}

//Iniciar programa principal
//s:=-1 
function geraSTART() {
    arquivo += "START\n";
}

//Alocar memoria
//s:=s+m
function geraALLOC(parametro1, parametro2) {
    arquivo += "ALLOC "+parametro1+","+parametro2+"\n";
}

//Desalocar memoria
//Para k:=n-1 até 0 
//faça {M[m+k]:=M[s];
//s:=s-1} 
function geraDALLOC(parametro1, parametro2) {
    arquivo += "DALLOC "+parametro1+","+parametro2+"\n";
}

//Parar
function geraHLT() {
    arquivo += "HLT\n";
}

//Chamar procedimento ou funcao
//s:=s+1; 
//M[s]:=i+1
//i:=p
function geraCALL(parametro1) {
    arquivo += "CALL "+parametro1+"\n";
}

//Retornar de procedimento
//i:=M[s]; 
//s:=s-1
function geraRETURN(params) {
    arquivo += "RETURN\n";
} 
