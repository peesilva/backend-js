const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Escolha uma porta para o servidor local

app.use(express.json());

// Endpoint POST para receber dados e enviar para a API Spring Boot
app.post('/api-eventos', async (req, res) => {
    try {
        const payload = req.body; // Recebe o payload do cliente

        // Endpoint URL da sua API Spring Boot
        const springBootUrl = 'http://localhost:8080/eventos';

        // Faz a requisição POST para a API Spring Boot
        const response = await axios.post(springBootUrl, payload);

        // Retorna a resposta da API Spring Boot de volta para o cliente
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao enviar dados para a API Spring Boot:', error.message);
        res.status(500).send('Erro ao enviar dados para a API Spring Boot');
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor Node.js rodando em http://localhost:${port}`);
});