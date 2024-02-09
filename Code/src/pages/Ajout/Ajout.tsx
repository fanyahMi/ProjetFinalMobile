import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from '@ionic/react';
import { Stepper, Step, StepLabel, Menu } from '@mui/material';
import './Ajout.css';
import { useHistory, useParams } from 'react-router';
import { Propriete} from '../../data/Propriete';
import { Categorie, Marque, Models, Carburant, AnneeSortie } from '../../data/DetailVoitureModel';
import { add, remove } from 'ionicons/icons';
import { AnnonceInsertion, AnnonceModel } from '../../data/AnnonceModel';
import { Annees_sortie } from '../../data/Annees_sortie';

function getSteps() {
  return [
    '',
    '',
    '',
  ];
}


const Ajout: React.FC = () => {
  
  const [proprietes, setInputs] = useState([
    { titre: '', description: '' }
  ]);

  // Fonction pour ajouter de nouveaux champs de saisie
  const ajouterChamps = () => {
    setInputs([...proprietes, { titre: '', description: '' }]);
  };
  
  const [activeStep, setActiveStep] = useState(0);

  const [model , setModel] = useState<number>(0);
  const [boite_vitesse , setBoite_vite] = useState<string>('');
  const [annees_sortie , setAnnees] = useState<string>('');
  const [prix , setPrix] = useState<number>(0);
  const { name } = useParams<{ name: string }>();
  const [listImg, setImageBase64List] = useState<string[]>([]);
  const [carburant , setCarburant] = useState<number>(0);
  const [matricule , setMatricule] = useState<string>('');
  const [description , setDescription] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);

  // data
  const[models , setModels] = useState<Models[]>();
  const[carburants , setCarburants] = useState<Carburant[]>();
  const[ years , setYears] =useState<Annees_sortie[]>([]);
  const vitesse = [80 , 90 , 100 , 110 , 120 , 130 , 140 , 150 , 160 , 170 , 180 , 190 , 200 , 210 , 220 , 230 , 240 , 250 , 260 , 270 , 280 , 290 , 300 , 310 , 320 , 330 , 340 , 3]
  const history = useHistory();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const liste: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const base64Image = e.target?.result as string;
          liste.push(base64Image);

          if (liste.length === files.length) {
            setImageBase64List([...listImg, ...liste]);

            liste.forEach((base64, index) => {
              console.log(`Base64 de l'image ${index + 1}:`, base64);
            });
          }
        };

        reader.readAsDataURL(files[i]);
      }
      fileInput.value = '';
    }
  };

  useEffect(() => {

  const fetchModel = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const responseData = await response.json();
           
            setModels(responseData.data);
            // console.log(categories);
        } else {
            console.error('Error fetching annonces:', response.status);
        }
    } catch (error) {
        console.error('Error during fetch:', error);
    }
  };

  const fetchCarburant = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/models/v1/carburants', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const responseData = await response.json();
           
            setCarburants(responseData.data);
            // console.log(categories);
        } else {
            console.error('Error fetching annonces:', response.status);
        }
    } catch (error) {
        console.error('Error during fetch:', error);
    }
  };
    fetchModel();
    fetchCarburant();
}, []);

