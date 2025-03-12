//const { v4: uuidv4 } = require('uuid');


function formatDataEduzz(p){
    if(p !== "" || p !== null){
        return p.slice(0,4)+"-"+p.slice(4,6)+"-"+p.slice(6,8);
    } else {
        return "";
    }
}

function formatVendas(input) {
    var d;
    if(typeof input === 'object'){
        d = input;
    } else {          
        d = JSON.parse(input);
    }

    //console.log(d);
    return {
        //id: d.trans_key,       
        cliente_nome: d.cus_name ? d.cus_name.replace(/[^\w @ . , \- _ ]/g, ''): '',
        cliente_email: d.cus_email ? d.cus_email.replace(/[^\w @ . \- _ ]/g, ''): '',
        cliente_telefone: d.cus_cel,
        cliente_cpf: d.cus_taxnumber,
        fatura_id: d.trans_cod,
        fatura_valor: d.trans_value,
        fatura_meiopagamento: d.trans_paymentmethod,
        fatura_createdate: d.trans_createdate ? formatDataEduzz(d.trans_createdate)+" "+d.trans_createtime : "",
        fatura_paiddate: d.trans_paiddate ? formatDataEduzz(d.trans_paiddate)+" "+d.trans_paidtime : "",
        fatura_duedate: d.trans_duedate ? formatDataEduzz(d.trans_duedate)+" "+d.trans_duetime : "",
        fatura_status: d.trans_status,
        fatura_pedidoid: d.trans_key,
        fatura_tipocobranca: d.product_chargetype,
        produto_id: d.product_cod,
        produto_nome: d.product_name ? d.product_name.replace(/[^\w @ . , \- _ ]/g, ''): '',
        produto_parent: d.product_parent_cod,
        cupom_desconto: d.discount_coupon_code,
        cliente_endereco: d.cus_address ? d.cus_address.replace(/[^\w @ . , \- _ ]/g, '') : '',
        cliente_numero: d.cus_address_number ? d.cus_address_number.replace(/[^\w @ . , \- _ ]/g, '') : '',
        cliente_complemento: d.cus_address_comp ? d.cus_address_comp.replace(/[^\w @ . , \- _ ]/g, '') : '',
        cliente_cidade: d.cus_address_city ? d.cus_address_city.replace(/[^\w @ . , \- _ ]/g, ''): '',
        cliente_estado: d.cus_address_state ? d.cus_address_state.replace(/[^\w @ . , \- _ ]/g, ''): '',
        cliente_cep: d.cus_address_zip_code ? d.cus_address_zip_code.replace(/[^\w @ . , \- _ ]/g, ''): '',
        cliente_pais: d.cus_address_country ? d.cus_address_country.replace(/[^\w @ . , \- _ ]/g, ''): '',
        afiliado_id: d.aff_cod,
        afiliado_nome: d.aff_name ? d.aff_name.replace(/[^\w @ . , \- _ ]/g, ''): '',
        afiliado_email: d.aff_email ? d.aff_email.replace(/[^\w @ . , \- _ ]/g, ''): '',
        afiliado_cpf: d.aff_document_number,
        afiliado_valor: d.aff_value,
        utm_source: d.utm_source,
        utm_medium: d.utm_medium,
        utm_campaign: d.utm_campaign,
        utm_content: d.utm_content,
        eduzz_valor: d.eduzz_value,
        produtor_id: d.pro_cod,
        produtor_nome: d.pro_name ? d.pro_name.replace(/[^\w @ . , \- _ ]/g, ''): '',
        produtor_valor: d.pro_value,
        checkout_url: d.page_checkout_url, 
        coprodutor_valor: d.cop_value,
        event_name: d.event_name,
        assinatura_status: d.recurrence_status,
        assinatura_startdate: d.recurrence_startdate,
        assinatura_intervalo: d.recurrence_interval,
        assinatura_tipointervalo: d.recurrence_interval_type,
        assinatura_primeiropagamento: d.recurrence_first_payment,
        assinatura_contagem: d.recurrence_count,
        assinatura_canceladadate: d.recurrence_canceled_at,
        assinatura_id: d.recurrence_cod,
        type: d.type,
    };
}




