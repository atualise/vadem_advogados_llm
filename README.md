# VADEM - IA para Advogados

VADEM é uma plataforma de inteligência artificial especializada para o campo jurídico brasileiro, projetada para auxiliar advogados em suas atividades diárias.

## 🚀 Sobre o Projeto

VADEM utiliza modelos de linguagem avançados (LLM) treinados especificamente com conteúdo jurídico brasileiro para oferecer assistência inteligente a profissionais da área do Direito. Com uma interface web amigável e integrações via WhatsApp, a plataforma possibilita consultas e automatiza tarefas jurídicas complexas.

## ✨ Principais Funcionalidades

- **Consulta a Processos**: Automatiza a busca e análise de processos jurídicos
- **Análise de Jurisprudência**: Pesquisa e resume jurisprudências relevantes
- **Geração de Petições**: Cria petições a partir de conversas com clientes
- **Tradução de Textos Jurídicos**: Simplifica e traduz textos jurídicos complexos
- **Resumos de Documentos**: Gera resumos concisos de documentos jurídicos extensos
- **Integração com WhatsApp**: Permite acesso às funcionalidades via WhatsApp

## 🧠 Tecnologias Utilizadas

- **Frontend**: HTML/CSS/JavaScript 
- **Backend**: Node.js com Serverless Framework na AWS
- **LLM**: Modelos Llama 3.1 otimizados para conteúdo jurídico brasileiro
- **Banco de Dados**: MariaDB
- **Indexação Vetorial**: Elasticsearch
- **Web Scraping**: Selenium para coleta de dados jurídicos
- **Integração**: WhatsApp Business API

## 📂 Estrutura do Projeto

- **/api**: Funções serverless que gerenciam as integrações e o backend
- **/app**: Interface web da plataforma
- **/crawler**: Scripts para coleta e processamento de dados jurídicos
- **/whatsapp**: Integração com o WhatsApp Business API

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js (v18+)
- Serverless Framework
- Python 3.8+ (para os crawlers)
- Acesso à API do WhatsApp Business
- Ollama ou servidor compatível para execução do LLM
- Elasticsearch para armazenamento vetorial

### Instalação

1. Clone o repositório
2. Configure o arquivo `.env` com suas credenciais:
   ```
   # Credenciais do banco de dados
   DB_HOST=seu_host
   DB_PORT=3306
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=vadem

   # Tokens WhatsApp/Facebook
   WEBHOOK_VERIFY_TOKEN=seu_token_verificacao
   GRAPH_API_TOKEN=seu_token_graph_api
   BUSINESS_PHONE_NUMBER_ID=seu_numero_telefone_business

   # Credenciais Elasticsearch
   ES_CLOUD_ID=seu_cloud_id
   ES_API_KEY=sua_api_key
   
   # Configurações AWS
   AWS_ACCOUNT_ID=sua_conta_aws
   AWS_REGION=us-east-1
   AWS_IAM_ROLE=serverless
   AWS_LAMBDA_DATABASE_LAYER=im-database
   AWS_LAMBDA_DATABASE_LAYER_VERSION=10
   AWS_LAMBDA_CONNECTION_LAYER=im-connection
   AWS_LAMBDA_CONNECTION_LAYER_VERSION=12
   AWS_ACM_CERTIFICATE=seu_certificado_acm
   ```
3. Instale as dependências:
   ```
   # Para API Node.js
   cd api && npm install
   
   # Para scripts Python
   cd crawler && pip install -r requirements.txt
   ```
4. Deploy da API:
   ```
   cd api && serverless deploy
   ```

## 🔒 Segurança

Este projeto utiliza variáveis de ambiente para armazenar informações sensíveis como senhas, tokens e chaves de API. Nunca comite o arquivo `.env` no controle de versão e sempre mantenha suas credenciais em local seguro.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues para sugerir melhorias ou reportar problemas.

## 📄 Licença

Este projeto é propriedade da Atualise Serviços Digitais.

## 📞 Contato

Para mais informações, acesse [www.vadem.org](http://www.vadem.org). 