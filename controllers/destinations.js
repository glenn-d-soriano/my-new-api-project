const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('destinations').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Added getSingle 
const getSingle = async (req, res) => {
  const destinationId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('destinations').find({ _id: destinationId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createDestination = async (req, res) => {
  const destination = {
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    bestTimeToVisit: req.body.bestTimeToVisit,
    rating: req.body.rating,
    category: req.body.category,
    mustSee: req.body.mustSee
  };
  const response = await mongodb.getDb().db().collection('destinations').insertOne(destination);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating the destination.');
  }
}; 

const updateDestination = async (req, res) => {
  const destinationId = new ObjectId(req.params.id);
  const destination = {
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    bestTimeToVisit: req.body.bestTimeToVisit,
    rating: req.body.rating,
    category: req.body.category,
    mustSee: req.body.mustSee
  };
  const response = await mongodb.getDb().db().collection('destinations').replaceOne({ _id: destinationId }, destination);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating the destination.');
  }
};

const deleteDestination = async (req, res) => {
  const destinationId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('destinations').deleteOne({ _id: destinationId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting the destination.');
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createDestination, 
  updateDestination, 
  deleteDestination 
};