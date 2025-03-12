
const axios = require('axios');

const WEBHOOK_VERIFY_TOKEN = "";
const GRAPH_API_TOKEN = "";
const business_phone_number_id = "";

var data = {
  messaging_product: "whatsapp",
  to: "551199999999999",
  recipient_type: "individual",
  type: "audio",
  audio: { id: "999999999999999" },
};


var url = `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`
var resposta = axios.post(url, data, { headers: { "Authorization": `Bearer ${GRAPH_API_TOKEN}` }});

resposta.then(r=>console.log(r));
