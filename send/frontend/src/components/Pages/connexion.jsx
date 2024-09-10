import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './connexion.css';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/auth/login', { email: email, password: password }).then(result => {
      if (result.data.error) {
        toast.error(result.data.error)
      } else {
        toast.success(result.data.msg)
        localStorage.setItem('user', JSON.stringify(result.data.user))
        localStorage.setItem('token', JSON.stringify(result.data.token))
        setTimeout(() => {
          navigate('/mes-signatures')
        }, 2500);

      }
    })
  };

  return (
    <div className="connexion-container">
      <ToastContainer />
      <form className="connexion-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
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
        <button type="submit" className="submit-btn">Se connecter</button>
      </form>
      <p className="signup-link">
        Pas de compte ? <Link to="/inscription">S'inscrire</Link>
      </p>
    </div>
  );
}

export default Connexion;