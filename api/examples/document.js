
const axios = require('axios');

const WEBHOOK_VERIFY_TOKEN = "vadem";
const GRAPH_API_TOKEN = "EAAW3XT0wzV4BO3ZAcG0LFKKKOBZB4SXqsfRKA6kLXzqpgo5NsXQJYEetYkYZAJMBZCdNuhV5X32gZCi5tZAu4slCaspktxJmgYrr38lJSWiz9szR9KZAwBXo94k2iF8jzeqrEEa0eJ8KmHxLMlGjzSI9sM4fReNcGtTbkDBZChliR13NJfQtZCGzU2tkDXyb33aHklWZAO1ZBL0gMcc1eOFniDJCfY6MscMLHErDmGoFwCInwZDZD";
const business_phone_number_id = "441867515682175";

var data = {
  messaging_product: "whatsapp",
  to: "5511975716615",
  recipient_type: "individual",
  type: "document",
  document: { id: "1986526815121301", caption: "Aqui está o documento", filename:"Peticao.docx" },
};


var url = `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`
var resposta = axios.post(url, data, { headers: { "Authorization": `Bearer ${GRAPH_API_TOKEN}` }});

resposta.then(r=>console.log(r));
