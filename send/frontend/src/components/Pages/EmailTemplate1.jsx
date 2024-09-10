
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const styles = {
  emailContainer: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '15px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontSize: '14px',
    border: '1px solid #ddd',
    backgroundColor: '#ffffff',
  },
  header: {
    padding: '10px',
    borderBottom: '2px solid #e41433',
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '28px',
    color: '#333333',
    margin: '0 0 5px 0',
  },
  headerSubtitle: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '16px',
    color: '#777777',
    margin: '0',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '10px 0',
  },
  contactInfo: {
    flex: '1',
    textAlign: 'left',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginLeft: '20px',
    border: '2px solid #ddd',
  },
  contentText: {
    fontSize: '13px',
    lineHeight: '20px',
    color: '#555555',
    margin: '5px 0',
  },
  link: {
    color: '#e41433',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  socialIcons: {
    marginTop: '15px',
    display: 'flex',
  },
  socialIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
  socialIcon: {
    color: '#e41433',
    fontSize: '20px',
  },
};

const EmailTemplate1 = () => {
  return (
    <div style={styles.emailContainer}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Name Surname</h1>
        <p style={styles.headerSubtitle}>COMPANY NAME</p>
      </div>
      <div style={styles.content}>
        <div style={styles.contactInfo}>
          <p style={styles.contentText}>Urb. El Casar 1212, 212121 Madrid, Spain</p>
          <p style={styles.contentText}>+34 1111222111 | Skype: skypeid</p>
          <p style={styles.contentText}>
            <a href="mailto:name@company.com" style={styles.link}>name@company.com</a>
          </p>
          <p style={styles.contentText}>
            <a href="https://www.website.com" style={styles.link}>www.website.com</a>
          </p>
          <div style={styles.socialIcons}>
            <a href="https://www.facebook.com" style={styles.socialIconWrapper} aria-label="Facebook">
              <FaFacebook style={styles.socialIcon} />
            </a>
            <a href="https://twitter.com" style={styles.socialIconWrapper} aria-label="Twitter">
              <FaXTwitter  style={styles.socialIcon} />
            </a>
            <a href="https://www.linkedin.com" style={styles.socialIconWrapper} aria-label="LinkedIn">
              <FaLinkedin style={styles.socialIcon} />
            </a>
          </div>
        </div>
        <img 
          src="https://via.placeholder.com/120" 
          alt="Profile" 
          style={styles.profileImage}
        />
      </div>
    </div>
  );
};

export default EmailTemplate1;
