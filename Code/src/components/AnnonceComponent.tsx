import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import { AnnonceModel } from '../data/AnnonceModel';
import './AnnonceComponent.css';

export interface AnnonceCModel {
    data?: AnnonceModel[];
}

const AnnonceC: React.FC<AnnonceCModel> = ({data}) => {
    const divStyle = {
        marginTop: '200px',
      };
      const cs = {
        // max-width: '540px',
        CSSMathMax: '540px',
      };

      return (
        <IonContent>
            <IonList>
                {data?.map((annonce) => (
                    <IonItem>
                        <IonCard>
                            <div className="image-container">
                                <img width={'100%'} height={'10%'} alt="Silhouette of mountains" src={annonce.photos[0].data} />
                            </div>
                            <IonCardHeader>
                                <IonCardTitle> {annonce.acteur} </IonCardTitle>
                                <IonCardSubtitle>Prix du produit : <strong>{annonce.prix_vente} $</strong></IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonLabel>{annonce.description}</IonLabel>
                            </IonCardContent>
                            <IonRow>
                                <IonCol size='3'>
                                    {/* <IonButton > <IonIcon icon={heart}></IonIcon> </IonButton> */}
                                </IonCol>
                            <IonCol>
                                    <IonButton style={{marginLeft: '65%' }} key={annonce.annonce_id} routerLink={`/detail/${annonce.annonce_id}`} color="danger">Voir +</IonButton>
                            </IonCol>
                            </IonRow>
                            
                        </IonCard>
                    </IonItem>
                ))}
            </IonList>
        </IonContent>
      );
}
export default AnnonceC;