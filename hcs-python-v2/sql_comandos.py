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
    sql = "INSERT INTO Medida (horario_registro, fk_dispositivo, valor) VALUES (now(), 1,"+ consumo +")"
    cursor.execute(sql)
    sql = "INSERT INTO Medida (horario_registro, fk_dispositivo, valor) VALUES (now(), 2,"+ temperatura +")"
    cursor.execute(sql)
    cursor.close()

def insert_ram(consumo):
    con = criar_conexao_local()
    cursor = con.cursor()
    sql = "INSERT INTO Medida (horario_registro, fk_dispositivo, valor) VALUES (now(), 3,"+ consumo +")"
    cursor.execute(sql)
    cursor.close()

def insert_disco(consumo):
    con = criar_conexao_local()
    cursor = con.cursor()
    sql = "INSERT INTO Medida (horario_registro, fk_dispositivo, valor) VALUES (now(), 4,"+ consumo +")"
    cursor.execute(sql)
    cursor.close()

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
