import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { AnnonceModel } from "../data/AnnonceModel"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DetailAnnonceComponent from "../components/DetailAnnonceComponent";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";

// const annonce:AnnonceModel = { id_annonce: 1 , Nom: "Mercede 123" , Description: "Voiture de transport" , Prix_vente: 12000 , status: 1 , Models: "5210" , Marque: "Mercedes" };
// const annonce: AnnonceModel = {
//     id: "1",
//     annonce_id: "ABC123",
//     auteur_id: "user123",
//     acteur: "Vendeur",
//     lieu: "Paris",
//     status: 1,
//     prix_vente: 1452789000,
//     date_annonce: "2024-02-02T12:00:00.000Z",
//     detailvoiture: {
//       matricule: "HOBY1839",
//       kilometrage: 93,
//       marque: "Toyota",
//       categorie: "SUV",
//       annee: 2022,
//       carburant: 1, // Assumption: 1 represents a carburant type
//     },
//     description: "Bonjour, nouvelle arrivage de voiture",
//     proprietes: [
//       {
//         titre: "Moteur",
//         description: "V8 Motul",
//       },
//       {
//         titre: "Volant",
//         description: "A droite",
//       },
//     ],
//     photos: [
//       {
//         data: "base_64_image_data",
//         contentType: "image/png",
//       },
//     ],
//   };
  
export interface DetailData {
    data: number;
}

// 
const DetailAnnonce: React.FC = () => {
    const [annonce, setAnnonce] = useState<AnnonceModel>();
    const name  = "Detaille annonces";
    const { id } = useParams();
        useEffect(() => {
            const fetchAnnonces = async () => {
                try {
                    const url = 'https://wscloudfinal-production.up.railway.app/api/v1/annonces/'+ id;
                    console.log(url);
                    
                    const token = sessionStorage.getItem('token');
                    const response = await fetch(url, {
                        method: 'GET',

                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                       
                        setAnnonce(responseData.data);
                        console.log(responseData.data);
                    } else {
                        console.error('Error fetching annonces:', response.status);
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
            };

            fetchAnnonces();
        }, []);
    
    return (
        <IonPage>
            <IonHeader style={{backgroundColor: "red"}} >
                <IonToolbar >
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <DetailAnnonceComponent data={annonce}  />
            </IonContent>
        </IonPage>
       
    );
}

export default DetailAnnonce;