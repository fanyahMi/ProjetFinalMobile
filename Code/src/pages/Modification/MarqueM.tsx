import {
    IonAlert,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonInput,
    IonPage,
  } from "@ionic/react";
  import React, { useEffect, useState } from "react";
  import { useHistory, useParams } from "react-router";
  import { Marque } from "../../data/DetailVoitureModel";
  
  const ModifMarque: React.FC = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [Libelle, setLibelle] = useState<string>("");
    const [marque, setMarque] = useState<Marque | undefined>();
    const history = useHistory();
    const params = useParams<{ id: string }>();
  
    const handleModif = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/v1/marques/${params.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "id_marque": params.id,
            "marque": Libelle,
          }),
        });
  
        if (response.ok) {
          await response.json(); // If there's response data to handle
          history.push("/Ajouter/Marques");
        } else {
          setShowAlert(true);
        }
      } catch (error) {
        console.error('Error during modification:', error);
      }
    };
  
    useEffect(() => {
      const fetchAnnonces = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:8080/api/v1/marques/${params.id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const responseData = await response.json();
            setMarque(responseData.data);
          } else {
            console.error('Error fetching marque:', response.status);
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      };
  
      fetchAnnonces();
    }, [params.id]);
  
    return (
      <IonPage>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Modifier Marques</IonCardTitle>
            <IonCardSubtitle>Voici la marque : {marque?.marque}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              label="Marque"
              labelPlacement="floating"
              fill="outline"
              placeholder=""
              value={Libelle}
              onIonChange={(e) => setLibelle(e.detail.value!)}
            ></IonInput>
            <br />
            <IonButton fill="outline" routerLink="/Ajouter/Marques">
              Annuler
            </IonButton>
            <IonButton color="success" onClick={handleModif} fill="outline">
              Valider
            </IonButton>
          </IonCardContent>
        </IonCard>
  
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Erreur"
          subHeader="Erreur lors de la modification"
          message="Une erreur s'est produite lors de la modification. Veuillez réessayer."
          buttons={['OK']}
        />
      </IonPage>
    );
  };
  
  export default ModifMarque;
  