const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config()
app.use('/public', express.static(__dirname + '/public'))
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req,res) {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.get('/json', function (req,res) {
  return res.json( {"message": process.env.MESSAGE_STYLE === 'uppercase' ? "HELLO JSON": "Hello json"})
})

app.get('/now', (req,res,next) => {
  req.time = new Date().toString()
  next()
},(req,res) => {
  res.json({
    time: req.time
  })
})

app.get('/:word/echo' , (req,res) => {
  res.json({
    echo: req.params.word
  })
})

app.get('/name', (req,res) => {
  res.json({
    name: `${req.query.first} ${req.query.last}`
  })
})
app.post('/name', (req,res) => {
  res.json({
    name: `${req.body.first} ${req.body.last}`
  })
})
app.listen(3001, function() {
console.log(`Listening on port 3000`);
});


 module.exports = app;
