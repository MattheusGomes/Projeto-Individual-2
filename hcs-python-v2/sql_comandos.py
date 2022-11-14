from conexao import criar_conexao_local, criar_conexao_teste
import mysql.connector


def insert_dados(dados):
    con = criar_conexao_teste("localhost", "root", "matheus", "teste")
    cursor = con.cursor()
    sql = "INSERT INTO testeTable (horario, cpu_perc, ram_perc, disco_perc, proc_nome, proc_cpu_uso) values (now(), %s, %s ,%s, %s, %s)"
    cursor.execute(sql, dados)
    cursor.close()


def insert_cpu(consumo, temperatura):
    con = criar_conexao_local()
    cursor = con.cursor()
    sql = "INSERT INTO Medida (horario_registro, fk_dispositivo, valor) VALUES (now(), 5," + consumo + ")"
    cursor.execute(sql)
    sql = "INSERT INTO Medida (horario_registro, fk_dispositivo, valor) VALUES (now(), 6," + temperatura + ")"
    cursor.execute(sql)
    cursor.close()


def insert_ram(consumo):
    con = criar_conexao_local()
    cursor = con.cursor()
    sql = "INSERT INTO Medida (horario_registro, fk_dispositivo, valor) VALUES (now(), 7," + consumo + ")"
    cursor.execute(sql)
    cursor.close()


def insert_disco(consumo):
    con = criar_conexao_local()
    cursor = con.cursor()
    sql = "INSERT INTO Medida (horario_registro, fk_dispositivo, valor) VALUES (now(), 8," + consumo + ")"
    cursor.execute(sql)
    cursor.close()


def insert_proc(dados):
    con = criar_conexao_local()
    cursor = con.cursor()

    pidExiste = select(f"select pid from Processo where pid = {dados[0]} and nome = '{dados[1]}';")
    pid = dados[0]

    if pidExiste:    
        cpuPer = str(dados[2])
        sql = "INSERT INTO MedidaProcesso (horario_registro, cpu_perc, fk_processo) VALUES (now()," + cpuPer+ ","+str(pid) + ")"
        cursor.execute(sql)
        cursor.close()
    else:    
        pID = str(dados[0])
        cpuPer = str(dados[2])
        sql = "INSERT INTO Processo (pid, nome, fk_carro)  VALUES ("+str(dados[0])  + ",'" + str(dados[1]) + "', 1)"
        cursor.execute(sql)
    
        sql = "INSERT INTO MedidaProcesso (horario_registro, cpu_perc, fk_processo) VALUES (now()," + cpuPer+ ","+str(pid) + ")"
        cursor.execute(sql)
        cursor.close()

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
