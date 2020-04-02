let db = require("../Core/db");

exports.getMembers = async function (req, resp)
{
    try
    {
        let writeLog = async function (r)
        {
            dataJSON(resp, r.recordset);
        };
        await db.executeAsync("SELECT * FROM MEMBERS ORDER BY AGE DESC", writeLog);
    }
    catch (err)
    {
        errorJSON(resp, err);
    }
};

exports.getMember = async function (req, resp, id) {
    try {
        let writeLog = async function (r) {
            dataJSON(resp, r.recordset[0]);
        };
        await db.executeAsync("SELECT * FROM MEMBERS WHERE ID = " + id, writeLog);
    }
    catch (err) {
        errorJSON(resp, err);
    }
};

exports.postMember = async function (req, resp, name, age) {
    try {
        let sql = "INSERT INTO MEMBERS (NAME, AGE) VALUES ('" + name + "', " + age + ")";
        await db.insertAsync(sql, resp);
    }
    catch (err) {
        errorJSON(resp, err);
    }
};

let errorJSON = function (resp, err)
{
    resp.writeHead(500, "Internal Error", { "Content-Type": "application/json" });
    resp.write(JSON.stringify(err));
    resp.end();
}

let dataJSON = function (resp, d)
{
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.write(JSON.stringify(d));
    resp.end();
}

let successJSON = function (resp) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
}
