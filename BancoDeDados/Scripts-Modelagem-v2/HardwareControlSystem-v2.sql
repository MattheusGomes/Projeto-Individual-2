DROP DATABASE hardware_control_system;

CREATE DATABASE hardware_control_system;

USE  hardware_control_system;

CREATE TABLE Empresa(
id_empresa INT PRIMARY KEY AUTO_INCREMENT
,nome_empresa VARCHAR(40)
,cnpj VARCHAR(18)
);
CREATE TABLE Funcionario(
id_funcionario INT PRIMARY KEY AUTO_INCREMENT
,nome_funcionario VARCHAR(64)
,cpf CHAR(14)
,email VARCHAR(100)
,senha VARCHAR(256)
,cargo CHAR(3)
,fk_empresa INT, FOREIGN KEY (fk_empresa) REFERENCES Empresa(id_empresa)
);

CREATE TABLE ServidorAws(
id_servidor INT PRIMARY KEY  AUTO_INCREMENT
,endereco_mac VARCHAR(17)
,modelo VARCHAR(64)
,fk_empresa INT, FOREIGN KEY (fk_empresa) REFERENCES Empresa(id_empresa)
);

CREATE TABLE Carro(
id_carro INT PRIMARY KEY AUTO_INCREMENT
,endereco_mac VARCHAR(17)
,placa_carro CHAR(7)
,modelo VARCHAR(64)
,fk_empresa INT, FOREIGN KEY (fk_empresa) REFERENCES Empresa(id_empresa)
);

CREATE TABLE Dispositivo(
id_dispositivo INT PRIMARY KEY AUTO_INCREMENT
,tipo VARCHAR(45)
,modelo VARCHAR(45)
,unid_medida VARCHAR(10)
,fk_carro INT, FOREIGN KEY (fk_carro) REFERENCES Carro(id_carro)
,fk_servidor_aws INT, FOREIGN KEY (fk_servidor_aws) REFERENCES ServidorAws(id_servidor)
);

CREATE TABLE Medida(
id_medida INT PRIMARY KEY AUTO_INCREMENT
,horario_registro DATETIME
,valor DECIMAL(5,1)
,fk_dispositivo INT, FOREIGN KEY (fk_dispositivo) REFERENCES Dispositivo(id_dispositivo)
);

CREATE TABLE Processo(
id INT PRIMARY KEY AUTO_INCREMENT
,pid INT
,nome varchar(1000)
,fk_carro INT, FOREIGN KEY (fk_carro) REFERENCES Carro(id_carro)
);

CREATE TABLE MedidaProcesso(
id INT PRIMARY KEY AUTO_INCREMENT
,cpu_perc DECIMAL(5,1)
,horario_registro DATETIME
,fk_processo INT, FOREIGN KEY (fk_processo) REFERENCES Processo(id)
);

select * from Processo;
select * from MedidaProcesso;
/* Cadastrando a empresa HCS e seus respectivos dados*/
insert into Empresa values (null, 'Hardware Control System', '36.641.878/0001-53');

insert into Funcionario values (null, 'Vinicius Alves', '371.465.370-80','vinicius.alves@hcs.com', '1234', 'TEC', 1);

insert into ServidorAws(endereco_mac ,modelo, fk_empresa) values ('E8-J2-3F-K6-F1-2B', 't2.large', 1);

insert into Dispositivo values (null, 'CPU', 'Intel Xeon - 2 vCpu ', '%', null, 1);
insert into Dispositivo values (null, 'CPU', 'Intel Xeon - 2 vCpu ', '°C', null, 1);
insert into Dispositivo values (null, 'RAM', 'Kingston 8GB', '%', null, 1); 
insert into Dispositivo values (null, 'DISCO', 'Toshiba 20Gb', '%', null, 1); 
insert into Dispositivo values (null, 'DISCO', 'Toshiba 20Gb', 'T', null, 1); 


/*DADOS DA TESLA*/
insert into Empresa values (null, 'Tesla Corporation', '35.008.715/0001-75');

insert into Funcionario values (null, 'Carlos Alberto', '996.912.830-26','teslaADM@gmail.com', 'senhasecreta123', 'ADM', 2);
insert into Funcionario values (null, 'Rodrigo Almeida', '123.789.652-45','teslaTEC@gmail.com', 'senhasecreta123', 'TEC', 2);

insert into Carro values (null, 'C2-F2-9F-2A-F9-7C', 'ABC1256', 'Model S', 2);
insert into Dispositivo values (null, 'CPU', 'Intel i5 7400', '%', 1, null);
insert into Dispositivo values (null, 'CPU', 'Intel i5 7400', '°C', 1, null);
insert into Dispositivo values (null, 'RAM', 'Corsair 16GB, 2133Mhz, DDR4', '%', 1, null);
insert into Dispositivo values (null, 'DISCO', 'Toshiba 50Gb', '%', 1, null); 
insert into Dispositivo values (null, 'DISCO', 'Toshiba 50Gb', 'T', 1, null); 

insert into Carro values (null, '87-93-87-EF-B1-0B', 'CDE1234', 'Model X', 2);
insert into Dispositivo values (null, 'CPU', 'Intel i5 10500H', '%', 2, null);
insert into Dispositivo values (null, 'CPU', 'Intel i5 7400', '°C', 2, null);
insert into Dispositivo values (null, 'RAM', 'Corsair 16GB, 2133Mhz, DDR4', '%', 2, null);
insert into Dispositivo values (null, 'DISCO', 'Toshiba 50Gb', '%', 2, null); 
insert into Dispositivo values (null, 'DISCO', 'Toshiba 50Gb', 'T', 2, null); 



