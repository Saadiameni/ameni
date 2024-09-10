import React, { useRef } from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const EmailTemplate1 = ({ data }) => {
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

    return (
        <div>
            <div ref={templateRef} style={{
                maxWidth: '600px',
                margin: 'auto',
                padding: '15px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                fontSize: '14px',
                border: '1px solid #ddd',
                backgroundColor: data.backgroundColor,
                color: data.textColor
            }}>
                <div style={{
                    padding: '10px',
                    borderBottom: `2px solid ${data.borderBottomColor}`,
                }}>
                    <h1 style={{
                        fontWeight: 600,
                        fontSize: '24px',
                        lineHeight: '28px',
                        margin: '0 0 5px 0',
                    }}>{data.name}</h1>
                    <p style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '16px',
                        margin: '0',
                    }}>{data.company}</p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '10px 0',
                }}>
                    <div style={{
                        flex: '1',
                        textAlign: 'left',
                    }}>
                        <p style={{ margin: '5px 0' }}>{data.address}</p>
                        <p style={{ margin: '5px 0' }}>{data.phone} | Skype: {data.skype}</p>
                        <p style={{ margin: '5px 0' }}>
                            <a href={`mailto:${data.email}`} style={{ color: data.iconColor }}>{data.email}</a>
                        </p>
                        <p style={{ margin: '5px 0' }}>
                            <a href={data.website} style={{ color: data.iconColor }}>{data.website}</a>
                        </p>
                        <div style={{
                            marginTop: '15px',
                            display: 'flex',
                        }}>
                            <a href={data.facebook} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#f0f0f0',
                                marginRight: '10px',
                                transition: 'background-color 0.3s',
                                color: data.iconColor,
                            }} aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href={data.twitter} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#f0f0f0',
                                marginRight: '10px',
                                transition: 'background-color 0.3s',
                                color: data.iconColor,
                            }} aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href={data.linkedin} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#f0f0f0',
                                marginRight: '10px',
                                transition: 'background-color 0.3s',
                                color: data.iconColor,
                            }} aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                    <img
                        src={data.profileImage}
                        alt="Profile"
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: '20px',
                            border: '2px solid #ddd',
                        }}
                    />
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button className='btn btn-primary' onClick={downloadAsPDF} style={{ marginRight: '10px' }}>Telecharger  PDF</button>
                <button className='btn btn-primary' onClick={downloadAsImage}>Telecharger  Image</button>
            </div>
        </div>
  
       
    );
};

export default EmailTemplate1;
