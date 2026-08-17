const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const taskRouter = require('./routes/TaskRoute');

const allowedOrigins = ['http://localhost:5173',
    'http://localhost:3001'];

app.get('/', (req, res) => {res.send("Servidor da aplicação de gerenciamento de tarefas.")});
app.use(cors({origin: allowedOrigins}));
app.use(express.json());
app.use(taskRouter);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});