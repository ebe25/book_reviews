import express from "express";

import mysql from "mysql2";

import * as dotenv from 'dotenv' ;

import cors from "cors";

dotenv.config({ path: './config.env' })


const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads //middleware
//cors would let my react@(3002) client to make req to the server hosted at 3000 port
app.use(cors());


//create connection to database
const db = mysql.createPool({
    host: process.env.DB_HOST, //localhost
    user: process.env.DB_USER, //root
    password: process.env.DB_PASSWORD, //password
    database: process.env.DB, //ravenbooks
    port: 3306,
    connectionLimit : 10,
    debug    :  false
  });


  
   
  
  //server listener
  const listener=app.listen(process.env.PORT || 3000, ()=>{
    console.log("App is listening on the port "+listener.address().port );
  })


  //craeting the crud routes
//   app.get("/reviews", (req,res)=>{
//     db.getConnection(function(err, connection) 
// {
//     if (err) 
//     {
//          console.log("Connection ERROR")
//          console.log(err);
//     }
//     else 
//     {
//        connection.query('select * from book_reviews ; ', function (error, rows, fields) 
//        {
//             // When done with the connection, release it.
//             connection.release();

//             // Handle error after the release.
//             if (error) 
//             {
//                console.log("ERROR")
//                console.log(error);
//             }
//             if (rows)
//             {
//               res.send(rows)
//               }
//             if(fields)
//             {
//               res.send(fields)
               
//             }
//         });
//      }
     

     app.get("/reviews", (req, res) => {
      db.query("SELECT * FROM book_reviews", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
    

    //post route
    app.post("/reviews", (req, res) => {
      // const insertQuery = "insert into book_reviews (id,book_title, book_review,book_rating)values (5,'Alchemist', 'Mind-Altering', 4)";
      const insertQuery = "INSERT INTO book_reviews SET ?";
      
      db.query(insertQuery, req.body, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Review Added to Database");
        }
      });
    });
    

    //put route
    app.put("/reviews",(req,res)=>{
      const updateQuery=
      "UPDATE book_reviews SET book_review = ?, book_rating = ? WHERE id = ?";
      db.query(updateQuery,([req.body.book_review,req.body.book_rating,req.body.id]), (err,result)=>{
        if(err){
          console.log(err);
        }else{
          res.send(result);
         
        }
      })
    })
  

    //delete route
    app.delete("/reviews/:id", (req,res)=>{ //id enpoint req.params ke santh bind hoker jayega
      const deleteQuery="DELETE FROM book_reviews WHERE id=? ";
      db.query(deleteQuery, req.params.id,
        (err,result)=>{
        if(err){
          console.log(err);
        }else{
          res.send(result);
        }

      })
    });

    





  