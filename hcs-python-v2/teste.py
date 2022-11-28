from conexao import criar_conexao_local, criar_conexao_teste
import mysql.connector
import platform
import psutil
import datetime
import os
from conexao import criar_conexao_teste
import time
import getmac

#sql = "INSERT INTO Processo (horario_registro, pid, nome, cpu_perc, fk_carro) VALUES (now(), %s, %s, %s, 1)"
#cursor.execute(sql, dados)
# cursor.close()


def select(query):
    conexao = criar_conexao_local()
    try:
        conexao.reconnect()
        cursor = conexao.cursor()
        cursor.execute(query)
        dados = cursor.fetchone()
    except mysql.connector.Error as error:
        print('Erro')
        dados = error
    finally:
        if conexao.is_connected():
            cursor.close()
            conexao.close()
            return dados


enderecoMac = getmac.get_mac_address()

enderecoMac = 'C2-F2-9F-2A-F9-7C'
idCarro = select("select id_carro from Carro where endereco_mac = '" +
                 enderecoMac + "' ;")


def processos():
    process_lista = []
    while True:
        for proc in psutil.process_iter():
            cpu_percent = proc.cpu_percent(interval=1)

            horario = datetime.datetime.fromtimestamp(
                proc.create_time()).strftime("%d-%m-%Y %H:%M")
            info = proc.as_dict(
                attrs=['pid', 'name', 'cpu_percent', 'create_time'])
            info['cpu_percent'] = round(cpu_percent / psutil.cpu_count(), 1)
            info['create_time'] = horario

            if (cpu_percent > 0):
                process_lista.append(info)
                dados = info['pid'], info['name'], info['cpu_percent']
                insert_proc(dados)

            print('\033[1mPROCESSOS\033[0m\n')

            for i in process_lista:
                prossID = i['pid']
                processo = i['name']
                cpu = i['cpu_percent']
                hor = i['create_time']
                print(
                    f'\033[1mPID: \033[95m{prossID}\033[0m \033[1mProcesso: \033[95m{processo}\033[0m \033[1mConsumo CPU(%): \033[95m{cpu}%\033[0m \033[1mHorario: \033[95m{hor}\033[0m')


def insert_proc(dados):
    con = criar_conexao_local()
    cursor = con.cursor()

    procExiste = select(
        f"select id from Processo where pid = {dados[0]} and nome = '{dados[1]}' and fk_carro = {idCarro[0]};")
    idP = procExiste
    print(idP)

    if procExiste:
        cpuPer = str(dados[2])
        sql = f"INSERT INTO MedidaProcesso (horario_registro, cpu_perc, fk_processo) VALUES (now(), {cpuPer}, {idP[0]})"
        cursor.execute(sql)
        cursor.close()

    else:
        pID = str(dados[0])
        cpuPer = str(dados[2])
        novoNome = str(dados[1])
        print(pID, novoNome, cpuPer)

        sql = f"INSERT INTO Processo (pid, nome, fk_carro) VALUES ({pID}, '{novoNome}', {idCarro[0]})"
        cursor.execute(sql)

        idP = select(
            f"select id from Processo where pid = {pID} and fk_carro = {idCarro[0]} ;")
        print(idP)

        sql = f"INSERT INTO MedidaProcesso (horario_registro, cpu_perc, fk_processo) VALUES (now(), {cpuPer}, {idP[0]})"
        cursor.execute(sql)
        cursor.close()

    #sql = "INSERT INTO Processo (horario_registro, pid, nome, cpu_perc, fk_carro) VALUES (now(), %s, %s, %s, 1)"
    #cursor.execute(sql, dados)
    # cursor.close()


processos()
