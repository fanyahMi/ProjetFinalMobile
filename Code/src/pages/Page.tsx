import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Page.css';
import Annonces from './Annonces';
import { Menu } from '@mui/material';

const Page: React.FC = () => {

  const name  = "annonce";

  return (
    <IonPage>
      {/* <Menu open={true} /> */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Annonces />
    </IonPage>
  );
};

export default Page;