function formatVendasV2(input) {
    var d;
    if(typeof input === 'object'){
        d = input;
    } else {          
        d = JSON.parse(input);
    }

    //console.log(d);

    var arrReturn = [];

    if(d.trans_items){
        for(var i in d.trans_items){
            arrReturn.push({
                //id: d.trans_key,       
                cliente_nome: d.cus_name.replace(/[^\w @ . , \- _ ]/g, ''),
                cliente_email: d.cus_email.replace(/[^\w @ . , \- _ ]/g, ''),
                cliente_telefone: d.cus_cel,
                cliente_cpf: d.cus_taxnumber,
                fatura_id: d.trans_cod,
                fatura_valor: d.trans_items[i]['item_value'],
                fatura_meiopagamento: d.trans_paymentmethod,
                fatura_createdate: d.trans_createdate ? formatDataEduzz(d.trans_createdate)+" "+d.trans_createtime : "",
                fatura_paiddate: d.trans_paiddate ? formatDataEduzz(d.trans_paiddate)+" "+d.trans_paidtime : "",
                fatura_duedate: d.trans_duedate ? formatDataEduzz(d.trans_duedate)+" "+d.trans_duetime : "",
                fatura_status: d.trans_status,
                fatura_pedidoid: d.trans_items[i]['item_id'],
                fatura_tipocobranca: d.trans_items[i]['item_product_chargetype'],
                produto_id: d.trans_items[i]['item_product_id'],
                produto_nome: d.trans_items[i]['item_product_name'].replace(/[^\w @ . , \- _ ]/g, ''),
                produto_parent: d.product_parent_cod,
                cupom_desconto: d.discount_coupon_code,
                cliente_endereco: d.cus_address.replace(/[^\w @ . , \- _ ]/g, ''),
                cliente_numero: d.cus_address_number.replace(/[^\w @ . , \- _ ]/g, ''),
                cliente_complemento: d.cus_address_comp.replace(/[^\w @ . , \- _ ]/g, ''),
                cliente_cidade: d.cus_address_city.replace(/[^\w @ . , \- _ ]/g, ''),
                cliente_estado: d.cus_address_state.replace(/[^\w @ . , \- _ ]/g, ''),
                cliente_cep: d.cus_address_zip_code,
                cliente_pais: d.cus_address_country.replace(/[^\w @ . , \- _ ]/g, ''),
                afiliado_id: d.aff_cod,
                afiliado_nome: d.aff_name.replace(/[^\w @ . , \- _ ]/g, ''),
                afiliado_email: d.aff_email.replace(/[^\w @ . , \- _ ]/g, ''),
                afiliado_cpf: d.aff_document_number,
                afiliado_valor: d.aff_value,
                utm_source: d.utm_source,
                utm_medium: d.utm_medium,
                utm_campaign: d.utm_campaign,
                utm_content: d.utm_content,
                eduzz_valor: d.trans_items[i]['item_eduzz_value'],
                produtor_id: d.pro_cod,
                produtor_nome: d.pro_name.replace(/[^\w @ . , \- _ ]/g, ''),
                produtor_valor: d.pro_value,
                checkout_url: d.page_checkout_url, 
                coprodutor_valor: 0,
                event_name: d.event_name,
                assinatura_status: d.recurrence_status,
                assinatura_startdate: d.recurrence_startdate,
                assinatura_intervalo: d.recurrence_interval,
                assinatura_tipointervalo: d.recurrence_interval_type,
                assinatura_primeiropagamento: d.recurrence_first_payment,
                assinatura_contagem: d.recurrence_count,
                assinatura_canceladadate: d.recurrence_canceled_at,
                assinatura_id: d.recurrence_cod,
            });
        }
    }


    return arrReturn;
}


