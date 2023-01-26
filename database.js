const mysql = require('mysql');
require('dotenv').config();
module.exports.connectDB = () => {
	return new Promise((resolve, reject) => {
		const con = mysql.createConnection({
			host: 'localhost',
			user: 'root' ,
			password:'123456789' ,
			database: 'fashionshop',
		});
		con.connect((err) => {
			if (err) {
				reject(err);
			}
			resolve(con);
		});
	});
};
module.exports.closeDB = (con) => {
	con.destroy();
};
