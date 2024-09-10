import { useEffect, useState } from 'react';
import { ImMail4, ImPhone, ImLocation, ImEarth } from "react-icons/im";
import { FaFacebook, FaLinkedin, FaHome, FaPalette, FaImage, FaLink } from "react-icons/fa";
import { SketchPicker } from 'react-color';
import { PiPictureInPictureLight } from "react-icons/pi";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const TemplateEditor = ({ data }) => {
  const initialFormData = {
    name: "John Doe",
    company: "Example Corp",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
    address: "1234 Example St, City, Country",
    website: "www.example.com",
    facebook: "www.facebook.com",
    linkedin: "www.linkedin.com",
    photo: null,
    backgroundColor: "#ffffff",
    textColor: "#333333",
    iconColor: "#2600ff",
    borderBottomColor: "#000000",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPickers, setShowPickers] = useState({
    backgroundColor: false,
    textColor: false,
    iconColor: false,
    borderBottomColor: false,
  });
  const [activeForm, setActiveForm] = useState('details');

  const [user, setUser] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const userData = localStorage.getItem('user')
    setUser(JSON.parse(userData))
    if (data != undefined) {
      setFormData(data)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({ ...prevData, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleColorChange = (colorName, color) => {
    setFormData(prevData => ({ ...prevData, [colorName]: color.hex }));
  };

  const togglePicker = (colorName) => {
    setShowPickers(prevShow => ({
      ...prevShow,
      [colorName]: !prevShow[colorName]
    }));
  };



  const handleMenuClick = (form) => {
    setActiveForm(form);
    setShowPickers({
      backgroundColor: false,
      textColor: false,
      iconColor: false,
      borderBottomColor: false,
    });
  };

  /* const handleReset = () => {
     setFormData(initialFormData);
   };*/

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
        {activeForm === 'details' && (
          <div style={styles.formContainer}>
            <h2>Modifier le template</h2>
            <form style={styles.form}>
              {renderInputField('name', 'Nom', formData.name)}
              {renderInputField('company', 'Entreprise', formData.company)}
              {renderInputField('email', 'Email', formData.email, 'email')}
              {renderInputField('phone', 'Téléphone', formData.phone, 'tel')}
              {renderInputField('address', 'Adresse', formData.address)}
              {renderInputField('website', 'Site web', formData.website)}

            </form>
          </div>
        )}

        {activeForm === 'social' && (
          <div style={styles.formContainer}>
            <h2>Social Links</h2>
            {renderInputField('facebook', 'Facebook', formData.facebook)}
            {renderInputField('linkedin', 'LinkedIn', formData.linkedin)}
          </div>
        )}

        {activeForm === 'customization' && (
          <div style={styles.formContainer}>
            <h2>Personnaliser les couleurs</h2>
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
                onChange={handleImageChange}
                style={styles.input}
              />
            </div>
          </div>
        )}
      </div>

      <div style={styles.previewContainer}>
        <h2 style={styles.heading}>Aperçu</h2>
        <div style={{ ...styles.preview, backgroundColor: formData.backgroundColor, borderBottomColor: formData.borderBottomColor }}>
          <p style={{ ...styles.greeting, color: formData.textColor }}>Cordialement {formData.name},</p>
          <div style={styles.signature}>
            <div style={styles.PictureUser}>
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Photo de profil"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <PiPictureInPictureLight style={{ width: '100%', height: '100%' }} />
              )}
            </div>
            <div style={{ ...styles.verticalLine, backgroundColor: formData.borderBottomColor, }}></div>
            <div style={styles.textContainer}>
              <p style={{ ...styles.contactItem, ...styles.boldText, color: formData.textColor }}>{formData.name}</p>
              <p style={{ ...styles.contactItem, ...styles.normalText }}>@ {formData.company}</p>
              <div style={styles.contactContainer}>
                <p style={{ ...styles.contactItem, color: formData.textColor, ...styles.contactLink }}>
                  <ImMail4 style={{ ...styles.icon, color: formData.iconColor, }} />   {formData.email}
                </p>
                <p style={{ ...styles.contactItem, color: formData.normalText }}>
                  <ImPhone style={{ ...styles.icon, color: formData.iconColor }} />  {formData.phone}
                </p>
                <p style={{ ...styles.contactItem, color: formData.normalText }}>
                  <ImLocation style={{ ...styles.icon, color: formData.iconColor }} /> {formData.address}
                </p>
                <p style={{ ...styles.contactItem, color: formData.textColor, ...styles.contactLink }}>
                  <ImEarth style={{ ...styles.icon, color: formData.iconColor }} />  {formData.website}
                </p>
              </div>
              <ul style={styles.socialContainer}>
                {formData.facebook && (
                  <li>
                    <a href={formData.facebook} aria-label="Facebook">
                      <FaFacebook style={{ ...styles.socialIconWrapper, ...styles.socialIcon, color: formData.iconColor }} />
                    </a>
                  </li>
                )}
                {formData.linkedin && (
                  <li>
                    <a href={formData.linkedin} aria-label="LinkedIn">
                      <FaLinkedin style={{ ...styles.socialIconWrapper, ...styles.socialIcon, color: formData.iconColor }} />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
         

        </div>
        <button className="bg-primary py-4 px-2 text-white" onClick={handleSaveTemplate}> {data ? "mette a jour" : "créer"} </button>
      </div>
    </div>
  );

  function renderInputField(name, label, value, type = 'text') {
    return (
      <div style={styles.formGroup}>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={`Entrez votre ${label.toLowerCase()}`}
          style={styles.input}
        />
      </div>
    );
  }
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
    backgroundColor: '#325290',
    padding: '20px 0',
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
    flexShrink: 0,
  },
  menuText: {
    marginLeft: '10px',
  },
  contentContainer: {
    display: 'flex',
    flex: 0.5,
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
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '12px',
  },
  signature: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '20px',
  },
  PictureUser: {
    width: '230px',
    height: '200px',
    marginRight: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '8px',
    overflow: 'hidden',
  },
  verticalLine: {
    width: '2px',
    //backgroundColor: '#562626',
    margin: '0 20px',
    height: '200px',
    // Ajustez la hauteur automatiquement
    alignSelf: 'stretch', // Ajustez cette hauteur pour correspondre à la hauteur de l'image

  },
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '5px',

  },
  contactItem: {
    marginBottom: '8px', // Réduire l'espace entre les éléments de contact
    display: 'flex',
    alignItems: 'center',
    color: '#333', // Couleur du texte
  },
  previewContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    justifyContent: 'center',
    flexGrow: 1,
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  preview: {
    maxWidth: '700px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    fontSize: '14px',
    position: 'sticky',
    top: '20px',
    backgroundColor: 'transparent',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  greeting: {
    fontSize: '16px',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',

  },
  socialContainer: {
    marginTop: '5px',
    display: 'flex',
    gap: '10px',
  },
  socialIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    marginRight: '12px',
  },
  socialIcon: {
    width: '22px',
    height: '22px',

  },
  boldText: {
    margin: '0 0 5px 0',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  contactLink: {

    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': {
      color: '#000', /* Change color on hover */
      textDecoration: 'underline',
    },
    '&:active': {
      color: '#333', /* Change color when clicked */
    }
  },
  icon: {
    width: '18px',
    height: '18px',
    marginRight: '10px', // Ajoute un espace entre l'icône et le texte
    verticalAlign: 'middle',
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
    marginTop: '10px',
  },
};

export default TemplateEditor;
