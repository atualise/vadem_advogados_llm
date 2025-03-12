
const axios = require('axios');

const WEBHOOK_VERIFY_TOKEN = "vadem";
const GRAPH_API_TOKEN = "EAAW3XT0wzV4BO3ZAcG0LFKKKOBZB4SXqsfRKA6kLXzqpgo5NsXQJYEetYkYZAJMBZCdNuhV5X32gZCi5tZAu4slCaspktxJmgYrr38lJSWiz9szR9KZAwBXo94k2iF8jzeqrEEa0eJ8KmHxLMlGjzSI9sM4fReNcGtTbkDBZChliR13NJfQtZCGzU2tkDXyb33aHklWZAO1ZBL0gMcc1eOFniDJCfY6MscMLHErDmGoFwCInwZDZD";
const business_phone_number_id = "441867515682175";

var data = {
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "5511975716615",
  "type": "interactive",
  "interactive": {
    "type": "cta_url",
    "header": {
      "type": "text",
      "text": "Conheça o Vadem"
    },
    "body": {
      "text": "Saiba mais informações sobre o Vadem em nosso site."
    },
    "footer": {
      "text": "IA para Advogados"
    },
    "action": {
      "name": "cta_url",
      "parameters": {
        "display_text": "Saiba mais",
        "url": "https://www.vadem.org/sobre-servico"
      }
    }
  }
}
;


var url = `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`
var resposta = axios.post(url, data, { headers: { "Authorization": `Bearer ${GRAPH_API_TOKEN}` }});

resposta.then(r=>console.log(r));
