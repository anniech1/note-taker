const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// html get routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});


app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });


// api get routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'db/db.json'));
});

app.get("/api/notes/:note", function(req, res) {
  var note = req.params.note;
  // console.log(note);
  res.json(note)      
});

// app.get('/api/notes', (req, res) => {
//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) {
//           console.log("error with reading db.json!");
//         } else {
//           const notes = JSON.parse(data); 
//         }})
// });

//api post routes
app.post('/api/notes', (req, res) => {
    // const newNote = {
    //     title,
    //     text
    // };
    // const newNote = createNewNote(req.body);
    //     res.json(newNote);
    const newNote = req.body;
    newNote.id = Date.now();
    var noteData = fs.readFileSync('./db/db.json');
    var noteTaker = JSON.parse(noteData);
    noteTaker.push(req.body);
    fs.writeFileSync('./db/db.json',JSON.stringify(noteTaker), (err, data) => {
      if (err) throw err;
      res.json(noteTaker)      
    });
    res.sendFile(path.join(__dirname,'public/notes.html'));
});



//start server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
  

