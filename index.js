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
                <style>
                    /* Estilos para a tabela de usuários cadastrados */
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }

                    table, th, td {
                        border: 1px solid black;
                    }

                    th{
                        text-align:center;
                        padding: 10px;
                    }

                    td {
                        padding: 10px;
                        text-align: left;
                    }

                    thead {
                        background-color: #333;
                        color: #fff;
                    }

                    /* Estilos para os botões */
                    a {
                        display: inline-block;
                        padding: 10px 20px;
                        margin: 10px;
                        background-color: black;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                        border:1px black;
                    }

                    a:hover {
                        background-color: white;
                        color:black;
                    }

                    h1{
                        font-size: 24px;
                        text-align: center;
                    }

                    body {
                        background-color: #6bdb74;
                    }
                </style>
            
            </head>
            <body>
                <h1>Usuários Cadastrados</h1>
                <table>
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
                    <a href="/" >Voltar ao Menu anterior</a>
                    <a href="/cadastra.html">Continuar Cadastrando</a>
            </body>
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
                <script src='main.js'></script>
                <style>

                    body{
                        background-color: purple;
                    }

                    h1 {
                        color: white; 
                        font-size: 24px; 
                        text-align: center;
                    }

                    ul {
                        list-style-type: none; 
                    }

                    li {
                        margin-bottom: 10px; 
                    }

                    a{
                        text-decoration: none; 
                        color: black; 
                        font-weight: bold;
                        text-align:center;
                        border-radius: 5px;
                        border: 1px white; 
                        background-color: pink;
                        padding: 8px;
                    }

                </style>
                
            </head>
            <body>
                <h1>Menu</h1>
                <ul>
                    <li><a href="cadastra.html">Cadastrar Usuário</a></li>
                </ul>
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
