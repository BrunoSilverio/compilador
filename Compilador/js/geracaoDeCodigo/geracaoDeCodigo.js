//Carregar constante
//s:=s + 1 ; M [s]: = k
function geraLDC(params) {
    
}

//Carrega valor
//s:=s+1 ; M[s]:=M[n]
function geraLDV(params) {
    
}

//Somar
//M[s-1]:=M[s-1]+M[s]; s:=s-1
function geraADD(params) {
    
}

//Subtrair
//M[s-1]:=M[s-1]-M[s]; s:=s-1
function geraSUB(params) {
    
}

//Multiplicar
//M[s-1]:=M[s-1]*M[s]; s:=s-1
function geraMULT(params) {
    
}

//Dividir
//M[s-1]:=M[s-1]div M[s]; s:=s-1
function geraDIVI(params) {
    
}

//Inverter sinal
//M[s]:=-M[s]
function geraINV(params) {
    
}

//Conjuncao
//Se M [s-1]=1 e M[s]=1 
//então M[s-1]:=1
//senão M[s-1]:=0; 
//S:=s-1
function geraAND(params) {
    
}

//Disjuncao
//Se M[s-1]=1 ou M[s]=1 
//então M[s-1]:=1 
//senão M[s-1]:=0; 
//s:=s-1
function geraOR(params) {
    
}

//Negacao
//M[s]:=1-M[s]
function geraNEG(params) {
    
}

//Comparar menor
//Se M[s-1]<M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCME(params) {
    
}

//Comparar maior
//Se M[s-1] >M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCMA(params) {
    
}

//Comparar igual
//Se M[s-1]=M[s]
//então M[s-1]:=1
//senão M[s-1]:=0;
//s:=s-1
function geraCEQ(params) {
    
}

//Comparar desigual
//Se M[s-1] ≠ M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0; 
//s:=s-1
function geraCDIF(params) {
    
}

//Comparar menor ou igual
//Se M[s-1] ≤ M[s]
//então M[s-1]:=1
//senão M[s-1]:=0;
//s:=s-1
function geraCMEQ(params) {
    
}

//Comparara maior ou igual
//Se M[s-1]≥  M[s]
//então M[s-1]:=1 
//senão M[s-1]:=0;
//s:=s-1
function geraCMAQ(params) {
    
}

//Armazenar valor
//M[n]:=M[s]; s:=s-1
function geraSTR(params) {
    
}

//Desviar sempre
function geraJMP(params) {
    
}

//Desviar se falso
//Se M[s]=0 então 
//i:=p senão
//i:=i+1;
//S:=s-1 
function geraJMPF(params) {
    
}

function geraNULL(params) {
    
}

//Leitura
//S:=s+1; M[s]:= “próximo valor de entrada”
function geraRD(params) {
    
}

//Impressao
//“Imprimir M[s]”; s:=s-1 
function geraPRN(params) {
    
}

//Iniciar programa principal
//s:=-1 
function geraSTART(params) {
    
}

//Alocar memoria
//s:=s+m
function geraALLOC(params) {
    
}

//Desalocar memoria
//Para k:=n-1 até 0 
//faça {M[m+k]:=M[s];
//s:=s-1} 
function geraDALLOC(params) {
    
}

//Parar
function geraHLT(params) {
    
}

//Chamar procedimento ou funcao
//s:=s+1; 
//M[s]:=i+1
//i:=p
function geraCALL(params) {
    
} 

//Retornar de procedimento
//i:=M[s]; 
//s:=s-1
function geraRETURN(params) {
    
} 
