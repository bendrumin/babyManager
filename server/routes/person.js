var express = require('express');
var router = express.Router();
var Person = require('../models/person.schema.js');

router.get('/', function(req, res) {
  // find (select) all documents in our collection
  Person.find({}, function(err, data) {
    if(err) {
      console.log('find error:', err);
      res.sendStatus(500);
    } else {
      res.send(data);
      // res.send(result.rows)
    }
  });
});

router.post('/', function(req, res) {
  console.log('log the data: ', req.body);

  // create an object instance from our Person model
  var addPerson = new Person(req.body);
  console.log("Created from Person schema: ", addPerson);

  // insert into our collection
  addPerson.save(function(err, data) {
    console.log('saved data:', data);
    if(err) {
      console.log('save error: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });

});

router.put('/', function(req, res) {
  console.log('put route');
  console.log('New information: ', req.body);
  var updatePerson = req.body;
  Person.findByIdAndUpdate(
    { _id: updatePerson._id }, // how do i find this document?
    { $set:
      { phoneNumber: updatePerson.phoneNumber,
              notes: updatePerson.notes,
              allMeds: updatePerson.allMeds}
            }, // data to replace
    function(err, data) {
      if(err) {
        console.log('update error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  )
});
router.delete('/:id', function(req, res) {
  console.log('delete with id: ', req.params.id);

  Person.findByIdAndRemove(
    { _id: req.params.id }, // how do i find this document?
    function(err, data) {
      if(err) {
        console.log('remove error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );

});

module.exports = router;
