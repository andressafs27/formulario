import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

const app = express();

//endereço
app.use(express.static('./paginas'));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
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
    </html>`
    
    
    
    
})

app.listen(porta, host, () =>{
    console.log(`Servidor executando na url http://${host}:${porta}`);
})