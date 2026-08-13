// ===============================
// BUSCAR PACIENTE PELO NOME
// ===============================
async function buscarPaciente() {
    const nome_paciente = document.getElementById('nome_paciente').value.trim();

    if (nome_paciente === '') {
        alert('Digite o nome do paciente');
        return;
    }

    try {
        const resposta = await fetch(
            `http://localhost:3025/pacientes/nome?nome_paciente=${encodeURIComponent(nome_paciente)}`
        );

        if (!resposta.ok) {
            throw new Error('Erro ao buscar paciente');
        }

        const texto = await resposta.text();

        console.log('Status:', resposta.status);
        console.log('Resposta do servidor:', texto);

        if (texto.trim() === '') {
            throw new Error('O servidor retornou uma resposta vazia');
        }

        const pacientes = JSON.parse(texto);

        console.log('Pacientes encontrados:', pacientes);

        if (pacientes.length === 0) {
            alert('Paciente não encontrado');
            return;
        }

        const paciente = pacientes[0];

        alert(`Paciente encontrado: ${paciente.nome_paciente}`);

        console.log('Paciente:', paciente);

    } catch (erro) {
        console.error('ERRO AO BUSCAR PACIENTE:', erro);
        alert('Erro ao buscar paciente');
    }
}


// ===============================
// BUSCAR MÉDICO PELO NOME
// ===============================
async function buscarMedico() {
    const nome= document.getElementById('nome').value.trim();

    if (nome === '') {
        alert('Digite o nome do médico');
        return;
    }

    try {
        const resposta = await fetch(
        `http://localhost:3025/Medicos/nome?nome=${encodeURIComponent(nome)}`
        );

        if (!resposta.ok) {
            throw new Error('Erro ao buscar médico');
        }

        const medicos = await resposta.json();

        console.log('Médicos encontrados:', medicos);

        if (medicos.length === 0) {
            alert('Médico não encontrado');
            return;
        }

        const medico = medicos[0];

        alert(`Médico encontrado: ${medico.nome}`);

        console.log('Médico:', medico);

    } catch (erro) {
        console.error('ERRO AO BUSCAR MÉDICO:', erro);
        alert('Erro ao buscar médico');
    }
}


// ===============================
// BUSCAR CONSULTA PELO ID
// ===============================
async function buscarConsulta() {
    const id_consulta = document.getElementById('id_consulta').value.trim();

    if (id_consulta === '') {
        alert('Digite o ID da consulta');
        return;
    }

    try {
        const resposta = await fetch(
            `http://localhost:3025/Consultas/buscar?id_consulta=${encodeURIComponent(id_consulta)}`

        );

        if (!resposta.ok) {
            throw new Error('Erro ao buscar consulta');
        }

        const consultas = await resposta.json();

        console.log('Consultas encontradas:', consultas);

        if (consultas.length === 0) {
            alert('Consulta não encontrada');
            return;
        }

        const consulta = consultas[0];

        alert(`Consulta encontrada: ID ${consulta.id_consulta}`);

        console.log('Consulta:', consulta);

    } catch (erro) {
        console.error('ERRO AO BUSCAR CONSULTA:', erro);
        alert('Erro ao buscar consulta');
    }
}