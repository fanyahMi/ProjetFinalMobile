import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AnnonceC, { AnnonceCModel } from '../components/AnnonceComponent';
import { useHistory } from 'react-router';
import { AnnonceModel } from '../data/AnnonceModel';

const Annonces: React.FC = () => {
    const name = "Listes Annonces";
      const [annonces, setAnnonces] = useState<AnnonceModel[]>([]);
        const history = useHistory();
        useEffect(() => {
            const fetchModel = async () => {
                try {
                    const token = sessionStorage.getItem('token');
                    const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/annonces/utilisateur', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
            
                    if (response.ok) {
                        const responseData = await response.json();
                       console.log(responseData.data);
                        setAnnonces(Array.from(responseData.data));
                    } else {
                        console.error('Error fetching annonces:', response.status);
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
              };

              fetchModel();
        }, []);
    return(
        <IonPage>
            <IonHeader style={{backgroundColor: "red"}} >
                <IonToolbar >
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <AnnonceC data={annonces} />
        </IonPage>
           
       
    );
}
export default Annonces;