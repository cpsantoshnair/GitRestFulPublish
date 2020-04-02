let http = require("http");
let member = require("../Controllers/Members");
let setting = require("../Settings");
let util = require("util");
let url = require("url");

http.createServer(function (req, resp)
{
    switch (req.method)
    {
        case "GET":
            if (req.url === "/") {
                helpHTML(resp);
            }
            else if (req.url === "/api/FamilyMember") {
                member.getMembers(req, resp);
            }
            else {
                let idExpression = "[0-9]+";
                let regExp = new RegExp("/api/FamilyMember/" + idExpression);
                if (regExp.test(req.url)) {
                    regExp = new RegExp(idExpression);
                    let id = regExp.exec(req.url);
                    member.getMember(req, resp, id);
                }
            }
            break;
        case "POST":
            var query = url.parse(req.url, true).query;
            member.postMember(req, resp, query.Name, query.Age);
            break;
        default:
            notSupportedHTML(resp, req.method);
            break;
    }
}).
    listen(setting.port, function () { console.log("Started listening at port : " + setting.port) })

let notSupportedHTML = function (resp, method) {
    resp.writeHead(405, "Method not Supported", { "Content-Type": "text/html" });
    resp.write("<html><head><title>Method not Supported</title></head><body><h1>" + method + "</h1>This method is not supported !!!</body></html>");
    resp.end();
}

let helpHTML = function (resp) {
    resp.writeHead(200, "Help", { "Content-Type": "text/html" });
    resp.write("<html><head><title>Help</title></head><body><h1>Help - End Points</h1>All Members - 127.0.0.1:9000/api/FamilyMember<br>Member - 127.0.0.1:9000/api/FamilyMember/ID<br>Add Member - 127.0.0.1:9000/api/FamilyMember?Name=membername&Age=memberage</body></html>");
    resp.end();
}

let notSupportedJSON = function (resp, method) {
    resp.writeHead(405, "Method not Supported", { "Content-Type": "text/html" });
    resp.write("<html><head><title>Method not Supported</title></head><body><h1>" + method + "</h1>This method is not supported !!!</body></html>");
    resp.end();
}
