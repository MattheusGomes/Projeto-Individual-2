setInterval(() => {
    /*  gerarGraficos() */
    /* verProcesso() */
    /*    graficoPrincipal() */
    gerarDados()
}, 10000);

function verCarro() {

    var idCarro = sessionStorage.ID_Carro;
    fetch("/dashTecnico/verDetalhes", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idCarro: idCarro
        })
    }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(json => {
                for (var index = 0; index < json.length; index++) {
                    mac = json[index].endereco_mac
                    placa = json[index].placa_carro
                    modelo = json[index].modelo
                    placaCarro.innerHTML = `${placa}`
                    modelo.innerHTML = `${modelo}`
                }
            })

        }
    })
}

/* 
function verDispositivo() {
    var idCarro = sessionStorage.ID_Carro;
    var vtCPU = []
    var vtRAM = []

    fetch("/dashTecnico/dispositivos", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idCarro: idCarro
        })
    }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(json => {
                for (var index = json.length - 1; index >= 0; index--) {
                    tipoDisp = json[index].tipo
                    horario = json[index].horario_registro
                    valor = json[index].valor


                    if (tipoDisp == "RAM") {
                        valRam.innerHTML = `${valor}%`
                        vtRAM.push(valor)
                    } else if (tipoDisp == "CPU") {
                        valCPU.innerHTML = `${valor}%`
                        vtCPU.push(valor)
                    } else {
                        valDisk.innerHTML = `${valor}%`
                    }
                }
                sessionStorage.cpu = vtCPU;
                sessionStorage.ram = vtRAM;

            })

        }
    })
}

function verProcesso() {
    var idCarro = sessionStorage.ID_Carro;
    var vtData = []
    var vtHorario = []
    var vtDataSemFormatacao = []
    var vtNomeProcessos = []
    var vtPidProcessos = []
    var vtConsumoProcessos = []

    fetch("/dashTecnico/processos", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idCarro: idCarro
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
    
                console.log(`Dados recebidos: ${JSON.stringify(json)}`);
                graficoPrincipal(json)
                
                
                var i = 0
                for (var index = json.length - 1; index >= 0; index--) {
                    vtNomeProcessos.push(json[index].nome)
                    vtConsumoProcessos.push(json[index].cpu_perc)
                    vtDataSemFormatacao.push(json[index].horario_registro)
                    vtPidProcessos.push(json[index].pid)

                    //Separando e formatando data e hora
                    var limparData = vtDataSemFormatacao[i].split('.');
                    var separarHorario = limparData[0].split('T');

                    vtData.push(separarHorario[0]);
                    vtHorario.push(separarHorario[1]);

                    vtData[i] = vtData[i].split('-').reverse().join('/');

                    sessionStorage.Horarios = vtHorario;
                    sessionStorage.pid = vtPidProcessos;
                    sessionStorage.nomeProcesso = vtNomeProcessos;
                    sessionStorage.processoUsoCpu = vtConsumoProcessos;
                    i++;
                }

            })

        }
    })
}
 */

function gerarDados() {
    //processos

    var disps
    var procs
    var idCarro = sessionStorage.ID_Carro;
    var vtData = []
    var vtHorario = []
    var vtDataSemFormatacao = []
    var vtNomeProcessos = []
    var vtPidProcessos = []
    var vtConsumoProcessos = []

    fetch("/dashTecnico/processos", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idCarro: idCarro
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                procs = json
                console.log("processos", procs)


                var i = 0
                for (var index = json.length - 1; index >= 0; index--) {
                    vtNomeProcessos.push(json[index].nome)
                    vtConsumoProcessos.push(json[index].cpu_perc)
                    vtDataSemFormatacao.push(json[index].horario_registro)
                    vtPidProcessos.push(json[index].pid)

                    //Separando e formatando data e hora
                    var limparData = vtDataSemFormatacao[i].split('.');
                    var separarHorario = limparData[0].split('T');

                    vtData.push(separarHorario[0]);
                    vtHorario.push(separarHorario[1]);

                    vtData[i] = vtData[i].split('-').reverse().join('/');

                    sessionStorage.Horarios = vtHorario;
                    sessionStorage.pid = vtPidProcessos;
                    sessionStorage.nomeProcesso = vtNomeProcessos;
                    sessionStorage.processoUsoCpu = vtConsumoProcessos;
                    i++;
                }

            })

        }
    })

    //Dispositivos
    var idCarro = sessionStorage.ID_Carro;
    var vtCPU = []
    var vtRAM = []

    fetch("/dashTecnico/dispositivos", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idCarro: idCarro
        })
    }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(json => {

                disps = json
                console.log("dispi", disps)

                for (var index = json.length - 1; index >= 0; index--) {
                    tipoDisp = json[index].tipo
                    horario = json[index].horario_registro
                    valor = json[index].valor


                    if (tipoDisp == "RAM") {
                        valRam.innerHTML = `${valor}%`
                        vtRAM.push(valor)
                    } else if (tipoDisp == "CPU") {
                        valCPU.innerHTML = `${valor}%`
                        vtCPU.push(valor)
                    } else {
                        valDisk.innerHTML = `${valor}%`
                    }
                }
                sessionStorage.cpu = vtCPU;
                sessionStorage.ram = vtRAM;

            })

        }
    })
    
    graficoPrincipal(disps, procs)
}


function graficoPrincipal(dispositivo ,processo) {

    //Pegando cada horario individualmente    
    horario = sessionStorage.Horarios.split(',')
    cpu = sessionStorage.cpu
    ram = sessionStorage.ram
    pid = sessionStorage.pid
    nomes = sessionStorage.nomeProcesso
    processoCPU = sessionStorage.processoUsoCpu
    /* 
        console.log(cpu[0])
        console.log("Ram, ", ram[0]) 
        console.log(pid)
        console.log(nomes)
        console.log(processoCPU)
        console.log(horario[0]) 
          */
    console.log('iniciando plotagem do gráfico...');
    document.getElementById("grafico1").remove();

    var divGrafico = document.getElementById("graficoBarraRAM");
    var canvas = document.createElement("canvas");
    canvas.id = "grafico1";

    divGrafico.appendChild(canvas);

    let labels = [];

    var dados = {
        labels: labels,
        datasets: [
            {
                yAxisID: 'y-usoCpu',
                label: 'Uso da cpu',
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.5)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: [0, 50, 20, 45, 10, 30, 22, 55, 35, 10, 95, 50],
                fill: true,
                data: [],
            },
        ],
        options: {
            maintainAspectRatio: false,
            responsive: true
        }
    };

    for (i = 0; i < dispositivo.length; i++) {
        var registro = dispositivo[i];
        labels.push(registro.horario_registro);
        dados.datasets[0].data.push(registro.cpu_perc);
    }

    console.log(JSON.stringify(dados));

    const config = {
        type: 'line',
        data: dados,
        options: {
            maintainAspectRatio: false,
            responsive: true,
        }
    };

    let myChartCpu = new Chart(
        document.getElementById('grafico1'),
        config
    );

}
