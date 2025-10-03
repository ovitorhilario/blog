# Micro-Blogging

Desenvolvido em Node.js com MongoDB para a disciplina de Programação Web Back-End.
Aluno: Vitor Barbosa Hilário

## Pré-requisitos

- Node.js
- MongoDB

## Instalação

1. Clone o repositório
    ```bash
    git clone https://github.com/ovitorhilario/blog.git
    ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta raiz do projeto
   - A referência para o `.env` é o arquivo `.env.example`
   - `MONGODB_URI`: URI de conexão com MongoDB (padrão: `mongodb://localhost:27017`)
   - `DB_NAME`: Nome do banco de dados (padrão: `blog`)

## Exemplos de Uso

O projeto inclui dois exemplos executáveis:
- `OBS: Ao executar os arquivos de exemplo abaixo os arquivos .log serão gerados em ./logs.`

### Exemplo 1: Demonstração Completa
Mostra todas as funcionalidades do sistema de micro-blogging em ação.

```bash
npm run ex-1
```

Este exemplo demonstra:
- Criação de usuários
- Criação de postagens com hashtags
- Criação de comentários e respostas
- **Busca de posts** por hashtag
- Sistema de seguir/deixar de seguir
- Sistema de curtidas
- Timeline do usuário
- Atualização de dados

### Exemplo 2: Tratamento de Erros
Demonstra como o sistema lida com situações de erro e validações.

```bash
npm run ex-2
```

Este exemplo demonstra:
- Validação de campos obrigatórios
- Validação de formato de email
- Validação de tamanho de strings
- Prevenção de duplicatas
- Tratamento de registros inexistentes
- Sistema de **logging de erros**