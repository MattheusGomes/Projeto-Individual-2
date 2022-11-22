setInterval(() => {
  gerarDados();
  graficos();
  gerarDados();
}, 1000);

function verCarro() {
  var idCarro = sessionStorage.ID_Carro;
  fetch("/dashTecnico/verDetalhes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idCarro: idCarro,
    }),
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        for (var index = 0; index < json.length; index++) {
          mac = json[index].endereco_mac;
          placa = json[index].placa_carro;
          modelo = json[index].modelo;
          placaCarro.innerHTML = `${placa}`;
          modelo.innerHTML = `${modelo}`;
        }
      });
    }
  });
}
/* 
function gerarDados() {
    var disps
    var idCarro = sessionStorage.ID_Carro;
    var vtData = []
    var vtHorario = []
    var vtDataSemFormatacao = []
    var vtNomeProcessos = []
    var vtPidProcessos = []
    var vtConsumoProcessos = []

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

                for (var index = json.length - 1; index >= 0; index--) {
                    tipoDisp = json[index].tipo
                    horario = json[index].horario_registro
                    valor = json[index].valor


                    if (tipoDisp == "RAM") {
                        valRam.innerHTML = `${valor}%`

                    } else if (tipoDisp == "CPU") {
                        valCPU.innerHTML = `${valor}%`
                    } else {
                        valDisk.innerHTML = `${valor}%`
                    }
                }
            })

        }
    })
}
 */

function gerarDados() {
  var idCarro = sessionStorage.ID_Carro;
  var vtCPU = [];
  var vtRAM = [];

  fetch("/dashTecnico/dispositivos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idCarro: idCarro,
    }),
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        json.reverse();
        for (var index = 0; index < json.length; index++) {
          tipoDisp = json[index].tipo;
          horario = json[index].horario_registro;
          valor = json[index].valor;
          console.log(tipoDisp);
          if (tipoDisp == "RAM") {
            valRam.innerHTML = `${valor}%`;
            vtRAM.push(valor);
          } else if (tipoDisp == "CPU") {
            valCPU.innerHTML = `${valor}%`;
            vtCPU.push(valor);
          } else {
            valDisk.innerHTML = `${valor}%`;
          }
        }
      });
    }
  });
}

function graficoDispRam() {
  var idCarro = sessionStorage.ID_Carro;
  var vtData = [];
  var vtHorario = [];
  var vtDataSemFormatacao = [];
  valoresRam = [];

  fetch("/dashTecnico/dadosRam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idCarro: idCarro,
    }),
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        json = json.reverse();
        i = 0;
        for (var index = 0; index < json.length; index++) {
          tipoDisp = json[index].tipo;
          vtDataSemFormatacao.push(json[index].horario_registro);
          valor = json[index].valor;

          var limparData = vtDataSemFormatacao[i].split(".");
          var separarHorario = limparData[0].split("T");
          vtData.push(separarHorario[0]);
          vtHorario.push(separarHorario[1]);
          valoresRam.push(valor);
        }
        document.getElementById("grafico1").remove();
        var divGrafico = document.getElementById("graficoBarraCpu");
        var canvas = document.createElement("canvas");
        canvas.id = "grafico1";

        divGrafico.appendChild(canvas);

        let labels = [];

        var dados = {
          labels: labels,
          datasets: [
            {
              yAxisID: "y-usoRam",
              label: "Ram(%)",
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.5)",
              borderColor: "rgba(78, 115, 223, 1)",
              data: [
                valoresRam[4],
                valoresRam[3],
                valoresRam[2],
                valoresRam[1],
                valoresRam[0],
              ],
              fill: true,
            },
          ],
          options: {
            maintainAspectRatio: false,
            responsive: false,
          },
        };

        for (i = 0; i < json.length; i++) {
          var registro = json[i];
          var dataHorario = registro.horario_registro.split("T");
          dataHorario = [
            dataHorario[0].replace(/-/g, "/"),
            dataHorario[1].slice(0, 8),
          ];
          labels.push(dataHorario[1]);
        }

        const config = {
          type: "line",
          data: dados,
          options: {
            maintainAspectRatio: false,
            responsive: false,
            animation: 0.5,
          },
        };

        let myChartCpu = new Chart(document.getElementById("grafico1"), config);
      });
    }
  });
}

