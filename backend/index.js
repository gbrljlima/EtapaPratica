const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const taskRouter = require('./routes/TaskRoute');

const allowedOrigins = ['http://localhost:5173',
    'https://gerenciador-de-tarefas-drab-xi.vercel.app'];

app.use(cors({origin: allowedOrigins}));
app.use(express.json());
app.use(taskRouter);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});