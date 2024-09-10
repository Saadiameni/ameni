// routes/configRoutes.js
const express = require("express");
const router = express.Router();
const configController = require("../Controllers/configController");

router.post("/create_config", configController.createConfig);
router.get("/get_configs", configController.getConfigs);
router.get("/get_config/:id", configController.getConfigById);
router.put("/update_config/:id", configController.updateConfig);
router.delete("/delete_config/:id", configController.deleteConfig);

module.exports = router;
