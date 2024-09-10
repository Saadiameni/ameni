import { useEffect, useState } from "react";
import EmailTemplate1 from "../results/Result1";
import EmailTemplate2 from "../results/Result2";
import EmailTemplate3 from "../results/Result3";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

const MesSignatures = () => {
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user._id) {
      axios
        .get(`http://localhost:8000/api/signatures/get_signatures_by_user_id/${user._id}`)
        .then((response) => {
          setSignatures(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the signatures!", error);
        });
    } else {
      console.error("User not found in local storage!");
    }
  }, []);

  // Mapping template_id to the corresponding component
  const templateMapping = {
    1: EmailTemplate1,
    2: EmailTemplate2,
    3: EmailTemplate3,
  };

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:8000/api/signatures/delete_signature/' + id)
      .then(() => {
        toast.warn("Signature supprimée avec succès!")
      })
      .catch((error) => {
        console.error("Error deleting signature", error);
        toast.error("Failed to delete signature");
      });
  }

  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4 text-center">Mes Signatures</h2>
      <div className="row">
        {signatures.map((el) => {
          const TemplateComponent = templateMapping[el.template_id];
          return (
            <div className="col-md-6 mb-6" key={el.id}>
              <div className="card shadow-sm">
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDelete(el._id)}
                  >
                    <span
                      style={{
                        color: 'red',
                        fontSize: '1.2em',
                        fontWeight: 'bold',
                      }}
                    >
                      &times;
                    </span>
                    <span className="mx-2" style={{
                      color: 'red',
                      fontWeight: 'bold',
                    }}>Supprimer</span>
                  </div>
                  <button
                    className="btn cursor-pointer flex items-center"
                    onClick={() => navigate( `/template_editor/${el.template_id}`, {state: { data: el } })}
                  >
                    <FaEdit className="mx-3 text-success text-xl mr-2" />
                    <span className="text-success font-bold text-lg">mettre à jour</span>
                  </button>
                </div>

                <div className="card-body">
                  <TemplateComponent data={el} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MesSignatures;
