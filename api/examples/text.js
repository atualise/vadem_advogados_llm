
const axios = require('axios');

const WEBHOOK_VERIFY_TOKEN = "";
const GRAPH_API_TOKEN = "";
const business_phone_number_id = "999999999999999";

axios({
    method: "POST",
    url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      to: "999999999999999",
      recipient_type: "individual",
      type: "text",
      text: { body: "aqui é a resposta nova" },
    },
});