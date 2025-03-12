const axios = require('axios');

var data = {
    "data": ["Hello!!"]
}

var event_id = '705dce71d5ee461cbc357c58a80b11fb';

var url = `https://ml.atualise.com:9900/call/responder_chat/${event_id}`;
var resposta = axios.get(url);

resposta.then(r => console.log(r?.data?.data));


