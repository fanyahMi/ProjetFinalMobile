import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { IonButton, IonButtons, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { AnnonceModel } from '../data/AnnonceModel';
import AnnonceC from '../components/AnnonceComponent';
import { useHistory, useParams } from 'react-router';
import Liste_annonceC from '../components/Liste_AnnonceComponent';

const Liste_annonce: React.FC = () => {
    const divStyle = {
        marginTop: '200px',
      };
    // const data1: AnnonceModel = { id_annonce: 1 , Nom: "Mercede 123" , Description: "Voiture de transport" , Prix_vente: 12000 , status: "nom vendu" , Models: "5210" , Marque: "Mercedes" };
    const [annonces, setAnnonces] = useState<AnnonceModel[]>();
    const history = useHistory();
    const name = "Listes de tous les annonces favorites";
    useEffect(() => {
        const fetchAnnonces = async () => {
            const token = sessionStorage.getItem('token');
            console.log(token);
            try {
                
                const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/annonces/utilisateurs/favoris', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(" Reponse existant : " +response.ok);
                if (response.ok) {
                    const responseData = await response.json();
                    setAnnonces(responseData.data);
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
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Liste_annonceC data={annonces} />
                
                <IonInfiniteScroll>
                    <IonInfiniteScrollContent loadingText="Please wait..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
    </IonPage>
       
    );
}
export default Liste_annonce;