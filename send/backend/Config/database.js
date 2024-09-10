const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/saadi_database")
    .then(() => {
      console.log("Base de données connectée avec succès");
    })
    .catch((err) => {
      console.error("Erreur de connexion à la base de données ", err);
    });
};

module.exports = connectDB;
