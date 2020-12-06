# **Contrução de Compiladores - 2º Semestre 2020**

![alt text](https://img.shields.io/badge/backend-Ok!-brightgreen) ![alt text](https://img.shields.io/badge/frontend-Ok!-brightgreen)


Compilador de linguagem LPD desenvolvido em dupla na disciplina Contrução de Compiladores, na Pontifícia Universidade Catolica de Campinas, no 2º semestre de 2020.
[UML](https://google.com)
##### Dupla:
  - [Bruno Camilo](https://www.linkedin.com/in/bruno-camilo-silv%C3%A9rio-546067159/)
  - [Daniel Fraga](https://www.linkedin.com/in/daniel-a-fraga/)
 


## Etapas/Módulos do Compilador
### Analisador Léxico:
- Primeira etapa da compilação
- Possibilitar a entrada de um arquivo .txt ou digitação livre de código LPD
- Realizar a geração de tokens do código inserido (seja por .txt ou digitado)
- Gerar erro Léxico (caracteres não identificados, comentários não terminados) contendo lexema problema e linha do erro


### Analisador Sintático
- Segunda etapa da compilação
- Validar a sequencia dos tokens
- Gerar erro Sintático (tokens fora da ordem esperada) contendo lexema e linha do erro


### Analisador Semântico:
- Terceira etapa da compilação
- Dividido em três "sub-módulos:
  #### Tabela de Simbolos
    - Inserir e validar variáveis, procedimentos e funções
  #### Pós-fixo
    - Tranformar expressão de in-fixo para pós-fixo
    - Inserir operadores e operandos
    - Avaliar expressão pós fixa
  #### Geração de Código
  - Realizar e geração do arquivo .obj contendo as instruções



### Máquina Virtual:
- Trazer segurança para todos os stakeholders
- Garantir que haja eficiência operacional
- Entregar vantagens reais para todos os stakeholders
- Aproveitar a plataforma atual da Blacktag
- Manter a experiência que o cliente já conhece
- Construir uma solução barata e facilmente escalável


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
- HTML
- CSS
