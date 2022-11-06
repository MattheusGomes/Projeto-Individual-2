import platform
import psutil
import datetime
from conexao import criar_conexao, insert_dados

conexao = criar_conexao("localhost", "root", "matheus", "teste")


def dadosCPU():
    consumoCPU = psutil.cpu_percent(interval=None)
    nucleos = psutil.cpu_count(logical=False)
    processadoresLogicos = psutil.cpu_count() - psutil.cpu_count(logical=False)
    threads = psutil.cpu_count()

    print('=-='*43)
    print('=-='*43)
    print('\033[1mDADOS DE CPU (PROCESSADOR)\033[0m\n')
    print(f'\033[1mConsumo(%): \033[94m{consumoCPU}%\033[0m     \033[1mNúcleos: \033[94m{nucleos}\033[0m      \033[1mProcessadores Lógicos: \033[94m{processadoresLogicos}\033[0m      \033[1mThreads: \033[94m{threads}\033[0m')
    print('=-='*43)


def dadosRAM():
    consumoRam = psutil.virtual_memory()[2]
    memoriaRamTotal = round(psutil.virtual_memory()[0] / (10**9), 2)
    memoriaRamEmUso = round(psutil.virtual_memory()[3] / (10**9), 2)
    memoriaRamDisp = round(psutil.virtual_memory()[1] / (10**9), 2)
    print('\033[1mDADOS DE RAM (MEMÓRIA(S) RAM)\033[0m\n')
    print(f'\033[1mConsumo(%): \033[93m{consumoRam}%\033[0m     \033[1mCapacidade Total: \033[93m{memoriaRamTotal} Gb\033[0m      \033[1mEm Uso: \033[93m{memoriaRamEmUso} Gb\033[0m      \033[1mDisponível: \033[93m{memoriaRamDisp} Gb\033[0m')
    print('=-='*43)


dispositivos = psutil.disk_partitions()


def dadosDisco():
    print('\033[1mDADOS DE UNIDADES DE ARMAZENAMENTO (DISCOS)\033[0m\n')
    if platform.system() == 'Linux':
        armzTotalDisco = round((psutil.disk_usage('/')[0]) / (10**9), 2)
        espacoUsadoDisco = round((psutil.disk_usage('/')[1]) / (10**9), 2)
        espacoLivreDisco = round((psutil.disk_usage('/')[2]) / (10**9), 2)
        consumoDisco = round((psutil.disk_usage('/')[3]), 2)
        print(f'\033[1mUnidade de Armazenamento: \033[95m{"/:"}\033[0m   \033[1mEspaço Total: \033[95m{armzTotalDisco} Gb\033[0m   \033[1mEspaço Usado: \033[95m{espacoUsadoDisco} Gb\033[0m   \033[1mEspaço Livre: \033[95m{espacoLivreDisco} Gb\033[0m   \033[1mConsumo(%): \033[95m{consumoDisco}%\033[0m')

    else:
        for dispositivo in dispositivos:
            """
            armzTotalDisco = round(
                (psutil.disk_usage(f'{dispositivo.device}/')[0]) / (10**9),2);
            espacoUsadoDisco = round(
                (psutil.disk_usage(f'{dispositivo.device}/')[1]) / (10**9),2);
            espacoLivreDisco = round(
                (psutil.disk_usage(f'{dispositivo.device}/')[2]) / (10**9),2);
            consumoDisco = round(
                (psutil.disk_usage(f'{dispositivo.device}')[3]),2);
            """
            armzTotalDisco = round((psutil.disk_usage('/')[0]) / (10**9), 2)
            espacoUsadoDisco = round((psutil.disk_usage('/')[1]) / (10**9), 2)
            espacoLivreDisco = round((psutil.disk_usage('/')[2]) / (10**9), 2)
            consumoDisco = round((psutil.disk_usage('/')[3]), 2)

            print(f'\033[1mUnidade de Armazenamento: \033[95m{dispositivo.device}\033[0m   \033[1mEspaço Total: \033[95m{armzTotalDisco} Gb\033[0m   \033[1mEspaço Usado: \033[95m{espacoUsadoDisco} Gb\033[0m   \033[1mEspaço Livre: \033[95m{espacoLivreDisco} Gb\033[0m   \033[1mConsumo(%): \033[95m{consumoDisco}%\033[0m')
    print('=-='*43)


def temperatura():
    temperatura = psutil.sensors_temperatures()
    for name, entries in temperatura.items():
        print(name)
        for entry in entries:
            print("%-20s %s °C" % (
                entry.label or name, entry.current))


def exibir():
    dadosCPU()
    dadosDisco()
    dadosRAM()


def processos():
    process_lista = []
    while True:
  
        for proc in psutil.process_iter():
            cpu_percent = proc.cpu_percent(interval=1)
            consCPU = psutil.cpu_percent()
            consDisco = round((psutil.disk_usage('/')[3]), 2)
            consRam = psutil.virtual_memory()[2]
            exibir() 

            horario = datetime.datetime.fromtimestamp(
                proc.create_time()).strftime("%d-%m-%Y %H:%M")
            info = proc.as_dict(attrs=['pid', 'name', 'cpu_percent', 'create_time'])
            info['cpu_percent'] = round(cpu_percent / psutil.cpu_count(), 1)
            info['create_time'] = horario

            dados = consCPU, consRam, consDisco, str(info['name']), info['cpu_percent']
            insert_dados(conexao, dados) 

            if (cpu_percent > 0):
                process_lista.append(info)
            
            print('\033[1mPROCESSOS\033[0m\n')
            for i in process_lista:
                prossID = i['pid']
                processo = i['name']
                cpu = i['cpu_percent']
                hor = i['create_time']
                print(f'\033[1mPID: \033[95m{prossID}\033[0m \033[1mProcesso: \033[95m{processo}\033[0m \033[1mConsumo CPU(%): \033[95m{cpu}%\033[0m \033[1mHorario: \033[95m{hor}\033[0m')
