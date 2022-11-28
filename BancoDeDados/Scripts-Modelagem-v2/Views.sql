 

CREATE VIEW `vwDispositivos` As 
 Select   tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo;
    
select * from vwDispositivos where fk_carro = 4  order by id_medida desc limit 10; 

CREATE VIEW `vwProcessos` As 
select   nome, cpu_perc, horario_registro, fk_carro
    from Processo, MedidaProcesso
    where Processo.id = fk_processo and  nome <> 'System Idle Process';
    
select * from vwProcessos where fk_carro = 4  order by cpu_perc desc;

CREATE VIEW `vwPegarRam` As 
 Select   tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
    and Dispositivo.tipo = "RAM";
    
select * from vwPegarRam where fk_carro = 4  order by id_medida desc limit 5;

CREATE VIEW `vwPegarCpu` As 
Select   tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
	and Dispositivo.tipo = "CPU";
   
    
select * from vwPegarCpu where fk_carro = 4  order by id_medida desc limit 10;

CREATE VIEW `vwPegarDisco` As 
select tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
    and tipo = "DISCO";
   
select * from vwPegarDisco where fk_carro = 4 order by id_medida desc limit 10;