const afficherDonnees = () => {
  console.log(carburants);
  
};

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
            <IonList>
              <IonItem>
                <IonSelect
                  interface="popover"
                  toggleIcon={add}
                  expandedIcon={remove}
                  aria-label="Model" 
                  value={model}
                  onIonChange={(e) => setModel(e.detail.value)}
                  placeholder="Choisir le Model" 
                >
                  {models?.map((mo) => (
                    <IonSelectOption key={mo.id_model} value={mo.id_model}>{mo.model}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
                    <br />
              <IonItem>
                <IonSelect
                  interface="popover"
                  toggleIcon={add}
                  expandedIcon={remove}
                  aria-label="Carburant" 
                  value={carburant}
                  onIonChange={(e) => setCarburant(parseFloat(e.detail.value))}
                  placeholder="Choisir votre carburant" 
                >
                  
                {carburants?.map((c) => (
                  
                    <IonSelectOption key={c.idCarburant} value={c.idCarburant}>{c.carburant}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <br />
              <IonItem>
                <IonInput
                label="  Marticule" 
                type='text' 
                labelPlacement="floating" 
                fill="outline" 
                placeholder="Enter Matricule ..." 
                value={matricule}
                onIonChange={(e) => setMatricule(e.detail.value!)}
                 />
              </IonItem>
              <br />
              <IonItem>
                <IonTextarea
                label="  Description" 
                labelPlacement="floating" 
                fill="outline" 
                placeholder="Description de l annonce ..." 
                value={description}
                onIonChange={(e) => setDescription(e.detail.value!)}
                 />
              </IonItem>
            </IonList>
        );
      case 1:
        return (
          // <div className="input">
            <IonList>
                <IonItem>
                  <IonSelect 
                  interface="popover"
                  aria-label="annees" 
                  value={annees_sortie}
                  onIonChange={(e) => setAnnees(e.detail.value)}
                  placeholder="Choisir l' annees" 
                  >
                   {years.map((ans) => (
                      <IonSelectOption key={ans.idAnneesortie} value={ans.idAnneesortie}>
                      {ans.annee}
                    </IonSelectOption>
                   ))}
                  </IonSelect>
                </IonItem>
                <br />
                <IonItem>
                  <IonInput 
                  aria-label="Kilometrage" 
                  value={boite_vitesse}
                  onIonChange={(e) => setBoite_vite(e.detail.value!)}
                  placeholder="Choisir votre kilometrage" 
                  />
                </IonItem>
                <br />
                <IonItem>
                  <label className="custom-file-upload">
                    <input type="file" accept="image/*" multiple onChange={handleFileSelect} />
                    Select images
                  </label>
                  <label>Total d image upload : {listImg.length}</label>
                </IonItem>
                <br />
              </IonList>
        );
      case 2:
        return (
          // <div>
            <IonList>
              <IonItem>
              <IonLabel position="stacked">Entrez le prix d' vente</IonLabel>
              <IonInput
                type="text"
                labelPlacement="floating" 
                fill="outline" 
                value={prix}
                placeholder="Votre prix"
                onIonChange={(e) => {setPrix(parseFloat(e.detail.value!))}}
              ></IonInput>
              </IonItem>
              <br />
              <IonItem>
                <IonList>
                  <br />
                  <IonItem>
                    <IonLabel position="stacked">Entrez les propriete</IonLabel>
                  </IonItem>
                    {proprietes.map((input, index) => (
                      <IonItem key={index}>
                        <IonLabel position="stacked">Titre :</IonLabel>
                        <IonInput
                          type="text"
                          value={input.titre}
                          onIonChange={(e) => {
                            const newInputs = [...proprietes];
                            newInputs[index].titre = e.detail.value!;
                            setInputs(newInputs);
                          }}
                        />
                        <IonLabel position="stacked">Description:</IonLabel>
                        <IonInput
                          type="text"
                          value={input.description}
                          onIonChange={(e) => {
                            const newInputs = [...proprietes];
                            newInputs[index].description = e.detail.value!;
                            setInputs(newInputs);
                          }}
                        />
                      </IonItem>
                    ))}
                    <br />
                  <IonButton expand="full" color="secondary" onClick={ajouterChamps}>
                    Ajouter autre propriete
                  </IonButton>
                </IonList>
              </IonItem>
            </IonList>
          // </div>
        );
    }
  };
  const modele = async () => {
    if(model != 0){
      try {
        const token = sessionStorage.getItem('token');
        console.log("io ehhh :" + model);
        const url = 'https://wscloudfinal-production.up.railway.app/api/v1/models/v1/details/' + model;
        console.log(url);
        
        const response = await fetch(url, {
  
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {
            const responseData = await response.json();
           
            setYears(responseData.data);
            console.log(years);
            
        } else {
            console.error('Error fetching annonces:', response.status);
        }
      } catch (error) {
          console.error('Error during fetch:', error);
      }
    }
  }

  const handleLogin = async () => {
    const photo = [];
    const currentDate = new Date(); // Crée une nouvelle instance de l'objet Date avec la date et l'heure actuelles

    for (let i = 0; i < listImg.length; i++) {
      var d = {
        "data": listImg[i],
        "contentType": "image/jpeg"
      };
      photo.push(d);
    }
    const data = {
      lieuId: 2,
      vendeurId: 1,
      prixVente: prix,
      statut: 1,
      dateAnnonce: currentDate.toISOString(),
      dateConfirmation: null,
      voiture: {
          modelId: model,
          matricule: matricule,
          utilisateurId: 1,
          kilometrage: boite_vitesse,
          modelcarburantId: carburant,
          anneesortieId: annees_sortie
      },
      infoAnnonce: {
        description:description,
        proprietes: proprietes,
        photos:photo
      }
    };
    // const data = {
    //   lieuId: 2,
    //   vendeurId: 1,
    //   prixVente: 1452789000,
    //   statut: 1,
    //   dateAnnonce: new Date(),
    //   dateConfirmation: null,
    //   voiture: {
    //       modelId: 2,
    //       matricule: "HOBY1839",
    //       utilisateurId: 1,
    //       kilometrage: 93,
    //       modelcarburantId: 1,
    //       anneesortieId: 1
    //   },
    //   infoAnnonce: {
    //   description: "Bonjour, nouvelle arrivage de voiture",
    //   proprietes: [
    //       {
    //       titre: "Moteur",
    //       description: "V8 Motul"
    //       },
    //       {
    //       titre: "Volant",
    //       description: "A droite"
    //       }
    //   ],
    //   photos: [
    //       {
    //       data: "base_64",
    //       contentType: "image/png"
    //       }
    //   ]
    //   }
    // }
    
    console.log(JSON.stringify(data));  // Afficher les données dans la console si nécessaire
    try{
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/annonces', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responsetoken = await response.json();
        if (response.ok) {
            console.log()
            history.push("/Menu");
            window.location.reload();
        } else {
            setShowAlert(true);
        }
    }catch (error) {
      console.error('Error during login:', error);
    }
  };
  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => {
    setActiveStep(0);
    // setEmail('');
  };


  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="ion-padding">
          <Stepper activeStep={activeStep} alternativeLabel>
            {getSteps().map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === getSteps().length ? (
            <div>
              <IonText>All steps completed</IonText>
              <IonButton
                expand="full"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </IonButton>
            </div>
          ) : (
            <div>
              <IonText>
                {getStepContent(activeStep)}
                </IonText>
              <IonRow className="ion-margin-top">
                <IonCol>
                  <IonButton
                    expand="full"
                    color="secondary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </IonButton>
                </IonCol>
                <IonCol>
                <IonButton
                  expand="full"
                  color="primary"
                  onClick={() => {
                    if (activeStep === getSteps().length - 1) {
                      handleLogin();
                    } else {
                      handleNext();
                      // handleLogin();
                      modele();
                    }
                  }}
                >
                  {activeStep === getSteps().length - 1 ? 'Finish' : 'Next'}
                </IonButton>
                </IonCol>
              </IonRow>
            </div>
          )}
        </IonGrid>
      </IonPage>
  );
};

export default Ajout;

