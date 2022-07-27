const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.port || 3001;


// html get routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });


// api get and post routes

app.get('/api/notes', (req, res) => {
    // Send a message to the client
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const notes = JSON.parse(data);
        }})
  
