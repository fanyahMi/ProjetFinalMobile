import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Marque } from "../../data/DetailVoitureModel";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AjoueterC from "../../components/AjouterComponent";

const AjoutMarque: React.FC = () => {
    const [listes, setListes] =  useState<Marque[]>([]);
    const history = useHistory();
    const name ="Listes des Marque";

        useEffect(() => {
            const fetchAnnonces = async () => {
                try {
                    const token = sessionStorage.getItem('token');
                    const response = await fetch('http://localhost:8080/api/v1/marques', {
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
                <AjoueterC data={listes} />
            </IonContent>
        </IonPage>
    );
}
export default AjoutMarque;