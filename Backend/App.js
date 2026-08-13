const express = require('express');
const connection = require('./db');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());

server.get('/pacientes', (req, res) => {
    const sql = 'SELECT * FROM pacientes';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json(resultados);
    });
});


// BUSCAR PACIENTE PELO NOME
server.get('/pacientes/nome', (req, res) => {

    const nome_paciente = req.query.nome_paciente;

    const sql = 'SELECT * FROM pacientes WHERE nome_paciente LIKE ?';

    connection.query(sql, [`%${nome_paciente}%`], (erro, resultados) => {

        if (erro) {
            console.log(erro);

            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json(resultados);
    });
});


// BUSCAR PACIENTE PELO ID
server.get('/pacientes/:id', (req, res) => {

    const id = req.params.id;

    connection.query(
        'SELECT * FROM pacientes WHERE id_paciente = ?',
        [id],
        (erro, resultados) => {

            if (erro) {
                console.log(erro);

                return res.status(500).json({
                    erro: erro.message
                });
            }

            return res.json(resultados[0]);
        }
    );
});

server.post('/pacientes', (req, res) => {

    const { nome_paciente, cpf, data_nascimento, telefone, endereco } = req.body;

    const sql = 'INSERT INTO pacientes (nome_paciente, cpf, data_nascimento, telefone, endereco) VALUES (?, ?, ?, ?, ?)';

    connection.query(
        sql,
        [nome_paciente, cpf, data_nascimento, telefone, endereco],
        (erro, resultados) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({ erro: erro.message });
            }

            return res.json({
                mensagem: 'Paciente cadastrado!',
                id: resultados.insertId,
                nome_paciente: nome_paciente,
                cpf: cpf,
                data_nascimento: data_nascimento,
                telefone: telefone,
                endereco: endereco
            });
        }
    );
});

server.put('/pacientes/:id', (req, res) => {

    const id = req.params.id;
    const nome_paciente = req.body.nome_paciente;
    const sql = 'UPDATE pacientes SET nome_paciente = ? WHERE id_paciente = ?';

    connection.query(sql, [nome_paciente, id], (erro, resultados) => {
        if(erro){
            console.log("ERRO AO ATUALIZAR PACIENTE:", erro);
            return res.status(500).json({erro: erro.message});
        }
        return res.json({
            mensagem: 'Paciente atualizado!',
            nome: nome_paciente,
            id: id
        });
    });
});

server.delete('/pacientes/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM pacientes WHERE id_paciente = ?';

    connection.query(sql, [id], (erro) => {

        if (erro) {
            console.log("ERRO AO EXCLUIR PACIENTE:", erro);
            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json({
            mensagem: 'Paciente removido'
        });
    });
});

//MEDICOS

server.get('/Medicos', (req, res) => {
    const sql = 'SELECT * FROM Medicos';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json(resultados);
    });
});


// BUSCAR MÉDICO PELO NOME
server.get('/Medicos/buscar', (req, res) => {

    const nome_medico = req.query.nome_medico;

    const sql = 'SELECT * FROM Medicos WHERE nome LIKE ?';

    connection.query(sql, [`%${nome_medico}%`], (erro, resultados) => {

        if (erro) {
            console.log('ERRO AO BUSCAR MÉDICO:', erro);

            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json(resultados);
    });
});


// BUSCAR MÉDICO PELO ID
server.get('/Medicos/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM Medicos WHERE id_medico = ?';

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
            console.log(erro);

            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json(resultados[0]);
    });
});

server.post('/Medicos', (req, res) => {
    
    const { nome, especialidade, telefone } = req.body
    const sql = 'INSERT INTO Medicos (nome, especialidade, telefone)VALUES (?, ?, ?)';

    connection.query(sql, [nome, especialidade, telefone],  (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        return res.json({
            mensagem: 'Medico cadastrado!',
            id: resultados.insertId,
            nome: nome,
            especialidade: especialidade,
            telefone:telefone
        });
    });
});

server.put('/Medicos/:id', (req, res) => {

    const id = req.params.id;
    const nome = req.body.nome;
    const sql = 'UPDATE Medicos SET nome = ? WHERE id_medico = ?';

    connection.query(sql, [nome, id], (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        return res.json({
            mensagem: 'Medico atualizado!',
            nome: nome,
            id: id
        });
    });
});

server.delete('/Medicos/:id', (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM Medicos WHERE id_medico = ?';

    connection.query(sql,  [id], (erro) => {
        if(erro){
            console.log(erro);
            return res.status(500).json({erro: erro.message});

        }
        return res.json({
            mensagem: 'Medico removido'
        });
    });
});

/*Consultas*/ 

server.get('/Consultas', (req, res) => {

    const sql = `
        SELECT
            c.id_consulta,
            p.nome_paciente,
            c.horario,
            c.motivo
        FROM Consultas c
        INNER JOIN pacientes p
        ON c.id_paciente = p.id_paciente
    `;

    connection.query(sql, (erro, resultados) => {

        if (erro) {
            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json(resultados);
    });
});


// BUSCAR CONSULTA PELO ID
server.get('/Consultas/buscar', (req, res) => {

    const id_consulta = req.query.id_consulta;

    const sql = 'SELECT * FROM Consultas WHERE id_consulta = ?';

    connection.query(sql, [id_consulta], (erro, resultados) => {

        if (erro) {
            console.log('ERRO AO BUSCAR CONSULTA:', erro);

            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json(resultados);
    });
});


// BUSCAR CONSULTA PELO ID DA URL
server.get('/Consultas/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM Consultas WHERE id_consulta = ?';

    connection.query(sql, [id], (erro, resultados) => {

        if (erro) {
            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json(resultados[0]);
    });
});


// CADASTRAR CONSULTA
server.post('/Consultas', (req, res) => {

    const { id_paciente, horario, motivo } = req.body;

    const sql = `
        INSERT INTO Consultas
        (id_paciente, horario, motivo)
        VALUES (?, ?, ?)
    `;

    connection.query(
        sql,
        [id_paciente, horario, motivo],
        (erro, resultados) => {

            if (erro) {
                return res.status(500).json({
                    erro: erro.message
                });
            }

            return res.json({
                mensagem: 'Consulta cadastrada!',
                id: resultados.insertId,
                id_paciente: id_paciente,
                horario: horario,
                motivo: motivo
            });
        }
    );
});


// ATUALIZAR CONSULTA
server.put('/Consultas/:id', (req, res) => {

    const id = req.params.id;
    const { motivo } = req.body;

    const sql = 'UPDATE Consultas SET motivo = ? WHERE id_consulta = ?';

    connection.query(sql, [motivo, id], (erro) => {

        if (erro) {
            console.log('ERRO AO ATUALIZAR CONSULTA:', erro);

            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json({
            mensagem: 'Consulta atualizada!',
            id: id,
            motivo: motivo
        });
    });
});


// EXCLUIR CONSULTA
server.delete('/Consultas/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM Consultas WHERE id_consulta = ?';

    connection.query(sql, [id], (erro) => {

        if (erro) {
            return res.status(500).json({
                erro: erro.message
            });
        }

        return res.json({
            mensagem: 'Consulta removida'
        });
    });
});

server.listen(3025, () =>{
    console.log("Servidor rodando na porta 3025");
})