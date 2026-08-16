const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const taskRouter = require('./routes/TaskRoute');

const allowedOrigins = ['http://localhost:5173',
    'http://localhost:3001', 
    'https://gerenciador-de-tarefas-ysd6.onrender.com', 
    'https://gerenciador-de-tarefas-drab-xi.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log('Origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(taskRouter);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});