function graficoDispCpu() {
  var idCarro = sessionStorage.ID_Carro;
  var vtData = [];
  var vtHorario = [];
  var vtDataSemFormatacao = [];
  valoresUsoCPU = [];
  tempCPU = [];

  fetch("/dashTecnico/dadosCpu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idCarro: idCarro,
    }),
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        json = json.reverse();
        i = 0;

        document.getElementById("grafico2").remove();
        var divGrafico = document.getElementById("graficoBarraRAM");
        var canvas = document.createElement("canvas");
        canvas.id = "grafico2";

        divGrafico.appendChild(canvas);

        let labels = [];

        for (var index = 0; index < json.length; index++) {
          tipoDisp = json[index].tipo;
          vtDataSemFormatacao.push(json[index].horario_registro);
          valor = json[index].valor;
          unidade = json[index].unid_medida;

          if (unidade == "%") {
            valoresUsoCPU.push(valor);

            var registro = json[index];
            var dataHorario = registro.horario_registro.split("T");
            dataHorario = [
              dataHorario[0].replace(/-/g, "/"),
              dataHorario[1].slice(0, 8),
            ];
            labels.push(dataHorario[1]);
          } else if (unidade == "°C") {
            tempCPU.push(valor);
          }
        }

        var dados = {
          labels: labels,
          datasets: [
            {
              yAxisID: "y-usoCpu",
              label: "Uso Cpu(%)",
              lineTension: 0.3,
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(92, 925, 183, 1.5)",
              data: [
                valoresUsoCPU[4],
                valoresUsoCPU[3],
                valoresUsoCPU[2],
                valoresUsoCPU[1],
                valoresUsoCPU[0],
              ],
              fill: true,
            },
            {
              yAxisID: "y-Temperatura-cpu",
              label: "Temperatura(°C)",
              lineTension: 0.3,
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(250, 5, 35, 0.94)",
              data: [
                tempCPU[4],
                tempCPU[3],
                tempCPU[2],
                tempCPU[1],
                tempCPU[0],
              ],
              fill: true,
            },
          ],
          options: {
            maintainAspectRatio: false,
            responsive: false,
          },
        };

        const config = {
          type: "line",
          data: dados,
          options: {
            maintainAspectRatio: false,
            responsive: false,
            animation: 0.1,
          },
        };

        let myChartCpu = new Chart(document.getElementById("grafico2"), config);
      });
    }
  });
}

function verProcesso() {
  var idCarro = sessionStorage.ID_Carro;
  var vtData = [];
  var vtHorario = [];
  var vtDataSemFormatacao = [];
  var vtNomeProcessos = [];
  var vtPidProcessos = [];
  var vtConsumoProcessos = [];

  fetch("/dashTecnico/processos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idCarro: idCarro,
    }),
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        json = json.reverse();
        var i = 0;

        document.getElementById("grafico3").remove();
        var divGrafico = document.getElementById("graficoPieProcessos");
        var canvas = document.createElement("canvas");
        canvas.id = "grafico3";
        divGrafico.appendChild(canvas);

        contador = 0;

        for (var index = 0; index < json.length; index++) {
          vtNomeProcessos.push(json[index].nome);
          vtConsumoProcessos.push(json[index].cpu_perc);
          vtDataSemFormatacao.push(json[index].horario_registro);
          vtPidProcessos.push(json[index].pid);

          //Separando e formatando data e hora
          var limparData = vtDataSemFormatacao[i].split(".");
          var separarHorario = limparData[0].split("T");

          vtData.push(separarHorario[0]);
          vtHorario.push(separarHorario[1]);

          vtData[i] = vtData[i].split("-").reverse().join("/");

          i++;
        }

        const data = {
          labels: [
            vtNomeProcessos[0],
            vtNomeProcessos[1],
            vtNomeProcessos[2],
            vtNomeProcessos[3],
            vtNomeProcessos[4],
          ],
          datasets: [
            {
              label: "Uso CPU(%)",
              backgroundColor: [
                "#06D6A0",
                "#B84A62",
                "#0378b4",
                "#F34CA1",
                "#B62D11",
              ],
              borderColor: "none",
              data: [
                vtConsumoProcessos[0],
                vtConsumoProcessos[1],
                vtConsumoProcessos[2],
                vtConsumoProcessos[3],
                vtConsumoProcessos[4],
              ],
            },
          ],
        };

        const config = {
          type: "pie",
          data: data,
          options: {
            responsive: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Processos",
              },
            },
          },
        };

        let myChartCpu = new Chart(document.getElementById("grafico3"), config);
      });
    }
  });
}

function graficos() {
  graficoDispRam();
  graficoDispCpu();
}
