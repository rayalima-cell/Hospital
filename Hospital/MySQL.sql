create database hospital;
use hospital;

create table pacientes(
	id_paciente int primary key auto_increment,
    nome_paciente varchar(50) not null,
    cpf varchar(50) not null,
    data_nascimento date,
    telefone varchar(20),
    endereco varchar(150)
);

create table Medicos(
	id_medico int primary key auto_increment,
    nome varchar(50) not null,
    especialidade varchar(100),
    telefone varchar(50)
);

create table Consultas(
	id_consulta int primary key auto_increment,
    id_paciente int not null,
    foreign key (id_paciente) references pacientes(id_paciente),
    horario time not null,
    motivo varchar(200)
);

insert into pacientes(nome_paciente, cpf, data_nascimento, telefone, endereco)
values
('Pedro', '62892035333', '2009-04-14', '47 86958637', 'Rua Victor Rosenberg 147'),
('Lucas', '11111111101', '2008-05-10', '47 97662810', 'Rua Brejo Santo 1147'),
('Miriã', '11111111102', '2007-10-01', '47 86741376', 'Rua Marista 2022');
select * from pacientes;

insert into Medicos(nome, especialidade, telefone)
values
('Theodoro Himisaki', 'Neurologista', '47 75867598'),
('Bruna Heloísa', 'Psicologa', '47 85798523'),
('Grasiela Rodrigues', 'Psiquiatra', '47 36543647');

select * from Medicos;

insert into Consultas(id_paciente, horario, motivo)
values
(1,  '08:30:00', 'Está muito nervoso com o barulho'),
(2, '14:15:00', 'Possui muitos traumas'),
(3, '15:35:00', 'Precisa de Medicamentos');

select * from pacientes;
select * from Medicos;
select
	c.id_consulta,
	p.nome_paciente,
    c.horario,
    c.motivo
from Consultas c
inner join pacientes p
on c.id_paciente = p.id_paciente;