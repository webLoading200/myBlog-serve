var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'self'
});
 
connection.connect();
function query(sql, prepared) {
    return new Promise((resolve, reject) => {
        connection.query(
            sql,
            prepared,
            function (err, results, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    })
}
module.exports = query
