import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Acceuil.css'; // Assurez-vous que ce fichier CSS est bien créé

const Acceuil = () => {
  const navigate = useNavigate();

  // Fonction de gestion du clic sur le bouton pour naviguer vers l'éditeur de modèle
  const handleStart = () => {
    navigate('/template_editor/1'); // Redirige vers le chemin désiré lors du clic
  };

  return (
    <div className="home-container">
      <div className="cover-photo">
        <img src="" alt="Cover Photo" /> {/* Ajout de l'attribut alt pour l'accessibilité */}
      </div>
      <div className="text-overlay">
        <h1>Créer vos signatures e-mail professionnelles et personnelles</h1>
        <p>
          Faites ressortir vos e-mails en quelques clics! <br />
          avec le générateur de signature d'e-mail MSC.
        </p>
      
        <div className="cta-container">
          <button className="cta-button primary" onClick={handleStart}>
            Commencer
          </button>
          <Link to="/Modeles" className="cta-button secondary">
            Voir les modèles
          </Link>
        </div>
      </div>

      <h1
        style={{
          fontSize: '2.5rem',
          color: 'var(--primary-color)',
          textAlign: 'center',
          margin: '20px 0',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        MSC générateur e-mail
      </h1>

      <div className="features-container">
        <div className="feature-card yellow">
          <h2>Facile à utiliser</h2>
          <p>Interface intuitive et conviviale.</p>
        </div>
        <div className="feature-card green">
          <h2>Personnalisable</h2>
          <p>De nombreux modèles et options de personnalisation.</p>
        </div>
        <div className="feature-card blue">
          <h2>Gratuit</h2>
          <p>Créez vos signatures gratuitement.</p>
        </div>
      </div>

      <section className="marketing-section">
        <div className="marketing-grid">
          <div className="marketing-item">
            <div className="image-container">
              <img
                src="https://artlogo.co/cdn/shop/articles/6_Alternatives_to_WiseStamp_for_Small_Business_Owners_1100x.jpg"
                alt="Social Media Integration" // Ajout de l'attribut alt pour l'accessibilité
              />
            </div>
            <div className="content-container">
              <h3>Connectez-vous sur les réseaux sociaux</h3>
              <p>
                Ajoutez des liens vers vos comptes de médias sociaux pour
                faciliter la recherche en ligne des destinataires et leur
                permettre de découvrir votre entreprise.
              </p>
            </div>
          </div>

          <div className="marketing-item">
            <div className="image-container">
              <img
                src="https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2020.2F12.2F18.2F9792237b-8bdf-4d85-9279-6c61d6429cc7.2Ejpeg/1200x900/quality/80/crop-from/center/comment-faire-une-signature-electronique-sur-un-document-pdf.jpeg"
                alt="No Coding Required" // Ajout de l'attribut alt pour l'accessibilité
              />
            </div>
            <div className="content-container">
              <h3>Aucune expérience en codage ou en conception n'est requise.</h3>
              <p>
                Obtenez le look que vous souhaitez sans tracas ! Ajoutez
                simplement vos détails, choisissez un modèle et obtenez des
                résultats professionnels en moins de 2 minutes.
              </p>
            </div>
          </div>

          <div className="marketing-item">
            <div className="image-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLwCFdNyxHMyhQEwBnW_okRzTM-hQkvjBHhw&s"
                alt="Real-Time Updates" // Ajout de l'attribut alt pour l'accessibilité
              />
            </div>
            <div className="content-container">
              <h3>Mise à jour en temps réel</h3>
              <p>
                Modifiez votre signature à tout moment et voyez les changements
                instantanément.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Acceuil;
