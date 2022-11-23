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

    procExiste = select(f"select id from Processo where nome = '{dados[1]}';")
    pID = dados[0]

    if procExiste:
        pID = str(dados[0])
        cpuPer = str(dados[2])
        sql = "INSERT INTO MedidaProcesso (horario_registro,pid, cpu_perc, fk_processo) VALUES (now()," + \
            pID + "," + cpuPer + ","+str(procExiste[0]) + ")"
        cursor.execute(sql)
        cursor.close()
    else:
        pID = str(dados[0])
        cpuPer = str(dados[2])
        novoNome = str(dados[1])

        print(pID, novoNome, cpuPer)
        sql = "INSERT INTO Processo (nome, fk_carro)  VALUES ('" + \
            novoNome + "', 1)"
        cursor.execute(sql)

        novoId = select(f"select id from Processo where nome = '{dados[1]}';")
        print("processo id", novoId[0])
        nID = str(novoId[0])

        sql = "INSERT INTO MedidaProcesso (horario_registro,pid, cpu_perc, fk_processo) VALUES (now()," + \
            pID + "," + cpuPer + ","+nID + ")"
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
