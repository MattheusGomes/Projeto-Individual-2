var database = require("../database/config");

function carrosMonitorados(idEmpresa) {
  instrucaoSql = `
    SELECT fk_empresa, COUNT(id_carro) AS 'qtdCarro' FROM Carro WHERE fk_empresa = ${idEmpresa} group by fk_empresa;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function verCarrosProblema(idEmpresa) {
  instrucaoSql = `
    SELECT * from vwDashTec WHERE CodEmpresa = ${idEmpresa} and Componente != 'DISCO'
    
    ORDER BY Valor desc limit 100;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql); 
}

function verDetalhes(idCarro) {
  instrucaoSql = `
    select endereco_mac, placa_carro, modelo from carro where id_carro = ${idCarro} ;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function dispositivos(idCarro) {
  instrucaoSql = `
    Select   tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
    and fk_carro = ${idCarro}
    order by id_medida desc limit 5;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function processo(idCarro) {
  instrucaoSql = `
    select   nome, cpu_perc, horario_registro, fk_carro
    from Processo, MedidaProcesso
    where Processo.id = fk_processo and fk_carro = ${idCarro}
    and  nome <> 'System Idle Process' 
    order by cpu_perc desc;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function pegarRam(idCarro) {
  instrucaoSql = `
    Select   tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
    and fk_carro = ${idCarro} and Dispositivo.tipo = "RAM"
    order by id_medida desc limit 5;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function pegarCpu(idCarro) {
  instrucaoSql = `
    Select   tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
    and fk_carro = ${idCarro} and Dispositivo.tipo = "CPU"
    order by id_medida desc limit 10;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function pegarDisco(idCarro) {
  instrucaoSql = `
    select tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
    and fk_carro =${idCarro} and tipo = "DISCO"
    order by id_medida desc limit 10;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  carrosMonitorados,
  verCarrosProblema,
  verDetalhes,
  dispositivos,
  processo,
  pegarCpu,
  pegarRam,
  pegarDisco,
};
