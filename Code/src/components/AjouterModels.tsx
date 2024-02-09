import React, { useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, ellipsisVertical, ellipsisVerticalOutline } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Categorie, Marque } from "../data/DetailVoitureModel";
import { useHistory } from "react-router";

const AjouterC: React.FC<{ data: Categorie[] }> = ({ data }) => {

    const history = useHistory();
    const [response, setresponse] = useState();
    const [libelle , setLibelle] = useState<string>('');

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}`);
    }
  }

  const AddMarque = async () => {
        
    const url = 'http://localhost:8080/api/v1/categories'; // Replace with your actual API endpoint
    const token = localStorage.getItem('token'); // Assuming you have a token stored in localStorage

    try {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify({
          "categorie" : libelle,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Handle the response data as needed
        history.push("/Ajouter/Categories");

      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
};

  return (
    <IonContent>
      <IonCard>
        <IonCardContent>
          <h5>Listes des categories existant :</h5>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Libelle</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => (
                <tr key={obj.idCategorie}>
                  <td>{obj.idCategorie}</td>
                  <td>{obj.categorie}</td>
                  <td style={{width: '25%'}} >
                    <div className="btn-group dropend">
                      <IonFabButton
                        // style={{ backgroundColor:'transparent' }}
                        slot="end"
                        className="btn btn-link dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        
                      >
                        <IonIcon icon={ellipsisVerticalOutline}></IonIcon>
                      </IonFabButton>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Modifier
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Supprimer
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </IonCardContent>
      </IonCard>

      <IonInfiniteScroll>
                    <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
    </IonContent>
  );
};

export default AjouterC;
