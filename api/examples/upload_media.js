const axios = require('axios');
const FormData = require('form-data');
const fs = require("fs");
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;
const business_phone_number_id = process.env.BUSINESS_PHONE_NUMBER_ID || "441867515682175";

var path = "/Users/vagner/Desenvolvimento/python/vadem/api/data/f1b25286-6ca4-4265-9282-03972e0b6a5f.docx";

const file = fs.readFile(path, async (err, data)=>{
  const form = new FormData();
  form.append('file', data, 'peticao.docx');  
  form.append('type', "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  form.append('messaging_product', "whatsapp");
  //console.log(form.getHeaders());
  var url = `https://graph.facebook.com/v21.0/${business_phone_number_id}/media`
  var resposta = await axios.post(url, form, { headers: { "Authorization": `Bearer ${GRAPH_API_TOKEN}`, ...form.getHeaders() }});
  console.log(resposta);

});

/*
types:
"audio/mpeg"
application/pdf
audio/mp4
application/vnd.openxmlformats-officedocument.wordprocessingml.document


*/ 