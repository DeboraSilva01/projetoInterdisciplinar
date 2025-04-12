
async function connect() {
    // verificar se a conexão ja existe
    if (global.connection) {
        return global.connection.connect();
    }
    // importa o módulo do banco de dados pg e buscar o Pool
    const { Pool } = require("pg");
    const pool = new Pool({      // Criar uma conexão com o banco de dados ou objeto
        connectionString: process.env.CONNECTION_STRING // Recebe o caminho da conexão com o banco de dados
    });
    // Faz realmente a conexão com o banco de dados
    const conexao = await pool.connect();
    console.log("Criou o pool conexão"); // Verifica se a conexão foi bem sucedida
    // buscar a hora do BD
    const res = await conexao.query("select now()");
    console.log(res.rows[0]);
    conexao.release();

    global.connection = pool;
    return pool.connect();
    

}

connect()
//query dos usuários
async function salvarUsuario(usuario) {
    const conexao = await connect();
    const sql = "INSERT INTO usuario(nome, cpf, contato, email, senha, endereco)VALUES($1, $2, $3, $4, $5, $6)";
    const values =  [usuario.nome, usuario.cpf, usuario.contato, usuario.email, usuario.senha, usuario.endereco];
    await conexao.query(sql, values);
    
}
async function listarUsuarios() {
    const conexao = await connect();
    const res = await conexao.query("SELECT * FROM usuario");
    return res.rows;
    
}
async function buscarUsuario(id) {
    const conexao = await connect();
    const res = await conexao.query("SELECT * FROM usuario WHERE idusuario = $1", [id]);
    return res.rows; // Certifique-se de que está retornando res.rows
}
async function atulizarUsuario(id, usuario) {
    const conexao = await connect();
    const sql = "UPDATE usuario SET nome = $1, contato = $2, email = $3, senha = $4, endereco = $5 WHERE idusuario = $6"; 
    const values = [usuario.nome, usuario.contato, usuario.email, usuario.senha, usuario.endereco, id]; // Atualiza os dados do usuario com base no id do usuario
    await conexao.query(sql, values);
    
}
async function deletaUsuario(id) {
    const conexao = await connect();
     // Exclui os registros relacionados na tabela feedback
     await conexao.query("DELETE FROM feedback WHERE idusuario = $1", [id]);

    const sql = "DELETE FROM usuario WHERE idusuario = $1"; // Deleta o usuario com base no id do usuario
    const values = [id]; 

    await conexao.query(sql, values);
    
}

//query dos eventos
async function listarEventos() {
    const conexao = await connect();
    const res = await conexao.query("SELECT * FROM evento");
    return res.rows;
    
}

async function inserirEventos(eventos) {
    const conexao = await connect();
    const sql = "INSERT INTO evento (nomeevento, data, horainicial, horafinal, local, equipamentos, vagas, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"

    const values = [eventos.nomeevento, eventos.data, eventos.horainicial, eventos.horafinal, eventos.local, eventos.equipamentos, eventos.vagas, eventos.descricao];
    await conexao.query(sql, values);

}

async function buscarEvento(id) {
    const conexao = await connect();
    const res = await conexao.query("SELECT * FROM evento WHERE idevento = $1", [id])
    return res.rows; // Certifique-se de que está retornando res.rows
}
async function atulizarEvento(id, eventos) {
    const conexao = await connect();
    const sql = "UPDATE evento SET data = $1, horainicial = $2, horafinal = $3 WHERE idevento = $4";
    // Atualiza os dados do evento com base no id do evento
    const values = [eventos.data, eventos.horainicial, eventos.horafinal, id];
    await conexao.query(sql, values);
    
}
async function deletaEvento(id) {
    const conexao = await connect();
    const sql = "DELETE FROM evento WHERE idevento = $1"; // Deleta o evento com base no id do evento
    const values = [id];   
    await conexao.query(sql, values);
}


async function autenticarUsuario(nome, senha) {
    const conexao = await connect();
    const sql = "SELECT * FROM usuario WHERE nome = $1 AND senha = $2";
    const res = await conexao.query(sql, [nome, senha]);
    return res.rows[0]; // retorna o usuário se encontrou
}



module.exports = {
    salvarUsuario,
    buscarUsuario,
    listarUsuarios,
    atulizarUsuario,
    deletaUsuario,
    inserirEventos,
    listarEventos,
    buscarEvento,
    atulizarEvento,
    deletaEvento,
    autenticarUsuario
}
