    
-- Dados carro
select endereco_mac, placa_carro, modelo from carro where id_carro = 1;
Select * from Dispositivo;

-- dados dispositivo e medida
Select   tipo, unid_medida, fk_carro,
id_medida, Medida.horario_registro, Medida.valor AS 'valor'
from Dispositivo, Carro, Medida 
where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
and fk_carro = 4
order by id_medida desc limit 10;


-- dados processos 
select * from Processo;	

select  nome, cpu_perc, horario_registro, fk_carro
    from Processo, MedidaProcesso
    where Processo.id = fk_processo  and nome <> 'System Idle Process' 
    order by cpu_perc DESC limit 10;

select tipo, unid_medida, fk_carro,
id_medida, Medida.horario_registro, Medida.valor AS 'valor'
from Dispositivo, Carro, Medida 
where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
and fk_carro = 4 and tipo = "DISCO"
order by id_medida desc limit 2;



insert into Funcionario values (null, 'Matheus', '371.465.370-80','matheus.gomes@tesla.com', '1234', 'TEC', 2);
select * from Processo;
select * from Carro;

 SELECT * from vwDashTec WHERE CodEmpresa = 2 ORDER BY Valor desc;









Select  id_empresa as CodEmpresa,
Carro.id_carro AS 'IdCarro',
Carro.modelo AS 'Modelo',
Carro.placa_carro AS 'Placa',
Medida.valor as 'Valor',
tipo as 'Componente',
unid_medida as 'UnidadeMedida' 
FROM Empresa, Carro, Dispositivo, Medida
WHERE fk_empresa = id_empresa AND fk_carro = id_carro AND fk_dispositivo = id_dispositivo and valor > 70

GROUP BY id_empresa,Medida.valor,unid_medida, Carro.id_carro,Carro.modelo,Carro.placa_carro,tipo ;


SELECT fk_empresa, COUNT(id_carro) AS 'qtdCarro' FROM Carro WHERE fk_empresa = 2 group by fk_empresa;




    select tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
    and fk_carro =4 and tipo = "DISCO"
    order by id_medida desc limit 10;


-- Teste selects 

select  id_carro from Carro where endereco_mac = "C2-F2-9F-2A-F9-7C";
select  * from Carro;
select * from dispositivo, Carro where fk_carro = id_carro and id_carro = 4;
-- CPU
select id_dispositivo from dispositivo, Carro where fk_carro = id_carro and id_carro = 1 and tipo = "CPU" and unid_medida = "%";
select id_dispositivo from dispositivo, Carro where fk_carro = id_carro and id_carro = 1 and tipo = "CPU" and unid_medida = "°C";

-- RAM
select id_dispositivo from dispositivo, Carro where fk_carro = id_carro and id_carro = 4 and tipo = "RAM";

-- Disco
select * from dispositivo, Carro, Medida where fk_carro = id_carro and fk_dispositivo = id_dispositivo and id_carro = 4 and tipo = "Disco" ;
select id_dispositivo from dispositivo, Carro where fk_carro = id_carro and id_carro = 1 and tipo = "Disco" and unid_medida = '%';
select * from dispositivo, Carro where fk_carro = id_carro and id_carro = 1 and tipo = "DISCO" and unid_medida = 'T';

select * from medida, Dispositivo where id_dispositivo = fk_dispositivo order by id_medida desc;

Select  id_empresa as CodEmpresa,
id_medida,
Carro.id_carro AS 'IdCarro',
Carro.modelo AS 'Modelo',
Carro.placa_carro AS 'Placa',
Medida.valor as 'Valor',
tipo as 'Componente',
unid_medida as 'UnidadeMedida' 
FROM Empresa, Carro, Dispositivo, Medida
WHERE fk_empresa = id_empresa AND fk_carro = id_carro AND fk_dispositivo = id_dispositivo order by valor desc limit 100;

Select  id_empresa as CodEmpresa,
id_medida,
Carro.id_carro AS 'IdCarro',
Carro.modelo AS 'Modelo',
Carro.placa_carro AS 'Placa',
Medida.valor as 'Valor',
tipo as 'Componente',
unid_medida as 'UnidadeMedida' 
FROM Empresa, Carro, Dispositivo, Medida
WHERE fk_empresa = id_empresa AND fk_carro = id_carro AND fk_dispositivo = id_dispositivo and tipo <> 'DISCO'
order by valor desc;

select * from carro;
SELECT * from vwDashTec WHERE CodEmpresa = 2 and Componente != 'DISCO'  ORDER BY Valor desc limit 80;