import { Suspense, lazy, useState } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import TemplateEditor3 from './TemplateEditors3';
import TemplateEditor1 from './TemplateEditors1';
import TemplateEditor2 from './TemplateEditors2';
import { useNavigate } from 'react-router-dom';

const EmailTemplate1 = lazy(() => import('./EmailTemplate1'));
const EmailTemplate2 = lazy(() => import('./EmailTemplate2'));
const EmailTemplate3 = lazy(() => import('./EmailTemplate3'));

// Styles pour le composant
const styles = {
  container: {
    background: '#ffffff',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    color: '#9e71a7',
    marginBottom: '20px',
  },
  cardBody: {
    height: '300px',
    overflowY: 'auto',
    background: '#9e71a7',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: 'rgb(28, 33, 67)',
    borderColor: 'rgb(28, 33, 67)',
    color: '#f9f7fa',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  buttonHover: {
    backgroundColor: 'rgba(1, 15, 105, 0.723)',
    transform: 'scale(1.05)',
  },
  modalTitle: {
    fontWeight: 'bold',
  },
};

const Modeles = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const navigate = useNavigate()
  const templates = [
    { id: 1, name: 'Template 1', Component: EmailTemplate1, Editor: TemplateEditor1 },
    { id: 2, name: 'Template 2', Component: EmailTemplate2, Editor: TemplateEditor2 },
    { id: 3, name: 'Template 3', Component: EmailTemplate3, Editor: TemplateEditor3 },
  ];

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTemplate(null);
  };

  const handleUseTemplate = () => {
    console.log("bonjour")
    return navigate(`/template_editor/${selectedTemplate.id}`)
};
// state: { "selectedTemplate": selectedTemplate } }

if (showEditor && selectedTemplate) {
  const SelectedEditor = selectedTemplate.Editor;
  return <SelectedEditor TemplateComponent={selectedTemplate.Component} />;
}

return (
  <div style={styles.container}>
    <Container fluid>
      <h2 className="text-center" style={styles.header}>Mes Modèles</h2>
      <Row className="g-4">
        {templates.map(({ id, name, Component }) => (
          <Col key={id} xs={12} md={6} lg={4}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-header bg-dark text-white py-2 px-3">
                <h6 className="mb-0">{name}</h6>
              </div>
              <div className="card-body p-3" style={styles.cardBody}>
                <Suspense fallback={<div className="text-center">Chargement...</div>}>
                  <Component />
                </Suspense>
              </div>
              <div className="card-footer bg-white border-top-0">
                <Button
                  style={styles.button}
                  className="w-100"
                  onClick={() => handleTemplateClick({ id, name, Component, Editor: templates.find(t => t.name === name).Editor })}
                  aria-label={`Voir ${name} en plein écran`}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                  Voir en plein écran
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>

    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title style={styles.modalTitle}>{selectedTemplate?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedTemplate && (
          <Suspense fallback={<div className="text-center">Chargement...</div>}>
            <selectedTemplate.Component />
          </Suspense>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Fermer
        </Button>
        <Button
          variant="primary"
          onClick={() => handleUseTemplate()}
          style={styles.button}
        >
          Utiliser ce modèle
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);
};

export default Modeles;