import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { AnnonceModel } from "../data/AnnonceModel";
import { add, remove } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Carburant, Lieu, Models } from "../data/DetailVoitureModel";
import { Annees_sortie } from "../data/Annees_sortie";

export interface AnnonceDetail {
    data?:AnnonceModel;
} 

const name = "Modification";
const ModifierComp: React.FC<AnnonceDetail> = (data) => {


    // data
    const[models , setModels] = useState<Models[]>([]);
    const[carburants , setCarburants] = useState<Carburant[]>([]);
    const[ years , setYears] =useState<Annees_sortie[]>([]);
    const vitesse = [80 , 90 , 100 , 110 , 120 , 130 , 140 , 150 , 160 , 170 , 180 , 190 , 200 , 210 , 220 , 230 , 240 , 250 , 260 , 270 , 280 , 290 , 300 , 310 , 320 , 330 , 340 , 3]
    const [ lieux , setLieux] = useState<Lieu[]>([]);

    const [model , setModel] = useState<number>(0);
    const [boite_vitesse , setBoite_vite] = useState<string>();
    const [annees_sortie , setAnnees] = useState<number>();
    const [matricule , setMatricule] = useState<string>(data.data?.detailvoiture.matricule!);
    const [carburant , setCarburant] = useState<number>(0);
    const [description , setDescription] = useState<string >(data.data?.description!);
    const [lieu , setLieu] = useState<number | undefined>();


    // useEffect(() => {
    //     const foundModel = models.find(m => m. === data.data?.detailvoiture.matricule);

    //     if (foundModel) {
    //         // Si le nom_model existe, mettre à jour la valeur par défaut de model
    //         setModel(foundModel.id_model);
    //     }
    // }, [models]);

    
    const history = useHistory();

    const modele = async (id: number) => {
        if(id != 0){
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

  useEffect(() => {
    const fetchLieu = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/lieux', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const responseData = await response.json();
               
                // setCarburants(responseData.data);
                setLieux(responseData.data);
                // console.log(categories);
            } else {
                console.error('Error fetching annonces:', response.status);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
      };

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

  fetchLieu();
    fetchModel();
    fetchCarburant();
}, []);

useEffect(() => {
    const carburant = carburants.find(m => m.carburant === data.data?.detailvoiture.carburant);

    if (carburant) {
        // Si le nom_model existe, mettre à jour la valeur par défaut de model
        setCarburant(carburant.idCarburant);
    }
}, [carburants]);

useEffect(() => {
    const annee = years.find(m => m.annee === data.data?.detailvoiture.annee);

    if (annee) {
        // Si le nom_model existe, mettre à jour la valeur par défaut de model
        setAnnees(annee.idAnneesortie);
    }
}, [years]);

useEffect(() => {
    const lieus = lieux.find(m => m.lieu === data.data?.lieu);

    if (lieus) {
        // Si le nom_model existe, mettre à jour la valeur par défaut de model
        setLieu(lieus.id_lieu);
    }
}, [lieux]);

useEffect(() => {
    const vitesses = vitesse.find(m => m === data.data?.detailvoiture.kilometrage);

    if (vitesses) {
        // Si le nom_model existe, mettre à jour la valeur par défaut de model
        setBoite_vite(vitesses.toString());
    }
}, [vitesse]);

const valueModif = {
    "idAnnonce": data.data?.annonce_id,
    "lieuId":4,
    "prixVente":data.data?.prix_vente,
    "statut":data.data?.statut,
    "dateConfirmation":null,
    "voiture":
    {
        "modelId":model,
        "matricule":matricule,
        "utilisateurId":1,
        "kilometrage":boite_vitesse,
        "modelcarburantId":carburant,
        "anneesortie": annees_sortie
    },
    "infoAnnonce":
    {
        "description":description,
        "proprietes":data.data?.proprietes,
        "photos":data.data?.photos
    }
}

    const value = async () => {
        console.log(JSON.stringify(valueModif));
        try{
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://wscloudfinal-production.up.railway.app/api/v1/annonces', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(valueModif),
                });
                const responsetoken = await response.json();
                if (response.ok) {
                    // history.push("/Menu");
                    // window.location.reload();
                    alert("Modification reusi !");
                } else {
                alert("La modification a echoue !");
                }
        } catch (error) {
            console.error('Error during modification:', error);
        }
    }


    return(
        <IonPage>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonTitle>Modification</IonTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonSelect
                        style={{marginTop: '20px'}}
                        interface="popover"
                        toggleIcon={add}
                        expandedIcon={remove}
                        aria-label="Model" 
                        value={model}
                        onIonChange={(e) => {
                            setModel(e.detail.value);
                            modele(e.detail.value);
                        }}
                        placeholder="Choisir le Model" 
                        >
                        {models?.map((mo) => (
                            <IonSelectOption key={mo.id_model} value={mo.id_model}>{mo.model}</IonSelectOption>
                        ))}
                        </IonSelect>
                        <IonSelect
                        style={{marginTop: '20px'}}
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
                        <IonSelect 
                        interface="popover"
                        aria-label="annees" 
                        style={{marginTop: '20px'}}
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
                        <IonInput 
                        style={{marginTop: '20px'}}
                        aria-label="Kilometrage" 
                        value={boite_vitesse}
                        onIonChange={(e) => setBoite_vite(e.detail.value!)}
                        placeholder="Choisir votre kilometrage" 
                        />
                        <IonSelect 
                        style={{marginTop: '20px'}}
                            interface="popover"
                            aria-label="Boite de vitesse" 
                            value={lieu}
                            onIonChange={(e) => setLieu(e.detail.value)}
                            placeholder="Choisir votre boite de vitesse" 
                            >
                            {lieux.map((l) => (
                                <IonSelectOption key={l.id_lieu} value={l.id_lieu}>
                                {l.lieu}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                        <IonTextarea
                        label="  Description" 
                        labelPlacement="floating" 
                        fill="outline" 
                        style={{marginTop: '20px'}}
                        placeholder="Description de l annonce ..." 
                        value={description}
                        onIonChange={(e) => setDescription(e.detail.value!)}
                        />
                        <IonTextarea
                        label="Matricule" 
                        labelPlacement="floating" 
                        fill="outline" 
                        style={{marginTop: '20px'}}
                        placeholder="Matricule de l annonce ..." 
                        value={matricule}
                        onIonChange={(e) => setMatricule(e.detail.value!)}
                        />
                    </IonCardContent>
                </IonCard>
            </IonContent>
            <IonButton
            onClick={value}
            >Modifier</IonButton>
        </IonPage>
    );
}
export default ModifierComp;