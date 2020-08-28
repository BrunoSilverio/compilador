/* Variavel que contem todo contudo do arquivo.obj */
let fileObj;

/* Variavel de controle para percorrer a pilha de memoria */
let s = -1;

/* Variavel de controle para percorrer a lista de instruções a serem executadas */
let i = 0;

/* Vetor responsavel por simular a pilha de memoria */
let memory = [];

/* Vetor responsavel por simular a lista de instruções a serem executadas */
let instructions = [];

/* Variavel de controle para identificar qual operação deve ser executada */
let operation = '';

/* Variavel de controle para identificar quando o programa deve finalizar a execução */
let exec = true;

/* Contador para lista de instruções */
let numInst = 1;

/* Funcao  */
function main(){
    while (condition) {
        operation = instructions[i].operation;

        switch (operation) {
            case "LDC":
                ldc();
                break;
            case "LDV":
                ldv();
                break;
            case "ADD":
                add();
                break;
            case "SUB":
                sub();
                break;
            case "MULT":
                mult();
                break;
            case "DIVI":
                divi();
                break;
            case "INV":
                inv();
                break;
            case "AND":
                and();
                break;
            case "OR":
                or();
                break;
            case "NEG":
                neg();
                break;
            case "CME":
                cme();
                break;
            case "CMA":
                cma();
                break;    
            case "CEQ":
                ceq();
                break;
            case "CDIF":
                cdif();
                break;
            case "CMEQ":
                cmeq();
                break;
            case "CMAQ":
                cmaq();
                break;
            case "START":
                start();
                break;
            case "HLT":
                hlt();
                break;
            case "STR":
                str();
                break;
            case "JMP":
                jmp();
                break;
            case "JMPF":
                jmpf();
                break;
            case "NULL":
                break;
            case "RD":
                rd();
                break;
            case "PRN":
                prn();
                break;
            case "ALLOC":
                alloc();
                break;
            case "DALLOC":
                dalloc();
                break;
            case "CALL":
                call();
                break;
            case "RETURN":
                retn();
                i = i-1;
                break;
            default:
                break;
        }
    }
}



