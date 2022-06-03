var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
var config = require('./dbconfig');
const sql = require('mssql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

//create orders
router.post("/orders", async (req, res) => {
  try {
    await sql.connect(config);

    // create request object
    var request = await new sql.Request();
    request.input('Id', sql.Int, req.body.Id)
    request.input('Title', sql.NVarChar, req.body.Title)
    request.input('Quantity', sql.Int, req.body.Quantity)
    request.input('Price', sql.Int, req.body.Price)
      .execute("Insert_Order").then(function (recordSet) {
        res.status(200).json({
          msg: "success",
          rowsAffected: recordSet.rowsAffected
        })

      })

  }
  catch (err) {
    console.log(err)
    if (err.originalError.code == 'ELOGIN') {
      return res.send("Invalid credentials")
    }
    res.send(err)

  }

});

//select  orders
router.get("/orders", async (req, res) => {
  try {
    await sql.connect(config);
    new sql.Request().query('select * from orders', (err, result) => {
      // ... error checks
      if (err) return res.send(err)
      res.send(result.recordset)
    })
  }
  catch (err) {
    console.log(err)
    if (err.originalError.code == 'ELOGIN') {
      return res.send("Invalid credentials")
    }
    res.send(err)

  }

});

//select  orders by id
router.get("/orders/:id", async (req, res) => {
  try {
    await sql.connect(config);
    new sql.Request().query(`select * from orders where id=${req.params.id}`, (err, result) => {
      // ... error checks
      if (err) return res.send(err)
      if (result.recordset.length == 0) {
        return res.send("orders does not exits")
      }
      res.send(result.recordset)
    })
  }
  catch (err) {
    console.log(err)
    if (err.originalError.code == 'ELOGIN') {
      return res.send("Invalid credentials")
    }
    res.send(err)

  }

});

//..update order by id
router.put("/orders/:id", async (req, res) => {
  try {
    await sql.connect(config);
    new sql.Request().query(`select * from orders where id=${req.params.id}`, (err, result) => {
      // ... error checks
      if (err) return res.send(err)

      let req_data = {
        Id: req.params.id,
        Title: req.body.Title ? req.body.Title : result.recordset[0].Title,
        Quantity: req.body.Quantity ? req.body.Quantity : result.recordset[0].Quantity,
        Price: req.body.Price ? req.body.Price : result.recordset[0].Price
      }

      var request = new sql.Request();
      request.input('Id', sql.Int, req_data.Id)
      request.input('Title', sql.NVarChar, req_data.Title)
      request.input('Quantity', sql.Int, req_data.Quantity)
      request.input('Price', sql.Int, req_data.Price)
        .execute("UpdateOrder").then(function (recordSet) {
          res.status(200).json({
            msg: "success",
            rowsAffected: recordSet.rowsAffected
          })

        })


    })
    // create request object


  }
  catch (err) {
    console.log(err)
    if (err.originalError.code == 'ELOGIN') {
      return res.send("Invalid credentials")
    }
    res.send(err)

  }

});


//delete  orders by id
router.delete("/orders/:id", async (req, res) => {
  try {
    await sql.connect(config);
    new sql.Request().query(`select * from orders where id=${req.params.id}`, (err, result) => {
      // ... error checks
      if (err) return res.send(err)
      if (result.recordset.length == 0) {
        return res.send("orders does not exits")
      }
      new sql.Request().query(`delete  from orders where id=${req.params.id}`, (err, result) => {
        // ... error checks
        if (err) return res.send(err)
        res.send(`Id ${req.params.id} deleted successfully`)
      })
    })

  }
  catch (err) {
    console.log(err)
    if (err.originalError.code == 'ELOGIN') {
      return res.send("Invalid credentials")
    }
    res.send(err)

  }
})

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Order API is runnning at ' + port);
})