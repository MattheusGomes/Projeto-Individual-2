from lib2to3.pgen2 import driver
import logging
import pyodbc

driver = "ODBC Driver 18 for SQL Server"
server = "tcp:hcs-bd.database.windows.net,1433"
database = "hcs-bd"
username = "hcs-Grupo09"
password = "hardwareCSg9"

string_conexao = 'Driver={'+ driver +'};'+ 'Server=' + server + ';Database=' + database +';Uid='+ username + ';Pwd='+ password + ';Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'

conexao = pyodbc.connect(string_conexao)
cursor = conexao.cursor()
cursor.execute("SELECT * FROM Funcionario")
rows = cursor.fetchall()
teste = True
login = ''
senha = ''

for row in rows:
       print(row)
