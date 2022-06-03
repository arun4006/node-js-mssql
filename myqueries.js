//procedure

// CREATE procedure [dbo].[Insert_Order]  
// (  
// @Id int,  
// @Title varchar(50),  
// @Quantity int,  
// @Price int  
// )  
// AS  
// BEGIN  
// insert into Orders (Id,Title,Quantity,Price) values( @Id, @Title, @Quantity, @Price )  
// END 

//table

// create table Orders(
// Id int,  
// Title varchar(50),  
// Quantity int,  
// Price int  
// )


// ----------
// router.post("/orders", async (req, res)=> {
//     try{
//        sql.connect(config, function (err) {
//        if (err) {
//          console.log("there is a database connection error -> " + err);
//          res.send(err);
//        }
      
//          // create request object
//          var request =  new sql.Request();
//          request.input('Id', sql.Int, req.body.Id)
//          request.input('Title', sql.NVarChar, req.body.Title)
//          request.input('Quantity', sql.Int, req.body.Quantity)
//          request.input('Price', sql.Int, req.body.Price)
//          .execute("Insert_Order").then(function (recordSet) {
//              res.status(200).json({  data:request.recordSet })
//            })
   
   
   
       
//      });
//    }
//    catch(err){
   
//    }
//    });


//update order

// CREATE PROCEDURE [dbo].UpdateOrder
//  @Id int,  
//  @Title varchar(50),  
//  @Quantity int,  
//  @Price int 
 
// as
// BEGIN
 
//   update [Orders] set [Title] = @Title, [Quantity] = @Quantity, [Price]=@Price
//   where Id = @Id
 
// END