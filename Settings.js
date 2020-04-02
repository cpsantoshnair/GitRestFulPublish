exports.dbCconfig =
{
    server: "familyserver.database.windows.net",
    database: "FAMILY",
    user: "santosh",
    password: "Narayanan@72",
    port: 1433,
    options: {
        encrypt: true
    }
};

exports.port = process.env.PORT || 9000;