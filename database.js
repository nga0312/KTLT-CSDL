
// let mysql = require('mysql');

// let con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Nguyenhonghanh213",
//     database: "mydb"
// });

// con.connect((err)=>{
//     if (err) throw err;
//     console.log("Thành công!");
//     con.end();
// })

// con.end((err)=>{
//     if(err){
//         return console.log(err.message);
//     }
//     console.log("Close connection");
// });
// con.destroy();

const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "mydb"
})

pool.query(`select * from mydb`, (err, result, fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})