const mysql = require('mysql');
require('dotenv').config();
module.exports.connectDB = () =>{
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'Nguyenhonghanh213',
            database: 'mydb',
        });
        con.connect((err)=>{
            if(err){
                reject(err);
            }
            resolve(con);
        });
    });
};
module.exports.closeDB = (con) =>{
    console.log('close db');
    con.destroy();
};