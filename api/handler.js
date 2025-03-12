
const mariadb = require('mariadb');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const db_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}


const openConnection = () => {
  return new Promise(async (resolve, reject) => {
      try {
          console.log("Abrindo nova conexao...");
          var connection = await mariadb.createConnection({
              host: db_config.host,
              user: db_config.user,
              password: db_config.password,
              database: db_config.database,
              pipelining: true,
              connectTimeout: 5000,
              socketTimeout: 1000,
          });

          //return resolve(await setDefaultParamsOnConnection(connection));
          return resolve(connection);

      } catch (err) {
          console.error(err);
          return reject(err);
      }
  });
};



const closeConnection = (conn) => {
  if(conn){
    console.log("Fechando conexao com banco");
    conn.end();
    return true;
  } else {
    return false;
  }
  
};


const getTimestamp = () => {
  const dt = new Date();
  return new Date().toJSON().slice(0, 19).replace('T', ' ');
}


exports.vendas_eduzz = async (event) => {
  console.log(event);
  if(event && event.isBase64Encoded && event.isBase64Encoded == true)
    var body = atob(event.body);
  
  var connection = await openConnection();
  var retorno = Promise.resolve(body)
  .then(async body => {
    params_dec = decodeURIComponent(body)
    const data = new URLSearchParams(params_dec);
    console.log(data);
    const timestamp = getTimestamp();
    var params = [];
    if (data.get('edz_fat_cod')) params.push(["fat_cod", data.get('edz_fat_cod')]);
    if (data.get('edz_fat_status')) params.push(["fat_status", data.get('edz_fat_status')]);
    if (data.get('edz_fat_dtcadastro')) params.push(["fat_datacadastro", data.get('edz_fat_dtcadastro')]);
    if (data.get('edz_cli_rsocial')) params.push(["cli_nome", data.get('edz_cli_rsocial')]);
    if (data.get('edz_cli_email')) params.push(["cli_email", data.get('edz_cli_email')]);
    if (data.get('edz_valorpago')) params.push(["fat_valor", data.get('edz_valorpago')]);
    params.push(["id", uuidv4()]);
    params.push(["json", data]);
    params.push(["updated_at", timestamp]);
    var returnQuery = "INSERT INTO "+db_config.database+".vendas ( "+params.map(v => v[0]).join(',')+' ) VALUES ( "'+params.map(v => v[1]).join('","')+'" );';
    
    return Promise.resolve(returnQuery);
  })
  .then(async q => {
    console.log("Executando query", q);
    return (new Promise(async (resolve, reject) => {
      await connection.beginTransaction();
      try{
        var lastResult = await connection.query(q);
        await connection.commit();
        return resolve({status: "OK", data:{affectedRows: lastResult.affectedRows}});
      }catch(e){
        await connection.rollback();
        return reject(e);
      }
    }));
  })
  .then(()=>{
    return {
      statusCode:200,
      body: JSON.stringify("Message accepted!"),
    };
  })
  .finally(()=>closeConnection(connection))
  .catch(error => {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    };
  });
  return retorno;

};


