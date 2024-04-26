const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
fs.readdir('./files', function(err, files){
    if(!err){
        res.render('index', {files: files})
    }
})
})
app.post('/create', (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.data, function(err){
        if(!err){
            res.redirect('/')
        }
    })
})
app.get('/files/:fileName', (req, res)=>{
    fs.readFile(`./files/${req.params.fileName}`, 'utf-8', (err, fileData)=>{
        res.render('note', {name: req.params.fileName, data: fileData})
    })
})

app.listen(3000, ()=>{
    console.log('Server is running')
})