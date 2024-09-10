// controllers/signatureController.js
const Signature = require("../models/SignatureModel");
const Config = require('../models/ConfigModel');
const ConfigModel = require("../models/ConfigModel");
// Create a new signature


function extractAndMergeProperties(data) {
    if (!data.configId) return data;

    const { configId, ...otherProps } = data;
    const { _id, __v, createdAt, updatedAt, ...configProps } = configId;

    const mergedData = {
        ...configProps,
        ...otherProps,
        configId
    };

    return mergedData;
}

// Get all signatures
exports.getSignatures = async (req, res) => {
    try {
        const signatures = await Signature.find().populate('configId');
        const cleanSignatures = signatures.map(el => extractAndMergeProperties(el.toObject()));
        res.status(200).json(cleanSignatures);
    } catch (err) {
        res.status(500).json({ error: "Error fetching signatures", details: err.message });
    }
};

exports.getSignatureById = async (req, res) => {
    try {
        const signatures = await Signature.findById(req.params.id).populate('configId');
        if (!signatures) {
            return res.status(404).json({ error: "Signature not found" });
        }
        const cleanSignatures = signatures.map(el => extractAndMergeProperties(el.toObject()));
        res.status(200).json(cleanSignatures);
    } catch (err) {
        res.status(500).json({ error: "Error fetching signature", details: err.message });
    }
};

exports.getSignatureByUserId = async (req, res) => {
    try {
        const signatures = await Signature.find({ user_id: req.params.id }).populate('configId')
        if (!signatures) {
            return res.status(404).json({ error: "Signature not found" });
        }
        const cleanSignatures = signatures.map(el => extractAndMergeProperties(el.toObject()));
        res.status(200).json(cleanSignatures);
    } catch (err) {
        res.status(500).json({ error: "Error fetching signature", details: err.message });
    }
};

exports.createSignature = async (req, res) => {
    try {
        const newConfig = new Config(req.body)
        let doc = await newConfig.save();
        const newSignature = new Signature({ ...req.body, configId: doc._id });
        await newSignature.save()
        res.status(201).json({ message: "Signature created successfully", signature: newSignature });
    } catch (err) {
        res.status(500).json({ error: "Error creating signature", details: err.message });
    }
};

// Update a signature by ID
exports.updateSignature = async (req, res) => {
    console.log(req.body)
    console.log(req.body.configId._id)
    try {
        const updatedSignature = await Signature
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
        const updatedConfig = await Config.findByIdAndUpdate(req.body.configId._id, {
            backgroundColor: req.body.backgroundColor,
            borderBottomColor: req.body.borderBottomColor,
            iconColor: req.body.iconColor,
            textColor: req.body.textColor
        })
        if (!updatedSignature || !updatedConfig) {
            return res.status(404).json({ error: "Signature not found" });
        }
        res.status(200).json({ message: "Signature updated successfully", signature: updatedSignature });
    } catch (err) {
        res.status(500).json({ error: "Error updating signature", details: err.message });
    }
};

// Delete a signature by ID
exports.deleteSignature = async (req, res) => {
    try {
        const signature = await Signature.findById(req.params.id);

        if (!signature) {
            return res.status(404).json({ error: "Signature not found" });
        }


        if (signature.configId) {
            console.log(signature.configId)
            await ConfigModel.findByIdAndDelete(signature.configId);
        }


        await Signature.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Signature deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting signature", details: err.message });
    }
};
