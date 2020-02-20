// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("*", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "/templates/index.html"));
});

app.get("/notes", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    //sends the notes to the user
    res.sendFile(path.join(__dirname, "/templates/index.html"));
});

// returns all of the created notes in a json format
app.get("/api/notes", function(req, res) {
  return res.json(characters);
});

//add a note
app.post("/api/notes",function(req,res){
    const id = req.body.id;

    return res.json()
});
//edit a note
app.post("/api/put/:id",function(req,res){
    const id = req.body.id;

    return res.json()
});

//delete an id using the req body
app.delete("/api/notes/:id", function(req,res){
    const id = req.body.id;
})
// Displays a single character, or returns false

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
