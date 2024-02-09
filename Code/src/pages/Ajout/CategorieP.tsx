import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Categorie, Marque } from "../../data/DetailVoitureModel";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AjoueterC from "../../components/AjouterComponent";
import AjouterCategorie from "../../components/AjouterCategorie";

const AjoutCategorie: React.FC = () => {
    const [listes, setListes] =  useState<Categorie[]>([]);
    const name = "Liste des categories";
    const history = useHistory();

        useEffect(() => {
            const fetchAnnonces = async () => {
                try {
                    const token = sessionStorage.getItem('token');
                    const response = await fetch('http://localhost:8080/api/v1/categories', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                       
                        setListes(responseData.data);
                        console.log(listes);
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
                <AjouterCategorie data={listes} />
            </IonContent>
        </IonPage>
    );
}
export default AjoutCategorie;