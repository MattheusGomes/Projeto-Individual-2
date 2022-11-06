import mysql.connector
import pymysql

conexao = mysql.connector.connect(
    host="localhost", user="root", password="matheus", database="hardware_control_system", autocommit=True)

def criar_conexao(host, usuario, senha, nomeDoBD):
    return mysql.connector.connect(host=host, user=usuario, password=senha, database=nomeDoBD, autocommit=True)

def insert_dados(con, dados):
    cursor = con.cursor()
    sql = "INSERT INTO testeTable (horario, cpu_perc, ram_perc, disco_perc, proc_nome, proc_cpu_uso) values (now(), %s, %s ,%s, %s, %s)"
    cursor.execute(sql, dados)
    cursor.close()

def select(query):
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

def fechar_conexao(con):
    return con.close()
