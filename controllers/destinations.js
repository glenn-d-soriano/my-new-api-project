const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('New_Api_Project').collection('destinations').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error occurred while retrieving destinations.' });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const destinationId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('New_Api_Project').collection('destinations').find({ _id: destinationId });
    result.toArray().then((lists) => {
      if (lists.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      } else {
        res.status(404).json({ message: 'Destination not found.' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format.' });
  }
};

// POST
const createDestination = async (req, res) => {
  try {
    const destination = {
      name: req.body.name,
      country: req.body.country,
      description: req.body.description,
      bestTimeToVisit: req.body.bestTimeToVisit,
      rating: req.body.rating,
      category: req.body.category,
      mustSee: req.body.mustSee
    };
    const response = await mongodb.getDb().db('New_Api_Project').collection('destinations').insertOne(destination);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while creating the destination.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT
const updateDestination = async (req, res) => {
  try {
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
    const response = await mongodb.getDb().db('New_Api_Project').collection('destinations').replaceOne({ _id: destinationId }, destination);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Document not found or no changes made.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteDestination = async (req, res) => {
  try {
    const destinationId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('New_Api_Project').collection('destinations').deleteOne({ _id: destinationId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('No document found with that ID to delete.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createDestination,
  updateDestination,
  deleteDestination
};