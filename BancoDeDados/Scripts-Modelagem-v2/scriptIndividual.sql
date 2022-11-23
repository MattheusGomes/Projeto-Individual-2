    
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
select * from Processo;

select   nome, cpu_perc, horario_registro, fk_carro
    from Processo, MedidaProcesso
    where Processo.id = fk_processo and fk_carro = 1 and nome <> 'System Idle Process'
    order by horario_registro desc limit 10;



insert into Funcionario values (null, 'Matheus', '371.465.370-80','matheus.gomes@tesla.com', '1234', 'TEC', 2);
select id from Processo;