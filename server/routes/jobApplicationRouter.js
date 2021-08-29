const express = require("express");
const router = express.Router();
const ApplicationsController = require("../controllers/ApplicationsController");

router.get("/getApplications", ApplicationsController.getApplications);
router.post("/getCEP", ApplicationsController.getCEP);
router.post("/setApplication", ApplicationsController.setApplication);

module.exports = router;