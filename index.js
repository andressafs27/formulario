import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    const usuario = {
        nome: requisicao.query.nome,
        sobrenome: requisicao.query.sobrenome,
        email: requisicao.query.email,
        senha: requisicao.query.senha,
        endereco: requisicao.query.endereco
    }

    listaUsuarios.push(usuario);
    let conteudoResposta = `
        <!DOCTYPE html>
        <html>
            <head>
                <!-- Restante do cabeçalho -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

            </head>
            <body>
                <h1>Usuários Cadastrados</h1>
                <table class="thead-dark">
                    <!-- Tabela de usuários cadastrados -->
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>E-mail</th>
                            <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody>`;

                    listaUsuarios.forEach((usuario) => {
                        conteudoResposta += `
                            <tr>
                                <td>${usuario.nome}</td>
                                <td>${usuario.sobrenome}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.endereco}</td>
                            </tr>`;
                    });
    
                    conteudoResposta += `

                </table>
                    <a href="/" class="badge badge-warning">Voltar ao Menu anterior</a>
                    <a href="/cadastra.html" class="badge badge-warning">Continuar Cadastrando</a>
            </body>
            <script></script>
        </html>`;
    
            resposta.send(conteudoResposta);
}

const app = express();

app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) => {
    resposta.end(
        `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <title>Formulário</title>
                <meta name='viewport' content='width=device-width, initial-scale=1'>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                <script src='main.js'></script>
            </head>
            <body>
                <h1>Menu</h1>
                <ul>
                    <li><a href="cadastra.html">Cadastrar Usuário</a></li>
                <ul>
            </body>
        </html>
    `
    )
});


app.get('/cadastra.html', (requisicao, resposta) => {
    resposta.sendFile(__dirname + '/paginas/cadastra.html');
});


app.get('/cadastra', processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});
