import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './inscription.css';
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
function Inscription() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warn("Les mots de passe ne correspondent pas.");
      return;
    }

    axios.post('http://localhost:8000/api/auth/register', { username: username, email: email, password: password }).then(result => {
      console.log(result.data)
      if (result.data.error) {
        toast.error(result.data.error)
      } else {
        toast.success(result.data.msg)
        setTimeout(() => {
          navigate('/connexion')
        }, 2500);
      }
    })

  };

  return (
    <div className="inscription-container">
      <ToastContainer />
      <form className="inscription-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">S'inscrire</button>
      </form>
      <p className="login-link">
        Déjà un compte ? <Link to="/connexion">Se connecter</Link>
      </p>
    </div>
  );
}

export default Inscription;