const formatTimestampToDatetime = (input) => {
    let retorno = "";
    if(input){
        let d = new Date(input);
        let year = d.getUTCFullYear();
        let month = d.getUTCMonth()+1;
        let day = d.getUTCDate();
        let hour = d.getUTCHours();
        let minute = d.getUTCMinutes();
        let second = d.getUTCSeconds();
        retorno = year + "-" + (month<10?"0"+month:month) + "-" + (day<10?"0"+day:day) + " "+(hour<10?"0"+hour:hour) + ":"+(minute<10?"0"+minute:minute) + ":"+(second<10?"0"+second:second);
    } else {
        retorno = null;
    }
    return retorno;
};


function formatContactActiveCampaign(input) {
    //console.log(input);
    var basicos;
    var geo = {};

    const isUtmSource = (d)=>{
        const sources = ['2','5','8','14','10'];
        return sources.includes(d);
    };

    const isUtmMedium = (d)=>{
        const mediums = ['1','4','7','16','12'];
        return mediums.includes(d);
    };

    const isUtmCampaign = (d)=>{
        const campaigns = ['3','6','9','15','11'];
        return campaigns.includes(d);
    };

    const proccessOrigens = (arr)=>{
        var origens = [];
        var grupos = {
            '2': {source:'2',medium:'1',campaign:'3'},
            '5': {source:'5',medium:'4',campaign:'6'},
            '8': {source:'8',medium:'7',campaign:'9'},
            '1': {source:'2',medium:'1',campaign:'3'},
            '4': {source:'5',medium:'4',campaign:'6'},
            '7': {source:'8',medium:'7',campaign:'9'},
            '14': {source:'14',medium:'16',campaign:'15'},
            '16': {source:'14',medium:'16',campaign:'15'},
            '10': {source:'10',medium:'12',campaign:'11'},
            '12': {source:'10',medium:'12',campaign:'11'},
        };
        var ind;
        var tmp;
        //console.log(arr);
        for(let i in arr){
            if(isUtmSource(arr[i].field)){
                tmp = arr.find((v)=>v.field === grupos[arr[i].field].medium);
                //console.log(tmp);
                ind = origens.findIndex((v) => v.utm_source === arr[i].value);
                if(ind > -1){
                    origens[ind].utm_source = arr[i].value;
                } else {
                    origens.push({
                        utm_source: arr[i].value,
                        utm_medium: tmp.value,   
                        created_date: formatTimestampToDatetime(arr[i].cdate)                 
                    });
                }
            }                
            else if(isUtmMedium(arr[i].field)){
                tmp = arr.find((v)=>v.field === grupos[arr[i].field].source);
                //console.log(tmp);
                ind = origens.findIndex((v) => v.utm_medium === arr[i].value);
                if(ind > -1){
                    origens[ind].utm_medium = arr[i].value;
                } else {
                    origens.push({
                        utm_source: tmp.value,
                        utm_medium: arr[i].value,   
                        created_date: formatTimestampToDatetime(arr[i].cdate)                 
                    });
                }
            }
            
            
        }
        return origens;

    };

    basicos = {
        created_date: input.contact.created_timestamp,
        updated_date: input.contact.created_timestamp,
        contato_id: input.contact.id,
        contato_email: input.contact.email,
        contato_primeironome: input.contact.firstName,
        contato_ultimonome: input.contact.lastName,
        list: input.contactLists.map((val)=> val.list).join(','),
        origem: proccessOrigens(input.fieldValues),
    };

    if(input.contactData && input.contactData[0]){
        
        geo = {
            geoIp4: input.contactData[0].geoIp4,
            geoCountry: input.contactData[0].geo_country,    
            geoState: input.contactData[0].geoState,  
            geoCity: input.contactData[0].geoCity,    
            geoLat: input.contactData[0].geoLat,  
            geoLon: input.contactData[0].geoLon,    
            geoTstamp: formatTimestampToDatetime(input.contactData[0].geoTstamp),   
        };
    };
    
    let retorno;
    if(basicos && geo){
        retorno = {...basicos, ...geo};
    }
    else if(basicos){
        retorno = basicos;
    }

    return new Promise((resolve, result)=>resolve(retorno));

    
}



