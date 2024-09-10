// controllers/userController.js
const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            return res.json({ error: "Cette adresse email est déjà utilisée" });
        } else {
            let newUser = new userModel(req.body);
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return console.log(err);
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        return console.log(err);
                    }
                    newUser.password = hashedPassword;
                    newUser.save();
                    res.json({ msg: "Compte créé avec succès !" });
                });
            });
        }
    } catch (err) {
        res.json(err);
    }
};

exports.loginUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ error: "Cette adresse email n'existe pas !" });
        } else {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    return console.log(err);
                }
                if (isMatch) {
                    const payload = {
                        "_id": user._id,
                        "email": user.email,
                    };
                    let token = jwt.sign(payload, "secret", { expiresIn: 3600 });
                    res.json({ msg: "Connecté avec succès !", token: token, user: user });
                } else {
                    res.json({ error: "Veuillez vérifier votre mot de passe" });
                }
            });
        }
    } catch (err) {
        res.json(err);
    }
};
