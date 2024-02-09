// Importez les modules nécessaires depuis Ionic et React
import React, { useState } from 'react';
import { IonContent, IonInput, IonLabel, IonButton, IonPage, IonItem, IonList } from '@ionic/react';

const Propriete: React.FC = () => {
  // Utilisez le state pour suivre les champs de saisie dynamiques
  const [proprietes, setInputs] = useState([
    { types: '', description: '' }
  ]);

  // Fonction pour ajouter de nouveaux champs de saisie
  const ajouterChamps = () => {
    setInputs([...proprietes, { types: '', description: '' }]);
  };

  // Fonction pour afficher les données dans la console
  const afficherDonnees = () => {
    console.log(proprietes);
  };

  return (
    <IonPage>
      <IonContent>
        <form>
          <IonList>
            
          </IonList>

          <IonButton expand="full" onClick={ajouterChamps}>
            Ajouter Champs
          </IonButton>

          <IonButton expand="full" onClick={afficherDonnees}>
            Afficher Données
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Propriete;
