from pickle import FALSE, TRUE
import intro
import capturarDados
import os
import time
import platform
from sql_comandos import select

limpar = 'clear' if platform.system() == 'Linux' else 'cls'


def login():
    print("=-="*30)
    login = input(str("\033[1mDigite seu login:    \033[0m"))
    print("=-="*30)
    senha = input(str("\033[1mDigite sua Senha:    \033[0m"))
    print("=-="*30)

    dados = select(
        f"SELECT * FROM Funcionario WHERE email = '{login}' AND senha = '{senha}';")

    while not dados:
        os.system(limpar)
        print("=-="*30)
        print("\033[1mCredenciais Inválidas. Digite Novamente\033[0m")
        print("=-="*30)
        login = input(str("\033[1mDigite seu login:    \033[0m"))
        print("=-="*30)
        senha = input(str("\033[1mDigite sua Senha:    \033[0m"))
        print("=-="*30)

    print("\033[1mLogin Efetuado com sucesso !\033[0m")
    print("=-="*30)
    time.sleep(1)
    os.system(limpar)
    main()

def main():

    opcaoMenu = -1

    while opcaoMenu != 0:

        print(''' 
        \033[1m ESCOLHA UMA OPÇÃO:

          \033[92m[ 1 ] Exibir Dados do Servidor
          \033[91m[ 0 ] Sair do Programa
          \033[0m''')
        print("=-="*30)

        opcaoMenu = input('\033[1m>>>>>> Qual é a sua opção? \033[0m')

        if opcaoMenu == '0':
            print("=-="*30)
            print("\033[1mEncerrando Programa ....\033[0m")
            print("=-="*30)
            time.sleep(1)
            break
        try:
            if opcaoMenu == '1':
                isExibirDados = True
                while isExibirDados:
                    print('=-='*30)
                    print(
                        "\033[1mPressione \033[91mCtrl + C\033[0m \033[1mpara voltar ao Menu!\033[0m")
                    capturarDados.processos()

            else:
                print('=-='*30)
                print("\033[1mOpção Inválida. Digite Novamente\033[0m")
                print('=-='*30)
                time.sleep(1)
                os.system(limpar)

        except TypeError:
            time.sleep(1)
            os.system(limpar)
            main()
            print(TypeError, NameError)


""" 
intro.callIntro() """
os.system(limpar)
login()
