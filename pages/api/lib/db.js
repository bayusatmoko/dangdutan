var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT,
//   database: "songs",
// });

var con = mysql.createConnection({
    host: "mysql.cnrttzowjwem.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "Master1996",
    port: 3306,
    // database: "songs",
  });


export const executeQuery = (query) => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("success connect db")
    // con.query(query, function (err, result, fields) {
    //   if (err) throw err;
    //   console.log(result);
    });
  });
};
