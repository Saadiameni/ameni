import React, { useRef } from 'react';
import { ImMail4, ImPhone, ImLocation, ImEarth } from "react-icons/im";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { PiPictureInPictureLight } from "react-icons/pi";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EmailTemplate3 = ({ data }) => {
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

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            color: data.textColor,
            backgroundColor: data.backgroundColor,
            maxWidth: '600px',
            margin: 'auto',
            padding: '14.5px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            fontSize: '14px',
            border: '1px solid #ddd',
        },
        greeting: {
            fontSize: '16px',
            marginBottom: '11.5px',
            borderBottom: '1px solid #eee',
            paddingBottom: '7.5px',
        },
        signature: {
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '17.5px',
        },
        PictureUser: {
            width: '159.5px',
            height: '129.5px',
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
            margin: '0 17.5px',
        },
        textContainer: {
            flex: 1,
        },
        boldText: {
            margin: '0 0 3.5px 0',
            fontWeight: 'bold',
            fontSize: '18px',
        },
        normalText: {
            margin: '0 0 8.5px 0',
            color: '#666',
        },
        socialContainer: {
            marginTop: '5px',
            display: 'flex',
            gap: '10px',
        },
        contactItem: {
            marginBottom: '5.5px',
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
            marginRight: '9.5px',
        },
        contactIcon: {
            width: '19.5px',
            height: '19.5px',
            color: data.iconColor,
        },
        contactLink: {
            color: '#1a73e8',
            textDecoration: 'none',
        },
        socialIconWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '19.5px',
            height: '19.5px',
            borderRadius: '50%',
            backgroundColor: '#f0f0f0',
            marginRight: '9.5px',
        },
        socialIcon: {
            width: '22px',
            height: '22px',
            color: data.iconColor,
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

    const SocialIcon = ({ href, Icon, alt }) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <div style={styles.socialIconWrapper}>
                <Icon style={styles.socialIcon} alt={alt} />
            </div>
        </a>
    );

    return (
        <div> <div ref={templateRef} style={styles.container}>
            <p style={styles.greeting}>Cordialement {data.name},</p>
            <div style={styles.signature}>
                <div style={styles.PictureUser}>
                    <img
                        src={data.photo}
                        alt="Photo de profil"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div style={styles.verticalLine}></div>
                <div style={styles.textContainer}>
                    <p style={styles.boldText}>{data.name}</p>
                    <p style={styles.normalText}>@ {data.company}</p>
                    <div style={styles.contactContainer}>
                        <ContactItem
                            Icon={ImMail4}
                            text={data.email}
                            href={`mailto:${data.email}`}
                        />
                        <ContactItem
                            Icon={ImPhone}
                            text={data.phone}
                            href={`tel:${data.phone}`}
                        />
                        <ContactItem
                            Icon={ImLocation}
                            text={data.address}
                        />
                        <ContactItem
                            Icon={ImEarth}
                            text={data.website}
                            href={data.website.startsWith('http') ? data.website : `http://${data.website}`}
                        />
                    </div>
                    <div style={styles.socialContainer}>
                        {data.facebook && (
                            <SocialIcon
                                href={data.facebook}
                                Icon={FaFacebook}
                                alt="Facebook"
                            />
                        )}
                        {data.linkedin && (
                            <SocialIcon
                                href={data.linkedin}
                                Icon={FaLinkedin}
                                alt="LinkedIn"
                            />
                        )}
                    </div>
                </div>
            </div>

        </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button className='btn btn-primary' onClick={downloadAsPDF} style={{ marginRight: '10px' }}>Telecharger  PDF</button>
                <button className='btn btn-primary' onClick={downloadAsImage}>Telecharger  Image</button>
            </div>
        </div>

    );
};

export default EmailTemplate3;