/*DADOS HYUNDAI*/
insert into Empresa values (null, 'Hyundai', '05.127.365/0001-03');

insert into Funcionario values (null, 'Leonardo Vasconcelos', '802.916.120-40','hyundaiADM@gmail.com', 'senhasecreta123', 'ADM', 3);

insert into Carro values (null, '10-B1-A8-76-99-DD', 'EFG7891', 'Ioniq 5', 3);
insert into Dispositivo values (null, 'CPU', 'Intel i5 7400', '%', 3, null); 
insert into Dispositivo values (null, 'CPU', 'Intel i5 7400', '°C', 3, null); 
insert into Dispositivo values (null, 'RAM', 'Kingston 8GB', '%', 3, null);
insert into Dispositivo values (null, 'DISCO', 'Toshiba 50Gb', '%', 3, null); 
insert into Dispositivo values (null, 'DISCO', 'Toshiba 50Gb', 'T', 3, null); 




insert into Carro values (null, 'f4:ce:23:d8:ba:30', 'CDE1234', 'Model X', 2);
insert into Dispositivo values (null, 'CPU', 'Intel i5 10500H', '%', 4, null);
insert into Dispositivo values (null, 'CPU', 'Intel i5 7400', '°C', 4, null);
insert into Dispositivo values (null, 'RAM', 'Corsair 16GB, 2133Mhz, DDR4', '%', 4, null);
insert into Dispositivo values (null, 'DISCO', 'Toshiba 50Gb', '%', 4, null); 
insert into Dispositivo values (null, 'DISCO', 'Toshiba 50Gb', 'T', 4, null); 



CREATE VIEW `vwDashGesCPU` AS
SELECT id_empresa as CodEmpresa,
Carro.modelo as ModeloCarro,
tipo as Componente,
unid_medida as 'Unidade de Medida',
round(avg(valor),1) as MediaConsumo
FROM Empresa, Carro, Dispositivo, Medida
WHERE fk_empresa = id_empresa AND fk_carro = id_carro AND fk_dispositivo = id_dispositivo AND tipo ="CPU" 
group by Carro.modelo order by MediaConsumo desc limit 5;

CREATE VIEW `vwDashGesRAM` AS
SELECT id_empresa as CodEmpresa,
Carro.modelo as ModeloCarro,
tipo as Componente,
unid_medida as 'Unidade de Medida',
round(avg(valor),1) as MediaConsumo
FROM Empresa, Carro, Dispositivo, Medida
WHERE fk_empresa = id_empresa AND fk_carro = id_carro AND fk_dispositivo = id_dispositivo AND tipo ="RAM" 
group by Carro.modelo order by MediaConsumo desc limit 5;

select * from vwDashGesRAM;

CREATE VIEW `vwDashTec` As 
Select  id_empresa as CodEmpresa,
id_medida,
Carro.id_carro AS 'IdCarro',
Carro.modelo AS 'Modelo',
Carro.placa_carro AS 'Placa',
Medida.valor as 'Valor',
tipo as 'Componente',
unid_medida as 'UnidadeMedida' 
FROM Empresa, Carro, Dispositivo, Medida
WHERE fk_empresa = id_empresa AND fk_carro = id_carro AND fk_dispositivo = id_dispositivo order by id_medida desc;

select * from vwDashTec;
select * from Dispositivo;
select * from Medida;

select * from carro;
/*Selecionando as tabelas dinâmicas referentes a empresa TESLA*/
select * from vwDashGesCPU where CodEmpresa = 2;
select * from vwDashGesRAM where CodEmpresa = 2;

/*Selecionando as tabelas dinâmicas referentes a empresa HYUNDAI*/
select * from vwDashGesCPU where CodEmpresa = 2;
select * from vwDashGesRAM where CodEmpresa = 2;

select * from medida where fk_dispositivo = 1 order by id_medida desc;

select * from medida where fk_dispositivo = 2 order by id_medida desc;


SELECT * from vwDashTec WHERE CodEmpresa = 2;
Select * from processo;
select * from Carro where endereco_mac = 'C2-F2-9F-2A-F9-7C';

Select * from funcionario;
select * from carro where fk_empresa =2;
select * from Dispositivo where fk_carro = 1;
select * from Medida where fk_dispositivo = 3;
select * from Dispositivo;

Select * from Carro, Dispositivo, Medida where fk_carro = id_carro AND fk_dispositivo = id_dispositivo and id_carro = 1;

Select * from Processo;

SELECT id_carro, endereco_mac, placa_carro, Carro.modelo
tipo, Dispositivo.modelo, unid_medida, horario_registro, valor
FROM Carro, Dispositivo, Medida 
WHERE fk_carro = id_carro AND fk_dispositivo = id_dispositivo AND id_carro = 1 order by horario_registro desc limit 10;

 SELECT id_carro, endereco_mac, placa_carro, Carro.modelo
    tipo, unid_medida, horario_registro, Medida.valor AS 'valor'
    FROM Carro, Dispositivo, Medida 
    WHERE fk_carro = id_carro AND fk_dispositivo = id_dispositivo AND id_carro = 1
    LIMIT 10;

select *from processo;
select *from MedidaProcesso;

select * from dispositivo;