const router = require("express").Router();
const nickController = require("../../controllers/nickname-cont");

// Matches with "/api/users"
// Get all users
router.get('/all', nickController.findAll);
// Get user by id
router.get("/email/:email", nickController.findByEmail);
// Create user
router.post('/createUser', nickController.create);

// Matches with "/api/users/:id"
router.put('/updateUser', nickController.update);


module.exports = router;