function error_return(error) {
    return new Promise((resolve, reject) => resolve({        
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type':  'application/json'
        },
        body: JSON.stringify(error),
    }));
}


function sucess_return(data) {    
    return new Promise((resolve, reject) => resolve({        
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type':  'application/json'
        },
        body: JSON.stringify(data),        
    }));
}



function nodata_return() {
    return {
        statusCode: 400,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type':  'application/json'
        },
        body: JSON.stringify('{"message":"Nenhum dado foi enviado na requisição"}'),
    };
}



function constructQueryVendaAdd (data, db_config) {
    var params = [];
    //console.log(data);
    
    //if (data.id) params.push(["id", data.id]);
    if (data.cliente_nome) params.push(["cliente_nome", data.cliente_nome]);
    if (data.cliente_email) params.push(["cliente_email", data.cliente_email]);
    if (data.cliente_telefone) params.push(["cliente_telefone", data.cliente_telefone]);
    if (data.cliente_cpf) params.push(["cliente_cpf", data.cliente_cpf]);
    if (data.cliente_endereco) params.push(["cliente_endereco", data.cliente_endereco]);
    if (data.cliente_numero) params.push(["cliente_numero", data.cliente_numero]);
    if (data.cliente_complemento) params.push(["cliente_complemento", data.cliente_complemento]);
    if (data.cliente_cidade) params.push(["cliente_cidade", data.cliente_cidade]);
    if (data.cliente_estado) params.push(["cliente_estado", data.cliente_estado]);
    if (data.cliente_pais) params.push(["cliente_pais", data.cliente_pais]);
    if (data.cliente_cep) params.push(["cliente_cep", data.cliente_cep]);
    if (data.fatura_id) params.push(["fatura_id", data.fatura_id]);
    if (data.fatura_valor) params.push(["fatura_valor", data.fatura_valor]);
    if (data.fatura_meiopagamento) params.push(["fatura_meiopagamento", data.fatura_meiopagamento]);
    if (data.fatura_createdate) params.push(["fatura_createdate", data.fatura_createdate]);
    if (data.fatura_paiddate) params.push(["fatura_paiddate", data.fatura_paiddate]);
    if (data.fatura_duedate) params.push(["fatura_duedate", data.fatura_duedate]);
    if (data.fatura_status) params.push(["fatura_status", data.fatura_status]);
    if (data.fatura_pedidoid) params.push(["fatura_pedidoid", data.fatura_pedidoid]);
    if (data.produto_id) params.push(["produto_id", data.produto_id]);
    if (data.produto_nome) params.push(["produto_nome", data.produto_nome]);
    if (data.produto_parent) params.push(["produto_parent", data.produto_parent]);
    if (data.cupom_desconto) params.push(["cupom_desconto", data.cupom_desconto]);
    if (data.produtor_id) params.push(["produtor_id", data.produtor_id]);
    if (data.produtor_nome) params.push(["produtor_nome", data.produtor_nome]);
    if (data.produtor_valor) params.push(["produtor_valor", data.produtor_valor]);
    if (data.afiliado_id) params.push(["afiliado_id", data.afiliado_id]);
    if (data.afiliado_nome) params.push(["afiliado_nome", data.afiliado_nome]);
    if (data.afiliado_email) params.push(["afiliado_email", data.afiliado_email]);
    if (data.afiliado_cpf) params.push(["afiliado_cpf", data.afiliado_cpf]);
    if (data.afiliado_valor) params.push(["afiliado_valor", data.afiliado_valor]);
    if (data.eduzz_valor) params.push(["eduzz_valor", data.eduzz_valor]);
    if (data.utm_source) params.push(["utm_source", data.utm_source]);
    if (data.utm_medium) params.push(["utm_medium", data.utm_medium]);
    if (data.utm_campaign) params.push(["utm_campaign", data.utm_campaign]);
    if (data.utm_content) params.push(["utm_content", data.utm_content]);
    if (data.checkout_url) params.push(["checkout_url", data.checkout_url]);
    if (data.coprodutor_valor) params.push(["coprodutor_valor", data.coprodutor_valor]);
    if (data.event_name) params.push(["event_name", data.event_name]);
    if (data.assinatura_status) params.push(["assinatura_status", data.assinatura_status]);
    if (data.assinatura_startdate) params.push(["assinatura_startdate", data.assinatura_startdate]);
    if (data.assinatura_intervalo) params.push(["assinatura_intervalo", data.assinatura_intervalo]);
    if (data.assinatura_tipointervalo) params.push(["assinatura_tipointervalo", data.assinatura_tipointervalo]);
    if (data.assinatura_primeiropagamento) params.push(["assinatura_primeiropagamento", data.assinatura_primeiropagamento]);
    if (data.assinatura_contagem) params.push(["assinatura_contagem", data.assinatura_contagem]);
    if (data.assinatura_canceladadate) params.push(["assinatura_canceladadate", data.assinatura_canceladadate]);
    if (data.assinatura_id) params.push(["assinatura_id", data.assinatura_id]);
    if (data.fatura_tipocobranca) params.push(["fatura_tipocobranca", data.fatura_tipocobranca]);
    

        
    // data de criacao
    const timestamp = getTimestamp();
    params.push(["createdat", timestamp]);
    
    // remove aspas e formata tudo pra string
    /*
    params = params.map(v => {    
        if(v[1] === null || v[1] === undefined){
            return [v[0], ''];
        } else {
            return [v[0], String(v[1]).replace(/["']/g, "")];
        }
    });
    */

    var returnQuery = "INSERT INTO "+db_config.database+".vendas ( "+params.map(v => v[0]).join(',')+' ) VALUES ( "'+params.map(v => v[1]).join('","')+'" );';
    //console.log(returnQuery);
    return returnQuery;
}




