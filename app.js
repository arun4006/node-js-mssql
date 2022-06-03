const sql = require('mssql')
const  config = {
    user:  'mith', // sql user
    password:  '1234', //sql user password
    server:  'localhost', // if it does not work try- localhost
    database:  'movie',
    options: {
        trustServerCertificate: true
      },
    port:  1433
  }

sql.connect(config, err => {
    // ... error checks
       
    // Query  

    new sql.Request().query('select * from tutorials where id=7', (err, result) => {
        // ... error checks
        
        
        console.dir(result.recordset)
    })


    // new sql.Request()
    // .input('input_parameter', sql.Int, 12)
    // .output('output_parameter', sql.VarChar(50))
    // .execute('procedure_name', (err, result) => {
    //     // ... error checks

    //   //  console.dir(result)
    // })

})