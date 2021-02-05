const Loader = require("../system/loader");
const config = Loader.loadConfig();

const environment = {}, session = {}, properties = {};

environment["hostname"] = config.HOSTNAME;
environment["port"] = config.PORT;

session["secret"] = "secretKey";
session["resave"] = false;
session["saveUninitialized"] = true;
session["cookie"] = { maxAge: 60000 };


properties["enable_profiler"] = false;

module.exports = {environment, session, properties};