function constructQueryVendaUpdate (data, db_config) {
    var params = [];
    //console.log(data);
    
    
    if (data.fatura_status) params.push("fatura_status = '"+ data.fatura_status + "'");
    if (data.assinatura_status) params.push("assinatura_status = '"+ data.assinatura_status + "'");
    if (data.assinatura_id) params.push("assinatura_id = '"+ data.assinatura_id + "'");
    if (data.fatura_meiopagamento) params.push("fatura_meiopagamento = '"+ data.fatura_meiopagamento + "'");
    if (data.event_name) params.push("event_name = '"+ data.event_name + "'");
    if (data.fatura_tipocobranca) params.push("fatura_tipocobranca = '"+ data.fatura_tipocobranca + "'");
    if (data.fatura_paiddate) params.push("fatura_paiddate = '"+ data.fatura_paiddate + "'");
    if (data.assinatura_startdate) params.push("assinatura_startdate = '"+ data.assinatura_startdate + "'");
    if (data.assinatura_intervalo) params.push("assinatura_intervalo = '"+ data.assinatura_intervalo + "'");
    if (data.assinatura_tipointervalo) params.push("assinatura_tipointervalo = '"+ data.assinatura_tipointervalo + "'");
    if (data.assinatura_primeiropagamento) params.push("assinatura_primeiropagamento = '"+ data.assinatura_primeiropagamento + "'");
    if (data.assinatura_contagem) params.push("assinatura_contagem = '"+ data.assinatura_contagem + "'");
    if (data.assinatura_canceladadate) params.push("assinatura_canceladadate = '"+ data.assinatura_canceladadate + "'");
    if (data.cliente_nome) params.push("cliente_nome = '"+ data.cliente_nome + "'");
    if (data.cliente_email) params.push("cliente_email = '"+ data.cliente_email + "'");
    if (data.cliente_telefone) params.push("cliente_telefone = '"+ data.cliente_telefone + "'");
    if (data.cliente_cpf) params.push("cliente_cpf = '"+ data.cliente_cpf + "'");
    if (data.cliente_endereco) params.push("cliente_endereco = '"+ data.cliente_endereco + "'");
    if (data.cliente_numero) params.push("cliente_numero = '"+ data.cliente_numero + "'");
    if (data.cliente_complemento) params.push("cliente_complemento = '"+ data.cliente_complemento + "'");
    if (data.cliente_cidade) params.push("cliente_cidade = '"+ data.cliente_cidade + "'");
    if (data.cliente_estado) params.push("cliente_estado = '"+ data.cliente_estado + "'");
    if (data.cliente_pais) params.push("cliente_pais = '"+ data.cliente_pais + "'");
    if (data.cliente_cep) params.push("cliente_cep = '"+ data.cliente_cep + "'");
    if (data.fatura_id) params.push("fatura_id = '"+ data.fatura_id + "'");
    if (data.fatura_valor) params.push("fatura_valor = '"+ data.fatura_valor + "'");
    if (data.fatura_createdate) params.push("fatura_createdate = '"+ data.fatura_createdate + "'");
    if (data.fatura_duedate) params.push("fatura_duedate = '"+ data.fatura_duedate + "'");
    if (data.fatura_pedidoid) params.push("fatura_pedidoid = '"+ data.fatura_pedidoid + "'");
    if (data.produto_id) params.push("produto_id = '"+ data.produto_id + "'");
    if (data.produto_nome) params.push("produto_nome = '"+ data.produto_nome + "'");
    if (data.produto_parent) params.push("produto_parent = '"+ data.produto_parent + "'");
    if (data.cupom_desconto) params.push("cupom_desconto = '"+ data.cupom_desconto + "'");
    if (data.produtor_id) params.push("produtor_id = '"+ data.produtor_id + "'");
    if (data.produtor_nome) params.push("produtor_nome = '"+ data.produtor_nome + "'");
    if (data.produtor_valor) params.push("produtor_valor = '"+ data.produtor_valor + "'");
    if (data.afiliado_id) params.push("afiliado_id = '"+ data.afiliado_id + "'");
    if (data.afiliado_nome) params.push("afiliado_nome = '"+ data.afiliado_nome + "'");
    if (data.afiliado_email) params.push("afiliado_email = '"+ data.afiliado_email + "'");
    if (data.afiliado_cpf) params.push("afiliado_cpf = '"+ data.afiliado_cpf + "'");
    if (data.afiliado_valor) params.push("afiliado_valor = '"+ data.afiliado_valor + "'");
    if (data.eduzz_valor) params.push("eduzz_valor = '"+ data.eduzz_valor + "'");
    if (data.utm_source) params.push("utm_source = '"+ data.utm_source + "'");
    if (data.utm_medium) params.push("utm_medium = '"+ data.utm_medium + "'");
    if (data.utm_campaign) params.push("utm_campaign = '"+ data.utm_campaign + "'");
    if (data.utm_content) params.push("utm_content = '"+ data.utm_content + "'");
    if (data.checkout_url) params.push("checkout_url = '"+ data.checkout_url + "'");
    if (data.coprodutor_valor) params.push("coprodutor_valor = '"+ data.coprodutor_valor + "'");

    // data de criacao
    const timestamp = getTimestamp();
    params.push("updatedat = '" + timestamp +"'");

    var returnQuery = "UPDATE "+db_config.database+".vendas SET "+params.join(', ')+" WHERE id = '"+data.id+"' LIMIT 1;";
    //console.log(returnQuery);
    return returnQuery;
}



