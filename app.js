const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/produtorio', (req, res) => {
  const m = req.body.m;
  const n = req.body.n;
  const tipoexecucao = req.body.tipoexecucao;
  // Verifica se m e n são maiores que 0
  if (m <= 0 || n <= 0) {
    return res.status(400).json({ erro: 'm e n devem ser maiores que 0' });
  }

  let resultado;
  if (tipoexecucao === 'iterativa') {
    resultado = calcularProdutorioIterativo(m, n);
  } else if (tipoexecucao === 'recursiva') {
    resultado = calcularProdutorioRecursivo(m, n);
  } else {
    return res.status(400).json({ erro: 'tipo de execução inválido' });
  }

  res.json({ resultado: resultado });
});

function calcularProdutorioIterativo(m, n) {
  let produtorio = 1;
  for (let i = m; i <= n; i++) {
    produtorio *= i + (1/i) ;
  }
  return produtorio;
}

function calcularProdutorioRecursivo(m, n) {
  if (m > n) {
    return 1;
  }
  return (m + 1/m)*calcularProdutorioRecursivo(m + 1, n) ;
}

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
