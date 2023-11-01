import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta){
    const usuario = {
                      nome : requisicao.query.nome,
                    } 

    listaUsuarios.push(usuario);
    let conteudoResposta = 
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
                <h1>Usuários Cadastrados</h1>
                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Sobrenome</th>
                            <th scope="col">E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                    `;

    for(const usuario of listaUsuarios){
        conteudoResposta += `
        <tr>
            <td>${usuario.nome}</td>
            <td>${usuario.sobrenome}</td>
            <td>${usuario.email}</td>
        </tr>
        `
    }
    
    conteudoResposta += `

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
                    <li><a href="/cadastra.html>Cadastrar Usuário</a></li>
                <ul>
            </body>
        </html>
    `
    
    
    )
    
});

app.get('/cadastra', processarCadastroUsuario);

app.listen(porta, host, () =>{
    console.log(`Servidor executando na url http://${host}:${porta}`);
})