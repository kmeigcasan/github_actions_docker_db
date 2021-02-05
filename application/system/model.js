const Mysql = require('mysql');
const config = require('../config/database');

class Model {
    constructor(){
        this.connection = Mysql.createConnection({
            user: config.user,
            host: config.host,
            database: config.database,
            password: config.password
        });
    }
    runQuery(query, values, res){
        res.recordSQLProfile(query, values);
        return new Promise((resolve, reject) => {
			this.connection.query(query,values, function (err, result) {
				if(err) {
					reject(err);
				}else{
		        	resolve(result);
		        }
		    });
		});	
    }
    
}

module.exports = Model;