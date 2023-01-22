
const { createPool } = require('mysql');

const pool = createPool({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "mydb"
})

const data = pool.query(`select * from mydb`, (err, result, fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})

module.exports = data;