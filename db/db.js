var mysql = require("mysql");


var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-east.connect.psdb.cloud',
  user            : 'w5wf94r18cxf2qucnz7a',
  password        : 'pscale_pw_UQYzLPCNoNTe4YDn0qjUNWr83tWuwnG8Ckih357oOKT',
  database        : 'patient-intake',
  ssl : {
      rejectUnauthorized: true
  }
  
});

module.exports = pool;