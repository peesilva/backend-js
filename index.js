const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Escolha uma porta para o servidor local

app.use(express.json());

// Endpoint POST para enviar dados para a API Spring Boot
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

// Endpoint GET para buscar todos os carros
app.get('/api-eventos', async (req, res) => {
    try {
        // Endpoint URL da sua API Spring Boot para buscar todos os carros
        const springBootUrl = 'http://localhost:8080/eventos';

        // Faz a requisição GET para a API Spring Boot
        const response = await axios.get(springBootUrl);

        // Retorna a resposta da API Spring Boot de volta para o cliente
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao buscar carros na API Spring Boot:', error.message);
        res.status(500).send('Erro ao buscar carros na API Spring Boot');
    }
});

// Endpoint GET para buscar um carro por ID
app.get('/api-eventos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Endpoint URL da sua API Spring Boot para buscar um carro por ID
        const springBootUrl = `http://localhost:8080/eventos/${id}`;

        // Faz a requisição GET para a API Spring Boot
        const response = await axios.get(springBootUrl);

        // Verifica se o carro foi encontrado
        if (response.status === 404) {
            return res.status(404).send('Carro não encontrado');
        }

        // Retorna a resposta da API Spring Boot de volta para o cliente
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(`Erro ao buscar carro com ID ${id} na API Spring Boot:`, error.message);
        res.status(500).send(`Erro ao buscar carro com ID ${id} na API Spring Boot`);
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor Node.js rodando em http://localhost:${port}`);
});