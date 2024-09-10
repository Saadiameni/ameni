import { useState } from "react";
const styles = {
  container: {
    backgroundImage: 'url("https://motionarray.imgix.net/1967678-xOE3RVqPOe-high_0000.jpg?w=660&q=60&fit=max&auto=format")',
    backgroundSize: 'cover',
    color: 'white',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center', // Centrer le contenu horizontalement
    boxSizing: 'border-box',
  },
  faqSection: {
    width: '60%', // Réduire la largeur pour centrer le contenu
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: 'rgb(28, 33, 67)',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    
  },
  contactSection: {
    width: '60%', // Réduire la largeur pour centrer le contenu
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #f9f7f7',
    borderRadius: '4px',
    backgroundColor: '#rgb(28, 33, 67)',
  },
  heading: {
    color: '#f7f3f3',
    fontSize: '36px',
    marginBottom: '20px',
    textAlign: 'center', // Centrer le titre
  },
  subheading: {
    color: '#9e71a7',
    fontSize: '24px',
    marginBottom: '10px',
  },
  question: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#394558',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  questionHover: {
    backgroundColor: '#af4c4c',
  },
  answer: {
    padding: '10px',
    backgroundColor: '#4b764e',
    borderRadius: '4px',
    marginTop: '5px',
  },
  icon: {
    fontSize: '18px',
    marginRight: '10px',
  },
};

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "Comment puis-je créer une signature ?",
      answer: "Vous pouvez créer une signature en remplissant les champs requis dans notre générateur et en cliquant sur le bouton 'Commencer' ou bien choisir un modele en cliquant sur le boutton 'Voir les modèles'.",
    },
    {
      question: "Puis-je ajouter des icônes sociales à ma signature ?",
      answer: "Oui, vous pouvez ajouter des icônes pour vos profils sociaux comme Facebook et LinkedIn.",
    },
    {
      question: "Comment puis-je changer la couleur de ma signature ?",
      answer: "Vous pouvez personnaliser la couleur de votre signature en utilisant le sélecteur de couleurs dans le générateur.",
    },
    {
      question: "Est-ce que je peux réinitialiser ma signature ?",
      answer: "Oui, il y a un bouton 'Réinitialiser' qui vous permet de revenir aux paramètres par défaut.",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Questions Fréquemment Posées (Q&A)</h1>

      <div style={styles.faqSection}>
        <h2 style={styles.subheading}>Introduction</h2>
        <p>
          Notre générateur de signature email vous permet de créer facilement une signature professionnelle personnalisée. 
          Voici quelques questions fréquentes pour vous aider à démarrer.
        </p>
      </div>

      <div style={styles.faqSection}>
        <h2 style={styles.subheading}>Questions Fréquemment Posées</h2>
        {questions.map((item, index) => (
          <div key={index}>
            <div
              style={{ ...styles.question, ...(activeIndex === index ? styles.questionHover : {}) }}
              onClick={() => toggleQuestion(index)}
            >
              <i style={styles.icon} className="fas fa-question-circle" />
              <strong>{item.question}</strong>
            </div>
            {activeIndex === index && (
              <p style={styles.answer}>{item.answer}</p>
            )}
          </div>
        ))}
      </div>

      <div style={styles.contactSection}>
        <h2 style={styles.subheading}>Contactez-nous</h2>
        <p>Si vous avez d'autres questions, n'hésitez pas à nous contacter à <a href="mailto:support@msc.com">support@example.com</a>.</p>
      </div>
    </div>
  );
};

export default FAQPage;
