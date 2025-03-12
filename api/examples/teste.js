const axios = require('axios');


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getResponse(event_id){
    var url = `https://ml.atualise.com:9900/call/responder_chat/${event_id}`;
    var resposta = axios.get(url);
    return await resposta.then(get => {
        texto = get?.data;
        return texto;
    });
}


var data = {
    "data": ["Como funciona a empresa?"],
}
var url = 'https://ml.atualise.com:9900/call/responder_chat'
var evento = axios
    .post(url, data, { headers: { "Content-Type": "application/json" }})
    .then(async post=>{
        var event_id = post?.data?.event_id;
        console.log(event_id);
        await sleep(5000);
        var retorno = await getResponse(event_id);
        var resposta = eval(retorno.split("data:")[1])[0];
        console.log(resposta);

    });

