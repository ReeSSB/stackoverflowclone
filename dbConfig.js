var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
dbName = "b26we";
const dbUrl = `mongodb+srv://srshashibhushan:srshashibhushan@shashi.owkpy.mongodb.net/${dbName}`;
module.exports = { dbUrl, mongodb, MongoClient, dbName };
