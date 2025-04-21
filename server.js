require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port =  process.env.PORT; // acessa a port

const registerRoutes = require("./backEnd/routes/routeRegister");
const loginRoutes = require("./backEnd/routes/routeLogin");
const eventosRoutes = require("./backEnd/routes/routeEventos");
const usuariosRoutes = require("./backEnd/routes/routeUsuarios");
const inscricoesRoutes = require("./backEnd/routes/routeInscricoes");

const app = express();
app.use(cors())
app.use(bodyParser.json());
// Configuração para que o Express entenda requisições JSON
app.use(express.json());
// Removendo o prefixo "/api" das rotas
app.use(registerRoutes); // Rota para registro de usuários
app.use(loginRoutes);
app.use(eventosRoutes); // Rota para eventos
app.use(usuariosRoutes);
app.use(inscricoesRoutes);

app.get("/",(req, res)=>{
    res.json({
        message: "Bem vindo ao meu servidor!! Servidor funcionando"
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});