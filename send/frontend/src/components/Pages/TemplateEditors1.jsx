
import { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaHome, FaLink, FaImage, FaPalette, FaDesktop, FaGoogleDrive, FaDropbox } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from 'axios'
import { SketchPicker } from 'react-color';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
const initialData = {
  name: "Name Surname",
  company: "COMPANY NAME",
  address: "Urb. El Casar 1212, 212121 Madrid, Spain",
  phone: "+34 1111222111",
  skype: "skypeid",
  email: "name@company.com",
  website: "https://www.website.com",
  profileImage: "https://via.placeholder.com/120",
  facebook: "https://www.facebook.com",
  twitter: "https://twitter.com",
  linkedin: "https://www.linkedin.com",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  iconColor: "#09ff90",
  borderBottomColor: "#000000",
  objet: "Cordialement,",
};

const TemplateEditors1 = ({ data }) => {
  console.log(data)
  const [formData, setFormData] = useState(initialData);
  const [activeForm, setActiveForm] = useState('details');
  const [user, setUser] = useState(null)

  
  const [showPickers, setShowPickers] = useState({
    backgroundColor: false,
    textColor: false,
    iconColor: false,
    borderBottomColor: false,
  });

  useEffect(() => {
    const userData = localStorage.getItem('user')
    setUser(JSON.parse(userData))
    if (data != undefined) {
      setFormData(data)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  const navigate = useNavigate()
  const handleMenuClick = (menu) => {
    setActiveForm(menu);
    setShowPickers({
      backgroundColor: false,
      textColor: false,
      iconColor: false,
      borderBottomColor: false,
    });
  };
  const { id } = useParams()

  const handleSaveTemplate = () => {
    console.log(user._id)
    if (data != undefined) {
      axios.put(`http://localhost:8000/api/signatures/update_signature/${data._id}`,
        formData)
        .then(() => {
          toast.success("template mis a jour avec succes")
          setTimeout(() => {
            navigate('/mes-signatures')
          }, 2500
          );
        })
    } else {
      axios.post('http://localhost:8000/api/signatures/create_signature',
        { ...formData, user_id: user._id, template_id: id })
        .then(() => {
          toast.success("template ajouté avec succes")
          setTimeout(() => {
            navigate('/mes-signatures')
          }, 2500
          );
        })
    }

  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setFormData(prevData => ({ ...prevData, profileImage: reader.result }));
    if (file) reader.readAsDataURL(file);
  };

  const handleColorChange = (colorName, color) => {
    setFormData(prevData => ({ ...prevData, [colorName]: color.hex }));
  };

  const togglePicker = (colorName) => {
    setShowPickers(prevShow => ({ ...prevShow, [colorName]: !prevShow[colorName] }));
  };

  const renderInput = (label, name, type = "text") => (
    <div style={styles.formGroup}>
      <label style={styles.label}>{label}:</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  );

  return (
    <div style={styles.container}>
      <ToastContainer />
      <nav style={styles.menuBar}>
        <button style={styles.menuItem} onClick={() => handleMenuClick('details')}>
          <FaHome /> <span style={styles.menuText}>Details</span>
        </button>

        <button style={styles.menuItem} onClick={() => handleMenuClick('social')}>
          <FaLink /> <span style={styles.menuText}>Ajouter Réseaux Sociaux</span>
        </button>
        <button style={styles.menuItem} onClick={() => handleMenuClick('image')}>
          <FaImage /> <span style={styles.menuText}>Télécharger une photo</span>
        </button>
        <button style={styles.menuItem} onClick={() => handleMenuClick('customization')}>
          <FaPalette /><span style={styles.menuText}>Personnaliser</span>
        </button>
      </nav>
      <div style={styles.contentContainer}>
        {activeForm === 'social' && (
          <div style={styles.formContainer}>
            <h2 style={styles.heading}>Ajouter des Réseaux Sociaux</h2>
            <form style={styles.form}>
              {renderInput("Facebook URL", "facebook")}
              {renderInput("Twitter URL", "twitter")}
              {renderInput("LinkedIn URL", "linkedin")}
            </form>
          </div>
        )}
        {activeForm === 'image' && (
          <div style={styles.formContainer}>
            <h2 style={styles.heading}>Télécharger une photo</h2>
            <div>
              <img src={formData.imageUrl} alt="Profile" style={styles.profileImage} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Télécharger une image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={styles.input}
              />
            </div>
          </div>
        )}
        {activeForm === 'customization' && (
          <div style={styles.formContainer}>
            <h2 style={styles.heading}>Personnaliser les couleurs</h2>
            <div>
              {Object.keys(showPickers).map(colorName => (
                <div key={colorName}>
                  <button style={styles.colorButton} onClick={() => togglePicker(colorName)}>

                    {colorName === 'backgroundColor' && 'Couleur de Fond'}
                    {colorName === 'textColor' && 'Couleur du Texte'}
                    {colorName === 'iconColor' && 'Couleur des Icônes'}
                    {colorName === 'borderBottomColor' && 'Couleur de la ligne'}
                  </button>
                  {showPickers[colorName] && (
                    <div style={styles.colorPicker}>
                      <SketchPicker
                        color={formData[colorName]}
                        onChange={(color) => handleColorChange(colorName, color)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeForm === 'details' && (
          <div style={styles.formContainer}>
            <h2 style={styles.heading}>Éditeur de Template</h2>
            <form style={styles.form}>
              {Object.keys(initialData).filter(key => !['profileImage', 'facebook', 'twitter', 'linkedin', 'backgroundColor', 'textColor', 'iconColor', 'borderBottomColor'].includes(key))
                .map((key, index) => renderInput(key.charAt(0).toUpperCase() + key.slice(1), key, key === 'email' ? 'email' : 'text'))}

            </form>
          </div>
        )}
        <div style={styles.previewContainer}>
          <h2 style={styles.heading}>Aperçu</h2>
          <div style={{ ...styles.preview, backgroundColor: formData.backgroundColor, color: formData.textColor, borderBottomColor: formData.borderBottomColor }}>
            <div style={styles.messageContainer}>
              <p style={{ ...styles.messageText, color: formData.textColor }}>{formData.message}</p>
            </div>
            <div style={{ ...styles.header, borderBottomColor: formData.borderBottomColor }}>
              <h1 style={{ ...styles.headerTitle, color: formData.textColor }}>{formData.name}</h1>
              <p style={{ ...styles.headerSubtitle, color: formData.textColor }}>{formData.company}</p>
            </div>
            <div style={styles.content}>
              <div style={styles.contactInfo}>
                <p style={{ ...styles.contentText, color: formData.textColor }}>{formData.address}</p>
                <p style={{ ...styles.contentText, color: formData.textColor }}>{formData.phone} | Skype: {formData.skype}</p>
                <p style={{ ...styles.contentText, color: formData.textColor }}>
                  <a href={`mailto:${formData.email}`} style={{ ...styles.link, color: formData.iconColor }}>{formData.email}</a>
                </p>
                <p style={{ ...styles.contentText, color: formData.textColor }}>
                  <a href={formData.website} style={{ ...styles.link, color: formData.iconColor }}>{formData.website}</a>
                </p>
                <div style={styles.socialIcons}>
                  {formData.facebook && (
                    <a href={formData.facebook} style={{ ...styles.socialIconLink, color: formData.iconColor }}>
                      <FaFacebook />
                    </a>
                  )}
                  {formData.twitter && (
                    <a href={formData.twitter} style={{ ...styles.socialIconLink, color: formData.iconColor }}>
                      <FaXTwitter />
                    </a>
                  )}
                  {formData.linkedin && (
                    <a href={formData.linkedin} style={{ ...styles.socialIconLink, color: formData.iconColor }}>
                      <FaLinkedin />
                    </a>
                  )}
                </div>
              </div>
              <img
                src={formData.profileImage}
                alt="Profile"
                style={styles.profileImage}
              />
            </div>
          </div>
          <button className="bg-primary py-4 px-2 text-white" onClick={handleSaveTemplate}> {data ? "mette a jour" : "créer"} </button>

        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  menuBar: {
    width: '200px',
    backgroundColor: 'rgb(28, 33, 67)',
    padding: '20px 10',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    padding: '10px 0',
    marginBottom: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'white',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s',
  },
  menuText: {
    marginLeft: '10px',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  formContainer: {
    width: '300px',
    padding: '20px',
    borderRight: '2px solid #ddd',
    background: '#fff',
    overflowY: 'auto',
  },
  form: {
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '12px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  iconButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  iconText: {
    marginTop: '10px',
    fontSize: '12px',
    textAlign: 'center',
  },
  previewContainer: {
    flex: 1,
    padding: '20px',
    background: '#fff',
    overflowY: 'auto',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  preview: {
    maxWidth: '650px',
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontSize: '14px',
    background: '#fff',
    position: 'sticky',
    top: '20px',
  },
  header: {
    padding: '10px',
    borderBottom: '2px solid',
    marginBottom: '15px',
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '28px',
    margin: '0 0 5px 0',
  },
  headerSubtitle: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '16px',
    margin: '0',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px 0',
  },
  contactInfo: {
    flex: '1',
    textAlign: 'left',
  },
  contentText: {
    fontSize: '13px',
    lineHeight: '20px',
    margin: '5px 0',
  },
  link: {
    textDecoration: 'none', fontWeight: 'bold',
  },
  socialIcons: {
    display: 'flex',
    marginTop: '15px',
  },
  socialIconLink: {
    marginRight: '10px',
    fontSize: '24px',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginLeft: '20px',
  },
  colorButton: {
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f1f1f1',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  colorPicker: {
    position: 'absolute',
    zIndex: '2',
  },
};

export default TemplateEditors1;