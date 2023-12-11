var mysql = require("mysql2/promise");

// var con = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT,
//   database: "songs",
// });

var dbConfig = {
    host: "mysql.cprlibvbnrcl.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "Master1996",
    port: 3306,
    database: "songs"
}


export const executeQuery = async (query) => {
  const connection = await mysql.createConnection(dbConfig)
  const data = await connection.execute(query)
  connection.destroy()
  return data;
};
