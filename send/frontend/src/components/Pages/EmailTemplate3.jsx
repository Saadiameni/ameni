import PropTypes from 'prop-types';
import { ImMail4, ImPhone, ImLocation, ImEarth } from "react-icons/im";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { PiPictureInPictureLight } from "react-icons/pi";

const EmailTemplate3 = ({
  name = "John Doe", // Valeur par défaut pour name
  company = "Example Corp", // Valeur par défaut pour company
  email = "john.doe@example.com", // Valeur par défaut pour email
  phone = "+123 456 7890", // Valeur par défaut pour phone
  address = "1234 Example St,", // Valeur par défaut pour address
  website = "www.example.com", // Valeur par défaut pour website
  facebook = 'www.facebook.com', // Valeur par défaut pour facebook
  linkedin = 'www.linkedin.com', // Valeur par défaut pour linkedin
  photo =  "via.placeholder.com/120", // Valeur par défaut pour photo
  backgroundColor = '#ffffff', // Valeur par défaut pour backgroundColor
  textColor = '#000000', // Valeur par défaut pour textColor
  fontFamily = 'Arial, sans-serif', // Valeur par défaut pour fontFamily
  iconColor = '#325290', // Valeur par défaut pour iconColor
}) => {
  const styles = {
    container: {
      fontFamily: fontFamily,
      color: textColor,
      backgroundColor: backgroundColor,
      maxWidth: '600px',
      margin: 'auto',
      padding: '14.5px', // Réduit légèrement le padding
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      fontSize: '14px',
      border: '1px solid #ddd',
    },
    greeting: {
      fontSize: '16px',
      marginBottom: '11.5px', // Réduit légèrement la marge inférieure
      borderBottom: '1px solid #eee',
      paddingBottom: '7.5px', // Réduit légèrement le padding inférieur
    },
    signature: {
      display: 'flex',
      alignItems: 'flex-start',
      marginTop: '17.5px', // Réduit légèrement la marge supérieure
    },
    PictureUser: {
      width: '159.5px', // Réduit légèrement la largeur
      height: '129.5px', // Réduit légèrement la hauteur
      marginRight: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    verticalLine: {
      width: '1px',
      alignSelf: 'stretch',
      backgroundColor: '#ccc',
      margin: '0 17.5px', // Réduit légèrement la marge horizontale
    },
    textContainer: {
      flex: 1,
    },
    boldText: {
      margin: '0 0 3.5px 0', // Réduit légèrement la marge inférieure
      fontWeight: 'bold',
      fontSize: '18px',
    },
    normalText: {
      margin: '0 0 8.5px 0', // Réduit légèrement la marge inférieure
      color: '#666',
    },
    socialContainer: {
      marginTop: '5px',
      display: 'flex',
      gap: '10px',
    },
    contactItem: {
      marginBottom: '5.5px', // Réduit légèrement l'espace entre les éléments de contact
      display: 'flex',
      alignItems: 'center',
      color: '#333',
    },
    contactIconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      marginRight: '9.5px', // Réduit légèrement la marge droite
    },
    contactIcon: {
      width: '19.5px', // Réduit légèrement la taille des icônes
      height: '19.5px',
      color: iconColor,
    },
    contactLink: {
      color: '#1a73e8',
      textDecoration: 'none',
    },
    socialIconWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '19.5px', // Réduit légèrement la taille de l'icône sociale
      height: '19.5px',
      borderRadius: '50%',
      backgroundColor: '#f0f0f0',
      marginRight: '9.5px',
    },
  
  
    socialIcon: {
      width: '22px',
      height: '22px',
      color: iconColor,
    },
  };

  const ContactItem = ({ Icon, text, href }) => (
    <div style={styles.contactItem}>
      <div style={styles.contactIconWrapper}>
        <Icon style={styles.contactIcon} />
      </div>
      {href ? (
        <a href={href} style={styles.contactLink}>
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );

  ContactItem.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
  };

  const SocialIcon = ({ href, Icon, alt }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <div style={styles.socialIconWrapper}>
        <Icon style={styles.socialIcon} alt={alt} />
      </div>
    </a>
  );

  SocialIcon.propTypes = {
    href: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    alt: PropTypes.string.isRequired,
  };

  return (
    <div style={styles.container}>
      <p style={styles.greeting}>Cordialement {name},</p>
      <div style={styles.signature}>
        <div style={styles.PictureUser}>
          {photo ? (
            <img
              src={photo}
              alt="Photo de profil"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <PiPictureInPictureLight style={{ width: '100%', height: '100%' }} />
          )}
        </div>
        <div style={styles.verticalLine}></div>
        <div style={styles.textContainer}>
          <p style={styles.boldText}>{name}</p>
          <p style={styles.normalText}>@ {company}</p>
          <div style={styles.contactContainer}>
            <ContactItem
              Icon={ImMail4}
              text={email}
              href={`mailto:${email}`}
            />
            <ContactItem
              Icon={ImPhone}
              text={phone}
              href={`tel:${phone}`}
            />
            <ContactItem
              Icon={ImLocation}
              text={address}
            />
            <ContactItem
              Icon={ImEarth}
              text={website}
              href={website.startsWith('http') ? website : `http://${website}`}
            />
          </div>
          <div style={styles.socialContainer}>
            {facebook && (
              <SocialIcon
                href={facebook}
                Icon={FaFacebook}
                alt="Facebook"
              />
            )}
            {linkedin && (
              <SocialIcon
                href={linkedin}
                Icon={FaLinkedin}
                alt="LinkedIn"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

EmailTemplate3.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  facebook: PropTypes.string,
  linkedin: PropTypes.string,
  photo: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  iconColor: PropTypes.string,
};

export default EmailTemplate3;