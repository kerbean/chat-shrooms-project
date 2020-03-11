const router = require("express").Router();
const userRoutes = require("./api-routes");

// Book routes
router.use("/books", userRoutes);

module.exports = router;
