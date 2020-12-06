# **Contrução de Compiladores - 2º Semestre 2020**

![alt text](https://img.shields.io/badge/backend-Ok!-brightgreen) ![alt text](https://img.shields.io/badge/frontend-Ok!-brightgreen)


Compilador de linguagem LPD desenvolvido em dupla na disciplina Contrução de Compiladores, na Pontifícia Universidade Catolica de Campinas, no 2º semestre de 2020.
[UML](https://google.com)
##### Dupla:
  - [Bruno Camilo](https://www.linkedin.com/in/bruno-camilo-silv%C3%A9rio-546067159/)
  - [Daniel Fraga](https://www.linkedin.com/in/daniel-a-fraga/)
 


## Etapas/Módulos do Compilador
### [Analisador Léxico:](../Compilador/js/lexico/lexico.js)
- Primeira etapa do processo de compilação
- Possibilitar a entrada de um arquivo .txt ou digitação livre de código LPD
- Realizar a geração de tokens do código inserido (seja por .txt ou digitado)
- Gerar erro Léxico (caracteres não identificados, comentários não terminados) contendo lexema e linha do erro


### [Analisador Sintático:](../Compilador/js/sintatico/sintatico.js)
- Segunda etapa do processo de compilação
- Validar a sequencia dos tokens
- Gerar erro Sintático (tokens fora da ordem esperada) contendo lexema e linha do erro


### [Analisador Semântico:](../Compilador/js/semantico)
- Terceira etapa do pocesso de compilação
- Gerar erro Semântico (váriaveis/funções duplicadas, expressões com tipos errados) contendo lexema e linha do erro
- Dividido em três "sub-módulos":
  #### Tabela de Símbolos
    - Inserir variáveis, procedimentos e funções na tabela de símbolos
    - Validar se váriaveis, procedimentoe e funções existem e pertencem ao escopo
  #### Pós-fixo
    - Tranformar expressão de in-fixo para pós-fixo
    - Inserir operadores e operandos
    - Avaliar expressão pós fixa
  #### Geração de Código
  - Realizar e geração do arquivo .obj contendo as instruções



### Máquina Virtual:
- Responsável por executar o código gerado pelo compilador
- Opção de executar o código em sua totalidade, linha a linha ou com breakpoint
- Exibir ao usuário os campos de pilha de dados(memória), entrada e saida de dados



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
