const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();
  // Create your routes here
  // Index
  router.get('/', (req, res) => {
    collection
    .find().toArray()
    .then((docs) => res.json(docs));
  });

  // Show
  router.get('/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    collection.findOne({_id: id})
    .then((docs) => res.json(docs));
  });

  // Post
  router.post('/', (req, res) => {
    const newSighting = req.body;
    collection.insertOne(newSighting)
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
  })

  // Delete
  router.delete('/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    collection.deleteOne({_id: id})
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs))
  })

  // Update
  router.put('/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    const editedSighting = req.body;
    collection.updateOne(
      {_id: id},
      {$set: editedSighting}
    )
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  return router;

};

module.exports = createRouter;
