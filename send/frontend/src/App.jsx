import NavBar from './components/NavBar';
import Accueil from './components/Pages/Acceuil';
import Modeles from './components/Pages/Modeles';
import MesSignatures from './components/Pages/MesSignatures';
import Aide from './components/Pages/Aide';
import Connexion from './components/Pages/connexion';
import Inscription from './components/Pages/inscription';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import EmailTemplate1 from './components/Pages/EmailTemplate1';
import EmailTemplate2 from './components/Pages/EmailTemplate2';
import EmailTemplate3 from './components/Pages/EmailTemplate3';
import TemplateEditors3 from './components/Pages/TemplateEditors3';
import TemplateEditors1 from './components/Pages/TemplateEditors1';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import TemplateEditor from './components/Pages/TemplateEditors3';
import MainTemplateEditor from './components/Pages/TemplateEditor';
import ProtectedRoute from './layouts/ProtectedRoutes';
import Unauthorized from './layouts/Unauthorized';
function App() {
  return (
    <>
      <NavBar>
        <Routes>
          <Route path="/" exact element={<Accueil />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/aide" element={<Aide />} />
          <Route path='/Modeles' element={<Modeles />} />
          <Route path='/emailtemplate' element={<EmailTemplate1 />} />
          <Route path='/emailtemplate' element={<EmailTemplate2 />} />
          <Route path='/emailTemplate' element={<EmailTemplate3 />} />
          <Route path='/unauthorized' element={<Unauthorized />} />

         <Route path='/template_editor/:id' element={<ProtectedRoute><MainTemplateEditor /></ProtectedRoute>}/>
         <Route path='/mes-signatures' element={<ProtectedRoute><MesSignatures /></ProtectedRoute>} />

        </Routes >
      </NavBar>
    </>
 
 
  );
}

export default App;