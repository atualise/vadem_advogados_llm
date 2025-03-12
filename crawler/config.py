"""
Módulo de configuração para carregar variáveis de ambiente
"""
import os
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Configurações do Elasticsearch
ES_CLOUD_ID = os.getenv('ES_CLOUD_ID')
ES_API_KEY = os.getenv('ES_API_KEY')

# Configurações do modelo LLM
MODEL_ID = "llama3.1:8b-instruct-q4_0" 