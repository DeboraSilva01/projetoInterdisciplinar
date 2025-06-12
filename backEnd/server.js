require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port =  process.env.PORT; // acessa a port
const path = require("path");

const registerRoutes = require("./routes/routeRegister");
const loginRoutes = require("./routes/routeLogin");
const eventosRoutes = require("./routes/routeEventos");
const usuariosRoutes = require("./routes/routeUsuarios");
const inscricoesRoutes = require("./routes/routeInscricoes");
const recompensaRoutes = require("./routes/routeRecompensa");

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
app.use(recompensaRoutes); 
app.use("/frontEnd/images/qrcodes", express.static(path.join(__dirname, "frontEnd/images/qrcodes")));

app.get("/",(req, res)=>{
    res.json({
        message: "Bem vindo ao meu servidor!! Servidor funcionando"
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});