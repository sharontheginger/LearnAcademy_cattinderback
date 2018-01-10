var express = require('express');
var bodyParser = require('body-parser')
var validator = require('express-validator')
var app = express();
var Cat = require('./models').Cat

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())

app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
});

app.get('/cats', (req, res) => {
  Cat.findAll().then( (cats) =>{
    res.json({cats:cats})
  })
})
app.post('/cats', (req, res) => {

  // We setup a validation check for 'name'
  req.checkBody('name', 'Is required').notEmpty()

  // Now we can run our validations
  req.getValidationResult()
    .then((validationErrors) =>{

      // If there are no errors, go ahead and create cat
      if(validationErrors.isEmpty()){
        Cat.create({
          name: req.body.name,
          age: req.body.age,
          city: req.body.city,
          bio: req.body.bio
        }).then((cat)=>{
          res.status(201)
          res.json({cat: cat})
        })
      }else{

        // Uh ohh,  there were validation issues.  Report them back to the user.
        res.status(400)
        res.json({errors: {validations: validationErrors.array()}})
      }
    })
})
module.exports = app
