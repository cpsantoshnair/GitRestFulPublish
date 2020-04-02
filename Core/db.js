let sql = require("mssql");
let settings = require("../Settings");

exports.executeAsync = async function (command, callback) {
    let pool = await sql.connect(settings.dbCconfig);
    let result = await pool.request().query(command);
    await callback(result);
}

exports.insertAsync = async function (command, resp) {
    let pool = await sql.connect(settings.dbCconfig);
    let result = await pool.request().query(command);
    insertJSON(resp, { message: "Insert Suceeded !!!"});
}

let insertJSON = function (resp, message) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.write(JSON.stringify(message));
    resp.end();
}