async function verifyVendaExists (paramsSearch, db_config, conn) {
    var params = [];
    
    var subquery = "";
    subquery = " fatura_id = '"+paramsSearch.fatura_id+"' and produto_id = '"+paramsSearch.produto_id+"'";
    
    var query = "SELECT id FROM "+db_config.database+".vendas WHERE "+subquery+";";
    
    const rows = await conn.query(query);

    if(rows.length > 0){
        return rows[rows.length -1].id;
    } else {
        return false;
    }
}




function verifyLeadExists (paramsSearch, conn) {        
       
    return new Promise(async (resolve, reject)=>{
        var query = "SELECT id FROM leads WHERE contato_id = '"+paramsSearch.contato_id+"';";
        let runTimes = 0;
        let run = async ()=>{
            runTimes = runTimes + 1;
            if(runTimes > 4){
                reject("Erro ao buscar leads");
            }
            if(conn.isValid()){
                try{
                    await conn.query(query, async (err, res, meta) => {
                        if(err){
                            console.error("Erro na busca... tentando novamente", err); 
                            setTimeout(()=>console.log("Retomando a busca..."), 5000);
                            await run();
                        } else {                        
                            if(res.length > 0){
                                resolve(res[res.length -1].id);
                            } else {
                                resolve(false);
                            }                        
                        }
                    });
                }catch(err){
                    reject(err);                
                }
            } else {
                reject(conn);
            }
        };
        run();
        
    });
}




