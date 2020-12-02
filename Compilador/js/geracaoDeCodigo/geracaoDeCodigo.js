// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*
    • Fase final da compilação
    • Tradução do código intermediário em programa objeto
    • Programas objeto: Pode ser em linguagem de máquina absoluta, relocável, assembly, ou outra linguagem de programação qualquer.
*/

let arquivo = "";
let parametro1 = 0;
let parametro2 = 0;

//funcao para gerar arquivo.obj para o usuario
function geraCodigo() {
    var file = new Blob([arquivo], { type: Object });
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = "compilador.obj";  //NOME DO ARQUIVO A SER BAIXADO
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

//Carregar constante
//s:=s + 1 ; M [s]: = k
function geraLDC(parametro1) {
    console.log("LDC " + parametro1);
    arquivo += "LDC " + parametro1 + "\n";
}

//Carrega valor
//s:=s+1 ; M[s]:=M[n]
function geraLDV(parametro1) {
    console.log("LDV " + parametro1);
    arquivo += "LDV " + parametro1 + "\n";
}

//Somar
//M[s-1]:=M[s-1]+M[s]; s:=s-1
function geraADD() {
    console.log("ADD");
    arquivo += "ADD\n";
}

//Subtrair
//M[s-1]:=M[s-1]-M[s]; s:=s-1
function geraSUB() {
    console.log("SUB");
    arquivo += "SUB\n";
}

//Multiplicar
//M[s-1]:=M[s-1]*M[s]; s:=s-1
function geraMULT() {
    console.log("MULT");
    arquivo += "MULT\n";
}

//Dividir
//M[s-1]:=M[s-1]div M[s]; s:=s-1
function geraDIVI() {
    console.log("DIVI");
    arquivo += "DIVI\n";
}

//Inverter sinal
//M[s]:=-M[s]
function geraINV() {
    console.log("INV");
    arquivo += "INV\n";
}

//Conjuncao
//Se M [s-1]=1 e M[s]=1 
//então M[s-1]:=1
//senão M[s-1]:=0; 
//S:=s-1
function geraAND() {
    console.log("AND");
    arquivo += "AND\n";
}

//Disjuncao
//Se M[s-1]=1 ou M[s]=1 
//então M[s-1]:=1 
//senão M[s-1]:=0; 
//s:=s-1
function geraOR() {
    console.log("OR");
    arquivo += "OR\n";
}

//Negacao
//M[s]:=1-M[s]
function geraNEG() {
    console.log("NEG");
    arquivo += "NEG\n";
}

//Comparar menor
//Se M[s-1]<M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCME() {
    console.log("CME");
    arquivo += "CME\n";
}

//Comparar maior
//Se M[s-1] >M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCMA() {
    console.log("CMA");
    arquivo += "CMA\n";
}

//Comparar igual
//Se M[s-1]=M[s]
//então M[s-1]:=1
//senão M[s-1]:=0;
//s:=s-1
function geraCEQ() {
    console.log("CEQ");
    arquivo += "CEQ\n";
}

//Comparar desigual
//Se M[s-1] ≠ M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0; 
//s:=s-1
function geraCDIF() {
    console.log("CDIF");
    arquivo += "CDIF\n";
}

//Comparar menor ou igual
//Se M[s-1] ≤ M[s]
//então M[s-1]:=1
//senão M[s-1]:=0;
//s:=s-1
function geraCMEQ() {
    console.log("CMEQ");
    arquivo += "CMEQ\n";
}

//Comparara maior ou igual
//Se M[s-1]≥  M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCMAQ() {
    console.log("CMAQ");
    arquivo += "CMAQ\n";
}

//Armazenar valor
//M[n]:=M[s]; s:=s-1
function geraSTR(parametro1) {
    console.log("STR " + parametro1);
    arquivo += "STR " + parametro1 + "\n";
}

//Desviar sempre
function geraJMP(rotulo) {
    arquivo += "JMP L" + rotulo + "\n";
}

//Desviar se falso
//Se M[s]=0 então 
//i:=p senão
//i:=i+1;
//S:=s-1 
function geraJMPF(rotulo) {
    arquivo += "JMPF L" + rotulo + "\n";
}

function geraNULL(rotulo) {
    arquivo += "L" + rotulo + " NULL\n";
}

//Leitura
//S:=s+1; M[s]:= “próximo valor de entrada”
function geraRD() {
    console.log("RD");
    arquivo += "RD\n";
}

//Impressao
//“Imprimir M[s]”; s:=s-1 
function geraPRN() {
    console.log("PRN");
    arquivo += "PRN\n";
}

//Iniciar programa principal
//s:=-1 
function geraSTART() {
    console.log("START");
    arquivo += "START\n";
}

//Alocar memoria
//s:=s+m
function geraALLOC(parametro1, parametro2) {
    console.log("ALLOC " + parametro1 + "," + parametro2);
    arquivo += "ALLOC " + parametro1 + "," + parametro2 + "\n";
}

//Desalocar memoria
//Para k:=n-1 até 0 
//faça {M[m+k]:=M[s];
//s:=s-1} 
function geraDALLOC(parametro1, parametro2) {
    console.log("DALLOC " + parametro1 + "," + parametro2);
    arquivo += "DALLOC " + parametro1 + "," + parametro2 + "\n";
}

//Parar
function geraHLT() {
    console.log("HLT");
    arquivo += "HLT";
}

//Chamar procedimento ou funcao
//s:=s+1; 
//M[s]:=i+1
//i:=p
function geraCALL(parametro1) {
    console.log("CALL " + parametro1);
    arquivo += "CALL L" + parametro1 + "\n";
}

//Retornar de procedimento
//i:=M[s]; 
//s:=s-1
function geraRETURN() {
    console.log("RETURN");
    arquivo += "RETURN\n";
}


function geraPosFixoExpressao() {

    for (let i = 0; i <= (posFixo.length - 1); i++) {
        switch (posFixo[i].simbolo) {

            case "Sidentificador":
                if (pesquisa_declfunc_tabela(posFixo[i].lexema)) {
                    let mem = locEndMemoria(posFixo[i].lexema);
                    if (mem != -1) {
                        geraCALL(mem);
                        geraLDV(0);
                    }
                } else {
                    if (pesquisa_declvar_tabela(posFixo[i].lexema)) { //mesmo nivel? Outros niveis?
                        let mem = locEndMemoria(posFixo[i].lexema);
                        if (mem != -1) {
                            geraLDV(mem);
                        }
                    }
                }
                break;


            case "Snumero":
                geraLDC(posFixo[i].lexema);
                break;

            case "Sverdadeiro":
                geraLDC(1);
                break;

            case "Sfalso":
                geraLDC(0);
                break;

            case "Smenosu":
                geraINV();
                break;

            case "Snao":
                geraNEG();
                break;

            case "Smult":
                geraMULT();
                break;

            case "Sdiv":
                geraDIVI();
                break;

            case "Smais":
                geraADD();
                break;

            case "Smenos":
                geraSUB();
                break;

            case "Smaior":
                geraCMA();
                break;

            case "Smenor":
                geraCME();
                break;

            case "Smaiorig":
                geraCMAQ();
                break;

            case "Smenorig":
                geraCMEQ();
                break;

            case "Sig":
                geraCEQ();
                break;

            case "Sdif":
                geraCDIF();
                break;

            case "Sou":
                geraOR();
                break;

            case "Se":
                geraAND();
                break;

            default:
                break;
        }

    }
}