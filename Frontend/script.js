async function listarPaciente() {
    const resposta = await fetch('http://localhost:3025/pacientes');
    const pacientes = await resposta.json();

    console.log(pacientes);

    const lista = document.getElementById('lista');
    lista.innerHTML='';

    pacientes.forEach( pacientes =>{
        lista.innerHTML += `
    
        <li>
        ${pacientes.id_paciente} - ${pacientes.nome_paciente}
        <button onclick="editarPaciente(${pacientes.id_paciente}, '${pacientes.nome_paciente}')">Editar</button>
        <button onclick="excluirPaciente(${pacientes.id_paciente})">Excluir</button>
        </li>
        `;
    });
};

async function cadastarPaciente(){
    const nome_paciente = document.getElementById('nome_paciente').value;
    const cpf = document.getElementById('cpf').value;
    const data_nascimento = document.getElementById('data_nascimento').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    if(nome_paciente === ''){
        alert('Digite o nome do paciente');
        return;
    }
     
     const resposta = await fetch('http://localhost:3025/pacientes', {
        method: 'POST',
        headers:{'Content-type': 'application/json'},
        body:JSON.stringify({nome_paciente, cpf, data_nascimento, telefone, endereco})
     });

     const dados = await resposta.json();
     alert(dados.mensagem);

     document.getElementById('nome_paciente').value ='';
     document.getElementById('cpf').value ='';
     document.getElementById('data_nascimento').value ='';
     document.getElementById('telefone').value ='';
     document.getElementById('endereco').value ='';
     listarPaciente();
};

async function editarPaciente(id, nomeAtual) {
    
    const novoNome = prompt('Digite o novo nome: ', nomeAtual);

    if(!novoNome) return;

    await fetch(`http://localhost:3025/pacientes/${id}`, {
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nome_paciente:novoNome})
    });

    listarPaciente();
};

async function excluirPaciente(id) {

    if(!confirm('Deseja realmente excluir este paciente?')) return;

    await fetch(`http://localhost:3025/pacientes/${id}`, {
        method: 'DELETE'
    });
    
    listarPaciente()
}

// Função para listar os médicos

async function listarMedicos() {
    const resposta = await fetch('http://localhost:3025/Medicos');
    const medicos = await resposta.json();
    console.log(medicos);

    const lista2 = document.getElementById('lista2');
    lista2.innerHTML='';

    medicos.forEach( medicos =>{
        lista2.innerHTML += `
        
        <li>
        ${medicos.id_medico} - ${medicos.nome}
        <button onclick="editarMedico(${medicos.id_medico}, '${medicos.nome}')">Editar</button>
        <button onclick="excluirMedico(${medicos.id_medico})">Excluir</button>
        </li>
        `;
    });
};

async function cadastrarMedicos(){
    const nome = document.getElementById('nome').value;

    if(nome === ''){
        alert('Digite o nome do médico');
        return;
    }
     
     const resposta = await fetch('http://localhost:3025/Medicos', {
        method: 'POST',
        headers:{'Content-type': 'application/json'},
        body:JSON.stringify({
            nome,
            especialidade: document.getElementById('especialidade').value,
            telefone: document.getElementById('telefone').value 
        })
     });

     const dados = await resposta.json();
     alert(dados.mensagem);

     document.getElementById('nome').value =''
     document.getElementById('especialidade').value =''
     document.getElementById('telefone').value =''
     listarMedicos();
};

async function editarMedico(id, nomeAtual) {
    
    const novoNome = prompt('Digite o novo nome: ', nomeAtual);

    if(!novoNome) return;

    await fetch(`http://localhost:3025/Medicos/${id}`, {
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nome:novoNome})
    });

    listarMedicos();
};

async function excluirMedico(id) {

    if(!confirm('Deseja realmente excluir este médico?')) return;

    await fetch(`http://localhost:3025/Medicos/${id}`, {
        method: 'DELETE'
    });
    
    listarMedicos()
}


// Funções para listar e cadastrar consultas

async function listarConsultas() {
    const resposta = await fetch('http://localhost:3025/Consultas');
    const consultas = await resposta.json();

    console.log(consultas);

    const lista = document.getElementById('lista3');
    lista.innerHTML='';

    consultas.forEach( consultas =>{
        lista.innerHTML += `
        
        <li>
        ${consultas.id_consulta} - ${consultas.nome_paciente} - ${consultas.motivo}
        <button onclick="editarConsulta(${consultas.id_consulta}, '${consultas.motivo}')">Editar</button>
        <button onclick="excluirConsulta(${consultas.id_consulta})">Excluir</button>
        </li>
        `;
    });
};

async function cadastrarConsulta(){
    const id_paciente = document.getElementById('id_paciente').value;
    const horario = document.getElementById('horario').value;
    const motivo = document.getElementById('motivo').value;

    if(id_paciente === ''){
        alert('Digite o ID do paciente');
        return;
    }

    if(horario === ''){
        alert('Digite o horário da consulta');
        return;
    }

    if(motivo === ''){
        alert('Digite o motivo da consulta');
        return;
    }
    
     const resposta = await fetch('http://localhost:3025/Consultas', {
        method: 'POST',
        headers:{'Content-type': 'application/json'},
        body:JSON.stringify({
            id_paciente,
            horario,
            motivo
        })
     });

     const dados = await resposta.json();

     if(!resposta.ok){
        alert(`Erro ao cadastrar consulta: ${dados.erro}`);
        return;
     }
     alert(dados.mensagem);

     document.getElementById('id_paciente').value =''
     document.getElementById('horario').value =''
     document.getElementById('motivo').value =''
     listarConsultas();
};

async function editarConsulta(id, motivoAtual) {
    
    const novoMotivo = prompt('Digite o novo motivo: ', motivoAtual);

    if(!novoMotivo) return;

    await fetch(`http://localhost:3025/Consultas/${id}`, {
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({motivo:novoMotivo})
    });

    listarConsultas();
};

async function excluirConsulta(id) {

    if(!confirm('Deseja realmente excluir esta consulta?')) return;

    await fetch(`http://localhost:3025/Consultas/${id}`, {
        method: 'DELETE'
    });
    
    listarConsultas()
}