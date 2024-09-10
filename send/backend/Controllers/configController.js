// controllers/configController.js
const Config = require("../models/ConfigModel");

// Create a new configuration
exports.createConfig = async (req, res) => {
    try {
        const newConfig = new Config(req.body);
        await newConfig.save();
        res.status(201).json({ message: "Configuration created successfully", config: newConfig });
    } catch (err) {
        res.status(500).json({ error: "Error creating configuration", details: err.message });
    }
};

// Get all configurations
exports.getConfigs = async (req, res) => {
    try {
        const configs = await Config.find().populate('user').populate('defaultTemplate');
        res.status(200).json(configs);
    } catch (err) {
        res.status(500).json({ error: "Error fetching configurations", details: err.message });
    }
};

// Get a single configuration by ID
exports.getConfigById = async (req, res) => {
    try {
        const config = await Config.findById(req.params.id).populate('user').populate('defaultTemplate');
        if (!config) {
            return res.status(404).json({ error: "Configuration not found" });
        }
        res.status(200).json(config);
    } catch (err) {
        res.status(500).json({ error: "Error fetching configuration", details: err.message });
    }
};

// Update a configuration by ID
exports.updateConfig = async (req, res) => {
    try {
        const updatedConfig = await Config.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user').populate('defaultTemplate');
        if (!updatedConfig) {
            return res.status(404).json({ error: "Configuration not found" });
        }
        res.status(200).json({ message: "Configuration updated successfully", config: updatedConfig });
    } catch (err) {
        res.status(500).json({ error: "Error updating configuration", details: err.message });
    }
};

// Delete a configuration by ID
exports.deleteConfig = async (req, res) => {
    try {
        const deletedConfig = await Config.findByIdAndDelete(req.params.id);
        if (!deletedConfig) {
            return res.status(404).json({ error: "Configuration not found" });
        }
        res.status(200).json({ message: "Configuration deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting configuration", details: err.message });
    }
};