function constructQueryLeadSubscribe (data) {
    var params = [];
    //console.log(data);
    
    if (data.contato_id) params.push(["contato_id", data.contato_id]);
    if (data.contato_email) params.push(["contato_email", data.contato_email]);
    if (data.contato_primeironome) params.push(["contato_primeironome", data.contato_primeironome]);
    if (data.contato_ultimonome) params.push(["contato_ultimonome", data.contato_ultimonome]);    
    if (data.list) params.push(["list", data.list]);
    if (data.geoIp4) params.push(["geoip4", data.geoIp4]);
    if (data.geoCountry) params.push(["geocountry", data.geoCountry]);
    if (data.geoState) params.push(["geostate", data.geoState]);
    if (data.geoCity) params.push(["geocity", data.geoCity]);
    if (data.geoLat) params.push(["geolat", data.geoLat]);
    if (data.geoLon) params.push(["geolon", data.geoLon]);
    if (data.geoTstamp) params.push(["geotstamp", data.geoTstamp]);
    if (data.created_date) params.push(["created_date", data.created_date]);
    if (data.updated_date) params.push(["updated_date", data.updated_date]);

    // remove aspas e formata tudo pra string
    params = params.map(v => {    
        if(v[1] === null || v[1] === undefined){
            return [v[0], ''];
        } else {
            return [v[0], String(v[1]).replace(/["']/g, "")];
        }
    });

    var returnQuery = " INSERT INTO leads ( "+params.map(v => v[0]).join(',')+" ) VALUES ( '"+params.map(v => v[1]).join("','")+"' ); ";
    //console.log(returnQuery);
    return new Promise((resolve, reject) => resolve(returnQuery));
}



function constructQueryLeadOrigem (data) {
    return new Promise((resolve, reject) => {
       
        //console.log(data);
        if(data.origem && data.origem.length > 0){
            var params = [];
            var returnQuery = '';
            var d;
            for(var i in data.origem){
                d = data.origem[i];
                params = [];

                if (d.utm_source) params.push(["utm_source", d.utm_source]);
                if (d.utm_medium) params.push(["utm_medium", d.utm_medium]);
                if (data.contato_id) params.push(["contato_id", data.contato_id]);
                if (data.created_date) params.push(["created_date", data.created_date]);

                returnQuery = returnQuery+ " INSERT INTO leads_origem ( "+params.map(v => v[0]).join(',')+" ) VALUES ( '"+params.map(v => v[1]).join("','")+"' ); ";
            }    
            
            resolve(returnQuery);    
        } else {
            resolve(false);
        }
    });
}



function constructQueryLeadUpdate (data) {
    var params = [];
    //console.log(data);
    
    if (data.contato_id) params.push("contato_id = '"+ data.contato_id + "'");
    if (data.contato_email) params.push("contato_email = '"+ data.contato_email + "'");
    if (data.contato_primeironome) params.push("contato_primeironome = '"+ data.contato_primeironome + "'");
    if (data.contato_ultimonome) params.push("contato_ultimonome = '"+ data.contato_ultimonome + "'");
    if (data.form_id) params.push("form_id = '"+ data.form_id + "'");
    if (data.list) params.push("list = '"+ data.list + "'");
    //if (data.created_date) params.push(["created_date", data.created_date]);

    //var returnQuery = "INSERT INTO "+db_config.database+".leads ( "+params.map(v => v[0]).join(',')+" ) VALUES ( '"+params.map(v => v[1]).join("','")+"' );";
    var returnQuery = " UPDATE leads SET "+params.join(', ')+" WHERE id = '"+data.id+"' LIMIT 1; ";
    //console.log(returnQuery);
    return new Promise((resolve, reject) => resolve(returnQuery));
}



function constructQueryLeadUnsubscribe (data) {
    var params = [];
    //console.log(data);
    
    if (data.contato_id) params.push(["contato_id", data.contato_id]);
    if (data.contato_email) params.push(["contato_email", data.contato_email]);
    if (data.contato_primeironome) params.push(["contato_primeironome", data.contato_primeironome]);
    if (data.contato_ultimonome) params.push(["contato_ultimonome", data.contato_ultimonome]);
    if (data.campaign_id) params.push(["campaign_id", data.campaign_id]);
    if (data.form_id) params.push(["form_id", data.form_id]);
    if (data.list) params.push(["list", data.list]);
    if (data.created_date) params.push(["created_date", data.created_date]);

    // remove aspas e formata tudo pra string
    params = params.map(v => {    
        if(v[1] === null || v[1] === undefined){
            return [v[0], ''];
        } else {
            return [v[0], String(v[1]).replace(/["']/g, "")];
        }
    });

    var returnQuery = "INSERT INTO leads_unsubscribe ( "+params.map(v => v[0]).join(',')+" ) VALUES ( '"+params.map(v => v[1]).join("','")+"' );";
    //console.log(returnQuery);
    return new Promise((resolve, reject) => resolve(returnQuery));
}




function getTimestamp() {
    const dt = new Date();
    return new Date().toJSON().slice(0, 19).replace('T', ' ');
}


function Returns() {
    this.error_return = error_return;
    this.sucess_return = sucess_return;
    return this;
}

function Formatters() {
    this.formatVendas = formatVendas;
    this.formatVendasV2 = formatVendasV2;
    this.formatContactActiveCampaign = formatContactActiveCampaign;
    return this;
}



function Queries() {
    
    this.constructQueryVendaAdd = constructQueryVendaAdd;
    this.constructQueryVendaUpdate = constructQueryVendaUpdate;
    this.constructQueryLeadSubscribe = constructQueryLeadSubscribe;
    this.constructQueryLeadUnsubscribe = constructQueryLeadUnsubscribe;
    this.constructQueryLeadUpdate = constructQueryLeadUpdate;
    this.constructQueryLeadOrigem = constructQueryLeadOrigem;
    this.verifyVendaExists = verifyVendaExists;
    this.verifyLeadExists = verifyLeadExists;
    

    return this;
}

module.exports = {
    Returns: Returns,
    Formatters: Formatters,
    Queries: Queries,
}