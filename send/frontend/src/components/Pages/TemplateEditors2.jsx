import { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaHome, FaLink, FaImage, FaPalette } from "react-icons/fa";
import axios from 'axios'
import { SketchPicker } from 'react-color';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'

const initialData = {
  name: "Name Surname",
  title: "Job Title",
  email: "name@company.com",
  phone: "+34 1111222111",
  address: "Urb. El Casar 1212, 212121 Madrid, Spain",
  website: "https://www.website.com",
  imageUrl: "https://via.placeholder.com/120",
  linkedinUrl: "https://www.linkedin.com",
  githubUrl: "https://www.github.com",
  facebookUrl: "https://www.facebook.com",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  iconColor: "#325290",
  borderBottomColor: "#9e0d0d",
  objet: "Cordialement,",
};

const TemplateEditors2 = ({ data }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialData);
  const [activeForm, setActiveForm] = useState('details');
  const [showPickers, setShowPickers] = useState({
    backgroundColor: false,
    textColor: false,
    iconColor: false,
    borderBottomColor: false,
  });
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    setUser(JSON.parse(userData))
    if (data != undefined) {
      setFormData(data)
    }
  }, [])
  const { id } = useParams()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleMenuClick = (menu) => {
    setActiveForm(menu);
    setShowPickers({
      backgroundColor: false,
      textColor: false,
      iconColor: false,
      borderBottomColor: false,
    });
  };
  const handleSaveTemplate = () => {
    console.log(user._id)
    if (data != undefined) {
      axios.put(`http://localhost:8000/api/signatures/update_signature/${data._id}`,formData)
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
    reader.onloadend = () => setFormData(prevData => ({ ...prevData, imageUrl: reader.result }));
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
      <ToastContainer />
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
    <div style={{ ...styles.container, backgroundColor: formData.backgroundColor }}>
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
              {renderInput("Facebook URL", "facebookUrl")}
              {renderInput("GitHub URL", "githubUrl")}
              {renderInput("LinkedIn URL", "linkedinUrl")}
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
            <h2 style={styles.heading}>Éditeur de Details</h2>
            <form style={styles.form}>
              {renderInput("Nom", "name")}
              {renderInput("Titre", "title")}
              {renderInput("Email", "email", "email")}
              {renderInput("Téléphone", "phone")}
              {renderInput("Adresse", "address")}
              {renderInput("Site web", "website")}
              {renderInput("Objet", "objet")}
            </form>
          </div>
        )}
        <div style={styles.previewContainer}>
          <h2 style={styles.heading}>Aperçu</h2>
          <div style={{ ...styles.preview, backgroundColor: formData.backgroundColor }}>
            <div style={styles.left}>
              <p style={{ ...styles.objetText, color: formData.textColor }}>{formData.objet}</p>
              <div style={styles.imageContainer}>
                <img src={formData.imageUrl} alt="Profile" style={styles.image} />
              </div>
              <p style={{ ...styles.name, color: formData.textColor }}>{formData.name}</p>
              <p style={{ ...styles.title, color: formData.textColor }}>{formData.title}</p>
            </div>
            <div style={styles.right}>
              <p style={{ ...styles.link, color: formData.iconColor }}>Email: {formData.email}</p>
              <p style={{ ...styles.link, color: formData.iconColor }}>Téléphone: {formData.phone}</p>
              <p style={{ color: formData.textColor }}>Adresse: {formData.address}</p>
              <p style={{ ...styles.link, color: formData.iconColor }}>Site web: {formData.website}</p>
              <hr style={{ ...styles.horizontalLine, borderColor: formData.borderBottomColor }} />
              <ul style={styles.socialIcons}>
                {formData.linkedinUrl && (
                  <li>
                    <a href={formData.linkedinUrl} aria-label="LinkedIn">
                      <FaLinkedin style={{ ...styles.icon, color: formData.iconColor }} />
                    </a>
                  </li>
                )}
                {formData.githubUrl && (
                  <li>
                    <a href={formData.githubUrl} aria-label="GitHub">
                      <FaGithub style={{ ...styles.icon, color: formData.iconColor }} />
                    </a>
                  </li>
                )}
                {formData.facebookUrl && (
                  <li>
                    <a href={formData.facebookUrl} aria-label="Facebook">
                      <FaFacebook style={{ ...styles.icon, color: formData.iconColor }} />
                    </a>
                  </li>
                )}
              </ul>
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
    fontSize: '14px',
  },
  link: {
    textDecoration: 'none', fontWeight: 'bold',
  },
  profileImage: {
    display: 'block',
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '15px',
    borderRadius: '50%',
    border: '1px solid #ddd',
    overflow: 'hidden',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '18px',
    color: '#333',
  },
  previewContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    background: '#f0f0f0',
  },
  preview: {
    display: 'flex',
    maxWidth: '650px',
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontSize: '14px',
    background: '#fff',
  },
  left: {
    flex: '0 0 30%',
    marginRight: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  right: {
    marginTop: '40px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  objetText: {
    marginTop: '-10px',
    marginBottom: '5px',
    color: '#333',
    height: '20%',
    fontSize: '14px',
    lineHeight: '20px',
    position: 'relative',
    left: '-56px',
  },
  horizontalLine: {
    width: '100%',
    height: '5px',
    border: '0',
    borderTop: '3px solid #0d4580',
    margin: '10px 0',
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

export default TemplateEditors2;