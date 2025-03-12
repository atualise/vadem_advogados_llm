#!/usr/bin/env python
# coding: utf-8


from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait


def getDriver():
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.enable_downloads = True
    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(1024, 768)
    return driver



def getDriverHeadless():
    #service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.binary_location = "/Users/vagner/chrome-headless-shell/mac-130.0.6723.69/chrome-headless-shell-mac-x64/chrome-headless-shell"
    options.enable_downloads = True
    options.add_argument("--headless=old")
    driver = webdriver.Chrome(options=options)
    driver.set_window_size(1024, 768)
    return driver



def searchProcesso(processo):
    driver = getDriverHeadless()
    # encontra um processo
    driver.get("https://esaj.tjsp.jus.br/cpopg/open.do")
    tipoProcesso = driver.find_element(By.ID, "radioNumeroAntigo").click()
    numProcesso = driver.find_element(By.ID, "nuProcessoAntigoFormatado").send_keys(processo)
    btnSubmit = driver.find_element(By.ID, "botaoConsultarProcessos").click()
    # coleta as informações sobre o processo
    partes_envolvidas = driver.find_element(By.ID, "tablePartesPrincipais").text
    foro = driver.find_element(By.ID, "foroProcesso").text
    vara = driver.find_element(By.ID, "varaProcesso").text
    juiz = driver.find_element(By.ID, "juizProcesso").text
    classe = driver.find_element(By.ID, "classeProcesso").text
    assunto = driver.find_element(By.ID, "assuntoProcesso").text
    driver.execute_script("document.getElementById('tabelaTodasMovimentacoes').style.display='block';")
    movimentacoes_container = driver.find_element(By.ID, "tabelaTodasMovimentacoes")
    movim_individual = movimentacoes_container.find_elements(By.CLASS_NAME, "containerMovimentacao")
    movimentacoes = []
    for mov in movim_individual:
        movimentacoes.append(mov.text)
    driver.quit()
    # formatacao resposta
    resultados = {
        "partes_envolvidos": partes_envolvidas, 
        "foro": foro, 
        "vara": vara, 
        "juiz": juiz, 
        "classe": classe, 
        "assunto": assunto, 
        "historico": movimentacoes
    }
    return resultados



def printResult(processo):
    text1, text2 = formatResult(processo)
    print(text1)
    print(text2)


def formatResult(processo):
    result = []
    result.append(f"\n# Informações e detalhes sobre sobre o processo #:\n")
    result.append(f"Classe do processo: {processo['classe']}\n")
    result.append(f"Assunto do processo: {processo['assunto']}\n")
    result.append(f"Foro do processo: {processo['foro']}\n")
    result.append(f"Vara do processo: {processo['vara']}\n")
    result.append(f"Juiz do processo: {processo['juiz']}\n")
    result.append(f"Partes envolvidas: {processo['partes_envolvidos']}\n")
    moviment = []
    items = []
    moviment.append(f"\n# Histórico de movimentações do processo #:\n")
    for h in processo['historico']:
        items.append(h)
    items.reverse()
    for idx, i in enumerate(items):
        moviment.append(f"\nSequência #{idx}: ")
        moviment.append(i)
    
    return "".join(result) , "".join(moviment)





