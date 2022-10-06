const router = require('express').Router();
 const {
   getAllThoughts,
   getThoughtById,
   createThought,
   updateThought,
   deleteThought,
   addReaction,
   removeReaction
 } = require('../../controllers/thought-controller');

 // /api/thoughts
 router
   .route('/')
   .get(getAllThoughts)
   .post(createThought);

 // /api/thoughts/:thoughtId
 router
   .route('/:id')
   .get(getThoughtById)
 //   .put(updateThought)
   .delete(deleteThought);



 module.exports = router;