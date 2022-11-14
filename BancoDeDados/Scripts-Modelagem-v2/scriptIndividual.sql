SELECT id_carro, endereco_mac, placa_carro, Carro.modelo
    tipo, id_medida, unid_medida, Medida.horario_registro, Medida.valor AS 'valor',
    Processo.horario_registro, pid, Processo.nome, Processo.cpu_perc
    FROM Carro, Dispositivo, Medida, Processo
    WHERE Dispositivo.fk_carro = id_carro AND Processo.fk_carro = id_carro
    AND fk_dispositivo = id_dispositivo AND id_carro = 1
    order by id_medida desc
    LIMIT 10 ;
    
    insert into Funcionario values (null, 'Matheus', '371.465.370-80','matheus.gomes@tesla.com', '1234', 'TEC', 2);

select * from Processo;
select * from MedidaProcesso;

select id from Processo where pid = 0 and nome = 'System Idle Process';

CREATE TABLE Processo(
pid int primary key
,nome varchar(100)
,fk_carro INT, FOREIGN KEY (fk_carro) REFERENCES Carro(id_carro)
);

CREATE TABLE MedidaProcesso(
id INT PRIMARY KEY AUTO_INCREMENT
,cpu_perc DECIMAL(5,1)
,horario_registro DATETIME
,fk_processo INT, FOREIGN KEY (fk_processo) REFERENCES Processo(pid)
);


SELECT id_carro, endereco_mac, placa_carro, Carro.modelo
    tipo, id_medida, unid_medida, Medida.horario_registro, Medida.valor AS 'valor',
    Processo.horario_registro, pid, Processo.nome, Processo.cpu_perc
    FROM Carro, Dispositivo, Medida, Processo
    WHERE Dispositivo.fk_carro = id_carro AND Processo.fk_carro = id_carro
    AND fk_dispositivo = id_dispositivo AND id_carro = 1
    order by id_medida desc
    LIMIT 10 ;
    
-- Dados carro
select endereco_mac, placa_carro, modelo from carro where id_carro = 1;
Select * from Dispositivo;

-- dados dispositivo e medida
Select   tipo, unid_medida, fk_carro,
id_medida, Medida.horario_registro, Medida.valor AS 'valor'
from Dispositivo, Carro, Medida 
where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
and fk_carro = 1 
order by id_medida desc limit 10;


-- dados processos 
select * from MedidaProcesso;
select pid, nome, fk_carro
    ,cpu_perc, horario_registro
    from Processo, MedidaProcesso
    where Processo.pid = fk_processo and fk_carro = 1
    order by horario_registro desc limit 10;
    
    
    
    
    
    
    
    
    



