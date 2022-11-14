setInterval(() => {
    /*  gerarGraficos() */
    verDispositivo()
    verProcesso()
    graficoPrincipal()
}, 1000);

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


function graficoPrincipal() {
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

}



/* 


function apresentar() {
var idCarro = sessionStorage.ID_Carro;
vtDataSemFormatacao = []
vtHorario = []
vtData = []
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
                modelo = json[index].tipo
                tipo = json[index].tipo
                unidadeMedida = json[index].unid_medida
                vtDataSemFormatacao.push(json[index].proc_horario)
                valorMedida = json[index].valor

                //var dataFormatada = vtDataSemFormatacao[0].split(' ').reverse().join('/');

                var limparData = vtDataSemFormatacao[index].split('.');
                var separarHorario = limparData[0].split('T');
                vtData.push(separarHorario[0])
                vtHorario.push(separarHorario[1])

                //graficos
                const labels = [
                    // Colocar aqui o tempo da coleta, estes são os títulos das barras
                    vt_ModeloCarrosRAM[0],
                    vt_ModeloCarrosRAM[1],
                    vt_ModeloCarrosRAM[2],
                    vt_ModeloCarrosRAM[3],
                    vt_ModeloCarrosRAM[4],
                ];


                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'My First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                };

                const config = {
                    type: 'line',
                    data: data,
                };


            }
        })

    }
})
}

function gerarGraficos() {


vt_ModeloCarrosRAM = [];
vt_MediasRAM = []

fetch("/dashGestor/mediaRamCarros", {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        idEmpresa: sessionStorage.ID_EMPRESA
    })
}).then(function (resposta) {
    if (resposta.ok) {

        resposta.json().then(json => {

            for (let i = 0; i < json.length; i++) {
                vt_ModeloCarrosRAM.push(json[i].ModeloCarro);
                vt_MediasRAM.push(parseFloat((json[i].MediaConsumo)));
            }
            var porcentagemCategeoriaGraficoRAM = 0
            var porcentagemBarraGraficoRAM = 0

            if (vt_ModeloCarrosRAM.length < 2) {
                porcentagemCategeoriaGraficoRAM = 0.2
                porcentagemBarraGraficoRAM = 0.7
            }
            else {
                porcentagemCategeoriaGraficoRAM = 0.6
                porcentagemBarraGraficoRAM = 0.9
            }


            document.getElementById('grafico2').remove();
            novoGraficoRAM = document.createElement('canvas');
            novoGraficoRAM.setAttribute('id', 'grafico2');
            graficoBarraRAM.appendChild(novoGraficoRAM);


            const graficoUsoRAM = [
                // Colocar aqui o tempo da coleta, estes são os títulos das barras
                vt_ModeloCarrosRAM[0],
                vt_ModeloCarrosRAM[1],
                vt_ModeloCarrosRAM[2],
                vt_ModeloCarrosRAM[3],
                vt_ModeloCarrosRAM[4],
            ];

            // Dados do gráfico
            const dados2 = {
                labels: graficoUsoRAM, // Nome da variável do gráfico
                datasets: [{
                    label: 'Uso de RAM (%)',// Título
                    categoryPercentage: porcentagemCategeoriaGraficoRAM,
                    barPercentage: porcentagemBarraGraficoRAM,
                    backgroundColor: '#b449de', // cor de fundo
                    borderColor: 'black', // cor da borda
                    data: [vt_MediasRAM[0], vt_MediasRAM[1], vt_MediasRAM[2], vt_MediasRAM[3], vt_MediasRAM[4]], // Plot dos valores embaixo das barras
                },
                ]
            };

            // Configurações do gráfico
            const config2 = {
                type: 'bar', // Define para o tipo barra
                data: dados2, // Diz quais dados serão referentes àquele gráfico
                options: {
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            beginAtZero: true
                        }
                    },
                    animation: 0
                }
            };

            //Diz qual é a div que receberá o gráfico pronto
            const grafico2 = new Chart(
                document.getElementById('grafico2'),
                config2
            );
        })
    }
})
}

 */