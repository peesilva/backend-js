const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Escolha uma porta para o servidor local
const springBootUrl = 'http://localhost:8080/eventos';

app.use(express.json());

// Função para transformar o payload antes de enviar para a API Spring Boot
const transformPayload = (payload) => {
    return {
        companyId: payload.cnpj, // Transforma o campo cnpj para companyId
        url: payload.url,
        number: payload.number
    };
};

// Endpoint POST para enviar dados para a API Spring Boot
app.post('/api-eventos', async (req, res) => {
    try {
        const payload = req.body; // Recebe o payload do cliente
        const transformedPayload = transformPayload(payload); // Transforma o payload conforme necessário

        // Faz a requisição POST para a API Spring Boot com o payload transformado
        const response = await axios.post(springBootUrl, transformedPayload);

        // Retorna a resposta da API Spring Boot de volta para o cliente
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao enviar dados para a API Spring Boot:', error.message);
        res.status(500).send('Erro ao enviar dados para a API Spring Boot');
    }
});

// Endpoint GET para buscar todos os eventos
app.get('/api-eventos', async (req, res) => {
    try {
        // Faz a requisição GET para a API Spring Boot para buscar todos os eventos
        const response = await axios.get(springBootUrl);

        // Retorna a resposta da API Spring Boot de volta para o cliente
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao buscar eventos na API Spring Boot:', error.message);
        res.status(500).send('Erro ao buscar eventos na API Spring Boot');
    }
});

// Endpoint GET para buscar um evento por ID
app.get('/api-eventos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Faz a requisição GET para a API Spring Boot para buscar um evento por ID
        const response = await axios.get(`${springBootUrl}/${id}`);

        // Verifica se o evento foi encontrado
        if (response.status === 404) {
            return res.status(404).send('Evento não encontrado');
        }

        // Retorna a resposta da API Spring Boot de volta para o cliente
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(`Erro ao buscar evento com ID ${id} na API Spring Boot:`, error.message);
        res.status(500).send(`Erro ao buscar evento com ID ${id} na API Spring Boot`);
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor Node.js rodando em http://localhost:${port}`);
});