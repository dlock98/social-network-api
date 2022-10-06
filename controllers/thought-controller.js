const { Thought } = require("../models");

 const thoughtController = {

   getAllThoughts(req, res) {
     Thought.find({})

   },
 };





 module.exports = thoughtController;