const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// html get routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });


// api get and post routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.log("error with reading db.json!");
        } else {
          const notes = JSON.parse(data); 
        }})
});

app.post('/api/notes', (req, res) => {
    // const newNote = {
    //     title,
    //     text
    // };
    const newNote = createNewNote(req.body);
        res.json(newNote);
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
  

    