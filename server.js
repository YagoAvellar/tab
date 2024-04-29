const express = require('express');
const app = express();
const port = 3000;

// Função para gerar a tabuada
function gerarTabuada(numero) {
  const tabuada = [];
  for (let i = 0; i < 10; i++) { // Limite máximo de 10 multiplicações
    tabuada.push(`${numero} x ${i} = ${numero * i}`);
  }
  return tabuada;
}

// Rota para gerar a tabuada
app.get('/', (req, res) => {
  const numero = parseInt(req.query.tabuada); // Extrai o número da tabuada da URL

  // Valida se o número é válido (inteiro positivo)
  if (isNaN(numero) || numero <= 0) {
    res.status(400).send('Erro: Número inválido. Insira um número inteiro positivo.');
    return;
  }

  const tabuada = gerarTabuada(numero);

  // Crie o HTML dinâmico da tabuada
  const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tabuada Dinâmica</title>
      </head>
    <body>
      <h1>Tabuada do ${numero}</h1>
      <ul>
        ${tabuada.map(linha => `<li>${linha}</li>`).join('')}
      </ul>
    </body>
    </html>
  `;

  // Envie a página HTML como resposta
  res.send(html);
});

// Inicie o servidor
app.listen(port, () => console.log(`Servidor escutando na porta ${port}`));
