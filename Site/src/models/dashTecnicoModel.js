var database = require("../database/config");

function carrosMonitorados(idEmpresa) {
    instrucaoSql = `
    SELECT fk_empresa, COUNT(id_carro) AS 'qtdCarro' FROM Carro WHERE fk_empresa = ${idEmpresa} group by fk_empresa;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function verCarrosProblema(idEmpresa) {
    instrucaoSql = `
    SELECT * from vwDashTec WHERE CodEmpresa = ${idEmpresa} ORDER BY Valor desc;`;
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
    Select tipo, unid_medida, fk_carro,
    id_medida, Medida.horario_registro, Medida.valor AS 'valor'
    from Dispositivo, Carro, Medida 
    where Dispositivo.fk_carro = id_carro and fk_dispositivo = id_dispositivo 
    and fk_carro = ${idCarro} 
    order by id_medida desc limit 10;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function processo(idCarro) {
    instrucaoSql = `
    select pid, nome, fk_carro
    ,cpu_perc, horario_registro
    from Processo, MedidaProcesso
    where Processo.pid = fk_processo and fk_carro = ${idCarro}
    order by horario_registro desc limit 10;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    carrosMonitorados,
    verCarrosProblema,
    verDetalhes,
    dispositivos,
    processo
}