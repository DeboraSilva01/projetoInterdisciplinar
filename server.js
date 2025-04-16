require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port =  process.env.PORT; // acessa a port
const db = require("./backEnd/db");

const app = express();
app.use(cors())
app.use(bodyParser.json());
// Configuração para que o Express entenda requisições JSON
app.use(express.json());


app.get("/",(req, res)=>{
    res.json({
        message: "Bem vindo ao meu servidor!! Servidor funcionando"
    });
});

app.get("/usuarios/:id", async (req, res)=>{
  try{
    const id = req.params.id; // Pega o id do usuario
    const usuario = await db.buscarUsuario(id); // Busca o usuario pelo id
    res.json(usuario); // Retorna o usuario em formato JSON
  }catch(error){
    res.status(500).json({message: "Erro ao buscar usuario!"});
  }

});

app.patch("/usuarios/:id", async (req, res)=>{
  try{
    await db.atulizarUsuario(req.params.id, req.body); // Atualiza o usuario pelo id
    res.status(200).json({message: "Usuario atualizado com sucesso!"});
  }catch(error){
    res.status(500).json({message: "Erro ao atualizar usuario!"});
  }
});
 
app.post("/usuarios", async(req, res)=>{
  try{
    await db.salvarUsuario(req.body);
    res.json({message: "Usuario salvo com sucesso!"});
  }catch(error){
    res.json({message: "Erro ao salvar usuario!"});

  }
})

app.get("/usuarios", async (req, res)=>{
    const usuario = await db.listarUsuarios();
    res.json(usuario);
});

app.delete("/usuarios/:id", async (req, res)=>{
    await db.deletaUsuario(req.params.id); // Deleta o usuario pelo id
    res.status(204).json({message: "Usuario deletado com sucesso!"});
});


// Rota para criar um evento (opcional, mas útil para inserir eventos)
app.post('/criarEventos', async (req, res) => {
 // Verifica os dados recebidos
  console.log(req.body); // Verifica os dados recebidos
    try {
        await db.inserirEventos(req.body);
        res.status(201).json({ mensagem: "Evento criado com sucesso!"});
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar evento' });
    }
    
});

// Rota para visualizar todos os eventos
app.get('/eventos', async (req, res) => {
  try {
    const eventos = await db.listarEventos();  // Recupera todos os eventos

    res.json(eventos);  // Retorna os eventos em formato JSON
    
    console.log(res.rows); 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao recuperar eventos' });
  }
});

app.get("/eventos/:id", async(req,res)=>{
  try{
    const evento = await db.buscarEvento(req.params.id); // Busca o evento pelo id
    res.json(evento); // Retorna o evento em formato JSON
  }catch(error){
    res.status(500).json({mensagem: "Erroro ao buscar evento!"});
  }
});

app.patch("/eventos/:id", async(req,res)=>{
  try{
    await db.atulizarEvento(req.params.id, req.body); // Atualiza o evento pelo id
    res.status(200).json({mensagem: "Evento atualizado com sucesso!"});
  }catch(error){
    res.status(500).json({mensagem: "Erro ao atualizar evento!"});
  }
})
app.delete("/eventos/:id", async(req,res)=>{
  try{
    await db.deletaEvento(req.params.id); // deleta o evento pelo id
    res.status(204).json({mensagem: "Evento deletado com sucesso!"});
  }catch(error){
    res.status(500).json({mensagem: "Erro ao deleta evento!"});
  
  }
})



app.post("/login", async (req, res) => {
  const { nome, senha } = req.body;
  try {
    const usuario = await db.autenticarUsuario(nome, senha);
    if (usuario) {
      res.json({ mensagem: "Login realizado com sucesso!", usuario });
    } else {
      res.status(401).json({ mensagem: "Nome ou senha inválidos!" });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

app.post("/eventos/:id/inscrever", async (req, res) => {
  try {
    const eventoId = req.params.id;
    const { usuarioId } = req.body;

    // Insere a inscrição no banco de dados
    await db.inscreverUsuarioEvento(usuarioId, eventoId);

    res.status(200).json({ mensagem: "Inscrição realizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao inscrever usuário no evento:", error);
    res.status(500).json({ mensagem: "Erro ao inscrever usuário no evento." });
  }
});
app.listen(port)

