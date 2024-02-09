import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import { AnnonceCModel } from "./AnnonceComponent"
import { AnnonceModel } from "../data/AnnonceModel";
import { list } from "ionicons/icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export interface Liste_annonceD {
    data?: AnnonceModel[];
}
const Liste_annonceC: React.FC<Liste_annonceD> = ({data}) =>{
    return (
        <IonPage>
            <IonList>
            {data?.map((annonce) => (
                <IonItem>
                    <IonLabel>{annonce.description} </IonLabel>
                    <div className="btn-group dropend"  color="transparent">
                        <IonButton slot="end" className="btn btn-link dropdown-toggle" type="button"  data-bs-toggle="dropdown" aria-expanded="false" ><IonIcon icon={list}></IonIcon></IonButton>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Details</a></li>
                            <li><a className="dropdown-item" href="#">Modifier</a></li>
                            <li><a className="dropdown-item" href="#">Supirmer</a></li>
                        </ul>
                    </div>
                </IonItem>
            ))}
            </IonList>
        </IonPage>
    );
}
export default Liste_annonceC;