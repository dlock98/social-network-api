const { User } = require("../models");

 const userController = {
   // GET ALL USERS ➝ /api/users
   getAllUsers(req, res) {
     User.find({})
     .sort({ _id: -1 })
     .select("-__v")
     .then((dbUserData) => res.json(dbUserData))
     .catch((err) => {
       console.log(err);
       res.status(400).json(err);
     });
   },

   // GET SINGLE USER BY ID ➝ /api/users/:id
   getUserById({ params }, res) {
     User.findOne({ _id: params.id })
       .populate({
         path: 'thoughts',
         select: "-__v",
       })
       .populate({
         path: 'friends',
         select: "-__v",
       })
       .select("-__v")
       .then((dbUserData) => {
         // If no user id found, send 404
         if (!dbUserData) {
           res.status(404).json({ message: "No user found with this id!" });
           return;
         }
         res.json(dbUserData);
       })
       .catch((err) => {
         console.log(err);
         res.status(400).json(err);
       });
   },

   // POST: CREATE NEW USER ➝ /api/users
   createUser({ body }, res) {
     User.create(body)
       .select("-__v")
       .then((dbUserData) => res.json(dbUserData))
       .catch((err) => res.status(400).json(err));
   },

   // PUT: UPDATE USER BY ID ➝ /api/users/:id
   updateUser({ params, body }, res) {
     User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
       .select("-__v")
       .then(dbUserData => {
         if (!dbUserData) {
           res.status(404).json({ message: 'No user found with this id!' });
           return;
         }
         res.json(dbUserData);
       })
       .catch(err => res.status(400).json(err));
   },

   // DELETE: REMOVE USER BY ID ➝ /api/users/:id
   deleteUser({ params }, res) {
     User.findOneAndDelete({ _id: params.id })
       .select("-__v")
       .then((dbUserData) => {
         if (!dbUserData) {
           res.status(404).json({ message: "No user found with this id!" });
           return;
         }
         res.json(dbUserData);
       })
       .catch((err) => res.status(400).json(err));
   }
 };


 module.exports = userController;