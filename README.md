# **Contrução de Compiladores - 2º Semestre 2020**

![alt text](https://img.shields.io/badge/backend-Ok!-brightgreen) ![alt text](https://img.shields.io/badge/frontend-Ok!-brightgreen)


Compilador de linguagem LPD desenvolvido em dupla na disciplina Contrução de Compiladores, na Pontifícia Universidade Catolica de Campinas, no 2º semestre de 2020.

[UML](https://google.com)
##### Dupla:
  - [Bruno Camilo - 16080293](https://www.linkedin.com/in/bruno-camilo-silv%C3%A9rio-546067159/)
  - [Daniel Fraga - 15218282](https://www.linkedin.com/in/daniel-a-fraga/)
 


## Etapas/Módulos do Compilador
### Analisador Léxico:
- Primeira etapa do processo de compilação
- Possibilita a entrada de um arquivo .txt ou digitação livre de código LPD
- Realiza a geração de tokens do código inserido
- Gera erro Léxico (caracteres não previsto, comentários não terminados) contendo lexema e linha do erro


### Analisador Sintático:
- Segunda etapa do processo de compilação
- Valida a sequencia dos tokens
- Gera erro Sintático (tokens fora da ordem esperada) contendo lexema e linha do erro


### Analisador Semântico:
- Terceira etapa do pocesso de compilação
- Gera erro Semântico (váriaveis/funções duplicadas, expressões com tipos errados) contendo lexema e linha do erro
- Dividido em três "sub-módulos":
  #### Tabela de Símbolos
    - Insere variáveis, procedimentos e funções na tabela de símbolos
    - Valida se váriaveis, procedimentoe e funções existem, pertencem ao escopo e tem mesmo tipo
  #### Pós-fixo
    - Insere operadores e operandos para análise de pós-fixo
    - Tranforma expressão de in-fixo para pós-fixo
    - Avalia expressão pós fixa
  #### Geração de Código
    - Realiza e geração das instruções com todos os parâmetros
    - Gerar e realizar o download do arquivo .obj (a ser executado pela Maquina Virtual)


### Máquina Virtual:
- Responsável por executar o código gerado pelo compilador
- Opção de executar o código em sua totalidade, linha a linha ou com breakpoint
- Exibe ao usuário os campos de pilha de dados(memória), entrada e saida do programa


### Desafios mapeados:
  - [x] Desenvolvimento/Testes Interface Gráfica
  - [x] Desenvolvimento/Testes Analisador Léxico
  - [x] Desenvolvimento/Testes Analisador Sintático
  - [x] Desenvolvimento/Testes Tabela de Símbolos
  - [x] Desenvolvimento/Testes Pós-fixo
  - [x] Desenvolvimento/Testes Geração de Código
  - [x] Realizacao de testes completos e complexos
  - [x] Correção de bugs encontrados
  - [x] Refatoração de partes críticas
  

#### Tech:
- Javascript
- [CodeMirror](https://codemirror.net/)
- HTML
- CSS
