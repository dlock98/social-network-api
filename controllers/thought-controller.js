const { Thought, User } = require("../models");

 const thoughtController = {

   getAllThoughts(req, res) {
     Thought.find({})
        .sort({ _id: -1 })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
        console.log(err);
        res.status(400).json(err);
        });
 },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
  },

  createThought({ params, body }, res) {
    // console.log(body);
    Thought.create(body)
      .then(({ params }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
   };

 module.exports = thoughtController;