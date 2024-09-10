import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const styles = {
    container: {
        maxWidth: '700px',
        margin: 'auto',
        padding: '20px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        fontSize: '14px',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: '268px',
    },
    left: {
        flex: '0 0 30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '20px',
    },
    right: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    imageContainer: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    name: {
        color: '#333',
        margin: '0.5em 0 0',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    title: {
        color: '#555',
        margin: '0.3em 0',
        fontSize: '16px',
    },
    contactInfo: {
        margin: '5px 0',
        fontSize: '14px',
        color: '#555',
    },
    link: {
        textDecoration: 'none',
        color: '#1a73e8',
        fontWeight: 'bold',
    },
    socialIcons: {
        marginTop: '1em',
        listStyle: 'none',
        display: 'flex',
        padding: '0',
    },
    icon: {
        width: '24px',
        height: '24px',
        marginRight: '10px',
        color: '#1a73e8',
        transition: 'color 0.3s',
    },
    horizontalLine: {
        width: '100%',
        height: '5px',
        border: '0',
        borderTop: '3px solid #5e5c5c',
        margin: '10px 0',
    },
};

// Composant pour afficher les informations de contact
const ContactInfo = ({ label, value, href }) => (
    <p style={styles.contactInfo}>
        {label}: {href ? <a href={href} style={styles.link}>{value}</a> : value}
    </p>
);

// Composant principal de la signature d'email
const EmailTemplate2 = ({ data }) => {
    const templateRef = useRef();

    const downloadAsPDF = () => {
        html2canvas(templateRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${data.name}_template.pdf`);
        });
    };

    const downloadAsImage = () => {
        html2canvas(templateRef.current).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${data.name}_template.png`;
            link.click();
        });
    };
    const linkedinUrl = 'https://linkedin.com/in/yourprofile';
    const facebookUrl = 'https://facebook.com/yourprofile';
    const githubUrl = 'https://github.com/yourprofile';

    return (
        <div>
            <div ref={templateRef} style={styles.container}>
                <div style={styles.left}>
                    <div style={styles.imageContainer}>
                        <img src={data.imageUrl} alt="Profile" style={styles.image} />
                    </div>
                    <p style={styles.name}>{data.name}</p>
                    <p style={styles.title}>{data.title}</p>
                </div>
                <div style={styles.right}>
                    <ContactInfo label="Email" value={data.email} href={`mailto:${data.email}`} />
                    <ContactInfo label="Phone" value={data.phone} href={`tel:${data.phone}`} />
                    <ContactInfo label="Address" value={data.address} />
                    <ContactInfo label="Website" value={data.website} href={data.website} />
                    <hr style={styles.horizontalLine} />
                    <ul style={styles.socialIcons}>
                        <li>
                            <a href={linkedinUrl} aria-label="LinkedIn">
                                <FaLinkedin style={styles.icon} />
                            </a>
                        </li>
                        <li>
                            <a href={githubUrl} aria-label="GitHub">
                                <FaGithub style={styles.icon} />
                            </a>
                        </li>
                        <li>
                            <a href={facebookUrl} aria-label="Facebook">
                                <FaFacebook style={styles.icon} />
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button className='btn btn-primary' onClick={downloadAsPDF} style={{ marginRight: '10px' }}>Telecharger  PDF</button>
                <button className='btn btn-primary' onClick={downloadAsImage}>Telecharger  Image</button>
            </div>
        </div>
    );
};

export default EmailTemplate2;
