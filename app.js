// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
// =============================================================


app.use( express.static(__dirname + '/public'));

// Basic route that sends the user first to the AJAX Page

app.get("/notes", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    //sends the notes to the user
    console.log("we got here");
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// returns all of the created notes in a json format
app.get("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"),"utf-8", (err,data)=>{
    if(err){
      console.log(err);
    }
    return res.json(JSON.parse(data));
  })
});

//add a note
app.post("/api/notes",function(req,res){
    const requestText = req.body;
  console.log("this ihe request.text");
    console.log(requestText);
    //get the json from the database
    fs.readFile(`${__dirname}/db/db.json`,"utf-8",(err,data)=>{
      //turn into an object
      if(err){
        console(err);
      }
      const dataAsObjectArr = JSON.parse(data);
      requestText.id = requestText.title+ (dataAsObjectArr.length+1);

      //adding this data to the object
      dataAsObjectArr.push(requestText);
      //turn it back into a string
      const dataAsObjectArrString = JSON.stringify(dataAsObjectArr);
      //write it to the database
      fs.writeFile(`${__dirname}/db/db.json`,dataAsObjectArrString, "utf-8",(err)=> {
        if(err){
          console.log(err);
        }
        console.log("outgoing error?");
        return res.json("success!");
      })
    })

    
});

//delete an id using the req body
app.delete("/api/notes/:id", function(req,res){
    const id = req.params.id;
    fs.readFile(`${__dirname}/db/db.json`,"utf-8",(err,data)=>{
     
      if(err){
        console(err);
      }
       //turn into an object
      const dataAsObjectArr = JSON.parse(data);
      const checkIfHasRequestedId = elem => {
        return elem.id == id;
      };
      const idRequestedIndex = dataAsObjectArr.findIndex(checkIfHasRequestedId);

      dataAsObjectArr.splice(idRequestedIndex, 1);

      //turn it back into a string
      const dataAsObjectArrString = JSON.stringify(dataAsObjectArr);

      //write it to the database
      fs.writeFile(`${__dirname}/db/db.json`,dataAsObjectArrString, "utf-8",(err)=> {
        if(err){
          console.log(err);
        }
        return res.json("success!");
      })
    })
})
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});