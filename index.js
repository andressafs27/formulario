import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    const usuario = {
        nome: requisicao.query.nome,
        // Adicione os campos sobrenome e email se necessário
    }

    listaUsuarios.push(usuario);
    let conteudoResposta = `
        <!DOCTYPE html>
        <html>
            <head>
                <!-- Restante do cabeçalho -->
            </head>
            <body>
                <h1>Usuários Cadastrados</h1>
                <table class="table table-hover table-dark">
                    <!-- Tabela de usuários cadastrados aqui -->
                </table>
                <a href="/" class="badge badge-warning">Voltar ao Menu anterior</a>
                <a href="/cadastra.html" class="badge badge-warning">Continuar Cadastrando</a>
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
                <!-- Restante do cabeçalho -->
            </head>
            <body>
                <h1>Menu</h1>
                <ul>
                    <li><a href="/cadastra.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
        </html>
        `
    )
});

app.get('/cadastra', processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});
