const axios = require('axios');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;

// facebook - EAAW3XT0wzV4BOyn2dJTDC6Vlq7tIQeKYtlbYD5R0BDad8kDzcNxqzFoHNNZBua76NIoEB4rNWIevZCF3FCHKTX0friTlR89sZC2vnPWaTZAZB5QGi7dUZAaUpiGqWBcWtbFoEcukLOjN9gsyFn371vAwo3OwxLWzhBK7opgWc8hKGjEYVVkQssItpEA9pcTdB27INokM4cxKyedZAcc


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getResponse(event_id){
  var url = `https://127.0.0.1:9900/call/responder_chat/${event_id}`;
  var resposta = axios.get(url);
  return resposta.then(get => {
      texto = get?.data;
      return texto;
  });
}




const sendMessage = async (business_phone_number_id, message_to, message_text) => {
  console.log("Respondeu a mensagem");  
  await axios({
        method: "POST",
        url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message_to,
          recipient_type: "individual",
          type: "text",
          text: { body: message_text },
        },
    });

};



const markRead = (business_phone_number_id, message) => {
    console.log("Marcou como lida");
    var data = {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message?.id,
    };
    
    var url = `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`;

    axios.post(url, data, {headers: {Authorization: `Bearer ${GRAPH_API_TOKEN}`}});
};


exports.post_webhook = async (event) => {
  //console.log(JSON.stringify(event));
  var body = JSON.parse(event.body);
  //console.log(body);
  const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  const business_phone_number_id = body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

  console.log("pergunta", message?.text?.body);

  markRead(business_phone_number_id, message);   

  var data = {
    "data": [message?.text?.body],
  };

  var url = 'https://127.0.0.1:9900/call/responder_chat'
  var evento = axios.post(url, data, { headers: { "Content-Type": "application/json" }});
  
  console.log("Enviou para servidor responder");
  return evento.then(async post=>{
    var event_id = post?.data?.event_id;
    await sleep(5000);
    console.log("Busca resposta pronta");
    var retorno = await getResponse(event_id);
    var resposta = eval(retorno.split("data:")[1])[0];
    await sendMessage(business_phone_number_id, message?.from, resposta);
    console.log(resposta);
  })
  .then(r=>{
    return {
      "statusCode":200,
      "body":""
    }
  });
  
};




exports.send_message = async (event) => {
    //console.log(JSON.stringify(event));
    
  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  var body  = JSON.parse(event.body);
  const message_text = body.text;
  const message_to = body.to;
  const business_phone_number_id = "999999999999999";

  sendMessage(business_phone_number_id, message_to, message_text);

  return {
    "statusCode":200,
    "body":""
  }
};




// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
exports.get_webhook = async (event) => {
  console.log(event);
  const mode = event.queryStringParameters["hub.mode"];
  const token = event.queryStringParameters["hub.verify_token"];
  const challenge = event.queryStringParameters["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    console.log("Webhook verified successfully!");
    return {
        "statusCode":200,
        "body":challenge
    }
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    return {
        "statusCode":403,
        "body":challenge
    }
  }
};

